import Block from "../../modules/block";

export default class Input extends Block {
    timeout = undefined;

    constructor(props) {
        super('input', props);

        this.addEventListener('input', (function() {
            clearTimeout(this.timeout);

            this.timeout = setTimeout((function() {
                let name = this.DOM.name;

                let event = new CustomEvent('changed',
                    {
                        detail: {
                            name: this.DOM.name,
                            body: this.DOM.value
                        },
                        bubbles: true
                    });

                this.DOM.dispatchEvent(event);
            }).bind(this), 500)
        }).bind(this));
    }
}