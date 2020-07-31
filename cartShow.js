const getTotalscolumn = () => document.querySelector('#totals-column');

const cartShow = () => {
	fetch(currentCartUrl)
	.then(resp => resp.json())
	.then(data => {
		renderCartItems(data.items)
		renderCartTotals(data.totals);
	})
}

	const makeCheckoutButtonRow = () => createElem("button", {textContent: "Checkout", className: "row btn btn-secondary btn-lg checkout-button"} )
	const getCheckoutButtonRow = () => document.querySelector('checkout-button');

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
	totalsCol.append(priceRow, taxRow, subtotalRow,makeCheckoutButtonRow())
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
		
		let deleteButton = createElem("button", {innerHTML: `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  		<path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"/>
		</svg>`, className: 'bi bi-x delete-cart-item'})
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

document.addEventListener('click', e => {
	const t = e.target
	if (t.classList.contains('checkout-button')) {
		console.log(t);
		
		t.innerHTML = ""
		t.style.backgroundColor = "white"
		
		const spinnerBorder = createElem('div')
		spinnerBorder.className ="spinner-border spinner-border-lg"
		spinnerBorder.innerHTML = `<span role="status"></span>`
		// const spinnerSpan = createElem('span', {className: "sr-only", innerHTML:`Loading...`})
		t.append(spinnerBorder)
		
		
		
		setTimeout(function(){
			loadConfirmationPage()
			t.remove()
			getTotalscolumn().append(makeCheckoutButtonRow())
		}, 2200)
		
	}
})


