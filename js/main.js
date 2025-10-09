// import de la class Block
import Blocks from "./blocks.js"

// array qui vas stocker les données principales
const blocks = []

// fonctions
function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

// crée chaque blocks
blocks.push(new Blocks("text"));
blocks.push(new Blocks("div"));
blocks.push(new Blocks("list"));
blocks.push(new Blocks("text"));

document.getElementById("dropZones").childNodes.forEach(dropzone => {

    if (dropzone.nodeType !== 3) {
        console.log(dropzone.nodeType);
        dropzone.ondragover = (event) => allowDrop(event);
        dropzone.ondrop = (event) => drop(event);
    }
});