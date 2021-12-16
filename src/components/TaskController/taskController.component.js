import Block from "../../modules/block";
import TaskList from "../TaskList/TaskList.component";
import Input from "../input/input.component";
import Link from "../Link/Link.component";

let ChildNodes = {
    list: {
        type: TaskList,
        argv: [[]]
    },
    form: {
        type: Block,
        argv: [
            'section',
            {class: "task-list__form-wrapper"},
            '',
            {
                form: {
                    type: Block,
                    argv: [
                        'form',
                        {class: "task-list__form"},
                        '',
                        {
                            input: {
                                type: Input,
                                argv: [
                                    {
                                        tabindex:"2",
                                        class: "task-list__input",
                                        name: "title",
                                        type: "text",
                                        autocomplete: "off"
                                    }
                                ]
                            },
                            button: {
                                type: Link,
                                argv: [
                                    {
                                        href: "#",
                                        class: "task-list__submit",
                                        tabindex: "3",
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    }
}

export default class TaskController extends Block {

    constructor() {
        super('div', {
            class: "task-list"
        }, {}, ChildNodes);


        this.ChildNodes[1].ChildNodes[0].addEventListener('submit', this.addTask.bind(this));
    }

    addTask(e) {
        e.preventDefault();

        let data = e.target.elements;

        if (data.title.value === '') {
            return;
        }

        let task = {
            title: data.title.value,
            priority: 0,
            body: ""
        }

        this.ChildNodes[0].addTask(task);

        data.title.value = "";
    }
}