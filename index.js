// baseUrl = 'http://localhost:3000'


const loadIndexPage = () => {
	const indexDiv = document.createElement('div');
	indexDiv.id = 'index'
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
		const itemCard = createElem('div', {className: 'item-card'}, {itemId: item.id})
		const itemName = createElem('h1', {textContent: item.name})
		itemCard.append(itemName)
		indexDiv.append(itemCard)
	}

	const goToItem = () => {
		document.addEventListener('click', event => {
			// console.dir(event)
			const itemCard = event.target.closest('.item-card')
			if (itemCard) {
				destroyIndexPage()
				itemShow(itemCard.dataset.itemId)
			}
		})
	}

	const destroyIndexPage = () => {
		const indexDiv = document.querySelector('#index');
		indexDiv.remove()
	}

	indexPage()
	goToItem()
}



		// const itemCard = document.createElement('div')
		// itemCard.className = 'item-card'
		// const itemName = document.createElement('h1')
		// itemName.textContent = `${item.name}`
		// const image1 = document.createElement('img')
		// image1.src = `${item.image1}`
		// itemCard.append(itemName, image1)
		// indexDiv.append(itemCard)