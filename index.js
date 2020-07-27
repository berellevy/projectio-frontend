baseUrl = 'http://localhost:3000'
const itemsContainer = document.querySelector('.items-container')

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    fetch(`${baseUrl}/items`)
    .then(resp => resp.json())
    .then(items => renderItems(items))

    const renderItems = (items) => {
    	items.forEach(item => renderItem(item))
    }

    const renderItem = (item) => {
    	const itemCard = document.createElement('div')
    	itemCard.className = 'item-card'
    	const itemName = document.createElement('h1')
    	itemName.textContent = `${item.name}`
    	const image1 = document.createElement('img')
    	image1.src = `${item.image1}`

    	itemCard.append(itemName, image1)
    	itemsContainer.append(itemCard)
    }

});
