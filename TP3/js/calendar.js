
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


//    ----------------------    ANIMACION SCROLL    ------------------
setTimeout(function(){

let animado = document.querySelectorAll(".animado");    //todas las clases 
  function animarEntrevistas(){ 
    for(let i = 0; i < animado.length; i++){    
        animado[i].style.opacity = 1;
        animado[i].classList.add("mostrarIzq");
        }
}
window.addEventListener("scroll", animarEntrevistas);


let animadoDos = document.querySelectorAll(".animadoDos");    //todas las clases
  for(let i = 0; i < animado.length; i++){    
    animadoDos[i].style.opacity = 1;
    animadoDos[i].classList.add("mostrarArriba");
    }
}, 3000);


