let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let canvasGame = document.querySelector("#canvasGame");
let ctxGame = canvasGame.getContext("2d");

let dx=[ 1,-1, 0, 0, 1,-1, 1,-1]; //destinos x y
let dy=[ 0, 0, 1,-1,-1, 1, 1,-1];

let celda = 80;
let mitadCelda = celda / 2;

let turno = 2;
let color;
let isDragging = false;
let one;
let two;


let matriz = [];
for(let i = 0; i < 7; i++){
  matriz[i] = new Array(6);
}
//  DIBUJO EL TRABLERO EN EL CANVAS
function drawImage(){
    let img = new Image;
    img.src = "./img/maderaTwo.jpg";
    img.onload = function() {
        let image = ctx.createPattern(img, "repeat");
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = image;
        ctx.fill();
}
}
drawImage();

// DIBUJAR AGUJEROS EN EL CANVAS
function drawCircles(x, y, radius) {
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.fillStyle = "transparent";
  ctx.fill();
  ctx.closePath(); 
}
for (let y = 80; y < 560; y += celda) {
  for (let x = 0; x < 560; x += celda) {
    drawCircles(x + mitadCelda, y + mitadCelda, 30);
  }
}


// IDENTIFICAR COLUMNA CLICKEADA
function getMousePos(evt) {
  let mouseX = evt.offsetX * canvas.width / canvas.clientWidth;
  let mouseY = evt.offsetY * canvas.height / canvas.clientHeight;
  return {
    x: mouseX,
    y: mouseY
  };
}

let aux = 0;
canvas.addEventListener('click', function (evt) { //ejecuto la ficha
  //Poner un rectangulo blanco hasta arriba
  if(aux >= 1){
    reset();  // reseteo para q no se cree un bucle
    initTimer();
    ctxGame.clearRect(560,151,canvasGame.width,canvasGame.height);  //limpio los nombres de turnos
    aux++;
  }else{
    initTimer();  //inicio el timer
    ctxGame.clearRect(560,151,canvasGame.width,canvasGame.height);
    aux++;
  }

  retornarLugar();  // luego de arrastrar me retorna a la posicion origen
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,celda*7, 80);
  ctx.stroke();
  
  let mousePos = getMousePos(evt);
  for (let i = 0; i < canvas.width; i += celda) {
    if (mousePos.x > i && mousePos.x < i + celda) {
      if(matriz[i/80][0] != undefined) break;
      let topeY = llenarColumna(i/80) + 1;
      cambiarTurno();
       // SI ARRASTRA LA FICHA, dejar tocar 
      fichaCayendo(i + mitadCelda, mitadCelda, topeY * celda + mitadCelda); // x - y - yMAX
      canvas.style.pointerEvents = 'none';
  
      if(!yaGanoAlguien(i/80, topeY-1)){
        setTimeout(function(){ 
          canvas.style.pointerEvents = 'auto';
        }, 800);
      } else{
        colorearfichasWin();
        }
      }
    }
});



//  --------------- TEMPORIZADOR  ----------
// let iniciar;
// let tiempo = 0;

// function initTimer() {
//   //al clickear en ficha iniciar
//   iniciar = setInterval(function() {
//      timer() 
// }, 1000);
// }

// function timer() {
//   tiempo = parseInt(document.getElementById('time').value);
//   document.getElementById("time").value = eval(tiempo + 1);
//   if(tiempo > 9){
//     //cambiar de turno
//     reset();
//     ctxGame.clearRect(560,151,canvasGame.width,canvasGame.height);
//     cambiarTurno();
//   }
// }

// function reset() {
//   time = parseInt(document.getElementById('time').value);
//   document.getElementById('time').value = "0";
// }

// function stop() {
//   //cuando haya un ganador parar
//   clearInterval(iniciar);
// }

let temporizador = document.querySelector("#temporizador");
let tiempo = 0; 
let intervalo = 0;

function initTimer(){
  iniciarContador();
}

function iniciarContador(){
  intervalo = setInterval(function(){
    tiempo++;
    temporizador.innerHTML = tiempo;
    if(tiempo > 9){   // si se pasa de los 10 segundo, reseteo y cambio de turno
      reset();
      ctxGame.clearRect(560,151,canvasGame.width,canvasGame.height);
      cambiarTurno();
    }
  }, 1000);

}

function stop(){
  clearInterval(intervalo);
}

function reset(){
tiempo = 0;
temporizador.innerHTML = tiempo;
clearInterval(intervalo);
}

//  --------------- FIN FUNC DE TEMPORIZADOR -------------------

