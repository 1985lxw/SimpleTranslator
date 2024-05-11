

const toggleSwitch = document.getElementById("switch");
const title = document.getElementById("title");
const inputTextbox = document.getElementById("input-textbox");
const outputTextbox = document.getElementById("output-textbox");
const gameColor = document.querySelector(".game_id");
const historyColor = document.querySelector(".history_id");

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

// Event listener for input textbox to update output textbox
inputTextbox.addEventListener("input", ()=>{
  outputTextbox.value = inputTextbox.value;
})

// Function to handle search bar functionality
function search_bar (){
  let input = document.getElementById('searchbar').value.toLowerCase();
  console.log(input);
}


// Call the function to create history boxes when the page loads

//commented out to avoid error
// createHistoryBoxes();


// Integrating back-end
// async function storeTranslationHistory() {
//   try {
//     const res = await fetch(url, {)
//   }
// }
