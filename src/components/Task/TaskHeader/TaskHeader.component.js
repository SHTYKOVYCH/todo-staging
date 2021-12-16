import Block from "../../../modules/block";
import Link from "../../Link/Link.component";
import Input from "../../input/input.component";

let Children = {
    delete: {
        type: Link,
        argv: [
            {
                href: "#",
                class: "task__delete",
                tabindex: "1",
            },
        ]
    },
    input: {
        type: Input,
        argv: [
            {
                class: "task__title-input",
                type: "text",
                name: "title",
                tabIndex: "1"
            }
        ],
    },
    open: {
        type: Link,
        argv: [
            {
                href: "#",
                class: "task__open",
                tabindex: "1",
            },
        ]
    }
}

export default class TaskHeader extends Block {
    constructor(title) {
        super('header', {
            class: "task__header"
        }, '', (Children.input.argv[0]['value'] = title, Children));

        this.ChildNodes[2].addEventListener('click', function() {this.classList.toggle('_opened')})
        this.ChildNodes[0].addEventListener('click', (function () {
            let event = new CustomEvent('delete', {bubbles: true});
            this.DOM.dispatchEvent(event);
        }).bind(this))
    }
}