const productsBtn = document.querySelectorAll('.button');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2,15);
};

const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
};

const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} ₴`;
};

const printQuantity = () =>{
    let length = cartProductsList.querySelector('.simplebar-content').children.length;
    cartQuantity.textContent = length;
    length > 0 ? cart.classList.add('active') : cart.classList.remove('active')
};

const generateCartProduct = (title, price, id) => {
    return `
    
    <li class="cart-content__item">
    <article class="cart-content__product cart-product" data-id="${id}">
        <div class="cart-product__text">
            <h3 class="cart-product__title">${title}</h3>
            <span class="cart-product__price"> ${normalPrice(price)} ₴</span>
        </div>
        <button class="cart-product__delete"></button>
    </article>
    </li>

    `;
}

const deleteProducts = (productParent) => {
    let id = productParent.querySelector('.cart-product').dataset.id;
    document.querySelector(`.card[data-id="${id}"]`).querySelector('.button').disabled = false;

    let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
    minusFullPrice(currentPrice);
    printFullPrice();
    productParent.remove();
    printQuantity();
};

    productsBtn.forEach(el => {
    el.closest('.card').setAttribute('data-id', randomId());
    el.addEventListener('click', (e) => {
     let self = e.currentTarget;
     let parent = self.closest('.card');
     let id = parent.dataset.id;
     let title = parent.querySelector('.card-title').textContent;
     let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.price').textContent));
    
     plusFullPrice(priceNumber)
     printFullPrice();
     cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(title, priceNumber, id));
     printQuantity();
    self.disabled = true;
    });
});

cartProductsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-product__delete')){
      deleteProducts(e.target.closest('.cart-content__item'))
  }  
})