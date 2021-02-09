document.addEventListener('click', (e) => {
    if (e.target.closest('.scrollTo') && !e.target.parentNode.classList.contains('active')) {
        let target = e.target
        window.scrollBy({
            top: document.querySelector(`.${target.dataset.section}`).getBoundingClientRect().top,
            behavior: 'smooth'
        })
        if (target.closest('.points')) {
            target.closest('.points').querySelector('.active').classList.remove('active')
            target.parentNode.classList.add('active')
        }
    }
})
feedbackForm.onsubmit = (e) => {
    e.preventDefault()
    const showMessage = (message, color) => {
        let  modal = document.querySelector('.modal')
        modal.classList.add('active')
        modal.querySelector('p').style.color = color
        modal.querySelector('p').innerHTML = message
        modal.onclick = (e) => {
            if (e.target === modal || e.target.closest('.close')) modal.classList.remove('active')
        }
    }
    fetch('/submit', {
    // fetch('https://my-json-server.typicode.com/andreypost/db/posts', {
        // fetch(`[https://randomuser.me/api/?results=${10}]`, {
        method: 'POST',
        body: new FormData(feedbackForm)
    })
        .then(response => {
            if (response.ok) {
                showMessage('Мы с вами свяжемся в ближайшее время!', '#333333')
            } else {
                showMessage('Сейчас невозможно отправить Ваши данные, попробуйте позже!', '#FF645F')
            }
        })
        .catch(console.error())
    feedbackForm.reset()
}