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
    let name = droppedElement.dataset.name;
    let value = droppedElement.dataset.value;

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
    
    //on enlève
    droppedElement.removeEventListener("dblclick", droppedElement._onDblClick);

    // créer la fonction qui bouge
    droppedElement._onDblClick = function (event) {
        const currentParent = droppedElement.parentNode;
        const idAutreCote = currentParent ? currentParent.id : null;
        droppedElement.remove();

        if (idAutreCote) {
            const divAutreCote = document.querySelector(`#result > div[id="${idAutreCote}"]`);
            if (divAutreCote) {
                divAutreCote.textContent = ""; // vide l'autre coté
            }
        }
    };

    // ajout du double click pour supprimer
    droppedElement.addEventListener("dblclick", droppedElement._onDblClick);


    // Suppression du texte résultat dans l'ancient parent
    if (oldParentId) {
        const oldResultZone = document.querySelector(`#result > div[id="${oldParentId}"]`);
        if (oldResultZone) oldResultZone.textContent = "";
    }

    // Ajout du bloc dans la nouvelle zone
    if (dropZone.childNodes.length === 0) {
        dropZone.appendChild(droppedElement);
        // Affichage du résultat
        const resultZone = document.querySelector(`#result > div[id="${dropZone.id}"]`);
        if (resultZone) {
            resultZone.innerHTML = droppedElement.dataset.value || "(vide)";
        }


    }

    let toolboxTemp = document.getElementById("toolBox");
    toolboxTemp.innerHTML = "";
    blocks.forEach(x => {
        x.addToolbox();
    })
}

function addBlockInPanelLeft(block, contenu) {
    blocks.push(new Blocks(block, contenu));
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