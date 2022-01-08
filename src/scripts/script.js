const filter = document.querySelector('select')
const result = document.querySelector('.result')
const button = document.querySelector('button')

let url = 'http://www.boredapi.com/api/activity/'
const types = [
   'education',
   'recreational',
   'social',
   'diy',
   'charity',
   'cooking',
   'relaxation',
   'music',
   'busywork',
]

function fillMenu(data) {
   let str = ''
   data.forEach(el => (str += `<option value="${el}">${el}</option>`))
   filter.innerHTML += str
}
fillMenu(types)

function render(data) {
   result.innerHTML = `
         <p>${data.activity}</p>
         <p>${data.type}</p>
      `
}

function request(url) {
   result.innerHTML = `<div class='loader'></div>`

   fetch(url)
      .then(response => response.json())
      .then(data => render(data))
      .catch(err => console.log(err))
}

filter.onchange = event => {
   event.target.value === 'all'
      ? (url = 'http://www.boredapi.com/api/activity/')
      : (url = `http://www.boredapi.com/api/activity/?type=${event.target.value}`)
   request(url)
}

button.onclick = () => {
   request(url)
}
