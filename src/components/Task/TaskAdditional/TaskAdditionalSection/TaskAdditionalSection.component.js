import Block from "../../../../modules/block";

export default class TaskAdditionalSection extends Block {
    constructor(childs) {
        super('section', {
            class: "task__additional-section"
        }, '', childs);
    }
}