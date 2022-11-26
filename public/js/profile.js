const button = document.getElementById('save-button')
const buttonText = button.innerText

const form = document.getElementById('profile-form')
form.addEventListener('submit', event => {
    const address = document.getElementById('user-address').value
    const phone = document.getElementById('user-phone').value

    const body = {
        address: address,
        phone: phone
    }

    fetch('/api/v1/user/change', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        if (res.status == 200) {
            button.classList.add('saved')
            button.innerText = 'Saved'
            button.disabled = true
            setTimeout(() => {
                button.classList.remove('saved')
                button.innerText = buttonText
                button.disabled = false
            }, 1000)
        }
    })

    event.preventDefault()
})

const logout = document.getElementById('form-log-out')
logout.addEventListener('click', () => {
    fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((_) => {
        window.location.href = '/'
    })
})