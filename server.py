"""Run the CrossBorder Commerce website locally.

Usage:
    python server.py
"""

from __future__ import annotations

import json
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import ClassVar
from urllib.error import URLError
from urllib.parse import unquote, urlencode, urlparse
from urllib.request import Request, urlopen


HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8080"))
PROJECT_ROOT = Path(__file__).resolve().parent
DBS_RATE_SNAPSHOT = {
    "provider": "DBS Bank",
    "source_url": "https://www.dbs.com.tw/personal/rates-online/foreign-currency-foreign-exchange.page",
    "updated_at": "Demo snapshot - replace with an authorized DBS Bank feed before production use",
    "is_demo": True,
    "rates": [
        {"currency": "USD", "name": "US Dollar", "cash_buy": 32.12, "cash_sell": 32.82, "spot_buy": 32.47, "spot_sell": 32.57},
        {"currency": "JPY", "name": "Japanese Yen (100)", "cash_buy": 20.48, "cash_sell": 21.18, "spot_buy": 20.83, "spot_sell": 20.93},
        {"currency": "EUR", "name": "Euro", "cash_buy": 34.18, "cash_sell": 35.22, "spot_buy": 34.61, "spot_sell": 34.81},
        {"currency": "SGD", "name": "Singapore Dollar", "cash_buy": 23.79, "cash_sell": 24.79, "spot_buy": 24.19, "spot_sell": 24.39},
        {"currency": "CNY", "name": "Chinese Yuan", "cash_buy": 4.31, "cash_sell": 4.71, "spot_buy": 4.51, "spot_sell": 4.56},
    ],
}
ASSISTANT_INSTRUCTIONS = (
    "You are Jacky AI, the warm and practical digital concierge for Magic Jacky, "
    "a Taiwan-based cross-border commerce company. Answer naturally and conversationally, "
    "using short paragraphs and concrete next steps. Help with event orders, global shipping, "
    "Sentosa Glow Night Run kits, TikTok Shop creator operations, custom commerce software, and "
    "compliance. Explain dynamic FX settlement planning, AML/KYC-aware workflows, fraud controls, "
    "and cross-border fulfilment in practical terms. Ask one focused follow-up question when needed. "
    "Do not invent order status or legal, financial, or trading advice; for FX, explain that live rates "
    "and final terms must be confirmed with the bank or settlement provider."
)


def local_assistant_reply(question: str) -> str:
    text = question.lower()
    if ("3k" in text and "10k" in text) or "3k" in text and "10 k" in text:
        return "Choose 3K for a relaxed first night run or a social pace. Choose 10K if you already run regularly and want the full Sentosa route. Both entry kits include your bib, timing tag, and event guide."
    if any(word in text for word in ("aml", "kyc", "fraud", "sanctions", "防洗錢", "風控")):
        return "For a cross-border live launch, Magic Jacky supports AML and fraud-control workflows with KYC-aware onboarding, sanctions-screening support, transaction review paths, and auditable exception handling. FX settlement can be estimated dynamically in the dashboard, but final quotes, fees, and bank terms must be confirmed with the settlement provider."
    if any(phrase in text for phrase in ("my order", "an order", "event order", "collection", "訂單", "領取")):
        return "For an event order, keep the order number ready for kit collection. Our support team can help confirm delivery status, collection details, and cross-border fulfilment requirements."
    if any(word in text for word in ("shipping", "delivery", "logistics", "fulfilment", "物流", "配送")):
        return "Magic Jacky coordinates cross-border shipping, overseas warehousing, customs-ready documentation, duty visibility, and local delivery updates through one fulfilment workflow."
    if any(word in text for word in ("fx", "foreign exchange", "currency", "外匯", "匯率")):
        return "Magic Jacky can help estimate checkout settlement using the FX dashboard. For a final trade, customers must confirm the live quote, fees, and terms directly with the bank."
    if any(word in text for word in ("tiktok", "live", "直播")):
        return "Our TikTok Shop program includes creator matching, show production, affiliate tracking, local-language moderation, and fulfillment coordination across APAC."
    if any(word in text for word in ("app", "software", "develop", "開發")):
        return "Our product team builds localized web stores, mobile apps, payment flows, marketplace APIs, CRM dashboards, and warehouse integrations for multi-market operations."
    if any(word in text for word in ("privacy", "gdpr", "compliance", "法規", "隱私")):
        return "Magic Jacky applies GDPR-aligned consent, PCI DSS-aware payment controls, AML screening support, consumer protection processes, and transparent duty and tax information."
    return "I can help with a market launch, FX settlement planning, TikTok live campaign, commerce application, or fulfilment setup. Which market are you planning for?"


