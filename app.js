// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// declaras un arreglo para almacenar todos los nombres de amigos agregados
let nombresDeAmigos =[];
//Este arreglo mantiene solo los amigos que aún no han sido sorteados. 
let amigosDisponibles =[];
let intentos = 1;//Esta variable lleva la cuenta de cuántos sorteos se han hecho
let MAX_INTENTOS = 5;
let amigoSorteado = "";




//Esta función agrega un amigo a la lista y también lo añade al grupo de amigos disponibles para el sorteo.
function agregarAmigo(){
    let inputamigo = document.getElementById('amigo');
    let amigo = inputamigo.value;
    let amigoEnMinus=amigo[0].toUpperCase()+amigo.slice(1);//Estohace quelaprimeraletra delnombresseaenmayuscula

    if(!amigoEnMinus){ // amigo == false otro modo
        alert("Debes ingresar un nombre");//``
        return;
    }
    if (nombresDeAmigos.includes(amigoEnMinus)) {
        alert("Este nombre ya fue agregado");
        return;
    }
    nombresDeAmigos.push(amigoEnMinus);
    amigosDisponibles.push(amigoEnMinus);
    console.log(nombresDeAmigos);
    inputamigo.value = "";
    inputamigo.focus();
    renderizarAmigos();
};

function renderizarAmigos(){
    let listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = "";

    for(let i = 0; i < nombresDeAmigos.length; i++){
        let item = document.createElement('li');
        item.textContent = nombresDeAmigos[i];
        listaAmigos.appendChild(item);
    }
};
function actualizarResultado(mensaje) {
    document.getElementById('resultado').innerHTML = mensaje;
}

function actualizarBotones(deshabilitarSortear, habilitarReiniciar) {
    document.getElementById('botonSortear').disabled = deshabilitarSortear;
    document.getElementById('botonReiniciar').disabled = habilitarReiniciar;
}

function verificarBotonSortear() {
    const botonSortear = document.getElementById('botonSortear');
    botonSortear.addEventListener('click', () => {
        if (botonSortear.disabled) {
            actualizarBotones(false, true);
            intentos = 1;
        }
    });
}


//Esta función realiza el sorteo, selecciona aleatoriamente un amigo disponible y lo elimina de la lista para no ser sorteado de nuevo. También controla el número máximo de intentos. 


function sortearAmigo() {
    if (nombresDeAmigos.length === 0) {
        actualizarResultado("No hay amigos para sortear");
        actualizarBotones(true, false);
        return;
    }
    

    let indiceSorteado = Math.floor(Math.random() * amigosDisponibles.length);
    amigoSorteado = amigosDisponibles.splice(indiceSorteado, 1)[0];


   
    actualizarResultado(`El amigo secreto ha sido sorteado. ¡Adivina quién es!`);
    
    actualizarBotones(true, false);

    
}



function adivinarAmigo() {
    if (intentos > MAX_INTENTOS) {
        actualizarResultado("Has alcanzado el límite de intentos. Fin del juego.");
        actualizarBotones(true, false);
        
        return;
    }

    let nombreAdivinanza = document.getElementById('adivinanza').value;
    let adivinanzaEnMinus = nombreAdivinanza[0].toUpperCase()+nombreAdivinanza.slice(1);

    

    if (adivinanzaEnMinus === amigoSorteado) {
        intentos = 1;
        actualizarResultado(`¡Felicidades! Adivinaste, el amigo secreto es: ${amigoSorteado}`);
        document.getElementById('adivinanza').value = ""; // Borra lo escrito en adivinanza
       
        if (amigosDisponibles.length > 0) {
            actualizarBotones(false, false); // Permite seguir sorteando si aún hay amigos
            
        } else {
            setTimeout(() => {
                actualizarResultado("Se han sorteado todos los amigos.");
                actualizarBotones(true, false);
            }, 2000); // Retraso para mostrar primero el mensaje de acierto
        }
        
        
        
    } else {
        actualizarResultado(`Intento ${intentos}: No acertaste. Sigue intentando.`);
        intentos++;
        document.getElementById('adivinanza').value = ""; // Borra lo escrito en adivinanza

        if (intentos > MAX_INTENTOS) {
            actualizarResultado("Has alcanzado el límite de intentos. Fin del juego.");
            actualizarBotones(true, false);
            
        }

    }
 
    
}



function Limpiar(){
    let limpiarLista = document.getElementById('listaAmigos');
    limpiarLista.innerHTML= "";
    nombresDeAmigos = [];
    amigosDisponibles=[];
    intentos= 1;
    amigoSorteado = "";
}
//Esta función reinicia el juego, vacía las listas, restablece los intentos y habilita/deshabilita los botones correspondientes.


function resetGame() {
   
    Limpiar();
    actualizarResultado("");
    document.getElementById('amigo').value = "";
    document.getElementById('adivinanza').value = "";
    document.getElementById('amigo').focus();
    actualizarBotones(false, true);
    actualizarResultado("El juego ha sido reiniciado");
  }