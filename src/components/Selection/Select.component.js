import Block from "../../modules/block";
import Option from "../Option/option.component";

export default class Select extends Block {
    constructor(props, options) {
        super('select', props);

        for (let key in options) {
            let option = new Option({value: key}, options[key]);
            this.addChild(option);
        }

        if (props.value !== undefined) {
            this.DOM.value = props.value;
        }

        this.addEventListener('change', (function(e) {
            let name = this.props.name;

            let event = new CustomEvent('changed', {
                detail: {
                    name: this.props.name,
                    body: this.DOM.value,
                },
                bubbles: true
            });

            this.DOM.dispatchEvent(event);
        }).bind(this))
    }
}