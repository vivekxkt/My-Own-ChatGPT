

const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light');
});
