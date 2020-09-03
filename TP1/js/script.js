
let col = 10;
let fila = 10;

let matrix = [];

//canvas


for (let i = 0; i < col; i++){
    matrix[i] = [];
        for(let j = 0; j < fila; j++){
    matrix[i][j] =Math.floor(Math.random()*100);    
    }
}
console.table(matrix);
ejercicioA();
ejercicioB();
ejercicioC();
ejercicioDos();
ejercicioTres();
ejercicioCuatro();
ejercicioCinco();
ejercicioSeis();
ejercicioSiete();
//A) Escribir una función que retorne el valor máximo de toda la matriz
function ejercicioA(){
    let valorMax = 0;

    for(let i = 0; i < col; i++){
        for(let j = 0; j < fila; j++){
            if(matrix[i][j] > valorMax){
                valorMax = matrix[i][j];
        }
    }
 }
 console.log("el valor maximo es: "+ valorMax);
}

//B) Escribir una función que retorne el valor máximo 
//contenido en las filas pares y el valor mínimo en las filas impares

function ejercicioB(){
    var valorMaximo = 0;
    var valorMin = 0;
    for(var i = 0; i < col; i++){
       
        for(var j = 0; j < fila; j++){
            if(matrix[i][j] > valorMaximo & fila % 2 == 0){
            valorMaximo = matrix[i][j];
            }
            valorMin = matrix[i][j];
            if(matrix[i][j] < valorMin & fila % 2 != 0){
                valorMin = matrix[i][j];
            }
        }
    }
    console.log("valor maximo de fila es "+ valorMaximo);
    console.log("el valor minimo ES", valorMin);
}

//C) Calcular el valor promedio de cada fila y guardarlos en un arreglo.
function ejercicioC(){
    let arreglo = [];
    let aux = 0;
    let valorProm = 0;
    let cant = 0;
    for(let i = 0; i < col; i++){

        for(let j = 0; j < fila; j++){
        matrix[j];
        if(matrix[j] != 0){
        aux +=  matrix[i][[j]];
        cant++; 
        }
        valorProm = (aux / cant);
        arreglo[j] = valorProm;
//Promedio = suma el conjunto de números / cantidad de números
        }
    }
    console.table("prodemio de cada fila: "+ arreglo);
}

//2) Pintar una región rectangular de un color utilizando el contexto de HTML 5
function ejercicioDos(){
    let context = document.getElementById("canvas").getContext("2d");
    context.fillStyle = "#FF0000";
    context.fillRect(0, 0, 300, 300);  //(ancho por donde se mueve/ largo por donde se mueve/ajusto el tamaño de ancho/ajusto el tamaño de largo)
}


//3) Pintar una región rectangular de un color utilizando la estructura de ImageData.
function ejercicioTres(){
   
  
    let ctx = document.querySelector("#canvasDos").getContext("2d");
    let width = 400;
    let height = 400;
    // 1. crea un objeto ImageData en blanco;
    let imgData=ctx.createImageData(width,height);
	// 2. para cada pixel modifica el valor de los componentes RGBA;
					for (let i = 0; i < imgData.data.length; i+= 4)
							{
							imgData.data[i+0]=200;	// rojo = 100%;
							imgData.data[i+1]=229;	// verde - ausente;
							imgData.data[i+2]=0;	// azul - ausente;
							imgData.data[i+3]=102;	// alpha - opaco;
							}
					// 3. coloca la nueva imagen en el canvas;		
					ctx.putImageData(imgData,0,0);  
}

