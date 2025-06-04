//faq

let faqs = [...document.querySelectorAll('.faq')];

faqs.map(faq=> {
    let ques = faq.querySelector('.question-box')

    ques.addEventListener('click', () => {
        faq.classList.toggle('active');
    })
})