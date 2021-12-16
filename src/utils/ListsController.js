
import DB_user from "./BD_user";

const DB_NAME = "Lists";
const VERSION = 1;

class ListController {
    db_connection = undefined;

    constructor() {
        this.db_connection = new DB_user(DB_NAME, VERSION);
    }

    createList() {
        
    }
}