//4) Especificar la función para pintar un cuadrado utilizando un gradiente de la siguiente forma:
function ejercicioCuatro(){
    let ctx = document.querySelector("#canvasTres").getContext("2d");
    let width =  400;
    let height = 400;
   
    let imageData = ctx.createImageData(width, height);
    let r;
    let g;
    let b;
    let a;    
    
    for(let x = 0; x < width; x++){
          
        for(let y = 0; y < height; y++){
            let coeficiente = ((y / height)*255);
            r = (coeficiente); //agrega color
            g = (coeficiente); //agrega color
            b = (coeficiente);
            a = (255);   //agrega color oscuro
            setPixel(imageData, x, y, r, g, b, a);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function setPixel(imageData, x, y, r, g, b, a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}
/* 5) Pintar un rectángulo en pantalla, utilizando tres colores en un gradiente: De negro a amarillo en
la primera mitad del ancho del rectángulo, y de amarillo a rojo, en la segunda mitad. Por otro lado,
en Y el degrade se mantiene constante.*/
function ejercicioCinco(){
    let ctx = document.querySelector("#canvasCuatro").getContext("2d");
    let width = 400;
    let height = 800;

    let imageData = ctx.createImageData(width,height);
    let r;
    let g;
    let b;
    let a;
    
        for(let x = 0; x < width; x++){
            for(let y= 0; y < height; y++){
            let coeficiente = (width / 2); 
                r = ((x / coeficiente)* 255); //agrega color black=0, 0, 0 // yellow= 238, 241, 15 // red = 255, 0, 0 
                g = ((x / coeficiente) * 255); //agrega color
                b = 0;
                a = 255;
        setPixelDos(imageData, x, y, r, g, b, a);
        }
    }
    let valorMitad = (width/2);
    for(let x = valorMitad; x < width; x++){
        for(let y = 0; y < height; y++){
            let r = 255;
            let g = ((width-x)/ x)* 255;
            let b = 0;
            let a = 255;
        setPixelDos(imageData, x, y, r, g, b, a);
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
}

function setPixelDos(imageData, x, y, r, g, b, a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

/* 6) Pintar un rectángulo en pantalla, utilizando tres o cuatro colores en un gradiente. Todos los
colores deben ser armonías tonales. Puede ser en el eje X o Y.*/
function ejercicioSeis(){

let ctx = document.querySelector("#canvasSeis").getContext("2d");
let width = 400;
let height = 800;

let imageData = ctx.createImageData(width,height);
let r;
let g;
let b;
let a;

    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
    let coeficiente = (width / 2);
    r = ((x / coeficiente) * 238);
    g = ((x / coeficiente) * 233);
    b = ((x / coeficiente) * 130);
    a = 255;
    setPixelDos(imageData, x, y, r, g, b, a);        
        }
    }

    let valorTresCuarto = (width/2);
    for(let x = valorTresCuarto; x < width; x++){
        for(let y = 0; y < height; y++){
            let r = 212;
            let g = ((width-x)/ x)* 209;
            let b = 106;
            let a = 255;
        setPixelDos(imageData, x, y, r, g, b, a);
        }
    }

    let color = (width/2);
    for(let x = color; x < width; x++){
        for(let y = 0; y < height; y++){
            let r = 209;
            let g = 204;
            let b = 60;
            let a = 255;
        setPixelDos(imageData, x, y, r, g, b, a);    
        }
    }

    let colorTwo = (width/2);
    for(let x = colorTwo; x < width; x++){
        for(let y = 0; y < height; y++){
            let r = ((x / colorTwo)*250); 
            let g = ((x / colorTwo)*252); 
            let b = ((x / colorTwo)*149); 
            let a = 255;
        setPixelDos(imageData, x, y, r, g, b, a);    
        }
    }
    ctx.putImageData(imageData, 0, 0);
}
    


/* 7) Cargar una Imagen desde disco o URL
a) Dibujar la imagen dentro del canvas
*/ 
    function ejercicioSiete(){
    
    let canvas = document.querySelector("#canvasSiete");
    let input = document.querySelector(".input1");
   
    
    let ctx = canvas.getContext("2d");        
    ctx.fillStyle = "#024359"; // le agrego background color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
 canvas.addEventListener('click', colorGrey);
    input.onchange = e => {

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
    // aca edito el imageData
    /*for(let x = 0; x < imageData.width; x++){     esto es de pixeles par
        for(let y = 0; y < imageData.height; y++){
            if(x % 2 == 0){
                let i = (x + imageData.width * y) * 4;
                imageData.data[i + 0] = 0;
                imageData.data[i + 1] = 0;
                imageData.data[i + 2] = 0;
            }
        }
    }*/
    ctx.putImageData(imageData, 0, 0);
}


}
}

//canvas.addEventListener('click', fondoGris);



    function colorGrey(){
    
    let canvas = document.querySelector("#canvasSiete");
    let ctx = canvas.getContext("2d");
        
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixeles = imageData.data;
    for (let i = 0; i < pixeles.length; i += 4) {
        let sum = pixeles[i] + pixeles[i+1] + pixeles[i+2];
        let avg = parseInt(sum/3);
        pixeles[i] = avg;
        pixeles[i+1] = avg;
        pixeles[i+2] = avg;
      }
      imageData.data = pixeles;
      ctx.putImageData(imageData, 0, 0);

    }
    
}
 


// B) Implementar una función que aplique el filtro de escala de grises y muestre el resultado en el canvas.    

