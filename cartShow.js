const getTotalscolumn = () => document.querySelector('#totals-column');

const cartShow = () => {
	fetch(currentCartUrl)
	.then(resp => resp.json())
	.then(data => {
		renderCartItems(data.items)
		renderCartTotals(data.totals);
	})
}



const totalsRow = (word, number, extraClass = "") => {
	const row = createElem('div', {className: `row totals-row ${extraClass}`})
	const wordSpan = createElem('span', {className: 'word', textContent: word})
	const numberSpan = createElem('span', {className: 'number', textContent: `$${number}`})
	row.append(wordSpan, numberSpan)
	return row
}

const renderCartTotals = (totalsObj) => {
	totalsCol = getTotalscolumn()
	const priceRow = totalsRow("Price:", totalsObj.total)
	const taxRow = totalsRow("Taxes & Fees:", totalsObj.tax)
	const subtotalRow = totalsRow("SUBTOTAL:", totalsObj.tax, "subtotal")
	totalsCol.append(priceRow, taxRow, subtotalRow)
}



const renderCartItems = (items) => {
	const itemRowsContainer = createElem('div', {className: "container"}) 
	const bigRow = createElem("div", {className: "row"})
	const itemsColumn = createElem("div", {className: "col col-sm-9"})
	const totalsColumn = createElem("div", {className: "col col-sm-3", id: 'totals-column'})
	
	bigRow.append(itemsColumn, totalsColumn)
	itemRowsContainer.append(bigRow)
	main().append(itemRowsContainer)
	
	items.forEach(item => {
		itemCard = createCartItem(item)
		itemsColumn.append(itemCard)
		})
}


 	const createCartItem = (item) => {
		let cartItemDiv = createElem('div', {className: 'row cart-show-card'}, {id: item.id})

		let imageDiv = createElem("div", {className: "col col-sm-4"})
		let cartItemImage = createElem('img', {src: ` ${item.image1}`})
		imageDiv.append(cartItemImage)

		let cartItemName = createElem('h5', {textContent: item.name})
		let nameCol = createElem("div", {className: "col col-sm-3 cart-row-text"})
		nameCol.append(cartItemName)

		let cartItemQuantity = createElem("h5", {textContent: `Qty: ${item.quantity}`})
		let qtyCol = createElem("div", {className: "col col-sm-2 cart-row-text"})
		qtyCol.append(cartItemQuantity)

		let cartItemPrice = createElem("h5", {textContent: `$${item.price}`})
		let priceCol = createElem("div", {className: "col col-sm-2 cart-row-text"})
		priceCol.append(cartItemPrice)
		
		let deleteButton = createElem("button", {innerText: "x", className: 'bi bi-x delete-cart-item'})
		let deleteCol = createElem("div", {className: "col col-sm-1"})
		deleteCol.append(deleteButton)

 		// let deleteCartItembutton = createElem('button', {textContent: "delete"})
 		cartItemDiv.append(imageDiv, nameCol, qtyCol, priceCol, deleteCol)
		return cartItemDiv
	} 


const deleteCartItem = (id) => {
	patchData = {item_id: id}
	fetch(currentCartUrl+'/delete_item', {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
			"response": "application/json"
		},
		body: JSON.stringify(patchData)
	})
	.then(response => response.json())
	.then(data => {
		console.log(data)
		destroyCurrentPage()
		cartShow()
	})
	.catch(error => console.log(error))
}