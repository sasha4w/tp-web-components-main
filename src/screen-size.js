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
        this.shadowRoot.innerHTML = /*HTML */ `
        <style>

        button{
            color:lightblue;
            background-color:#FDFCDC;
        }
        span, button{
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            font-size: 1rem;

        }    
        </style>
        <span class="size-display"></span>
        <button class="size-button" toggle> rem ou px</button>
        `;
        
        this.$button = this.shadowRoot.querySelector("button");
        this.$display = this.shadowRoot.querySelector(".size-display");

        this.$button.addEventListener("click", () => this.toggleUnit());

        this.updateSize();
    }

    toggleUnit() {
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
