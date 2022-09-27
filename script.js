// Ventana paraostrar estadisticas
//ventanaEstadisticas = window.open( "", "ventana1", "height=200,width=700,left=300,location=yes,menubar=no,resizable=no,scrollbars=yes,status=no,titlebar=yes,top=300" );

if(window.localStorage.length == 0) {
    window.localStorage.setItem("ganadas","0");
    window.localStorage.setItem("perdidas","0");
    window.localStorage.setItem("jugadas","0");
}

let gana = window.localStorage.getItem("ganadas"); 
let perd = window.localStorage.getItem("perdidas");
let juga = window.localStorage.getItem("jugadas");

let palabra_ = "";
let palabra = "";
let letra = "";

let partidasJugadas = 0;
let partidasGanadas = 0;
let partidasPerdidas = 0;

let numeroLetrasFalladas = 0;
let numeroLetrasTopeFallar = 0;
let letrasFalladas = [];

// Crea div para escribir palabra oculta ex: _ _ _ _
let palabras_Ocultas = document.getElementById("palabrasOcultas");

let divAbecedario = document.getElementById("abecedario");
divAbecedario.innerHTML = "";


function iniciaPartida() {

    // Treu els continguts creats a l'anterior partida
    divAbecedario.innerHTML = "";
    palabras_Ocultas.innerHTML = "";
    palabra_ = "";
    numeroLetrasFalladas = 0;
    numeroLetrasTopeFallar = 0;
    document.getElementById("img").src="";

    // Demana paraula
    palabra = prompt("Escriu una paraula");
    palabra = comprobaParaula(palabra);

    // Crea palabra _ generica
    palabraArray = palabra.split("");
    for(let j = 0; j < palabraArray.length; j++) {
        palabra_ += "_ "; 
    }
    palabra_ = palabra_.trim();

    // Crea etiqueta p amb la paraula encriptada ex: _ _ _ _
    escriuParaulaOculta(palabra_, palabras_Ocultas);

    // Crea els bottons que contindran les lletres de l'abecedari
    let alfabeto = "abcdefghijklmnopqrstuvwxyz";    
    alfabeto = alfabeto.split("");

    divAbecedario.innerHTML += "<div class='letrasAbecedario'>";
    for(i = 0; i < alfabeto.length; i++) {
        divAbecedario.innerHTML += `<button class='letras' id='${alfabeto[i]}' onclick='marcaLletra(this)'></div>${alfabeto[i]}</button>`;
    }
    divAbecedario.innerHTML += "</div>";

    numeroLetrasTopeFallar = 7;

}

function marcaLletra(letraLlama) {

    // Coje la letra que clicka el usuario
    let idLetra = letraLlama.id;

    let palabra_Antigua = palabra_;
    palabra_ = comparaLetra(idLetra, palabra);

    if(palabra_ == palabra_Antigua) {
        
        letrasFalladas = guardaLetrasFalladas(letra, letrasFalladas);
        
        // Mostra l'imatge en l'estat del joc
        document.getElementById("img").src=`./img/penjat_${numeroLetrasFalladas}.png`;

        numeroLetrasFalladas++;

        // Mostra les lletres fallades al div d'id lletresUtilitzades
        let lletresUtilitzades = document.getElementById("lletresUtilitzades");
        lletresUtilitzades.innerHTML = `<p>${letrasFalladas}</p>`;

        // Si a fallat tots els casos surt
        if(numeroLetrasFalladas == numeroLetrasTopeFallar) {
            alert("T'has quedat sense intents");
            partidasPerdidas++;
           
            console.log("XXX" +perd);
            perd = parseInt(perd);
            console.log("XXX" +perd);
            perd += partidasPerdidas;
            console.log("XXX" +perd);
            perd = perd.toString();
            window.localStorage.removeItem("perdidas");
            localStorage.setItem("perdidas",perd);

            partidasJugadas++;

            juga = parseInt(juga);
            juga += partidasJugadas;
            juga = juga.toString();
            window.localStorage.removeItem("jugadas");
            localStorage.setItem("jugadas",juga);
        }
    
    // Si encerta la lletra la sustitueix pel text amb _
    } else {

        escriuParaulaOculta(palabra_, palabras_Ocultas);

        // Per comparar trellem els espais entre paraules
        let palabraComparar = palabra_.replace(/\s+/g,'');
        // Si la paraula es igual que la paraula oculta guanya
        if(palabra.toLowerCase() == palabraComparar.toLocaleLowerCase()) {
            alert("Has guanyat!!");
            partidasGanadas++;
            
            gana = parseInt(gana);
            gana += partidasGanadas;
            gana = gana.toString();
            window.localStorage.removeItem("ganadas");
            window.localStorage.setItem("ganadas",gana);

            partidasJugadas++;

            juga = parseInt(juga);
            juga += partidasJugadas;
            juga = juga.toString();
            window.localStorage.removeItem("jugadas");
            window.localStorage.setItem("jugadas",juga);
        }

    }
}

