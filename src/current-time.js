class CurrentTime extends HTMLElement{
    static observedAttributes = ["format"];
    connectedCallback() {
        console.log("début currentime");
        this.render();
        this.intervalID = setInterval(() => this.updateTime(), 1000);
    }
    disconnectedCallback() {
        clearInterval(this.intervalID);
        console.log("fin currentime");
    }
    render() {
        this.innerHTML = /*HTML */ `
            <p class="currentTime__title"></p>
            <time class="currentTime__time"></time>
        `;
        
        this.$p = this.querySelector("p");
        this.$time = this.querySelector("time");

        this.updateTitle();
        this.updateTime();
    }
    updateTime() {
        if (!this.$time) return;
        const format = this.getAttribute("format");
        this.$time.textContent = format === "utc" 
            ? new Date().toUTCString() 
            : new Date().toLocaleString();
    }
    updateTitle() {
        if (!this.$p) return; 
        const format = this.getAttribute("format");
        this.$p.textContent = format === "utc" 
            ? "Heure UTC" 
            : "Heure Locale";
    }
    attributeChangedCallback(name, oldValue, newValue) {
                this.updateTitle();
                this.updateTime();
    }
}
customElements.define("current-time", CurrentTime);