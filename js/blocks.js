export default class Blocks {
    // truc a modifier
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
        // Create li
        const li = document.createElement("li");
        li.classList.add("nav-item");

        // Create cardPiece div
        const cardPiece = document.createElement("div");
        cardPiece.classList.add("cardPiece", "mx-1");

        // Create card div
        const card = document.createElement("div");
        card.classList.add("card");
        card.id = this.#id;
        card.draggable = "true";
        card.ondragstart = (event) => this.#drag(event);

        // Create card-body div
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.textContent = this.#name;

        // Build hierarchy
        card.appendChild(cardBody);
        cardPiece.appendChild(card);
        li.appendChild(cardPiece);

        // Append into toolbox container
        this.#toolboxDiv.appendChild(li);
    }

    

    #drag(event) {
        event.dataTransfer.setData("text", event.target.id);
    }

    

    #generateCode(){
        return `${this.#name} code bla bla`;
    }
}