const toggleSwitch = document.getElementById("switch");
const title = document.getElementById("title");
const inputTextbox = document.getElementById("input-textbox");
const outputTextbox = document.getElementById("output-textbox");
const gameColor = document.querySelector(".game_id");
const historyColor = document.querySelector(".history_id");
const translate_btn = document.querySelector(".translate-button");
const clear_btn = document.querySelector(".clear");
const bx_transfer = document.querySelector(".bx-transfer");

// Event listener for the toggle switch to change background color and title color
toggleSwitch.addEventListener('click', () => {
  document.body.style.backgroundColor = document.body.style.backgroundColor === 'pink' ? 'black' : 'pink';
  title.style.color = document.body.style.backgroundColor === 'black' ? 'pink' : 'black';
  gameColor.style.color = document.body.style.backgroundColor === 'black' ? 'pink' : 'black';
  historyColor.style.color = document.body.style.backgroundColor === 'black' ? 'pink' : 'black';
  
});

gameColor.addEventListener('mouseenter', () => {
  gameColor.style.color = 'rgb(218, 25, 225)';
  gameColor.style.textDecoration = 'underline';
});

gameColor.addEventListener('mouseleave', () => {  
  gameColor.style.color = document.body.style.backgroundColor === 'black' ? 'pink' : 'black';
  gameColor.style.textDecoration = 'none';
});

historyColor.addEventListener('mouseenter', () => {
  historyColor.style.color = 'rgb(218, 25, 225)';
  historyColor.style.textDecoration = 'underline';
});

historyColor.addEventListener('mouseleave', () => {
  historyColor.style.color = document.body.style.backgroundColor === "black" ? "pink" : "black";
  historyColor.style.textDecoration = 'none';
});


// Function to handle search bar functionality
function search_bar (){
  let input = document.getElementById('searchbar').value.toLowerCase();
  console.log(input);
}

// Switch between languages
bx_transfer.addEventListener("click", ()=>{
  const translateTo = document.querySelector(".translate-to").value;
  const translateFrom = document.querySelector(".translate-from").value;
  document.querySelector(".translate-from").value = translateTo;
  document.querySelector(".translate-to").value = translateFrom;
})

// API for translation
translate_btn.addEventListener("click", ()=>{
  let text = inputTextbox.value;
  let translateFrom = document.querySelector(".translate-from").value;
  let translateTo = document.querySelector(".translate-to").value;
  let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiURL).then(res=>res.json()).then(data=>{
    console.log(data);
    outputTextbox.value = data.responseData.translatedText;
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({
      text: text,
      translateFrom: translateFrom,
      translateTo: translateTo,
      translatedText: data.responseData.translatedText
    })
    localStorage.setItem("history", JSON.stringify(history));
  })
})