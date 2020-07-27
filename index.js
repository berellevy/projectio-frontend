baseUrl = 'http://localhost:3000'


const loadIndexPage = () => {
	const indexDiv = document.createElement('div');
	indexDiv.id = 'index'
	const main = document.querySelector('main');
	main.append(indexDiv)

	const indexPage = () => {
		fetch(`${baseUrl}/items`)
		.then(resp => resp.json())
		.then(items => renderItems(items))
	}
	
	
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
		indexDiv.append(itemCard)
	}
	indexPage()
}


const destroyIndexPage = () => {
	const indexDiv = document.querySelector('#index');
	indexDiv.remove()
}

