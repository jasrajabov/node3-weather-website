console.log('Client side js is loaded!')



        
const weatherForm       = document.querySelector('form')
const search            = document.querySelector('input')
const messageOne        = document.querySelector('#p-1')
const messageTwo        = document.querySelector('#p-2')

messageOne.textContent  = ''
messageTwo.textContent  = ''

weatherForm.addEventListener('submit', (e) =>  {
    e.preventDefault()
    const location = search.value
    const path = 'http://localhost:3000/weather?address='+location

    messageOne.textContent  = 'Loading...'
    messageTwo.textContent  = ''


    fetch(path).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        }
        else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})
