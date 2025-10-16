export default class Blocks {
    #id = "";
    #name = "";
    Color = "#898989";
    #value = "";
    
    #toolboxDiv = document.getElementById("toolBox");

    constructor(nameD) {
        this.#name = nameD;
        this.#id = crypto.randomUUID();
        this.#addToolbox();
        this.value = this.#name;
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
        card.ondragend = () => this.#disableHelp();

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.textContent = this.#name;

        // === Nouveau menu déroulant avec input ===
        const dropdownWrapper = document.createElement("div");
        dropdownWrapper.style.marginTop = "10px";

        const dropdownButton = document.createElement("button");
        dropdownButton.textContent = "Modifier";
        dropdownButton.type = "button";
        dropdownButton.className ="btn btn-outline-primary";

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.placeholder = "Écrire ici...";
        inputField.style.display = "none";
        inputField.style.marginTop = "5px";

        const validateInput = document.createElement("input");
        validateInput.type = "button";
        validateInput.value = "Valider"
        validateInput.style.display = "none";

        dropdownButton.addEventListener("click", () => {
            inputField.style.display = inputField.style.display === "none" ? "block" : "none";
            validateInput.style.display = validateInput.style.display === "none" ? "block" : "none";
            dropdownButton.className = validateInput.style.display === "none" ? "btn btn-outline-primary" : "btn btn-primary";
        });

        validateInput.addEventListener("click", () => {
            this.#value = inputField.value;     
        })

        if(this.#name != "div" && this.#name != "list"){

            dropdownWrapper.appendChild(dropdownButton);
            dropdownWrapper.appendChild(inputField);
            dropdownWrapper.appendChild(validateInput);
        }

        
        card.appendChild(cardBody);
        card.appendChild(dropdownWrapper);
        cardPiece.appendChild(card);
        li.appendChild(cardPiece);

        this.#toolboxDiv.appendChild(li);
    }

    getValue(){
        return this.#value;
    }

    #drag(event) {
        event.dataTransfer.setData("text", event.target.id);
        this.#enableHelp();
    }

    #generateCode() {
        return `${this.#name} code bla bla`;
    }

    #enableHelp() {
        Array.from(document.getElementById("dropZones").children).forEach(dropzone => {
            dropzone.classList.add("forward");
            console.log("affiche");
        });
    }
    #disableHelp() {
        Array.from(document.getElementById("dropZones").children).forEach(dropzone => {
            dropzone.classList.remove("forward");
            console.log("affiche");
        });
    }


}
