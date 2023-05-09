const grid = document.querySelector(".grid");
const eraser = document.querySelector(".eraserBtn");
const clearbutton = document.querySelector(".clearBtn");
const changeSize = document.querySelector(".sizerange");
const colorWindow = document.querySelector(".colorWindow");
const rainbowButton = document.querySelector(".rainbowBtn");
const blackButton = document.querySelector(".blackBtn");
const labelsize = document.querySelector(".size");

let color = colorWindow.value;
let mouseClick = false;
let rainbow = false;
let eraserOn = false;
let blackOn = false;
let counter = 0;

labelsize.textContent = changeSize.value;
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
         blackOn = false;
         counter = 0;
         rainbowButton.classList.add("focus");
         eraser.classList.remove("focus");
         blackButton.classList.remove("focus");
      }
   })
   blackButton.addEventListener('click',function(e){
      if(blackOn == true){
         blackOn = false;
         counter = 0;
         blackButton.classList.remove("focus");
      }
      else{
         blackOn = true;
         eraserOn = false;
         rainbow = false;
         rainbowButton.classList.remove("focus");
         eraser.classList.remove("focus");
         blackButton.classList.add("focus");
      }
   })

   changeSize.addEventListener('input',function(e){
      labelsize.textContent = changeSize.value;
      changeGrid(changeSize.value);
   })

   eraser.addEventListener('click',function(e){
     
      if(eraserOn == true){
         eraser.classList.remove("focus");
         eraserOn = false;
      }
      else{
         eraserOn = true;
         rainbow = false;
         blackOn = false;
         counter = 0;
         eraser.classList.add("focus");
         rainbowButton.classList.remove("focus");
         blackButton.classList.remove("focus");
      }
   })

   clearbutton.addEventListener('click',function(e){
      clear();
   })
   createGrid(256);
}

function changeColor(e){  
   color = colorWindow.value;
   e.target.style.opacity = 1;
   if(e.type === "mouseover" && !mouseClick){return}
   if(rainbow == true){
      color = RGB2HTML(getRandomNumber(0,256),getRandomNumber(0,256),getRandomNumber(0,256));
   }else if(eraserOn == true){
      color = '#ffffff';
   }else if(blackOn == true){
      color = "#000000";
      e.target.style.opacity = counter;
      if(counter < 1){
         counter = counter + 0.1;
      }else{
         counter = 0;
      }
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

function changeGrid(size){
  
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
   blackOn = false;
   counter = 0;
   eraser.classList.remove("focus");
   rainbowButton.classList.remove("focus");
   blackButton.classList.remove("focus");
   const divs = document.querySelectorAll(".pixel");
   divs.forEach(div => {
      div.style.backgroundColor = "#ffffff";
      div.style.opacity = 1;
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

