let menuProductos = document.getElementById("menu");
//console.log(menuProductos);
let botones;
let cards;
let arrayCarrito = [];
localStorage.setItem('listaProductos', JSON.stringify(productos));
let listProdcuts;
localStorage.setItem('listaCarrito', JSON.stringify(arrayCarrito));

var bgColors = [
    "linear-gradient(to right, #00b09b, #96c93d)",
    "linear-gradient(to right, #ff5f6d, #ffc371)",
  ],
 k = 0;

//agregando sweetalert 
function mensaje(){
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Su compra ha sido completada. Gracias por Comprar',
        showConfirmButton: false,
        timer: 1500
      })
}

class ProductoComprado {
  constructor(producto, cantidad, precio) {
    this.producto = producto;
    this.cantidad = cantidad;
    this.precio = precio;
  }
}

function crearCard(productos) {
  //console.log(productos.length);
  menuProductos.innerHTML="";
  for (let i = 0; i < productos.length; i++) {
    let divC = document.createElement("div");
    divC.className = "carta";
    //aplico operador ternario y desestructuracion de objetos
    const {nombre, desc, precio, img} = productos[i];
    i===0 ? (
      divC.innerHTML = `<div class="card_sup card-sup-1">
                            <div class="lado frente">
                                <img class="imagen_prod" src=${img} alt="imagen_producto_botones">
                                <p>${nombre}</p>
                                <span>precio: $${precio}</span>
                            </div>
                            <div class="lado atras">
                            <span><p>${desc}</p></span>
                                <span>color: surtidos</span>
                                <span>tamaño: 3.0 mm</span>
                            </div>
                        </div>
                        <div class="card_inf">
                            <div class="btn_cantidad">
                                <button class='btnmas'><span>+</span></button>
                                <label class='number' for="">0</label>
                                <button class='btnmenor'><span>-</span></button>
                            </div>
                            <button class='agregar'><span>add</span></button>
                        </div>`
    ) : (
      divC.innerHTML = `<div class="card_sup">
                            <div class="lado frente">
                                <img class="imagen_prod" src=${img} alt="imagen_producto_botones">
                                <p>${nombre}</p>
                                <span>precio: $${precio}</span>
                            </div>
                            <div class="lado atras">
                                <span><p>${desc}</p></span>
                                <span>color: surtidos</span>
                                <span>tamaño: 3.0 mm</span>
                            </div>
                        </div>
                        <div class="card_inf">
                            <div class="btn_cantidad">
                                <button class='btnmas'><span>+</span></button>
                                <label class='number' for="">0</label>
                                <button class='btnmenor'><span>-</span></button>
                            </div>
                            <button class='agregar'><span>add</span></button>
                        </div>`
    );
    
    menuProductos.appendChild(divC);
  }
  //a cada boton de cada card se le va aplicando los eventos correspondientes
  
  let cardss = document.getElementsByClassName("carta");
  cards = cardss;
  let btnmas = document.getElementsByClassName("btnmas");
  botones = btnmas;
  let agregarC = document.getElementsByClassName("agregar");
  let btnmenor = document.getElementsByClassName("btnmenor");
  let number = document.getElementsByClassName("number");
  //console.log(number);
  
  for (let i = 0; i < btnmas.length; i++) {
    //a cada boton '+' se le aplica el evento de aumentar la cantidad de productos a comprar
    btnmas[i].addEventListener("click", () => {
      let numero = parseInt(number[i].innerText);
      if (productos[i].cantidad > numero) {
        numero++;
        number[i].innerText = numero;
      }
    });
    //a cada boton '-' se le aplica el evento de disminuir la cantidad de productos a comprar
    btnmenor[i].addEventListener("click", () => {
      let numero = parseInt(number[i].innerText);
      if (numero != 0) {
        numero--;
        number[i].innerText = numero;
      }
    });
    //a cada boton 'add' se le aplica el evento de agregar el producto comprado al carrito
    agregarC[i].addEventListener("click", () => {
        let arrayCarrito = JSON.parse(localStorage.getItem('listaCarrito'));
        let numero = parseInt(number[i].innerText);
        productos[i].cantidad = productos[i].cantidad - numero;
        localStorage.setItem('listaProductos', JSON.stringify(productos));
        number[i].innerText = 0;
        if (numero != 0) {
        if (arrayCarrito.length === 0) {
          console.log(productos[i].nombre);
          let ProductoC = new ProductoComprado(
            productos[i].nombre,
            numero,
            productos[i].precio * numero
          );
          arrayCarrito.push(ProductoC);
          
        } else {
          let encontrado = arrayCarrito.findIndex(
            (element) => element.producto === productos[i].nombre
          );
          console.log(encontrado);

          if (encontrado === -1) {
            let ProductoC = new ProductoComprado(
              productos[i].nombre,
              numero,
              productos[i].precio * numero
            );
            arrayCarrito.push(ProductoC);
          } else {
            arrayCarrito[encontrado].cantidad =
              arrayCarrito[encontrado].cantidad + numero;
            arrayCarrito[encontrado].precio =
              arrayCarrito[encontrado].precio + productos[i].precio * numero;
          }
        }
        }
      if (productos[i].cantidad === 0) {
        cardss[i].style.display = "none";
      }
      console.log(arrayCarrito);
      localStorage.setItem('listaCarrito', JSON.stringify(arrayCarrito));
    });
    agregarC[i].addEventListener('click',function() {
        //agregando toastify
        Toastify({
          text: "El producto se agrego a su carrito",
          duration: 3000,
          //gravity: "top", // `top` or `bottom`
          //position: "left", // `left`, `center` or `right`
          className:'element'
        }).showToast();
        k++;
    });
    
  }
}

