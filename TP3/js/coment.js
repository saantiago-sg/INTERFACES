//    ----------------------    ANIMACION SCROLL    ------------------

let animado = document.querySelectorAll(".animado");    //todas las clases
setTimeout(function(){
  for(let i = 0; i < animado.length; i++){    
    animado[i].style.opacity = 1;
    animado[i].classList.add("mostrarArriba");
    }
}, 3000);



//      ---------------------   BOTON LOAD      ----------------
function load(){
  let btn = document.querySelector("#btnComent").classList.add("addEfect");
  btn = setTimeout(function(){
  cargar();
  }, 3800);
  
}
let btnComentario = document.querySelector("#btnComent").addEventListener("click", load);
let enviado = document.querySelector(".enviado");

function cargar(){
  enviado.style.display = "block";
  setTimeout(function(){
   location.reload();
  },2000);
}
