// initialisation des zones d'action (et de la zone des pièces)
let pieces = document.querySelectorAll(".cardPiece");
let sidebar = document.querySelector(".bg-dark"); // <- gauche
let centerArea = document.querySelector(".flex-fill.bg-light"); // <- zoen du centre
let rightZone = document.querySelector(".right-zone"); // <- zone d'affichage

// met a jour la zone d'affichage avec 
function updateRightZone() {
    rightZone.innerHTML = ""; // Remet la zone vide
    let centerPieces = centerArea.querySelectorAll(".cardPiece");

    centerPieces.forEach(piece => {
        let element;

        switch (piece.textContent.trim().toLowerCase()) {
            case "text":
                element = document.createElement("p");
                element.textContent = "Ceci est un texte.";
                break;

            case "rentrer du texte":
                element = document.createElement("input");
                element.type = "text";
                element.placeholder = "Entrez votre texte ici...";
                break;

            case "liste":
                element = document.createElement("ul");
                ["Élément 1", "Élément 2", "Élément 3"].forEach(text => {
                    let li = document.createElement("li");
                    li.textContent = text;
                    element.appendChild(li);
                });
                break;

            case "section":
                element = document.createElement("section");
                element.textContent = "Ceci est une section.";
                element.style.border = "1px solid black";
                element.style.padding = "10px";
                break;

            case "div":
                element = document.createElement("div");
                element.textContent = "Ceci est une div.";
                element.style.background = "#f0f0f0";
                element.style.padding = "10px";
                break;

            case "lien":
                element = document.createElement("a");
                element.href = "#";
                element.textContent = "Cliquez ici";
                element.style.color = "blue";
                break;

            case "image":
                element = document.createElement("img");
                element.src = "https://via.placeholder.com/150";
                element.alt = "Image";
                element.style.width = "100px";
                break;

            case "titre":
                element = document.createElement("h2");
                element.textContent = "Titre Exemple";
                break;

            case "scroll down":
                element = document.createElement("button");
                element.textContent = "Faire défiler";
                element.onclick = () => window.scrollBy(0, 100);
                break;

            default:
                element = document.createElement("span");
                element.textContent = piece.textContent;
                break;
        }

        element.classList.add("piece-element");
        rightZone.appendChild(element);
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
            //console.log(element.style.left, element.style.top);
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
                //element.remove();
                element.classList.add("fade-out");
                setTimeout(() => {
                    element.remove();
                }, 300);
            }
            // si c'est placé a droite alors on supprime
            else if (
                elemRect.left < rightRect.right &&
                elemRect.right > rightRect.left &&
                elemRect.top < rightRect.bottom &&
                elemRect.bottom > rightRect.top
            ) {
                //element.remove();
                element.classList.add("fade-out");
                setTimeout(() => {
                    element.remove();
                }, 300);
            }
            // si c'est placé en haut ou en bas on supprime
            /*
            else if (elemRect.bottom < 0 || elemRect.top > event.clientY) {
                element.remove();
            }*/
            else if (elemRect.bottom < 0 || elemRect.top > window.innerHeight) {
                //element.remove();
                element.classList.add("fade-out");
                setTimeout(() => {
                    element.remove();
                }, 300);
            updateRightZone();
            }

            updateRightZone(); // Update right zone when elements move
        });
    });

    element.ondragstart = () => false; // Prevent default drag behavior

    // Delete on double-click
    element.addEventListener("dblclick", () => {
        // element.remove();
        element.classList.add("fade-out");
                setTimeout(() => {
                    element.remove();
                }, 300);
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

        clone.style.position = "fixed";
        clone.style.left = event.pageX + "px";
        clone.style.top = event.pageY + "px";
        clone.style.cursor = "grabbing";
        clone.style.zIndex = "1000";

        let shiftX = event.clientX - rect.left;
        let shiftY = event.clientY - rect.top;

        function moveAt(pageX, pageY) {
            clone.style.left = pageX - shiftX + "px";
            clone.style.top = pageY - shiftY + "px";
            //console.log(clone.style.left, clone.style.top);
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
                //clone.remove();
                clone.classList.add("fade-out");
                setTimeout(() => {
                    clone.remove();
                }, 300);
            }
            // If placed in the right zone, remove it
            else if (
                cloneRect.left < rightRect.right &&
                cloneRect.right > rightRect.left &&
                cloneRect.top < rightRect.bottom &&
                cloneRect.bottom > rightRect.top
            ) {
                //clone.remove();
                clone.classList.add("fade-out");
                setTimeout(() => {
                    clone.remove();
                }, 300);
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
            updateRightZone();
        }, { once: true });

        // Enable double-click delete for the clone
        clone.addEventListener("dblclick", () => {
            //clone.remove();
            clone.classList.add("fade-out");
            setTimeout(() => {
                clone.remove();
            }, 300);
            updateRightZone(); // Update right zone when an element is deleted
        });
    });

    piece.ondragstart = () => false;
});
