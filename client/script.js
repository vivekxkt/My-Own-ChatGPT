import bot from './assets/bot.svg';
import user from './assets/user.svg';



const form = document.querySelector('form');
const chatConatiner = document.querySelector('#chat_container');


let loadInterval;

// Message loader (Three dots)

function loader(element){
    element.textContent  = '';

    loadInterval = setInterval(() => {
      element.textContent +='.';
      
      if(element.textContent ==='....'){
        element.textContent = '';
      }
    }, 300)
} 



function typeText(element, text, callback) {
  let index = 0;
  const scrollInterval = 10;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;

      if (callback) {
        callback();
      }
    } else {
      clearInterval(interval);
    }
  }, 20);
  
  // Scroll to the bottom of the chat container every `scrollInterval` milliseconds
  let scrollIntervalId = setInterval(() => {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, scrollInterval);

  // Clear the scroll interval once the text has finished typing
  interval = setInterval(() => {
    if (index >= text.length) {
      clearInterval(scrollIntervalId);
    }
  }, 20);
}


function generateUniqueId(){

  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;

}



const chatContainer = document.getElementById('chat_container');



function scrollToBottom() {
  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: 'smooth'
  });
}


function smoothScroll() {
  const cosParameter = chatContainer.scrollHeight / 2;
  let scrollCount = 0;
  let scrollMargin;

  const interval = setInterval(() => {
    if (chatContainer.scrollTop !== chatContainer.scrollHeight - chatContainer.offsetHeight) {
      scrollCount = scrollCount + 1;
     
    } else {
      clearInterval(interval);
    }
  });
}



function chatStripe (isAi , value, uniqueId) {
  return(
    `
    <div class="wrapper ${(isAi && 'ai')}">
      <div class="chat">

        <div class="profile">
       <img src = "${isAi ? bot : user}"
             alt = "${isAi ? 'bot': 'user'}"
        />
        </div>

        <div class="message" id=${uniqueId}>${value}</div>

      
      </div>

    </div>

    
    `

    
  )
 

}


// ============================History ================================================

const chatHistory = [];


function handleBotResponse(sender, message) {
  const now = new Date();
  const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  chatHistory.push({ sender, message, timestamp });
//   console.log('Chathistory :', chatHistory);
  
}

const handleSubmit = async (e) =>{

  e.preventDefault();

  const data = new FormData(form);

   // Only add user's question to chat history

  const now = new Date();
  const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  chatHistory.push({ sender: 'You', message: data.get('prompt'),timestamp });

  // Users chatstripe

  chatConatiner.innerHTML += chatStripe(false,data.get('prompt'));

  form.reset();

  const uniqueId = generateUniqueId();
  chatConatiner.innerHTML+= chatStripe(true," ",uniqueId);

  chatConatiner.scrollTopv=chatConatiner.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv)

  // Scroll to the bottom of the chat container
  scrollToBottom();


  // fetch data from server 

  const response = await fetch('https://jack-bot-sexr.onrender.com', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        prompt: data.get('prompt')
    })
})

  clearInterval(loadInterval);
  messageDiv.innerHTML= '';

  if (response.ok){
    const data = await response.json();
    const parsedData = data.bot.trim();


    // Call the function to handle the bot's response
    handleBotResponse('JackBot', parsedData);


    typeText(
      messageDiv,
      parsedData,
      () => (chatContainer.scrollTop = chatContainer.scrollHeight)
    );

    smoothScroll();
  }
  else{
    const err =  await response.text();


    messageDiv.innerHTML = "Something went wrong";

    alert(err);
  }


}


form.addEventListener('submit',handleSubmit);
form.addEventListener('keyup', (e) =>{
  if(e.keyCode ===13){
    handleSubmit(e);
  }

})

const downloadBtn = document.querySelector('#history');

downloadBtn.addEventListener('click', () => {
  const chatHistory = getChatHistory();
  

  var confirm_msg = confirm("Would you like to download a copy of Chat History ?")

  
  if(confirm_msg == true){

    if (chatConatiner.innerHTML == ''){
      alert("Cannot download empty data !")
    }
    else{
      downloadChatHistory(chatHistory);
    }
   
  }
  
});

function getChatHistory() {
  
  return chatHistory.map(chat => `[ ${chat.timestamp} ]\n=> ${chat.sender}: ${chat.message} \n`).join('\n');
}

function downloadChatHistory(chatHistory) {
  const fileName = 'chat_history.txt';
  const fileContent = chatHistory;

  // Create a new Blob object
  const blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});

  // Create a link to the file
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;

  // Append the link to the document body
  document.body.appendChild(link);

  // Click the link to trigger the download
  link.click();

  // Remove the link from the document body after the download is complete
  document.body.removeChild(link);
}







