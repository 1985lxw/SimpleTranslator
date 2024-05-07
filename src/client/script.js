const toggleSwitch = document.getElementById("switch");
const title = document.getElementById("title");
const inputTextbox = document.getElementById("input-textbox");
const outputTextbox = document.getElementById("output-textbox");
const gameColor = document.getElementsByClassName("game_id");
const historyColor = document.getElementsByClassName("history_id");

// Event listener for the toggle switch to change background color and title color
toggleSwitch.addEventListener('click', () => {
  document.body.style.backgroundColor = document.body.style.backgroundColor === 'pink' ? 'black' : 'pink';
  title.style.color = document.body.style.backgroundColor === 'black' ? 'pink' : 'black';
  gameColor.color = document.body.style.backgroundColor === 'black' ? 'pink' : 'black';
  historyColor.style.color = document.body.style.backgroundColor === 'black' ? 'pink' : 'black';
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

//History box
const historyItems = [
  { title: "History 1", content: "This is the content of History 1." },
  { title: "History 2", content: "This is the content of History 2." },
  { title: "History 3", content: "This is the content of History 3." }
];

function createHistoryBoxes() {
  const historyContainer = document.getElementById("historyContainer");

  // Iterate through each history item and create a history box
  historyItems.forEach(item => {
    const historyBox = document.createElement("div");
    historyBox.classList.add("history-box");

    const title = document.createElement("h2");
    title.textContent = item.title;

    const content = document.createElement("p");
    content.textContent = item.content;

    historyBox.appendChild(title);
    historyBox.appendChild(content);

    historyContainer.appendChild(historyBox);
  });
}

// Call the function to create history boxes when the page loads
createHistoryBoxes();