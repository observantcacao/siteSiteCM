export default class Blocks {
    #id = "";
    #name = "";
    Color = "#898989";
    
    #toolboxDiv = document.getElementById("toolBox");

    constructor(nameD) {
        this.#name = nameD;
        this.#id = crypto.randomUUID();
        this.#addToolbox();
    }

    #addToolbox() {
        const li = document.createElement("li");
        li.classList.add("nav-item");

        const cardPiece = document.createElement("div");
        cardPiece.classList.add("cardPiece", "mx-1");

        const card = document.createElement("div");
        card.classList.add("card");
        card.id = this.#id;
        card.draggable = "true";
        card.ondragstart = (event) => this.#drag(event);
        card.style.display ="flex"
        card.style.flexDirection = "row";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.textContent = this.#name;

        // === Nouveau menu déroulant avec input ===
        const dropdownWrapper = document.createElement("div");
        dropdownWrapper.style.marginTop = "10px";

        const dropdownButton = document.createElement("button");
        dropdownButton.textContent = "Ouvrir input";
        dropdownButton.type = "button";
        dropdownButton.className ="btn btn-outline-primary";

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.placeholder = "Écrire ici...";
        inputField.style.display = "none";
        inputField.style.marginTop = "5px";

        dropdownButton.addEventListener("click", () => {
            inputField.style.display = inputField.style.display === "none" ? "block" : "none";
        });

        dropdownWrapper.appendChild(dropdownButton);
        dropdownWrapper.appendChild(inputField);

        
        card.appendChild(cardBody);
        card.appendChild(dropdownWrapper);
        cardPiece.appendChild(card);
        li.appendChild(cardPiece);

        this.#toolboxDiv.appendChild(li);
    }

    #drag(event) {
        event.dataTransfer.setData("text", event.target.id);
    }

    #generateCode(){
        return `${this.#name} code bla bla`;
    }
}
