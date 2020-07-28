const cartShow = () => {
	console.log("hello")
	fetch(currentCartUrl)
	.then(resp => resp.json())
	.then(items => renderCartItems(items))
}

 	const renderCartItems = (items) => {
 		console.log(items)
 		items.forEach(item => renderCartItem(item))
 	}

 	const renderCartItem = (item) => {
 		// console.log(item)
 		let cartItemDiv = createElem('div', {className: 'cart-show-card'})
 		let cartItemName = createElem('h1', {textContent: item.name})
 		let cartItemPrice = createElem('p', {textContent: `price ${item.price}`})
 		let cartItemQuantity = createElem('p', {textContent: `quantity ${item.quantity}`})
 		let cartItemtotalPrice = createElem('p', {textContent: `total price ${item.price * item.quantity}`})
 		let cartItemImage = createElem('img', {src: ` ${item.image1}`})
 		let deleteCartItembutton = createElem('button', {textContent: "delete"})
 		let cartItemQuantitySelector = createElem('select')
 		let cartItemQuantityOption1 = createElem('option', {innerHTML: 1}) 		
 		let cartItemQuantityOption2 = createElem('option', {innerHTML: 2}) 		
 		let cartItemQuantityOption3 = createElem('option', {innerHTML: 3}) 		
 		let cartItemQuantityOption4 = createElem('option', {innerHTML: 4}) 
 		cartItemQuantitySelector.append(cartItemQuantityOption1,cartItemQuantityOption2, cartItemQuantityOption3,cartItemQuantityOption4)
 		cartItemDiv.append(cartItemName, cartItemImage, cartItemPrice, cartItemQuantity, cartItemtotalPrice, deleteCartItembutton, cartItemQuantitySelector)
 		main().append(cartItemDiv)
 	} 

// <select name="cars" id="cars">
//   <option value="volvo">Volvo</option>
//   <option value="saab">Saab</option>
//   <option value="mercedes">Mercedes</option>
//   <option value="audi">Audi</option>
// </select>
