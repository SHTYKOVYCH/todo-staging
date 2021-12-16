import Block from "../../modules/block";
import Task from "../Task/Task.component";
import DB_user from "../../utils/BD_user";

const TABLE_NAME = "tasks";
const VERSION = 1;

export default class TaskList extends Block {
    dbUser = undefined;
    timeout = undefined;

    constructor(tasks = []) {
        super('section', {
            class: "task-list__list"
        });

        this.dbUser = new DB_user(TABLE_NAME, VERSION);

        this
            .addEventListener('changed', this.updateTask.bind(this))
            .addEventListener('delete', this.deleteTask.bind(this));

        this.refreshTasks();
    }

    refreshTasks() {
        this.ChildNodes = [];
        this.dbUser.getAll((function(task) {
            this.addChild(new Task(task));

            this.sortTask();
        }).bind(this));
    }

    addTask(task) {
        this.dbUser.addItem(task);

        this.refreshTasks();

        return this;
    }

    updateTask(e) {
        let data = e.detail.data;

        this.dbUser.putItem(data);

        if (e.detail.elem.name === "priority") {
            this.sortTask();
        }

        return this;
    }

    deleteTask(e) {
        let data = e.detail;

        data.DOM.remove();

        this.ChildNodes = this.ChildNodes.filter(el => el.data.taskId !== data.id);

        this.dbUser.deleteItem(data.id);

        this.render();

        return this;
    }

    sortTask() {
        this.ChildNodes = this.ChildNodes.sort((a, b) => {
            let tRes = -(+a.data.priority - (+b.data.priority));

            if (tRes !== 0) {
                return tRes;
            }

            return (+a.data.tasksId - (+b.data.tasksId));
        });

        this.rendered = false;

        this.render();

        return this;
    }
}