const toggleSwitch = document.getElementById("switch");

toggleSwitch.addEventListener('click', () => {
  document.body.style.backgroundColor = document.body.style.backgroundColor === 'pink' ? 'black' : 'pink';
});
