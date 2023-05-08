const container = document.querySelector(".container");


for(let i = 0; i < 256; i++){
   let newDiv = document.createElement('div');
   newDiv.id = 'pixel'+i;
   newDiv.addEventListener("mouseover",function(e){
      newDiv.style.backgroundColor = "red";
   })
   
   container.appendChild(newDiv);
}