def sanitize_history(raw_history: object) -> list[dict[str, str]]:
    if not isinstance(raw_history, list):
        return []

    history: list[dict[str, str]] = []
    for item in raw_history[-8:]:
        if not isinstance(item, dict):
            continue
        role = item.get("role")
        text = item.get("text")
        if role not in {"user", "model"} or not isinstance(text, str):
            continue
        cleaned_text = text.strip()[:1000]
        if cleaned_text:
            history.append({"role": role, "text": cleaned_text})
    return history


def gemini_assistant_reply(question: str, api_key: str, history: list[dict[str, str]]) -> str:
    model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    request_body = json.dumps({
        "systemInstruction": {"parts": [{"text": ASSISTANT_INSTRUCTIONS}]},
        "contents": [
            *({"role": item["role"], "parts": [{"text": item["text"]}]} for item in history),
            {"role": "user", "parts": [{"text": question}]},
        ],
        "generationConfig": {"temperature": 0.7, "maxOutputTokens": 400},
    }).encode("utf-8")
    request = Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?{urlencode({'key': api_key})}",
        data=request_body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urlopen(request, timeout=25) as response:
        payload = json.loads(response.read().decode("utf-8"))
    reply = "".join(part.get("text", "") for part in payload["candidates"][0]["content"]["parts"]).strip()
    if not reply:
        raise ValueError("Gemini returned an empty reply")
    return reply


def assistant_reply(question: str, history: list[dict[str, str]]) -> tuple[str, str]:
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if gemini_api_key:
        try:
            return gemini_assistant_reply(question, gemini_api_key, history), "gemini"
        except (KeyError, URLError, TimeoutError, ValueError):
            pass

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        source = "gemini-fallback" if gemini_api_key else "local-demo"
        return local_assistant_reply(question), source

    openai_input = [
        {"role": item["role"], "content": item["text"]}
        for item in history
    ]
    openai_input.append({"role": "user", "content": question})
    request_body = json.dumps({
        "model": os.getenv("OPENAI_MODEL", "gpt-4.1-mini"),
        "instructions": ASSISTANT_INSTRUCTIONS,
        "input": openai_input,
    }).encode("utf-8")
    request = Request(
        "https://api.openai.com/v1/responses",
        data=request_body,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=20) as response:
            payload = json.loads(response.read().decode("utf-8"))
        reply = payload["output"][0]["content"][0]["text"]
        return reply, "openai"
    except (KeyError, URLError, TimeoutError, ValueError):
        return local_assistant_reply(question), "local-fallback"


class WebsiteRequestHandler(SimpleHTTPRequestHandler):
    """Serve the website files from this project's directory."""

    directory: ClassVar[str] = str(PROJECT_ROOT)
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".css": "text/css",
        ".js": "application/javascript",
    }

    def __init__(self, *args: object, **kwargs: object) -> None:
        super().__init__(*args, directory=self.directory, **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def serve_enhanced_html(self) -> bool:
        request_path = unquote(urlparse(self.path).path)
        relative_path = "index.html" if request_path == "/" else request_path.lstrip("/")
        candidate = (PROJECT_ROOT / relative_path).resolve()

        try:
            candidate.relative_to(PROJECT_ROOT)
        except ValueError:
            return False

        if candidate.suffix != ".html" or not candidate.is_file():
            return False

        content = candidate.read_text(encoding="utf-8")
        content = content.replace("</head>", '<link rel="stylesheet" href="site-enhancements.css" /></head>')
        content = content.replace("</body>", '<script src="site-enhancements.js"></script></body>')
        body = content.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
        return True

    def do_GET(self) -> None:
        if self.path.split("?", 1)[0] == "/api/dbs-rates":
            body = json.dumps(DBS_RATE_SNAPSHOT).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        if self.serve_enhanced_html():
            return

        super().do_GET()

    def do_POST(self) -> None:
        if self.path.split("?", 1)[0] not in {"/api/assistant", "/api/chat"}:
            self.send_error(404, "File not found")
            return

        try:
            content_length = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(content_length).decode("utf-8"))
            question = str(payload.get("question", "")).strip()[:1000]
            if not question:
                raise ValueError("Question is required")
            reply, source = assistant_reply(question, sanitize_history(payload.get("history")))
            body = json.dumps({"reply": reply, "source": source}).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except (ValueError, json.JSONDecodeError):
            self.send_error(400, "Invalid assistant request")


def main() -> None:
    server = ThreadingHTTPServer((HOST, PORT), WebsiteRequestHandler)
    print(f"CrossBorder Commerce is running on port {PORT}")
    print("Press Ctrl+C to stop the server.")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()