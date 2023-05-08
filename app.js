const grid = document.querySelector(".grid");
const eraser = document.querySelector(".eraserBtn");
const clearbutton = document.querySelector(".clearBtn");
const changeSize = document.querySelector(".gridBtn");
const colorWindow = document.querySelector(".colorWindow");
const rainbowButton = document.querySelector(".rainbowBtn");

let color = colorWindow.value;
let mouseClick = false;
let rainbow = false;
let eraserOn = false;


document.body.onmousedown = () => {mouseClick = true}
document.body.onmouseup = () => {mouseClick = false}

start();

function start(){
 
   rainbowButton.addEventListener('click',function(e){
      if(rainbow == true){
         rainbow = false;
         rainbowButton.classList.remove("focus");
      }
      else{
         rainbow = true;
         eraserOn = false;
         rainbowButton.classList.add("focus");
         eraser.classList.remove("focus");
      }
   })

   changeSize.addEventListener('click',function(e){
      changeGrid();
   })

   eraser.addEventListener('click',function(e){
     
      if(eraserOn == true){
         eraser.classList.remove("focus");
         eraserOn = false;
      }
      else{
         eraserOn = true;
         rainbow = false;
         eraser.classList.add("focus");
         rainbowButton.classList.remove("focus");

      }
   })

   clearbutton.addEventListener('click',function(e){
      clear();
   })
   createGrid(256);
}

function changeColor(e){  
   color = colorWindow.value;
   if(e.type === "mouseover" && !mouseClick){return}
   if(rainbow == true){
      color = RGB2HTML(getRandomNumber(0,256),getRandomNumber(0,256),getRandomNumber(0,256));
   }else if(eraserOn == true){
      color = '#ffffff';
   }
      e.target.style.backgroundColor = color;
   
}
function createGrid(pixels){
   for(let i = 0; i < pixels; i++){
      let newDiv = document.createElement('div');
      newDiv.id = 'pixel'+i;
      newDiv.classList.add("pixel");
      newDiv.addEventListener("mouseover", changeColor)
      newDiv.addEventListener("mousedown", changeColor)
      grid.appendChild(newDiv);
   }
}

function changeGrid(){

   let size = prompt("Please enter size of the grid, Max 100", 1);
   while(size > 100){
      size = prompt("Please enter number columns, Max 100" , 1);
   }
   
   let numberOfpixels = size * size;
   grid.style.gridTemplateColumns = `repeat(${size},1fr)`;
   grid.style.gridTemplateRows = `repeat(${size},1fr)`;

   const pixels = document.querySelectorAll(".pixel");

   pixels.forEach((e) => e.parentNode.removeChild(e));
   createGrid(numberOfpixels);
   color = colorWindow.value
}

function clear(){
   eraserOn = false;
   rainbow = false;
   eraser.classList.remove("focus");
   rainbowButton.classList.remove("focus");
   const divs = document.querySelectorAll(".pixel");
   divs.forEach(div => {
      div.style.backgroundColor = "#ffffff";
   });
   color = colorWindow.value;
}

const getRandomNumber  = (min,max)=>{
   number = Math.floor(Math.random() * (max - min) + min);
   return number;
} 
const RGB2HTML = (red,green,blue) =>{
   var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
   return '#'+decColor.toString(16).substr(1);
}

