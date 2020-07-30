const getTotalscolumn = () => document.querySelector('#totals-column');

const cartShow = () => {
	fetch(currentCartUrl)
	.then(resp => resp.json())
	.then(data => {
		renderCartItems(data.items)
		renderCartTotals(data.totals);
	})
}

	const checkoutButtonRow = createElem("button", {textContent: "Checkout", className: "row btn btn-secondary btn-lg checkout-button"} )


const totalsRow = (word, number, id, extraClass = "") => {
	const row = createElem('div', {className: `row totals-row ${extraClass}`, id: id})
	const wordSpan = createElem('span', {className: 'word', textContent: word})
	const numberSpan = createElem('span', {className: 'number', textContent: `$${number}`})
	row.append(wordSpan, numberSpan)
	return row
}

const renderCartTotals = (totalsObj) => {
	totalsCol = getTotalscolumn()
	const priceRow = totalsRow("Total:", totalsObj.total, "total")
	const taxRow = totalsRow("Taxes & Fees:", totalsObj.tax, "taxes")
	const subtotalRow = totalsRow("SUBTOTAL:", totalsObj.total_with_tax, "subtotal", "subtotal")
	totalsCol.append(priceRow, taxRow, subtotalRow,checkoutButtonRow)
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
		
		let deleteButton = createElem("button", {textContent: "x", className: 'bi bi-x delete-cart-item'})
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
		removeCartItem(data.deleted_item)
		updateCartTotals(data.cart_totals)
	})
	.catch(error => console.log(error))
}

const updateCartTotals = (cartTotals) => {
	total = document.querySelector("#total span.number")
	taxes = document.querySelector("#taxes span.number")
	subtotal = document.querySelector("#subtotal span.number")
	total.textContent = `$${cartTotals.total}`
	taxes.textContent = `$${cartTotals.tax}`
	subtotal.textContent = `$${cartTotals.total_with_tax}`
}

const getCartItem = (id) => document.querySelector(`div[data-id="${id}"]`)

const removeCartItem = (id) => {
	cartItem = getCartItem(id)
	cartItem.remove()
	getCartQty()
}

const getCartQty = () => {
	fetch(currentCartUrl+'/item_qty')
	.then(response => response.json())
	.then(data => {
		updateCartQty(data)
	})
	.catch(error => console.log(error))
		
}

checkoutButtonRow.addEventListener('click', e => {
	checkoutButtonRow.classList.add('spinning');
	checkoutButtonRow.innerHTML = ""
	setTimeout(function(){
		destroyCurrentPage()
		loadConfirmationPage()
	}, 6000)
	
})


