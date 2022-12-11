class FlagEnumService {
    constructor() {}

    get() {
        return this.value;
    }

    set(value) {
        this.value = value;
        return this;
    }

    has(key) {
        return !!(this.value & key);
    }

    add(key) {
        this.value |= key;
        return this;
    }

    delete(key) {
        this.value &= ~key;
        return this;
    }

    toggle(key) {
        this.has(key) ? this.delete(key) : this.add(key);
        return this;
    }
}

const flagService = new FlagEnumService();
export { flagService };
