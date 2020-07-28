const itemShow = (id) => {
	fetch(`${itemsUrl}/${id}`)
	.then(resp => resp.json())
	.then(item => renderItem(item))
}  

const renderItem = (item) => {
	let itemDiv = createElem('div', {className: 'itemShowCard'})
	let itemName = createElem('h1', {textContent: item.name})
	let itemImage1 = createElem('img', {src: item.image1})
	let itemImage2 = createElem('img', {src: item.image2})
	let itemDescription = createElem('p', {textContent: item.description})
	let itemPrice = createElem('p', {textContent: `$${item.price}`})
	let addToCart = createElem('button', {textContent: "Add To Cart"})
	itemDiv.append(itemName, itemImage1, itemPrice,itemDescription, addToCart)
	// itemDiv.append(itemImage2)
	main.append(itemDiv)

	// console.log(item)
}



// {id: 101, name: "Small Iron Bench", price: 531, description: "Intelligentsia polaroid kale chips seitan austin. …writer lumbersexual neutra. Listicle offal retro.", image1: "https://pixabay.com/get/55e0d3474a56a414f1dc8460962930781037dbed574c704c7c2a72d09349c350_640.jpg", …}
