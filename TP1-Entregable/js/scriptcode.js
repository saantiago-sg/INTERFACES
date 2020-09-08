let canvas = document.querySelector("#canvasPaint");
let ctx = canvas.getContext("2d");
let rect = canvas.getBoundingClientRect(); // obtiene la posicion del canvas, left y top
let x = 0;
let y = 0;
let dibujando = false;
let color = 'black';
let grosorP = 1;

// PAINT(DIBUJAR - BORRAR)

function colorInp(c){   // cambio el color que elije el usuario por parametro
color  = c;
}

function grosorPen(g){  // cambio el grosor que elije el usuario por parametro
grosorP = g;
}

canvas.addEventListener('mousedown', function(e){  // esta funcion capta el primer click cuando dibuja el usuario
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    dibujando = true;
});

canvas.addEventListener('mousemove', function(e){   // esta funcion realiza el movimiento por donde se desplaza el usuario con el mouse
    if(dibujando === true){ 
        dibujar(x,y, e.clientX - rect.left, e.clientY - rect.top);
        x = e.clientX;
        y = e.clientY - rect.top;
    }
});

canvas.addEventListener('mouseup', function(e){   // esta funcion capta cuando el mouse deja de dar click
    if(dibujando === true){
        dibujar(x,y, e.clientX - rect.left, e.clientY - rect.top);
        x = 0;
        y = 0;
        dibujando = false;
    }
});

function dibujar(x1, y1, x2, y2){   //paso los parametros de la posiciones
    ctx.beginPath();    // abro el path
    ctx.strokeStyle = color;
    ctx.lineWidth = grosorP;
    ctx.moveTo(x1, y1); // empiezo la linea
    ctx.lineTo(x2, y2); // termino la linea
    ctx.stroke();
    ctx.closePath(); // cierro el path
}

function deleteDraw(){
    color = 'white';
    //clase para icono borrar
}
let btnDel = document.querySelector('#btnDelete').addEventListener('click', deleteDraw);

//      AGREGAR IMAGEN

let inputImage = document.querySelector(".inputImage");

    inputImage.onchange = e => {

        let file = e.target.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = readerEvent => {
            let content = readerEvent.target.result;

            image = new Image();
            image.src = content;
    

    image.onload = function(){
    canvas.width = this.width;
    canvas.height = this.height;

    let imageAspectRatio = (1.0 * this.height) / this.width;
    let imageScaleWidth = canvas.width;
    let imageScaleHeight = canvas.width * imageAspectRatio;

    ctx.drawImage(this, 0, 0, imageScaleWidth, imageScaleHeight);

    
    let imageData = ctx.getImageData(0, 0, imageScaleWidth, imageScaleHeight);
    
    ctx.putImageData(imageData, 0, 0);
        }
    }
    }


//      FILTROS DE COLORES

function colorNegativo(){

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);    //obtengo los datos de la imagen, altura ancho y pos
    let pixeles = imageData.data;
    
    for (let i = 0; i < pixeles.length; i += 4) { // recorre uno a uno los pixeles de la imagen y cambia el color por el complementario
        pixeles[i] = 255 - pixeles[i]; // rojo
        pixeles[i + 1] = 255 - pixeles[i + 1]; // verde
        pixeles[i + 2] = 255 - pixeles[i + 2]; // azul
      }
      ctx.putImageData(imageData, 0, 0);
      }
let btnNegativo = document.querySelector("#btnNegativo").addEventListener("click", colorNegativo);


function colorBrillo(){
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);    //obtengo los datos de la imagen, altura ancho y pos
    let pixeles = imageData.data;
   
    for (let i = 0; i < pixeles.length; i += 4) { // recorre uno a uno los pixeles de la imagen y cambia el color por el complementario
        
        pixeles[i] = (255/3) + pixeles[i]; // rojo
        pixeles[i + 1] = (255/3) + pixeles[i + 1]; // verde
        pixeles[i + 2] = (255/3) + pixeles[i + 2]; // azul   
    }
ctx.putImageData(imageData, 0, 0); 
}
let btnBrillo = document.querySelector("#btnBrillo").addEventListener("click", colorBrillo); 

function colorGris(){
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixeles = imageData.data;

    for (let i = 0; i < pixeles.length; i += 4) {
        let sum = pixeles[i] + pixeles[i+1] + pixeles[i+2];
        let promedio = parseInt(sum/3);
        pixeles[i] = promedio;
        pixeles[i+1] = promedio;
        pixeles[i+2] = promedio;
      }
      //imageData.data = pixeles;
      ctx.putImageData(imageData, 0, 0);
}
let btnGris = document.querySelector("#btnGris").addEventListener("click", colorGris);

