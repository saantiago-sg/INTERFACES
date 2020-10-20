//    ----------------------    ANIMACION SCROLL    ------------------

let animado = document.querySelectorAll(".animado");    //todas las clases
window.onload = function(){
    for(let i = 0; i < animado.length; i++){    
        animado[i].style.opacity = 1;
        animado[i].classList.add("mostrarArriba");
        }
}


//      ---------------------   BOTON LOAD      ----------------
function load(){
  let btn = document.querySelector("#btnComent").classList.add("addEfect");
  btn = setTimeout(function(){
  cargar();
  }, 3800);
  
}
let btnComentario = document.querySelector("#btnComent").addEventListener("click", load);

function cargar(){
  location.reload();
}
