let pieces = document.querySelectorAll(".cardPiece");
let sidebar = document.querySelector(".bg-dark"); // La barre latérale gauche
let centerArea = document.querySelector(".flex-fill.bg-light"); // Zone centrale

pieces.forEach(piece => {
    piece.addEventListener("mousedown", (event) => {
        event.preventDefault();

        // Clone le morceau cliqué
        let clone = piece.cloneNode(true);
        document.body.appendChild(clone);

        // Récupère la taille de l'élément original
        let rect = piece.getBoundingClientRect();
        clone.style.width = rect.width + "px";
        clone.style.height = rect.height + "px";

        // Position initiale
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

            // Vérifie si le clone est dans la barre latérale gauche
            let cloneRect = clone.getBoundingClientRect();
            let sidebarRect = sidebar.getBoundingClientRect();

            // Si le clone est dans la barre gauche, on le supprime
            if (
                cloneRect.left < sidebarRect.right &&
                cloneRect.right > sidebarRect.left &&
                cloneRect.top < sidebarRect.bottom &&
                cloneRect.bottom > sidebarRect.top
            ) {
                clone.remove();
            } else {
                // Vérifie si le clone est déposé à droite de la zone centrale
                let centerRect = centerArea.getBoundingClientRect();
                let pageWidth = window.innerWidth;

                if (cloneRect.left > centerRect.right) {
                    // Si le clone est à droite, on le remet au centre
                    clone.style.left = (centerRect.left + centerRect.right) / 2 - clone.offsetWidth / 2 + "px";
                    clone.style.top = centerRect.top + "px"; // Ramène à la position centrale (haut)
                } else {
                    makeDraggable(clone); // Rendre le clone déplaçable si il reste dans la zone centrale
                }
            }
        }, { once: true });
    });

    piece.ondragstart = () => false; // Empêche le comportement de drag par défaut
});

// Fonction pour rendre un clone déplaçable après création
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

            // Vérifie si l'élément est dans la barre latérale
            let elemRect = element.getBoundingClientRect();
            let sidebarRect = sidebar.getBoundingClientRect();

            if (
                elemRect.left < sidebarRect.right &&
                elemRect.right > sidebarRect.left &&
                elemRect.top < sidebarRect.bottom &&
                elemRect.bottom > sidebarRect.top
            ) {
                element.remove(); // Supprime l'élément si lâché dans la barre gauche
            } else {
                // Vérifie si l'élément est déposé à droite de la zone centrale
                let centerRect = centerArea.getBoundingClientRect();

                if (elemRect.left > centerRect.right) {
                    // Si le clone est à droite, le ramener au centre
                    element.style.left = (centerRect.left + centerRect.right) / 2 - element.offsetWidth / 2 + "px";
                    element.style.top = centerRect.top + "px"; // Ramène à la position centrale (haut)
                }
            }
        }, { once: true });
    });

    element.ondragstart = () => false; // Empêche le comportement de drag par défaut

    // Ajoute un événement de double-clic pour supprimer l'élément
    element.addEventListener("dblclick", () => {
        element.remove(); // Supprime l'élément lors du double-clic
    });
}