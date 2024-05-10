import * as back from '../server/server.js';

const boxes = document.querySelectorAll('.box');

boxes.forEach(box=>{
    box.addEventListener('click', ()=>{
        box.classList.toggle("flipped");
    })
})

