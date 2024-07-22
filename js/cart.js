
let cart = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],

    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
        document.dispatchEvent(new CustomEvent('cartUpdated'));
    },

    addItem(productName, productImage, quantity) {
        if (!Array.isArray(this.items)) {
            this.items = [];
        }

        const existingItem = this.items.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ name: productName, productImage, quantity });
        }

        this.saveCart();
    }
}

export function addToCart(event) {

    const button = event.currentTarget;
    const productName = button.getAttribute('data-product-name');
    const productImage = button.getAttribute('data-product-image');

    const quantityElement = button.previousElementSibling.querySelector('.quantity');
    const quantityValue = parseInt(quantityElement.textContent);

    cart.addItem(productName, productImage, quantityValue);
}

export function cartView() {

    const cartView = document.createElement('section');
    cartView.id = 'cartView';

    const exit = document.createElement('div');
    exit.className = 'exit';
    exit.innerHTML = '<i class="fa-solid fa-x"></i>';

    exit.addEventListener('click', () => {
        cartView.classList.toggle('visible');
    });

    const productContainer = document.createElement('div');
    productContainer.id = 'productContainer';

    function renderCart() {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

        productContainer.innerHTML = '';

        const title = document.createElement('div');
        title.innerHTML = `<h2>Coș de cumpărături</h2>`

        if (storedCart.length > 0) {

            const table = document.createElement('table');
            table.className = 'product-table';

            const headerRow = document.createElement('tr');
            const nameHeader = document.createElement('th');
            nameHeader.className = 'th-name';
            nameHeader.textContent = 'Nume';
            const quantityHeader = document.createElement('th');
            quantityHeader.textContent = 'Cantitate';

            headerRow.appendChild(nameHeader);
            headerRow.appendChild(quantityHeader);
            table.appendChild(headerRow);

            storedCart.forEach(item => {
                const row = document.createElement('tr');

                const quantityCell = document.createElement('td');
                quantityCell.className = 'td-name-quantity';
                quantityCell.textContent = item.quantity;

                const image = document.createElement('img');
                image.src = item.productImage;
                image.alt = item.name;
                image.style.width = '50px';

                const nameCell = document.createElement('td');
                nameCell.className = 'td-name-photo';
                nameCell.textContent = item.name;
                nameCell.appendChild(image);

                row.appendChild(nameCell);
                row.appendChild(quantityCell);
                table.appendChild(row);
            });

            productContainer.appendChild(title);
            productContainer.appendChild(table);


        } else {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'empty-message'
            emptyMessage.textContent = 'Coșul este gol.';
            productContainer.appendChild(emptyMessage);
        }
    }

    document.addEventListener('cartUpdated', renderCart);

    cartView.appendChild(exit);
    cartView.appendChild(productContainer);

    renderCart();

    return cartView;
}

export function createCart() {

    const container = document.createElement('div');
    const cart = document.createElement('span');


    cart.className = 'cart';
    cart.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';

    const view = cartView();
    document.body.appendChild(view);

    cart.addEventListener('click', () => {
        view.classList.toggle('visible');
    });

    container.appendChild(cart);

    return container;
}