let botonCarrito = document.getElementById("carritoimg");
botonCarrito.addEventListener("click", () => {
  cargarModal();
});

let btnTerminarCompra = document.getElementById('terminarCompra');
btnTerminarCompra.addEventListener('click', () =>{
    let arraycarrito = [];
    localStorage.setItem('listaCarrito', JSON.stringify(arraycarrito));
    mensaje();
});

function cargarModal() {
    let arrayCarrito = JSON.parse(localStorage.getItem('listaCarrito'));
  let modal = document.getElementsByClassName("modal-body");
  modal[0].innerHTML = "";
  let total = 0;
  for (let i = 0; i < arrayCarrito.length; i++) {
    const {producto, cantidad, precio} = arrayCarrito[i];//aplico desestructuracion de objetos
    total = total + precio;
    modal[0].innerHTML += ` <h5>${producto}</h5>
                            <p>Cantidad:${cantidad}........................$${precio}</p>
                            <hr></hr>`;
  }
  let div = document.createElement("div");
  div.innerHTML = `TOTAL:......................................$${total}`;
  modal[0].appendChild(div);
}


function busq (filtro){
    let productos = JSON.parse(localStorage.getItem('listaProductos'));
    let resultado = productos.filter(prod => (prod.nombre.includes(filtro) && prod.cantidad !=0));//aplico operador AND
    let btnF = document.getElementById('btnfiltro');
    btnF.addEventListener('click', ()=>{
        let productos1 = productos.filter(prod => (prod.cantidad !=0));
        crearCard(productos1);
        btnF.style.display='none';});
    btnF.style.display='flex';
    //console.log(resultado);
    //console.log('este es el filtro',filtro);
    crearCard(resultado);
}

//a cada elemento del filtro se le aplica una funcion donde va a filtrar todos los productos de acuerdo al nombre del filtro
// la funcion busq(filtro) tambien hace visible el boton 'dejar de filtrar', para volver a mostrar todos los productos
let filtros = document.getElementsByClassName('nav-item');
//console.log(filtros);
let arr = ['hilo','boton','cinta'];
for (let i = 0; i<filtros.length; i++){
    let a = arr[i];
    //console.log('este es el',a);
    filtros[i].addEventListener('click',()=> busq(a));
}

//creamos todos los productos (cards) y lo mandamos al html
function llamarCrearCard(){
    listProdcuts = JSON.parse(localStorage.getItem('listaProductos'));
    crearCard(listProdcuts);
}


llamarCrearCard();
//console.log(botones);
//console.log(cards);
