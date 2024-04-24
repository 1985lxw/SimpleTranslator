const toggleSwitch = document.getElementById("switch");
const title = document.getElementById("title");
const inputTextbox = document.getElementById("input-textbox");
const outputTextbox = document.getElementById("output-textbox");

toggleSwitch.addEventListener('click', () => {
  document.body.style.backgroundColor = document.body.style.backgroundColor === 'pink' ? 'black' : 'pink';
  title.style.color = document.body.style.backgroundColor === 'black' ? 'pink' : 'black';
});

inputTextbox.addEventListener("input", ()=>{
  outputTextbox.value = inputTextbox.value;
})

//Search bar
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

createHistoryBoxes();