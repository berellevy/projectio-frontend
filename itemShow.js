const itemShow = (id) => {
	fetch(`${itemsUrl}/${id}`)
	.then(resp => resp.json())
	.then(item => renderItem(item))
}  

const renderItem = (item) => {
	let itemDiv = createElem('div', {className: 'container show-item-container'}, {itemId: item.id})
	let itemContent = createElem('div', {className: 'row'})
	let itemImage1 = createElem('img', {src: item.image1})
	let imageColumn = createElem('div', {className: 'col col-sm-8'})
	imageColumn.append(itemImage1)
	let itemName = createElem('h2', {textContent: item.name})
	let itemImage2 = createElem('img', {src: item.image2})
	let itemDescription = createElem('p', {textContent: item.description})
	let itemPrice = createElem('h4', {textContent: `$${item.price}`})
	let addToCart = createElem('button', {textContent: "Add To Cart", className: "btn btn-secondary btn-lg add-to-cart-button", id: "add-to-cart"})
	let infoColumn = createElem('div', {className: "col col-sm-4"})
	infoColumn.append(itemName, itemPrice,itemDescription, addToCart)
	itemContent.append(imageColumn, infoColumn )
	itemDiv.append(itemContent)
	// itemDiv.append(itemImage2)
	main().append(itemDiv)

	addButtonAnimation(addToCart)
	// console.log(item)
}

const addToCartHandler = () => {
	document.addEventListener('click', (e) => {
		target = e.target
		if (target.id === 'add-to-cart') {
			itemId = target.closest('.show-item-container').dataset.itemId
			addItemToCart(itemId)
			
		}
	})
} 

const addItemToCart = (id) => {
	patchData = {item_id: id}
	fetch(currentCartUrl+'/add_to_cart', {
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
		updateCartQty(data)
	})
	.catch(error => console.log(error))
}

const updateCartQty = (qty) => {
	qtySpan = document.querySelector('a#cart-page span')
	if (qty > 0) {
		qtySpan.textContent = qty
	} else {
		qtySpan.textContent = ""
	}
}

const addButtonAnimation = (button) => {
		button.addEventListener('mouseover', e => {
			button.classList.add("active")
			button.innerHTML = `Add To Cart ` 
		})
		button.addEventListener('mouseleave', e => {
			button.classList.remove("active")
		})
}


// {id: 101, name: "Small Iron Bench", price: 531, description: "Intelligentsia polaroid kale chips seitan austin. …writer lumbersexual neutra. Listicle offal retro.", image1: "https://pixabay.com/get/55e0d3474a56a414f1dc8460962930781037dbed574c704c7c2a72d09349c350_640.jpg", …}
