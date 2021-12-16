import Block from "../../modules/block";
import TaskController from "../../components/TaskController/taskController.component";

let ChildNodes = {
    header: {
        type: Block,
        argv: [
            'header',
            {
                class: 'content__header'
            },
            "",
            {
                title: {
                    type: Block,
                    argv: [
                        'span',
                        {
                            class: "header__title"
                        },
                        "Список дел"
                    ]
                }
            }
        ]
    },
    taskList: {
        type: TaskController,
        argv: []
    }
}

export default class List extends Block {
    constructor() {
        super('section', {
            class: "content",
        }, "", ChildNodes);
    }
}