mostrarTurno();
function llenarColumna(numCol){
  let numFila = 5;
  while(numFila >= 0 && matriz[numCol][numFila] != undefined){
    numFila--;
  }
  if(numFila < 0) return;
  matriz[numCol][numFila] = turno;
  return numFila;
}
let posWinners=[[0,0],[0,0],[0,0],[0,0]];


function contar(mx,my,columna,fila,valorFicha){
  if(fila<0 || fila>5 || columna<0 || columna>6)
    return 0;
  if(matriz[columna][fila]!=valorFicha)
    return 0;
  return 1 + contar(mx,my,columna+my,fila+mx,valorFicha);
}


let posi=0;
function contarDos(mx,my,columna,fila,valorFicha){
  if(fila<0 || fila>5 || columna<0 || columna>6)
    return;
  if(matriz[columna][fila]!=valorFicha)
    return;
  posWinners[posi] = [columna, fila];
  posi++;
  contarDos(mx,my,columna+my,fila+mx,valorFicha);
}

function yaGanoAlguien(xFicha, yFicha){
  let valorFicha = matriz[xFicha][yFicha];
  for(let i=0;i<8;i+=2){
    
    let lado1=contar(dx[i],dy[i],xFicha+dy[i],yFicha+dx[i],valorFicha);
    let lado2=contar(dx[i+1],dy[i+1],xFicha+dy[i+1],yFicha+dx[i+1],valorFicha);
    if(lado1+lado2+1>=4){
      posi=0;
      contarDos(dx[i],dy[i],xFicha+dy[i],yFicha+dx[i],valorFicha,posi);
      contarDos(dx[i+1],dy[i+1],xFicha+dy[i+1],yFicha+dx[i+1],valorFicha,posi);
      posWinners[posi]=[xFicha,yFicha];
      
      return true; 
    }
  }  
  return false;
}


