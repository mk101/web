const form = document.getElementById('comment-form')
const button = document.getElementById('save-button')
const buttonText = button.innerText

form.addEventListener('submit', (event) => {
    const name = document.getElementById('user-name').value
    const comment = document.getElementById('user-comment').value

    fetch('/api/v1/comments/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            comment: comment
        })
    }).then((response) => {
        if (!response.ok) {
            console.error('Fail to send comment. Code %d', response.status)
            return
        }

        button.classList.add('saved')
        button.innerText = 'Saved'
        button.disabled = true
        setTimeout(() => {
            button.classList.remove('saved')
            button.innerText = buttonText
            button.disabled = false
        }, 1000)
    })

    event.preventDefault()
})