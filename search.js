const addSearchButtonHandler = () => {
    const submit = navSearchButton()
    submit.addEventListener('click', searchButtonOnClick)
}

const searchButtonOnClick = (e) => {
    e.preventDefault()
    const input = navSearchInput().value
     if (input !== "") {
         fetch(searchUrl + input)
         .then(response => response.json())
         .then(data => {
             destroyCurrentPage()
             renderItems(data)
         })
         .catch(error => console.log(error))
         
     }

}