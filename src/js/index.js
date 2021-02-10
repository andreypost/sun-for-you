let  modal = document.querySelector('.modal')
document.addEventListener('click', (e) => {
    if (e.target.dataset.section && !e.target.parentNode.classList.contains('active')) {
        let target = e.target
        window.scrollBy({
            top: document.querySelector(`.${target.dataset.section}`).getBoundingClientRect().top,
            behavior: 'smooth'
        })
        if (target.closest('.points')) {
            target.closest('.points').querySelector('.active').classList.remove('active')
            target.parentNode.classList.add('active')
        }
    } else if (e.target === modal || e.target.closest('.close')) modal.classList.remove('active')
})
feedbackForm.onsubmit = (e) => {
    e.preventDefault()
    const showMessage = (message, color) => {
        // let  modal = document.querySelector('.modal')
        modal.classList.add('active')
        modal.querySelector('p').style.color = color
        modal.querySelector('p').innerHTML = message
        // modal.onclick = (e) => {
            // if (e.target === modal || e.target.closest('.close')) modal.classList.remove('active')
        // }
    }
    fetch('/submit', {
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