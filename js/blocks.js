export default class Blocks {
    #id = "";
    #name = "";
    Color = "#898989";
    #value = "";
    
    #toolboxDiv = document.getElementById("toolBox");

    constructor(nameD, valueD) {
        this.#name = nameD;
        this.#id = crypto.randomUUID();
        this.#value = valueD;
        this.#addToolbox();
    }

    #addToolbox() {
        const li = document.createElement("li");
        li.classList.add("nav-item");


        const cardPiece = document.createElement("div");
        cardPiece.classList.add("cardPiece", "mx-1");


        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = this.#value;
        card.id = this.#id;
        card.draggable = "true";
        card.ondragstart = (event) => this.#drag(event);
        card.style.display ="flex"
        card.style.flexDirection = "row";
        card.ondragend = () => this.#disableHelp();


        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.textContent = this.#name;

        card.appendChild(cardBody);
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
