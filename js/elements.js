import { addToCart } from "./cart";

export function createTitleAndPercent(product) {

    const originalPrice = product.original_price;
    const discountedPrice = product.discounted_price;

    const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;

    const container = document.createElement('div');

    if (discountedPrice !== null) {

        const percent = document.createElement('p');
        percent.className = 'percent';
        percent.textContent = `-${discountPercentage.toFixed(0)} %`;
        container.appendChild(percent);
    }

    const title = document.createElement('h3');
    title.textContent = product.name;
    title.id = 'title';

    container.appendChild(title);

    return container;

}

export function createAvailability() {

    const availability = document.createElement('div');
    availability.className = 'availability';

    const code = document.createElement('p');
    code.innerHTML = '<span>Κωδικός:</span> 04.1048';

    const verticalLine = document.createElement('div');
    verticalLine.className = 'vertical-line';

    const delivery = document.createElement('p');

    delivery.innerHTML = '<span>Διαθεσιμότητα:</span> Παράδοση σε 1 - 3 ημέρες';

    availability.appendChild(code);
    availability.appendChild(verticalLine);
    availability.appendChild(delivery);

    return availability;
}

export function createPrice(product) {

    const discountedPrice = product.discounted_price;

    const price = document.createElement('div');
    price.className = 'price';

    const originalPrice = document.createElement('span');
    originalPrice.className = `original-price ${discountedPrice !== null && 'line-through'}`;
    originalPrice.textContent = `${product.original_price} €`;

    price.appendChild(originalPrice);
    if (discountedPrice !== null) {
        const discountPrice = document.createElement('span');
        discountPrice.className = 'discount-price';
        discountPrice.textContent = `${discountedPrice} €`;
        price.appendChild(discountPrice);
    }

    return price;
}

export function createAbout() {

    const about = document.createElement('div');
    about.className = 'about font-light';

    const descriptionTitle = document.createElement('h5');
    descriptionTitle.textContent = 'Περιγραφή:';

    const description = document.createElement('p');
    description.textContent = 'Έτοιμο Ready to go Spritz με την υπογραφή της Luxardo, ελαφρύ & λεμονάτο, όπως το limoncello!';

    const quantity = document.createElement('p');
    quantity.textContent = 'Ποσότητα';

    about.appendChild(descriptionTitle);
    about.appendChild(description);
    about.appendChild(quantity);

    return about;
}


export function createCheckout(product) {

    const checkout = document.createElement('section');
    checkout.className = 'checkout';

    const count = document.createElement('div');
    count.className = 'count';

    const decrement = document.createElement('span');
    decrement.textContent = '-';
    decrement.addEventListener('click', () => updateQuantity(-1));

    const quantity = document.createElement('p');
    quantity.textContent = '1';
    quantity.id = 'quantity';
    quantity.className = 'quantity';

    const increment = document.createElement('span');
    increment.textContent = '+';
    increment.addEventListener('click', () => updateQuantity(1));

    count.appendChild(decrement);
    count.appendChild(quantity);
    count.appendChild(increment);

    const button = document.createElement('button');
    button.className = 'button';
    button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Προσθήκη στο καλάθι';
    button.setAttribute('data-product-name', product.name);
    button.setAttribute('data-product-image', product.image);
    button.addEventListener('click', addToCart);

    checkout.appendChild(count);
    checkout.appendChild(button);


    function updateQuantity(change) {
        const currentQuantity = parseInt(quantity.textContent);
        const newQuantity = currentQuantity + change;
        if (newQuantity > 0) {
            quantity.textContent = newQuantity;
        }
    }

    return checkout;
}

export function createDetails() {

    const details = document.createElement('section');
    details.className = 'details';

    const items = [
        { label: 'Κατηγορία Ποτού:', value: 'RTDs, Έτοιμο cocktail' },
        { label: 'Χώρα Προέλευσης:', value: 'Ιταλία' },
        { label: 'Μέγεθος Φιάλης:', value: '200ml' },
        { label: 'Αλκοόλ:', value: '3%' }
    ];

    items.forEach(item => {
        const detailItem = document.createElement('div');
        detailItem.className = 'details-item';

        const label = document.createElement('p');
        label.textContent = item.label;

        const value = document.createElement('p');
        value.textContent = item.value;

        detailItem.appendChild(label);
        detailItem.appendChild(value);
        details.appendChild(detailItem);
    });

    return details;
}

export function createSpan(text, className) {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = text;
    return span;
}

