const grid = document.querySelector(".grid");
const eraser = document.querySelector(".eraser");
const clearbutton = document.querySelector(".clear");
const changeSize = document.querySelector(".changeButton");
const ColorButton = document.querySelector(".changeColor");
const colorWindow = document.querySelector(".colorWindow");
const rainbowButton = document.querySelector(".rainbow");

let color = "#000000";
let bufferColor = "";
let mouseClick = false;
let rainbow = false;
let eraserOn = false;


document.body.onmousedown = () => {mouseClick = true}
document.body.onmouseup = () => {mouseClick = false}

start();

function start(){
 
   ColorButton.addEventListener('click',function(e){
      selectColor();
   })
   rainbowButton.addEventListener('click',function(e){
      if(rainbow == true){
         rainbow = false;
         color = bufferColor;
         rainbowButton.classList.remove("focus");
      }
      else{
         rainbow = true;
         bufferColor = color;
         rainbowButton.classList.add("focus");

      }
   })

   changeSize.addEventListener('click',function(e){
      changeGrid();
   })

   eraser.addEventListener('click',function(e){
     
      if(eraserOn == true){
         color = bufferColor;
         eraser.classList.remove("focus");
         eraserOn = false;
      }
      else{
         eraserOn = true;
         bufferColor = color;
         erase();
         eraser.classList.add("focus");

      }
   })

   clearbutton.addEventListener('click',function(e){
      clear();
   })
   createGrid(256);
}

function selectColor(){
   color = colorWindow.value;
   bufferColor = color;
}
function changeColor(e){  
   console.log(rainbow);
   if(e.type === "mouseover" && !mouseClick){return}
   if(rainbow == true){
      color = RGB2HTML(getRandomNumber(0,256),getRandomNumber(0,256),getRandomNumber(0,256));
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
   color = bufferColor;
}

function erase(){
   eraserOn = true;
   color = '#ffffff';
   // if(color !== '#ffffff'){
   //    bufferColor = color;
   //    color = '#ffffff';
   // }
   // else{
   //    color = bufferColor;
   // }
}
function clear(){
   const divs = document.querySelectorAll(".pixel");
   divs.forEach(div => {
      div.style.backgroundColor = "#ffffff";
      color = bufferColor;
   });
}

const getRandomNumber  = (min,max)=>{
   number = Math.floor(Math.random() * (max - min) + min);
   return number;
} 
const RGB2HTML = (red,green,blue) =>{
   var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
   return '#'+decColor.toString(16).substr(1);
}

