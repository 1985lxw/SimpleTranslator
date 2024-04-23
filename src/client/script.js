const toggleSwitch = document.getElementById("switch");
const title = document.getElementById("title");
const icon = document.getElementById("bx-transfer");
const inputTextbox = document.getElementById("input-textbox");
const outputTextbox = document.getElementById("output-textbox");

toggleSwitch.addEventListener('click', () => {
  document.body.style.backgroundColor = document.body.style.backgroundColor === 'pink' ? 'black' : 'pink';
  title.style.color = document.body.style.backgroundColor === 'black' ? 'pink' : 'black';
  icon.color = document.body.style.backgroundColor === 'black' ? 'pink' : 'black';
});

inputTextbox.addEventListener("input", ()=>{
  outputTextbox.value = inputTextbox.value;
})
