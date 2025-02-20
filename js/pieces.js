// initialisation des zones d'action (et de la zone des pièces)
let pieces = document.querySelectorAll(".cardPiece");
let sidebar = document.querySelector(".bg-dark"); // <- gauche
let centerArea = document.querySelector(".flex-fill.bg-light"); // <- zoen du centre
let rightZone = document.querySelector(".right-zone"); // <- zone d'affichage

// met a jour la zone d'affichage avec 
function updateRightZone() {
    rightZone.innerHTML = ""; // remet la zone vide
    let centerPieces = centerArea.querySelectorAll(".cardPiece");
    centerPieces.forEach(piece => {
        let textElement = document.createElement("div");
        textElement.textContent = piece.textContent;
        textElement.classList.add("piece-text");// <- ajoute que le texte de la pièce
        rightZone.appendChild(textElement);
    });
}

// rend l'élément bougeable
function makeDraggable(element) {
    element.addEventListener("mousedown", (event) => {
        event.preventDefault();

        let rect = element.getBoundingClientRect();
        let shiftX = event.clientX - rect.left;
        let shiftY = event.clientY - rect.top;

        element.style.cursor = "grabbing";

        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + "px";
            element.style.top = pageY - shiftY + "px";
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener("mousemove", onMouseMove);

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onMouseMove);
            element.style.cursor = "grab";

            let elemRect = element.getBoundingClientRect();
            let sidebarRect = sidebar.getBoundingClientRect();
            let centerRect = centerArea.getBoundingClientRect();
            let rightRect = rightZone.getBoundingClientRect();

            // si c'est placé a gauche alors on supprime
            if (
                elemRect.left < sidebarRect.right &&
                elemRect.right > sidebarRect.left &&
                elemRect.top < sidebarRect.bottom &&
                elemRect.bottom > sidebarRect.top
            ) {
                element.remove();
            }
            // si c'est placé a droite alors on supprime
            else if (
                elemRect.left < rightRect.right &&
                elemRect.right > rightRect.left &&
                elemRect.top < rightRect.bottom &&
                elemRect.bottom > rightRect.top
            ) {
                element.remove();
            }
            // si c'est placé en haut ou en bas on supprime
            else if (elemRect.bottom < 0 || elemRect.top > event.clientY) {
                element.remove();
            }

            updateRightZone(); // Update right zone when elements move
        });
    });

    element.ondragstart = () => false; // Prevent default drag behavior

    // Delete on double-click
    element.addEventListener("dblclick", () => {
        element.remove();
        updateRightZone(); // Update right zone when an element is deleted
    });
}

// Attach draggable functionality to all initial pieces
pieces.forEach(piece => {
    piece.addEventListener("mousedown", (event) => {
        event.preventDefault();

        let clone = piece.cloneNode(true);
        document.body.appendChild(clone);

        let rect = piece.getBoundingClientRect();
        clone.style.width = rect.width + "px";
        clone.style.height = rect.height + "px";

        clone.style.position = "absolute";
        clone.style.left = event.pageX + "px";
        clone.style.top = event.pageY + "px";
        clone.style.cursor = "grabbing";
        clone.style.zIndex = "1000";

        let shiftX = event.clientX - rect.left;
        let shiftY = event.clientY - rect.top;

        function moveAt(pageX, pageY) {
            clone.style.left = pageX - shiftX + "px";
            clone.style.top = pageY - shiftY + "px";
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener("mousemove", onMouseMove);

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onMouseMove);
            clone.style.cursor = "grab";

            let cloneRect = clone.getBoundingClientRect();
            let sidebarRect = sidebar.getBoundingClientRect();
            let centerRect = centerArea.getBoundingClientRect();
            let rightRect = rightZone.getBoundingClientRect();

            // If in the left sidebar, remove it
            if (
                cloneRect.left < sidebarRect.right &&
                cloneRect.right > sidebarRect.left &&
                cloneRect.top < sidebarRect.bottom &&
                cloneRect.bottom > sidebarRect.top
            ) {
                clone.remove();
            }
            // If placed in the right zone, remove it
            else if (
                cloneRect.left < rightRect.right &&
                cloneRect.right > rightRect.left &&
                cloneRect.top < rightRect.bottom &&
                cloneRect.bottom > rightRect.top
            ) {
                clone.remove();
            }
            // If placed in the center, keep it draggable and allow double-click delete
            else if (
                cloneRect.left < centerRect.right &&
                cloneRect.right > centerRect.left &&
                cloneRect.top < centerRect.bottom &&
                cloneRect.bottom > centerRect.top
            ) {
                centerArea.appendChild(clone);
                makeDraggable(clone);
                updateRightZone(); // Update right zone when an element is added
            }
        }, { once: true });

        // Enable double-click delete for the clone
        clone.addEventListener("dblclick", () => {
            clone.remove();
            updateRightZone(); // Update right zone when an element is deleted
        });
    });

    piece.ondragstart = () => false;
});
