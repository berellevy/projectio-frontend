document.addEventListener('DOMContentLoaded', (e) => {
  const main = () => document.querySelector('main');
  const homeButton = document.querySelector('#index-page')
		homeButton.addEventListener('click', e => {
      destroyCurrentPage()
      loadIndexPage()
    })	
    
    const destroyCurrentPage = () => {
      main().firstElementChild.remove()
    }
    
    loadIndexPage()


    // destroyIndexPage()
    // itemShow(101)
})
