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
setTimeout(function(){
  
    for(let i = 0; i < animado.length; i++){    
        animado[i].style.opacity = 1;
        animado[i].classList.add("mostrarArriba");
        }


function animarIzq(){
let animadoIzq = document.querySelectorAll(".animadoIzq");    //todas las clases

let scrollTop = document.documentElement.scrollTop;

for(let i = 0; i < animadoIzq.length; i++){    
  let alturaAnimado = animadoIzq[i].offsetTop;    //detecto altura hacia la card
  if(alturaAnimado + 100 < scrollTop){
        animadoIzq[i].style.opacity = 1;
        animadoIzq[i].classList.add("mostrarIzq");
        }
      }   
  }
  window.addEventListener("scroll", animarIzq);



  function animarDer(){
    let animadoDer = document.querySelectorAll(".animadoDer");    //todas las clases
    
    let scrollTop = document.documentElement.scrollTop;
    
    for(let i = 0; i < animadoDer.length; i++){    
      let alturaAnimado = animadoDer[i].offsetTop;    //detecto altura hacia la card
      if(alturaAnimado + 100 < scrollTop){
            animadoDer[i].style.opacity = 1;
            animadoDer[i].classList.add("mostrarDer");
            }
          }   
      }
  window.addEventListener("scroll", animarDer);


}, 3000);