// ------------   ARRASTRAR   ----------------
function drag(){
  
  let cw = canvasGame.width;
  let ch= canvasGame.height;

function reOffset(){
  let BB=canvasGame.getBoundingClientRect();
  offsetX=BB.left;
  offsetY=BB.top;        
}
let offsetX,offsetY;
reOffset();

window.onscroll=function(e){ reOffset(); }
window.onresize=function(e){ reOffset(); }  
canvasGame.onresize=function(e){ reOffset(); }
//cambios de pantalla

let figuras =[];

figuras.push( {
      x:620,
      y:80,
     radius:30,
     color:"yellow"
    });

figuras.push( { //RECORDAR: LIMpiar el drag
      x:800,
      y:80,
     radius:30,
     color:"red"
    });

draw();
let startX,startY;

// -------  LISTENER  --------
canvasGame.onmousedown=handleMouseDown;
canvasGame.onmousemove=handleMouseMove;
canvasGame.onmouseup=handleMouseUp;
canvasGame.onmouseout=handleMouseOut;
// ----------------------------

function isMouseInfiguras(mx,my,figuras){
  if(figuras.radius){
      let dx=mx-figuras.x;
      let dy=my-figuras.y;
      if(dx*dx+dy*dy<figuras.radius*figuras.radius){
          return(true); // el mouse esta dentro
      }
  }
  return(false);
}

function handleMouseDown(e){  //CUANDO LO APRETO
  e.preventDefault();
  e.stopPropagation();
  startX=parseInt(e.clientX-offsetX);
  startY=parseInt(e.clientY-offsetY);


  for(let i=0;i<figuras.length;i++){
    if(figuras[i].color == "red" && turno == 2){  // defino el color y el turno, para poder utilizar 1 a la vez
      if(isMouseInfiguras(startX,startY,figuras[i])){ 
          selectedfigurasIndex=i; // si el mouse esta dentro selecciona la figura
          isDragging=true;
          //obtenerTrue(isDragging);
          return;
      }
    }else{
      if(figuras[i].color == "yellow" && turno == 1){
        if(isMouseInfiguras(startX,startY,figuras[i])){
            selectedfigurasIndex=i; // si el mouse esta dentro selecciona la figura
            isDragging=true;
            return;
        }
    }
  }
}
}

function handleMouseUp(e){    //SUELTA
  if(!isDragging){  // si no arrastra, retorna
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  // termina de arrastrar y limpia el isdrag
  isDragging=false;
  //ACA VA EL FALSE;
}

function handleMouseOut(e){
  if(!isDragging){  // si no arrastra, retorna  
   return;
  }
  e.preventDefault();
  e.stopPropagation();
  // termina de arrastrar y limpia el isdrag
  isDragging=false;
}

function handleMouseMove(e){
  if(!isDragging){ // si no arrastra, retorna
    return;
  }
  e.preventDefault();
  e.stopPropagation();

  mouseX=parseInt(e.clientX-offsetX); //obtengo la posicion del mouse
  mouseY=parseInt(e.clientY-offsetY);

  let dx=mouseX-startX;
  let dy=mouseY-startY;

  let selectedfiguras=figuras[selectedfigurasIndex];  //selecciono las figuras y las arrastro
  selectedfiguras.x+=dx;
  selectedfiguras.y+=dy;
  
  draw();
  startX=mouseX;  // Actualizo las posiciones 
  startY=mouseY;  
}

//DIBUJAR FIGURAS
function draw(){
  ctxGame.clearRect(560,0,cw,ch);
  for(let i=0;i<figuras.length;i++){
      if(figuras[i].radius){  
          ctxGame.beginPath();
          ctxGame.arc(figuras[i].x,figuras[i].y,figuras[i].radius,0,Math.PI*2);
          ctxGame.fillStyle=figuras[i].color;
          ctxGame.fill();      
       } 
}
}

}

drag();
// ------------------------- FIN DE ARRASTRAR --------------------------------

function colorearfichasWin(){
  for(let i = 0; i<=3; i++){
      let x=posWinners[i][0];
      let y=posWinners[i][1];
      ctx.beginPath();
      ctx.arc(x*celda+mitadCelda, y*celda+celda+mitadCelda, 30, 0, Math.PI * 2, true);
      ctx.lineWidth = 8;
      ctx.strokeStyle = "#1bf530";
      ctx.fillStyle = color;  
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
  }
  stop();
  if(color == "yellow"){
  getParticipanteOne(one);
  Swal.fire({
    title: 'FELICITACIONES, GANO EL EQUIPO '+ color + " DE " + one,
    width: 600,
    padding: '3em',
    background: '#fff url(/images/trees.png)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("./img/gifwin.gif")
      left top
      repeat
    `
  })
  }else if(color == "red"){
  getParticipanteOne(two);
  Swal.fire({
    title: 'FELICITACIONES, GANO EL EQUIPO '+ color + " DE " + two,
    width: 600,
    padding: '3em',
    background: '#fff url(/images/trees.png)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("./img/gifwin.gif")
      left top
      repeat
    `
  })
  }
}

// EFECTO DE FICHA 
function fichaCayendo(x, y, yMax) {
  ctxGame.clearRect(x - mitadCelda, 0, celda, yMax); //convierto todos los pixeles en el rectangulo
  ctxGame.beginPath();
  ctxGame.arc(x, y, 30, 0, Math.PI * 2);
  ctxGame.strokeStyle = "white";
  ctxGame.fillStyle = color;
  ctxGame.fill();
  ctxGame.stroke();
  if (y !== yMax) {
    y += 10;
    setTimeout('fichaCayendo(' + x + ',' + y + ', ' + yMax + ')', 1);
  }
  return;
}

//  CAMBIO DE TURNO
function getParticipanteOne(){
  one = document.querySelector("#nombreOne").value;
  two = document.querySelector("#nombreTwo").value;
  return one, two;
}
let btnIniciar = document.querySelector("#btnIniciar").addEventListener("click", getParticipanteOne);
 

function cambiarTurno(){
turno = (turno == 1 ? 2 : 1);
color = (turno == 1 ? 'red': 'yellow');
mostrarTurno();
}
//  MOSTRAR TURNO POR PANTALLA
function mostrarTurno(){ 
one = getParticipanteOne(one);
two = getParticipanteOne(two);
    if(turno == 1){
        ctxGame.font='oblique 675 15px Arial';
        ctxGame.fillStyle = "#a3a310";
        ctxGame.fillText("TURNO: Equipo amarrillo de "+ one, 570, 170);
    }
    else{
        ctxGame.font='oblique 675 15px Arial';
        ctxGame.fillText("TURNO: Equipo rojo de "+ two, 580, 170);  //PARTICIPANTES--------------------------------
    }
}

//  VUELVE LA FICHA A SU LUGAR LUEGO DE SER ARRASTRADA
function retornarLugar(){
  ctxGame.clearRect(560,0,canvasGame.width,canvasGame.height);
  drag();
}


// EFECTO DE FICHAS EN LA PARTE BLANCA
function efectoFichas(event){
  color = (turno == 1 ? 'yellow': 'red');
  let mousePos = getMousePos(event);
  let x = parseInt(mousePos.x/80);
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,celda*7, 80);
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.arc(x*celda+ mitadCelda, mitadCelda, 30, 0, Math.PI * 2, true);
  ctx.fillStyle = color;
  ctx.lineWidth = 0;
  ctx.fill();
  ctx.stroke();
}

//  REINICIA LA PARTIDA 
let btnReiniciar = document.querySelector("#btnReiniciar");
btnReiniciar.addEventListener('click', function () {
  location.reload();
});