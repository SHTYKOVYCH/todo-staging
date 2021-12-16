import Block from "../../../modules/block";
import TaskAdditionalSection from "./TaskAdditionalSection/TaskAdditionalSection.component";
import TextArea from "../../TextArea/textarea.component";
import Select from "../../Selection/Select.component";

let children = {
    left: {
        type: Block,
        argv: [
            'section',
            {
                class: 'task__additional-section _left'
            },
            '',
            {
                title: {
                    type: Block,
                    argv: [
                        'span',
                        {class: "task__additional-title"},
                        "Заметки"
                    ],
                },
                body: {
                    type: TextArea,
                    argv: [
                        {
                            class: "task__body",
                            name: "body",
                            rows: "10",
                            style: "resize: none",
                            tabindex: "-1",
                        }
                    ]
                }
            }
        ]
    },
    right: {
        type: Block,
        argv: [
            'section',
            {
                class: 'task__additional-section'
            },
            '',
            {
                title: {
                    type: Block,
                    argv: [
                        'span',
                        {class: "task__additional-title"},
                        "Приоритет"
                    ],
                },
                body: {
                    type: Select,
                    argv: [
                        {
                            class: "task__priority",
                            name: "priority",
                            tabindex: "-1",
                        },
                        {
                            0: "",
                            1: "Низкий",
                            2: "Средний",
                            3: "Высокий"
                        }
                    ]
                }
            }
        ]
    }
}

export default class TaskAdditional extends Block {
    constructor(body, priority) {
        super('section', {
            class: "task__additional"
        },
            '',
            (children.left.argv[3].body.argv[0]["value"] = body,
                children.right.argv[3].body.argv[0]["value"] = priority,
                children));
    }
}