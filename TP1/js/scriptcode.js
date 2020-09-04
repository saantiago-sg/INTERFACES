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

//  AGREGAR IMAGEN

let inputImage = document.querySelector(".inputImage");

//canvas.addEventListener('click', colorGrey);
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