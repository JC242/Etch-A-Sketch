const grid = document.querySelector(".grid");
const eraser = document.querySelector(".eraser");
const clearbutton = document.querySelector(".clear");
const changeSize = document.querySelector(".changeButton");

let color = "black";

start();

function start(){
   changeSize.addEventListener('click',function(e){
      changeGrid();
   })

   eraser.addEventListener('click',function(e){
      erase();
   })

   clearbutton.addEventListener('click',function(e){
      clear();
   })
   createGrid(256);
}

function createGrid(pixels){
   for(let i = 0; i < pixels; i++){
      let newDiv = document.createElement('div');
      newDiv.id = 'pixel'+i;
      newDiv.classList.add("pixel");
      newDiv.addEventListener("mouseover",function(e){
         newDiv.style.backgroundColor = color;
      })
      grid.appendChild(newDiv);
   }
}

function changeGrid(){

   let colums = prompt("Please enter number columns, Max 100", 1);
   while(colums > 100){
      colums = prompt("Please enter number columns, Max 100" , 1);
   }
   let rows = prompt("Please enter number of rows, Max 100",1);
   while(rows > 100){
      rows = prompt("Please enter number of rows, Max 100",1);
   }
   let numberOfpixels = colums * rows;
   grid.style.gridTemplateColumns = `repeat(${colums},1fr)`;
   grid.style.gridTemplateRows = `repeat(${rows},1fr)`;

   const pixels = document.querySelectorAll(".pixel");

   pixels.forEach((e) => e.parentNode.removeChild(e));
   createGrid(numberOfpixels);
   color = 'black';
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

