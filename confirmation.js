	const outerDiv = createElem('div')
	const confirmationMessage = createElem('div', {className:'container confirmation-message' })
	const confirmationCheckOutline = createElem('div', {className:'row'})
	const orderSummary = createElem('div', {className: "container"})
	
	const orderSummaryRow = createElem('div', {className: "row"})
	const header = createElem('h4', {className: 'col-sm-12', innerText: 'Order Summary'})

orderSummary.append(header)

const loadConfirmationPage = () => {
getCartData() 
createConfirmationMessage()
}

const getCartData = () => {
	fetch(currentCartUrl)
	.then(resp => resp.json())
	.then(data => {
		renderConfirmItems(data.items)
		createProductTotals(data.totals);
	})
}

const renderConfirmItems = (items) => {
	items.forEach(item => createOrderSummary(item))

}

const createConfirmationMessage = () => {
	const checkMark = createElem("div", {innerHTML: `<svg width="5em" height="5em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  	<path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
		</svg>`, className: 'col col-sm-12 checkmark'})
	confirmationCheckOutline.append(checkMark)
	const weveRecievedOrder = createElem('h1', {className:"col col-sm-12" , innerHTML: `We've Recieved Your Order`})
	//append all to here 
	const confirmationNumber = createElem('h4', {className: "col col-sm-12", innerHTML: `confirmation number: ${Math.floor(Math.random() * 100000)}`})
	confirmationMessage.append(confirmationCheckOutline, weveRecievedOrder, confirmationNumber)
	outerDiv.append(confirmationMessage)
	main().append(outerDiv)

	createOrderSummary()
}

const createOrderSummary = (item) => {

	const productsRow = createElem('div', {className: 'col-sm-12'})
	const productImageCol = createElem('img', {className: 'col-sm-2 img-summary', src: `${item.image1}`})
	const productDescriptionCol = createElem('div', {className: 'col-sm-9'})
	const productDescriptionRow = createElem('div', {className:'row'})
	const productDescriptionInnerColumn = createElem('div', {className: 'col-sm-12', innerHTML: `<h5> ${item.name} </h5>`})
	const productDescriptionInnerColumn2 = createElem('div', {className: 'col-sm-12', innerHTML: `qty: ${item.quantity}`})
	const productPriceColumn = createElem('div', {className: 'col-lg-2', textContent: `$${item.price}`})
	productDescriptionRow.append(productDescriptionInnerColumn, productDescriptionInnerColumn2)
	productDescriptionCol.append(productDescriptionRow)
	// productPriceRow.append(productDescriptionRow)

	productsRow.append(productImageCol, productDescriptionCol, productPriceColumn)

	orderSummaryRow.append(productsRow)
	orderSummary.append(orderSummaryRow)
	main().append(orderSummary)


}

// const createProductTotals = (item) => {
// 	console.log(item)
	
// 	const productTotalsContainer = createElem('div', {className:"container"})
// 	const productTotalsRow = createElem('div', {className:"row"})
// 	const totalRow = createElem('div', {className:"col-sm-12"})
// 	const totalName = createElem('div', {className: "col col-sm-2", innerHTML: `${item.total}`})
// 	const totalDottedLine = createElem('div', {className: "col col-sm-8", innerHTML: `.................................`})
// 	const totalPrice = createElem('div', {className: "col col-sm-2", innerHTML: `${item.price}`})

// 	totalRow.append(totalName)
// 	productTotalsRow.append(totalRow)
// 	productTotalsContainer.append(productTotalsRow)

// 	main().append(productTotalsContainer)

// }


const createProductTotals = (totalsObj) => {
	totalsCol = getTotalscolumn()

	const productTotalsContainer = createElem('div', {className:"container"})

	const priceRow = totalsRow("Total:", totalsObj.total, "total")
	const taxRow = totalsRow("Taxes & Fees:", totalsObj.tax, "taxes")
	const subtotalRow = totalsRow("SUBTOTAL:", totalsObj.total_with_tax, "subtotal", "subtotal")
	productTotalsContainer.append(priceRow, taxRow, subtotalRow)
	main().append(productTotalsContainer)
}


// const renderConfirmItem = (item) => {
// 	console.log(item)

// }



	// const confirmationBodyColumn = createElem('div', {className:'col col-sm-12'})

	// confirmationBodyColumn.innerHTML = `Hi, Your Items • ${item.name} have been confirmed`
	// confirmationBodyRow.append(confirmationBodyColumn)
	// confirmationContainer.append(confirmationBodyRow)
	// outerDiv.append(confirmationContainer)
	// main().append(outerDiv)