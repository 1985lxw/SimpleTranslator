const toggleSwitch = document.getElementById("switch");

toggleSwitch.addEventListener('click', () => {
  // Toggle background color between pink and black
  document.body.style.backgroundColor = document.body.style.backgroundColor === 'pink' ? 'black' : 'pink';
});
// toggleSwitch.addEventListener('click', () => {
//     const label = document.querySelector('label');
//     label.textContent = label.textContent === '🎀' ? '💀' : '🎀';
//   });