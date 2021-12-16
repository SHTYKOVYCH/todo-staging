import Block from "../../modules/block";
import TaskHeader from "./TaskHeader/TaskHeader.component";
import TaskAdditional from "./TaskAdditional/TaskAdditional";

let ChildNodes = {
    header: {
        type: TaskHeader,
        argv: [],
    },
    additional: {
        type: TaskAdditional,
        argv: [],
    }
}

export default class Task extends Block {
    data = undefined;

    constructor(data) {
        super('article', {
            class: "task",
        }, '', (
                ChildNodes.header.argv[0] = data.title,
                ChildNodes.additional.argv[0] = data.body,
                ChildNodes.additional.argv[1] = data.priority,
                ChildNodes
        ));

        this.data = data;

        this
            .changePriority()
            .addEventListener('click', (this.openTask).bind(this))
            .addEventListener('delete', (this.deleteTask).bind(this))
            .addEventListener('changed', (this.updateTask).bind(this));
    }

    updateTask(e) {
        if (e.target === this.DOM) {
            return;
        }

        e.stopPropagation();

        let incomeData = e.detail;

        this.data[incomeData.name] = incomeData.body;

        if (incomeData.name === "priority") {
            this.changePriority();
        }

        this.DOM.dispatchEvent(new CustomEvent('changed', {detail: {data: this.data, elem: e.target}, bubbles: true}))
    }

    openTask(e) {
        if (e.target.classList.contains('task__open')) {
            this.DOM.classList.toggle('_opened');
        }
    }

    deleteTask(e) {
        if (e.target === this.DOM) {
            return;
        }

        e.stopPropagation();

        let event = new CustomEvent('delete', {detail: {DOM: this.DOM, id: this.data.tasksId}, bubbles: true});

        this.DOM.dispatchEvent(event);
    }

    changePriority() {
        let priority = +this.data.priority;

        this.DOM.classList.remove('_low', '_medium', '_hight');

        switch (priority) {
            case 1:
                this.DOM.classList.add('_low');
                console.log('low');
                break;
            case 2:
                this.DOM.classList.add('_medium');
                break;
            case 3:
                this.DOM.classList.add('_hight');
                break;
        }

        return this;
    }
}