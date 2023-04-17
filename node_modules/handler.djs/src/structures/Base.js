const { flatten } = require('discord.js/src/util/Util');

module.exports = class {
    constructor() {};

    async _patch(obj, key, value) {
        const Object_c = new Object();
        Object_c[key] = value;
        const main = this;
        Object.defineProperty(main, key.toString?.(), {
          value: Object_c[key],
          writeable: false
        });
    };

    toJSON() {
        return flatten(this.data, {});
    };
}