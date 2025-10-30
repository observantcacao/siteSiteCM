// import de la class Block
import Blocks from "./blocks.js"
let result = document.getElementById("result");

// array qui vas stocker les données principales
const blocks = []
let dropBlock = []

// fonctions
function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");

    if (event.target.tagName === "BUTTON" || event.target.tagName === "INPUT") {
        return;
    }

    const droppedElement = document.getElementById(data);

    // Suppression du bloc de l'ancienne position
    if (droppedElement.parentElement && droppedElement.parentElement.id !== event.target.id) {
        droppedElement.parentElement.removeChild(droppedElement);
    }

    // Ajout de l'élément dans la nouvelle position
    event.target.appendChild(droppedElement);

    const dropZoneId = event.target.id;
    if (dropZoneId) {
        const resultZones = document.querySelectorAll("#result > div");

        // Refresh
        resultZones.forEach(zone => {
            if (zone.textContent === droppedElement.querySelector(".card-body").textContent) {
                zone.textContent = "";
            }
        });

        const resultZone = document.querySelector(`#result > div[id="${dropZoneId}"]`);
        if (resultZone) {
            // Affichage résultat
            resultZone.textContent = droppedElement.querySelector(".card-body").textContent;
        }
    }
}

// crée chaque blocks
blocks.push(new Blocks("text"));
blocks.push(new Blocks("div"));
blocks.push(new Blocks("list"));
blocks.push(new Blocks("list"));

document.getElementById("dropZones").childNodes.forEach(dropzone => {

    if (dropzone.nodeType !== 3) {
        dropzone.ondragover = (event) => allowDrop(event);
        dropzone.ondrop = (event) => drop(event);
    }

    let i = 0;
});