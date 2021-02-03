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