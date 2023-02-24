

const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light');
});

const updatesBtn = document.querySelector('.update');

updatesBtn.addEventListener('click', () => {
    alert(`Recent Updates
    1) Added Auto Scrolling feature.
    2) Add a button to change Theme (Dark/White)
    3) Added a side Nav (Under development)`)
});




// 

const shareBtn = document.querySelector(".share-btn");
const shareModal = document.querySelector(".share-popup");
const closeBtn = document.querySelector(".close-btn");

shareBtn.addEventListener("click", function () {
  shareModal.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  shareModal.style.display = "none";
});

shareModal.addEventListener('click' ,()=>{
    document.body.classList.toggle('active')
})



// 

const copyLinkBtn = document.querySelector('.copy-link-btn');
const shareLink = document.querySelector('#share-link');

copyLinkBtn.addEventListener('click', () => {
  shareLink.select();
  document.execCommand('copy');
  copyLinkBtn.innerText = 'Link Copied!';
  setTimeout(() => {
    copyLinkBtn.innerText = 'Copy Link';
  }, 5000);
});




// Clear screen

document.addEventListener('DOMContentLoaded', () => {
  const chatIcon = document.querySelector('.nav-btn-plus');
  chatIcon.addEventListener('click', () => {
    // Reset the chat history
    const chatContainer = document.querySelector('#chat_container');
    chatContainer.innerHTML = '';
  });
});


// 
const ratingBtn = document.querySelector('.rating-btn');
const ratingPopup = document.querySelector('.rating-popup');
const stars = ratingPopup.querySelectorAll('.stars i');
const textarea = ratingPopup.querySelector('.feedback');
const submitBtn = ratingPopup.querySelector('.submit-btn');
const closeBtn2 = ratingPopup.querySelector('.close-btn');
const thankYouPopup = document.querySelector('.thank-you-popup');
const closeThankYouBtn = thankYouPopup.querySelector('.close-btn');

ratingBtn.addEventListener('click', () => {
  ratingPopup.style.display = 'block';
});

stars.forEach((star) => {
  star.addEventListener('click', () => {
    const rating = parseInt(star.getAttribute('data-rating'));

    for (let i = 0; i < rating; i++) {
      stars[i].classList.remove('far');
      stars[i].classList.add('fas');
    }

    for (let i = rating; i < stars.length; i++) {
      stars[i].classList.remove('fas');
      stars[i].classList.add('far');
    }
  });
});



submitBtn.addEventListener('click', () => {

  try{
      // Get the rating and feedback
      const rating = ratingPopup.querySelector('.fas').getAttribute('data-rating');
      const feedback = textarea.value;

      // Hide the rating popup and show the "Thank You" popup
      ratingPopup.style.display = 'none';
      thankYouPopup.style.display = 'block';

      // Reset the stars and feedback field in the rating popup
      stars.forEach((star) => {
        star.classList.remove('fas');
        star.classList.add('far');
      });
      textarea.value = '';
  }

  catch(error){
    alert("Please rate some stars !")
  }
  
});

closeBtn2.addEventListener('click', () => {
  ratingPopup.style.display = 'none';
});

closeThankYouBtn.addEventListener('click', () => {
  thankYouPopup.style.display = 'none';
});