function estadisticas() {

    gana = window.localStorage.getItem("ganadas"); 
    perd = window.localStorage.getItem("perdidas");
    juga = window.localStorage.getItem("jugadas");

    ventanaEstadisticas = window.close();
    ventanaEstadisticas = window.open( "", "ventana1", "height=200,width=700,left=300,location=yes,menubar=no,resizable=no,scrollbars=yes,status=no,titlebar=yes,top=300" );

    ventanaEstadisticas.document.write(`Total de partides: ${juga}<br>`);
    ventanaEstadisticas.document.write(`Partides guanyades: ${gana} (${estadisticaGanadas()}%)<br>`);
    ventanaEstadisticas.document.write(`Partides perdudes: ${perd} (${estadisticaPerdidas()}%)`);
}


function limpiaLocalStorage() {
    window.localStorage.clear();
}



/***********/
/*FUNCTIONS*/
/***********/
function comprobaInicio(entrada) {
    
    // Palabra erronea sale
    if(entrada == "" || isNaN(entrada) == true) return -1;
    else if(entrada == "1") return 1;
    else if(entrada == "2") return "2";
    else if(entrada == "3") return "3";
    return -1;
}

function comprobaParaula(palabra) {
    while(true) {
        if(palabra == "" || isNaN(palabra) == false || palabra.length <= 1) {
            console.log("Paraula invalida");
            palabra = prompt("Escriu una paraula");
        }
        else {
            break;
        }
    }
    return palabra;
} 

function palabraOculta(palabra) {
    palabra_ = "";
    for(i = 0; i < palabra.length; i++) {
        palabra_ += "_ ";
    }
    return palabra_.trim();
}

function comprobaLetraValida(letra) {
    while(letra.length > 1 || isNaN(letra) == false) {
        letra = prompt("Lletra invalida, prueba otra");
    }
    return letra;
}

function comparaLetra(idLetra, palabra) {
    let palabraPartida = palabra.split("");
    for(i = 0; i < palabra.trim().length; i++) {

        if(palabraPartida[i].toLowerCase() == idLetra.toLowerCase()) {
            
            palabra_ = palabra_.split(" ");
            palabra_[i] = idLetra;
            palabra_ = palabra_.join(" ");
        }
    }
    return palabra_;
}

function guardaLetrasFalladas(letra, letrasFalladas) {
    if(letrasFalladas.length == 0) {
        return letrasFalladas += letra;
    } else {
        return letrasFalladas += ","+letra;
    }
}

function estadisticaGanadas() {
    //gana = window.localStorage.getItem("ganadas");
    //juga = window.localStorage.getItem("jugadas");
    if(juga == 0 || juga == null) return 0;
    return gana/juga*100;
}
function estadisticaPerdidas() {
    //perd = window.localStorage.getItem("perdidas");
    //juga = window.localStorage.getItem("jugadas");
    if(juga == 0 || juga == null) return 0;
    return perd/juga*100;
}

function mostraLletresUtilitzades(lletresUtilitzades) {
    lletresUtilitzades.innerHTML = "<p>";
    for(let i = 0; i < letrasFalladas; i++) {
        if(i == 0) {
            lletresUtilitzades.innerHTML += le;
        } else {
            lletresUtilitzades.innerHTML += ``;
        }       
    }
}

function escriuParaulaOculta(palabra_, divAbecedario) {

    divAbecedario.innerHTML = "<div id='palabraOculta'></div>";
    let divPalabraOculta = document.getElementById("palabraOculta");
    palabra_Array = palabra_.trim().split("");

    divPalabraOculta.innerHTML = `<p id='palabrasOcultas'>`;
    for(let i = 0; i < palabra_Array.length; i++) {
        
        divPalabraOculta.innerHTML += palabra_Array[i];
    }
    divPalabraOculta.innerHTML += `</p>`;
}