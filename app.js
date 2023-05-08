const grid = document.querySelector(".grid");
const eraser = document.querySelector(".eraser");
const clearbutton = document.querySelector(".clear");

let color = "black";


function createGrid(){
   for(let i = 0; i < 256; i++){
      let newDiv = document.createElement('div');
      newDiv.id = 'pixel'+i;
      newDiv.classList.add("pixel");
      newDiv.addEventListener("mouseover",function(e){
         newDiv.style.backgroundColor = color;
      })
      grid.appendChild(newDiv);
   }
}

function start(){
   eraser.addEventListener('click',function(e){
      erase();
   })

   clearbutton.addEventListener('click',function(e){
      clear();
   })
   createGrid();
}

function erase(){
   if(color != 'white'){
      color = 'white';
   }
   else{
      color = 'black';
   }
}
function clear(){
   const divs = document.querySelectorAll(".pixel");
   divs.forEach(div => {
      div.style.backgroundColor = "white";
      color = "black";
   });
}

start();