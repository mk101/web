const blocks = document.getElementsByClassName('pizza-block')
const orderButton = document.getElementsByClassName('make-order')[0]

let ids = []

Array.from(blocks).forEach((b) => {
    b.addEventListener('click', () => {
        const id = b.children[0].alt

        if (b.classList.contains('selected')) {
            b.classList.remove('selected')
            ids = ids.filter(i => i != id)

            if (ids.length === 0) {
                orderButton.classList.add('hidden')
            }

            return
        }

        b.classList.add('selected')
        ids.push(id)
        if (orderButton.classList.contains('hidden')) {
            orderButton.classList.remove('hidden')
        }
    })
})

orderButton.addEventListener('click', () => {
    let str = ''
    ids.forEach(id => {
        str += id + ','
    })

    str = str.slice(0, -1)

    window.location.href = '/order?id=' + str
})