function colorSepia(){

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixeles = imageData.data;
    let numPixels = imageData.width * imageData.height;
    for ( var i = 0; i < numPixels; i++ ) {
        var r = pixeles[ i * 4 ];
        var g = pixeles[ i * 4 + 1 ];
        var b = pixeles[ i * 4 + 2 ];
 
        pixeles[ i * 4 ] = 255 - r;
        pixeles[ i * 4 + 1 ] = 255 - g;
        pixeles[ i * 4 + 2 ] = 255 - b;
 
        pixeles[ i * 4 ] = (r *.393) + (g *.769) + (b * .189);
        pixeles[ i * 4 + 1 ] = (r * .349) + (g *.686) + (b * .168);
        pixeles[ i * 4 + 2 ] = (r * .272) + (g *.534) + (b * .131);
    }
    ctx.putImageData(imageData, 0, 0);
}
let btnSepia = document.querySelector("#btnSepia").addEventListener("click", colorSepia);

//      SATURACION 
function saturacion(){
    let imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
    let cantidad= 1.0;
     for (y=0;y<canvas.height;y++){
        for (x=0;x<canvas.width;x++){
            let i =(x+y*imageData.width)*4;
            let hsl=RGBaHSL(imageData.data[i+0],imageData.data[i+1],imageData.data[i+2]);
            hsl[1]= cantidad;   //al ser el valor 1, elijo saturacion
            let rgbNuevo=HSLaRGB(hsl[0],hsl[1],hsl[2]);
            imageData.data[i+0]=rgbNuevo[0];
            imageData.data[i+1]=rgbNuevo[1];
            imageData.data[i+2]=rgbNuevo[2];
        }
     }
    ctx.putImageData(imageData,0,0);
}
let btnSaturado = document.querySelector("#btnSaturacion").addEventListener("click", saturacion);

function RGBaHSL(r, g, b){
r /= 255, g /= 255, b /= 255; // divido la variable y le asigno el valor a la misma variable
let max = Math.max(r,g,b);
let min = Math.min(r,g,b);
let hue, sat, li = (max + min) / 2;

if(max == min){
    hue = sat = 0; // no tiene saturacion
}else{
    let dif = max - min;
    sat = li > 0.5 ? dif / (2 - max - min) : dif / (max + min);
    switch(max){
        case r: hue = (g - b) / dif;
        break;
        case g: hue = 2 + ((b - r) / dif);
        break;
        case b: hue = 4 + ((r - g) / dif);
        break;
    }
    hue *= 60; //mult por 60 y se lo asigno a hue
    if (hue < 0){
        hue += 360;
    }
    }    
    return([hue, sat, li]);

}

function HSLaRGB(hue , sat, li){
if(sat === 0){
    return[li, li, li];
}
hue /= 360; //num de saturacion
let q = li < 0.5 ? li * (1 + sat) : li + sat - li * sat;
let p = 2 * li - q;
  return [Math.round(HUEaRGB(p, q, hue + 1/3) * 255),
          Math.round(HUEaRGB(p, q, hue) * 255),
          Math.round(HUEaRGB(p, q, hue - 1/3) * 255)]
}

function HUEaRGB (p, q, t) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
  
    return p;
  }

//      NINGUN FILTRO
function ningunFiltro(){
    alert("none"); 
}
let btnNinguno = document.querySelector("#btnNinguno").addEventListener("click", ningunFiltro);


//      GUARDAR IMAGEN Y EMPEZAR NUEVO DIBUJO

function guardarImage(){
let link = document.createElement('a'); // creo un link para poder descargar la imagen q se creo con el nombre
let url = canvas.toDataURL();           // imagecanvas 
let filename = 'imagecanvas.jpg';
link.setAttribute( 'href', url );
    link.setAttribute( 'download', filename );
    link.style.visibility = 'hidden';
    window.document.body.appendChild( link );
    link.click();
    window.document.body.removeChild( link );
}
let btnGuardar = document.querySelector("#btnGuardar").addEventListener("click", guardarImage);


function nuevaImagen(){
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height); //dibuja un cuadrado

let imageData = ctx.getImageData(0,0, canvas.width, canvas.height);

ctx.putImageData(imageData, 0, 0);
}
let btnNewImage = document.querySelector("#btnNewImage").addEventListener("click", nuevaImagen);

//