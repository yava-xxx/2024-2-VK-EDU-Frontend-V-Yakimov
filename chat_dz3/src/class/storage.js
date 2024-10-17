class StorageManager {
    constructor(key) {
        this.key = key;
    }

    save(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    load() {
        const storedData = localStorage.getItem(this.key);
        return storedData ? JSON.parse(storedData) : null;
    }
}

export { StorageManager };
