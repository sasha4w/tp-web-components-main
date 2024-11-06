class CustomDetails extends HTMLElement {
    connectedCallback() {
        console.log("début customdetails");

        // Attache le shadow DOM et rend le composant focusable
        this.attachShadow({ mode: "open" });
        this.render();
        this.setAttribute("tabindex", "0");

        this.$details = this.shadowRoot.querySelector("details");

        // Ajouter les écouteurs d'événements pour les interactions demandées
        this.addEventListener("mouseover", this.handleMouseEnter);
        // this.addEventListener("mouseout", this.handleMouseEnter);
        this.addEventListener("focusin", this.handleFocusin, true);
        this.addEventListener("focusout", this.handleFocusout, true); // Nouvel écouteur pour la perte de focus
        document.addEventListener("keydown", this.handleKeyDown);
    }

    disconnectedCallback() {
        console.log("fin customdetails");

        this.removeEventListener("mouseover", this.handleMouseEnter);
        // this.addEventListener("mouseout", this.handleMouseEnter);
        this.removeEventListener("focusin", this.handleFocusin, true);
        this.removeEventListener("focusout", this.handleFocusout, true); // Supprimer l'écouteur pour `Focusout`
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    render() {
        const template = document.getElementById("custom-details").content;
        this.shadowRoot.appendChild(template.cloneNode(true));
                // Ajouter le style pour le shadow DOM
                const style = document.createElement('style');
                style.textContent = `
details {
                padding: 1rem;
                border: none;
                background-color: #FFDB58; /* Jaune festif pour le fond */
                border-radius: 1rem;
                font-family: 'Comic Sans MS', cursive, sans-serif;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease; /* Transition douce pour les animations */
            }

            summary {
                font-size: 1.5rem;
                font-weight: bold;
                color: #FF6347; /* Rouge vif pour le texte */
                cursor: pointer;
                padding: 0.5rem;
                background-color: #FFD700; /* Jaune vif */
                border-radius: 0.5rem;
                text-shadow: 1px 1px 2px #000; /* Ombre pour le texte */
                transition: transform 0.3s ease, background-color 0.3s ease;
            }

            summary:hover {
                background-color: #FF6347; /* Rouge vif au survol */
                transform: scale(1.05); /* Agrandissement au survol */
            }

            details[open] summary {
                color: #FFD700; /* Jaune festif quand ouvert */
            }

            ul {
                list-style-type: disc;
                margin-left: 20px;
                color: #444;
            }

            slot[name="summary"] {
                font-size: 1.5rem;
                font-weight: 600;
                color: #333;
            }

            slot[name="content"] {
                margin-top: 10px;
                font-size: 1.2rem;
                color: #444;
            }

            .size-display {
                background-color: #EEBDFF; /* Fond pastel pour le contenu */
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: 0.5rem;
                animation: pulse 1.5s infinite; /* Animation pulsée pour l'élément */
            }

            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
        `;
                this.shadowRoot.appendChild(style);
    }

    handleMouseEnter = () => {
        this.open();
    }

    handleFocusin = () => {
        this.open();
    }

    handleFocusout = () => {
        this.close(); // Fermer lorsqu'on perd le focus
    }

    handleKeyDown = (event) => {
        if (event.key === "Escape") {
            this.close();
        }
    }


    open() {
        if (this.$details && !this.$details.hasAttribute("open")) {
            this.$details.setAttribute("open", "");
        }
    }

    close() {
        if (this.$details && this.$details.hasAttribute("open")) {
            this.$details.removeAttribute("open");
        }
    }
}

customElements.define("custom-details", CustomDetails);
