
class DB_user {
    table_name = undefined;
    version = undefined;

    constructor(baseName, version, ...indexes) {
        this.table_name = baseName;
        this.version = version;
        this.indexes = indexes;

        this.openConnection();
    }

    openConnection(func = function() {}, ...argv) {
        let request = indexedDB.open(this.table_name, this.version);

        request.onupgradeneeded = (e) => {
            let connection = e.currentTarget.result;

            switch (connection.version) {
                case(0):
                    let os = connection.createObjectStore(this.table_name, {keyPath: this.table_name + "Id", autoIncrement: true});

                    for (const index of this.indexes) {
                        os.createIndex(index, index, {unique: false, multiEntry: true});
                    }
            }

            return this.openConnection(func, ...argv);
        };

        request.onsuccess = () => {
            let connection = request.result;

            connection.onversionchange = () => {
                alert("База данных устарела! Обновите страницу для продолжения");
            }

            return func(connection, ...argv);
        };

        request.onblocked = () => {
            alert("Ой! Что-то пошло не так. Пожалуйста, обновите страницу");
        }
    }

    addItem(item) {
        this.openConnection((connection) => {
            let transaction = connection.transaction(this.table_name, "readwrite");

            let os = transaction.objectStore(this.table_name).add(item);
        })
    }

    putItem(item) {
        this.openConnection((connection) => {
            let transaction = connection.transaction(this.table_name, "readwrite");

            transaction.objectStore(this.table_name).put(item);
        })
    }

    deleteItem(itemId) {
        this.openConnection((connection) => {
            let transaction = connection.transaction(this.table_name, "readwrite");

            transaction.objectStore(this.table_name).delete(itemId);
        })
    }

    getItem(func, key, index = "") {
        this.openConnection((connection) => {
            let os = connection.transaction(this.table_name, "readonly").objectStore(this.table_name);

            let request;
            if (index === "") {
                request = os.get(key);
            } else {
                request = os.index(index).get(key);
            }

            request.onsuccess = (e) => {
                func(e.currentTarget.result);
            }
        })
    }

    getAll(func) {
        this.openConnection((connection) => {
            let request = connection.transaction(this.table_name).objectStore(this.table_name).openCursor();

            request.onsuccess = e => {
                let cursor = request.result;
                if (cursor) {
                    func(cursor.value);
                    cursor.continue();
                }
            }
        })
    }
}

export default DB_user;