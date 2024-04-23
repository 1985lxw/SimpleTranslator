const toggleSwitch = document.getElementById("switch");
const inputTextbox = document.getElementById("input-textbox");
const outputTextbox = document.getElementById("output-textbox");

toggleSwitch.addEventListener('click', () => {
  // Toggle background color between pink and black
  document.body.style.backgroundColor = document.body.style.backgroundColor === 'pink' ? 'black' : 'pink';
});
// toggleSwitch.addEventListener('click', () => {
//     const label = document.querySelector('label');
//     label.textContent = label.textContent === '🎀' ? '💀' : '🎀';
//   });

inputTextbox.addEventListener("input", ()=>{
  outputTextbox.value = inputTextbox.value;
})
