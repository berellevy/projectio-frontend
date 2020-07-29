document.addEventListener('DOMContentLoaded', (e) => {
  const main = () => document.querySelector('main');
  const homeButton = document.querySelector('#index-page')
  const cartButton = document.querySelector('#cart-page')
	
  	homeButton.addEventListener('click', e => {
      destroyCurrentPage()
      loadIndexPage()
    })	

    cartButton.addEventListener('click', e => {
      destroyCurrentPage()
      cartShow()
    })
    
    const destroyCurrentPage = () => {
      main().querySelectorAll('*').forEach(n => n.remove());

    }
    
    loadIndexPage()
    goToItemHandler()
    addToCartHandler()
    deleteItemFromCartHandler()


    // destroyIndexPage()
    // itemShow(101)
})

