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

    const data = event.dataTransfer.getData("text");
    const droppedElement = document.getElementById(data);
    if (!droppedElement) return;

    const dropZone = event.target.closest("#dropZones > div");
    if (!dropZone) return;

    if (event.target.tagName === "BUTTON" || event.target.tagName === "INPUT") {
        return;
    }

    // Récupération des anciens parents
    const oldParent = droppedElement.parentElement;
    const oldParentId = oldParent?.id;

    // Si c’est la même zone on fait rien
    if (oldParent === dropZone) return;

    // Suppression du bloc dans l'ancien parent
    if (oldParent) {
        oldParent.removeChild(droppedElement);
    }

    // Suppression du texte résultat dans l'ancient parent
    if (oldParentId) {
        const oldResultZone = document.querySelector(`#result > div[id="${oldParentId}"]`);
        if (oldResultZone) oldResultZone.textContent = "";
    }

    // Ajout du bloc dans la nouvelle zone
    dropZone.appendChild(droppedElement);

    // Affichage du résultat
    const resultZone = document.querySelector(`#result > div[id="${dropZone.id}"]`);
    if (resultZone) {
        resultZone.innerHTML = droppedElement.dataset.value || "(vide)";
    }
}



// crée chaque blocks
blocks.push(new Blocks("Paragraphe", "<p>Ceci est un bloc de texte<p>"));
blocks.push(new Blocks("div", "<div>Contenu de la div</div>"));
blocks.push(new Blocks("O-List", "<ol> <li>Élement 1</li> <li>Élement 2</li> <li>Élement 3</li> </ol>"));
blocks.push(new Blocks("U-List", "<ul> <li>Élement 1</li> <li>Élement 2</li> <li>Élement 3</li> </ul>"));

document.getElementById("dropZones").childNodes.forEach(dropzone => {

    if (dropzone.nodeType !== 3) {
        dropzone.ondragover = (event) => allowDrop(event);
        dropzone.ondrop = (event) => drop(event);
    }

    let i = 0;
});