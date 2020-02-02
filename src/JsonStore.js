var fs = require('fs');

export default class JsonStore {

  constructor () {
    this.store = {
      "current-path": ".",
      "filename": "test.js",
      "live-preview": false,
      "font-size": "22px"
    };
  }

  static get () {
    this.fileContent = require(__dirname + '/log/store.json');    
    return this.fileContent;
  }

  static getPropVal(prop) {
    this.store = this.get();
    return this.store[prop];
  }

  static pushOrUpdate (field, value) {
    this.store = this.get() || {};
    this.store[field] = value;
    this.saveStore();
    return this.get();
  }

  static saveStore () {
    fs.writeFileSync(__dirname + '/log/store.json', JSON.stringify(this.store));
  }
}