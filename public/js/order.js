class Pizza {
    constructor(id, extras) {
        this.id = id
        this.extras = extras
    }
}

const pizzasArray = []

const totalPriceHTML = document.getElementById('total-price')
let totalPrice = Number(totalPriceHTML.innerText)

const pizzas = document.getElementsByClassName('pizza-element')

for (const e of pizzas) {
    const pizza = new Pizza(e.id, [])
    pizzasArray.push(pizza)
    const checkboxes = e.getElementsByClassName('extra-checkbox')
    const priceHTML = e.getElementsByClassName('order-pizza-price')[0]
    let price = Number(priceHTML.innerText)

    for (const c of checkboxes) {
        const checkbox = c.children[0]
        const extraPrice = Number(c.children[1].getElementsByClassName('order-i-price')[0].innerText)
        const extraName = c.children[1].getElementsByClassName('extra-name')[0].innerText
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                price += extraPrice
                totalPrice += extraPrice
                
                pizza.extras.push(extraName)
            } else {
                price -= extraPrice
                totalPrice -= extraPrice
                pizza.extras = pizza.extras.filter(i => i != extraName)
            }

            priceHTML.innerText = price
            totalPriceHTML.innerText = totalPrice
        })
    }
}

const orderForm = document.getElementById('order-form')
orderForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const fieldAddress = document.getElementById('user-address').value
    const fieldPhone = document.getElementById('user-phone').value
    const requestBody = {
        address: fieldAddress,
        phone: fieldPhone,
        pizzas: pizzasArray
    }

    // send to pay
    console.log(requestBody)

    window.location.href = '/comment'
})