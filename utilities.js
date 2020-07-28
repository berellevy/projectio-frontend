baseUrl = 'http://localhost:3000'
itemsUrl = baseUrl+'/items'
const main = document.querySelector('main');
const homeButton = document.querySelector('#index-page')

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