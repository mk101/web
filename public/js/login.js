const form = document.getElementById('login-form')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const login = document.getElementById('user-login').value
    const password = document.getElementById('user-password').value

    const body = {
        login: login,
        password: password
    }

    fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        if (res.status === 200) {
            window.location.href = '/'
            return
        }
        
        res.json().then(data => {
            const message = data.message
            document.getElementById('form-error').innerText = message
        })
    })
})