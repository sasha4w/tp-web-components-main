class ScreenSize extends HTMLElement {
    static observedAttributes = ["unit"]; 

    connectedCallback() {

        this.attachShadow({ mode: "open" });
        console.log("début screen size");
        this.render();

        window.addEventListener("resize", () => this.updateSize());
    }

    disconnectedCallback() {
        console.log("fin screen size");
        window.removeEventListener("resize", () => this.updateSize());
    }

    render() {
        //1. squelette HTML 
        this.shadowRoot.innerHTML = /*HTML */ `
<style>
    button {
        color: #FF6347; /* Une couleur de texte rouge vif */
        background-color: #FFDB58; /* Jaune festif pour le fond */
        border: none; /* Supprime la bordure pour un look propre */
        padding: 0.5rem 1rem; /* Ajoute de l'espace autour du texte */
        cursor: pointer; /* Change le curseur au survol */
        font-size: 1.2rem; /* Augmente légèrement la taille de la police */
        border-radius: 0.5rem; /* Rayon de bord plus grand pour un look plus arrondi */
        transition: transform 0.3s ease, background-color 0.3s ease; /* Transition pour l'animation */
    }

    button:hover {
        background-color: #FFD700; /* Change la couleur au survol */
        transform: scale(1.05); /* Agrandit légèrement le bouton au survol */
    }

    span, button {
        font-family: 'Comic Sans MS', cursive, sans-serif; /* Utilise une police plus ludique */
        font-size: 1.2rem; /* Augmente la taille de la police */
        border-radius: 0.5rem; /* Arrondit les bords du span */
        padding: 0.5rem; /* Ajoute de l'espace autour du texte */
        text-shadow: 1px 1px #000; /* Ombre portée pour le texte */
        display: inline-block; /* Permet un meilleur alignement */
    }

    .size-display {
        background-color: #EEBDFF; /* Couleur de fond pastel */
        padding: 1rem; /* Ajoute de l'espace autour du texte */
        margin-bottom: 1rem; /* Marge sous le span */
        border-radius: 0.5rem; /* Arrondit les bords */
        animation: pulse 1.5s infinite; /* Animation de pulsation */
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
</style>
        <span class="size-display"></span>
        <button class="size-button" toggle> rem ou px</button>
        `;
        //2. stocker éléments nécessaires         
        this.$button = this.shadowRoot.querySelector("button");
        this.$display = this.shadowRoot.querySelector(".size-display");
        //3. effectuer et planifier les rendu 
        this.$button.addEventListener("click", () => this.toggleRemToPixUnit());

        this.updateSize();
    }

    toggleRemToPixUnit() {
        const currentUnit = this.getAttribute("unit");
        this.setAttribute("unit", currentUnit === "rem" ? "px" : "rem");
    }

    updateSize() {
        if (!this.$display) return;
        const unit = this.getAttribute("unit") || "rem";
        
        const size = unit === "rem" 
            ? (window.innerWidth / parseInt(getComputedStyle(document.body).getPropertyValue("font-size"))).toFixed(0)
            : window.innerWidth.toFixed(0);

        this.$display.textContent = `${size} ${unit}`;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "unit" && oldValue !== newValue) {
            this.updateSize();  
        }
    }
}

customElements.define("screen-size", ScreenSize);
