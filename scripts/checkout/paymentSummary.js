import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { format } from "../utils/money.js";

export function renderPaymentSummary(){

    let productPriceCents = 0;
    let shippingPriceCnets = 0;

    cart.forEach((cartItem) => {
        
        const product = getProduct(cartItem.id);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCnets += deliveryOption.priceCents;

    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCnets;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;
    console.log(totalCents);

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${format(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${format(shippingPriceCnets)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${format(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${format(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${format(totalCents)}</div>
          </div>

        <button class="place-order-button button-primary">
            Place your order
          </button>

    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

}