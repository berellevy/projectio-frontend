baseUrl = 'http://localhost:3000'
itemsUrl = baseUrl+'/items'
cartsUrl = baseUrl+'/carts'
currentCartUrl = cartsUrl+'/41'


const main = () =>  document.querySelector('main');
const homeButton = () => document.querySelector('#index-page')
const addToCartButton = () => document.querySelector('#add-to-cart');


let createElem = (tag, args, data) => {
    let elem = document.createElement(tag)
        for (const property in args) {
            elem[property] = args[property]
        }
        for (const property in data) {
            elem.dataset[property] = data[property]
        }
    return elem
}

let destroyCurrentPage = () => {
    main().firstElementChild.remove()
}

const goToItemHandler = () => {
    document.addEventListener('click', event => {
        // console.dir(event)
        const itemCard = event.target.closest('.item-card')
        if (itemCard) {
            destroyCurrentPage()
            itemShow(itemCard.dataset.itemId)
        }
    })
}

const deleteItemFromCartHandler = () => {
    document.addEventListener('click', event => {
        if (event.target.classList.contains("delete-cart-item")) {
            const cartShowCard = event.target.closest('.cart-show-card')
            const itemId = cartShowCard.dataset.id
            deleteCartItem(itemId)
        }
    })
}

