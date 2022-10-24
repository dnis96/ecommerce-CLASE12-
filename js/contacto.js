let contactos= [];

let form = document.querySelector('form');
form.addEventListener('submit', (event) =>{
    event.preventDefault();
   /* let data = Object.fromEntries(new FormData(event.target));
    alert(JSON.stringify(data));*/
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let direccion = document.getElementById('inputAddress').value;
    let ciudad = document.getElementById('inputCity').value;
    let sexo = document.getElementById('inputState').value;
    let correo = document.getElementById('exampleFormControlInput1').value;
    let comentario = document.getElementById('exampleFormControlTextarea1').value;
    let notific = document.getElementById('gridCheck').value;
    let usuario ={
        nom: nombre,
        apell:apellido,
        direc: direccion,
        ciud:ciudad,
        sexo:sexo,
        correo:correo,
        coment:comentario,
        Notificacion:notific
    };
    contactos.push(usuario);
    localStorage.setItem('contactos',JSON.stringify(contactos));
});

