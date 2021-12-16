const cartButton = document.querySelector("#cart-button");
const cartButton1 = document.querySelector("#cart-button1");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const modal1 = document.querySelector(".modal1");
const close1 = document.querySelector(".close1");

cartButton.addEventListener('click', function(event){
    modal.classList.add("is-open");
});

cartButton1.addEventListener('click', function(event){
    modal1.classList.add("is-open");
});

close.addEventListener('click', function(event){
    modal.classList.remove("is-open");
});

close1.addEventListener('click', function(event){
    modal1.classList.remove("is-open");
});

new WOW().init();