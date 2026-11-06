const shippingForm = document.querySelector('#shippingEstimator');
const shippingResult = document.querySelector('#shippingResult');
const serviceNav = document.querySelector('.page-nav');
if (serviceNav && !serviceNav.querySelector('[href="runner.html"]')) {
  serviceNav.insertAdjacentHTML('beforeend', '<a href="runner.html">My Run</a>');
}
const shippingMarkets = {
  sg: { label: 'Singapore', shipping: 7, duty: 0.09, days: '2-4 business days' },
  tw: { label: 'Taiwan', shipping: 9, duty: 0.05, days: '3-5 business days' },
  jp: { label: 'Japan', shipping: 12, duty: 0.1, days: '4-6 business days' },
  my: { label: 'Malaysia', shipping: 8, duty: 0.06, days: '3-5 business days' },
};

shippingForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(shippingForm);
  const market = shippingMarkets[formData.get('market')];
  const itemValue = Number(formData.get('value'));
  const quantity = Number(formData.get('quantity'));
  const merchandise = itemValue * quantity;
  const shipping = market.shipping + Math.max(0, quantity - 1) * 2;
  const duty = (merchandise + shipping) * market.duty;
  const total = merchandise + shipping + duty;
  shippingResult.textContent = `${market.label}: merchandise $${merchandise.toFixed(2)} + delivery $${shipping.toFixed(2)} + estimated tax/duty $${duty.toFixed(2)} = $${total.toFixed(2)} USD. Target arrival: ${market.days}.`;
});