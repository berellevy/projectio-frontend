// baseUrl = 'http://localhost:3000'


const loadIndexPage = () => {
	indexPage()
}



	const indexPage = () => {
		fetch(`${baseUrl}/items`)
		.then(resp => resp.json())
		.then(data => {
			renderItems(data.items)
		})
	}
	
	const createBootstrapRow = () => createElem('div', {className: 'row index-row'})
	
	const createItemCard = (itemData) => {
		const itemCard = createElem('div', {className: 'item-card col col-sm-3'}, {itemId: itemData.id})
		const imageDiv = createElem('div', {className: 'image-div'})
		const cardContentDiv = createElem('div', {className: 'card-content'})
		const image1 = createElem('img', {src: itemData.image1})
		imageDiv.append(image1)
		const itemName = createElem('h4', {textContent: itemData.name})
		const price = createElem('h5', {className: "item-price", textContent: `$${itemData.price}`})
		cardContentDiv.append(
			imageDiv,
			itemName,
			price
		)
		itemCard.append(cardContentDiv)
		return itemCard
	}
	
	const resultsQuantity = (num) => createElem("h3", {textContent: `Showing ${num} Items`})

	const renderItems = (items) => {
		const indexDiv = createElem('div', {id: "index", className: 'container'})
	 	main().append(indexDiv)
		const qtyHeader = resultsQuantity(items.length)
		indexDiv.prepend(qtyHeader)
		let bootstrapRow = createBootstrapRow()
		indexDiv.append(bootstrapRow)
		counter = 0
		items.forEach(item => {
			if (counter % 4 === 0) {
				bootstrapRow = createBootstrapRow()
				indexDiv.append(bootstrapRow)
			}
			itemCard = createItemCard(item)
			bootstrapRow.append(itemCard)
			counter ++
		})
	}



	