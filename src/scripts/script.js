const filter = document.querySelector('select')
const result = document.querySelector('.result')
const startBtn = document.querySelector('.start')
const clearBtn = document.querySelector('.clearAll')

let url = 'https://www.boredapi.com/api/activity/'
const types = ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork']

function fillMenu(data) {
   let str = ''
   data.forEach(el => (str += `<option value="${el}">${el}</option>`))
   filter.innerHTML += str
}
fillMenu(types)

function render(data) {
   const item = document.createElement('div')
   item.classList.add('item')
   item.appendChild(document.createElement('p'))
   item.appendChild(document.createElement('p'))
   item.children[0].textContent = data.activity
   item.children[1].textContent = data.type
   result.insertAdjacentHTML('afterbegin', item.outerHTML)
}

function request(url) {
   const placeholder = document.createElement('div')
   placeholder.classList.add('placeholder')
   placeholder.appendChild(document.createElement('p'))
   placeholder.appendChild(document.createElement('p'))
   result.insertAdjacentHTML('afterbegin', placeholder.outerHTML)

   fetch(url)
      .then(response => response.json())
      .then(data => render(data))
      .then(() => {
         document.querySelector('.placeholder').remove()
         clearBtn.classList.remove('disabled')
      })
      .catch(err => console.log(err))
}

filter.onchange = event => {
   event.target.value === 'all'
      ? (url = 'https://www.boredapi.com/api/activity/')
      : (url = `https://www.boredapi.com/api/activity/?type=${event.target.value}`)
}

startBtn.onclick = () => {
   request(url)
}

clearBtn.onclick = () => {
   const items = document.querySelectorAll('.item')
   items.forEach(el => {
      el.classList.add('removing')
      el.addEventListener('animationend', () => el.remove())
   })
   clearBtn.classList.add('disabled')
}
