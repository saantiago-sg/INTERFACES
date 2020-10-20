// window.onload = function(){
//     let content_load = document.querySelector("#content_load");
//     content_load.style.visibility = "hidden";
//     content_load.style.opacity = "0";
// }

// function addFunction(){
//     let btn = document.querySelector("#btnLoad").classList.add("loading");   
//     }
//     let btnLoad = document.querySelector("#btnLoad").addEventListener("click", addFunction);


// let img = document.querySelector("#efect");

// document.addEventListener('mousemove', function(e) {
//   let xAxis = (window.innerWidth / 2 - e.pageX)/ 40;
//   let yAxis = (window.innerHeight / 2 - e.pageY)/ 20;
//   img.style.transform = `perspective(200px)rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;

// });
// let img2 = document.querySelector("#efect2");

// document.addEventListener('mousemove', function(e) {
//   let x = (window.innerWidth / 2 - e.pageX)/ 40;
//   let y = (window.innerHeight / 2 - e.pageY)/ 20;
//   img2.style.transform = `perspective(200px)rotateY(${x}deg) rotateX(${y}deg)`;

// });

// function addFunction(){
//   let btn = document.querySelector("#btnAceptar").classList.add("loading");   
//   }
//   let btnLoad = document.querySelector("#btnAceptar").addEventListener("click", addFunction);


// function load(){
//   let btn = document.querySelector("#btnComent").classList.add("addEfect");
//   btn = setTimeout(function(){
//   cargar();
//   }, 3800);
  
// }
// let btnComentario = document.querySelector("#btnComent").addEventListener("click", load);

// function cargar(){
//   location.reload();
// }


//    -----------------------     CONTADOR    ----------------------------

let countDownDate = new Date("Dec 4, 2020 21:00:00").getTime();
 
let x = setInterval(function() {
  let now = new Date().getTime();     // obtengo la fecha y hora de ahora mismo
    
  let distancia = countDownDate - now; // obtengo la distancia del tiempo de ahora y la fecha pactada
    
  let dias = Math.floor(distancia / (1000 * 60 * 60 * 24)); //  calculo el tiempo de dia, hora, min, seg
  let horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  let segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  //    imprimo por pantalla
  // document.querySelector("#pDias") = "Dias";
  document.querySelector("#dias").innerHTML = dias;
  document.querySelector("#horas").innerHTML = horas;
  document.querySelector("#minutos").innerHTML = minutos;
  document.querySelector("#segundos").innerHTML = segundos;


  // si el contador termina, agrego un mensaje
  if (distancia < 0) {
    clearInterval(x);
    document.querySelector("#calendario").innerHTML = "¡YA PODEMOS VER VIKINGOS!";
  }
}, 0000);
//    -----------------------     FIN CONTADOR    ----------------------------


//    -----------------------     PARALLAX      --------------------------------
let parallax = document.querySelector(".parallax");     //selecciono parallax
let efectParallax = document.querySelector(".efectParallax");

function scrollParallax(){
    let scrollTop = document.documentElement.scrollTop; // obtengo la medida del scroll de arriba
    parallax.style.transform = "translateY("+ scrollTop * 0.2 +"px)"  ; //roto, cambio a parallax
    efectParallax.style.transform = "translateY("+ scrollTop * 0.1 +"px)"  ; //roto, cambio a parallax
}

window.addEventListener("scroll", scrollParallax);

//    ----------------------    ANIMACION SCROLL    ------------------

let animado = document.querySelectorAll(".animado");    //todas las clases
window.onload = function(){
    for(let i = 0; i < animado.length; i++){    
        animado[i].style.opacity = 1;
        animado[i].classList.add("mostrarArriba");
        }
}
