var fs = require('fs');

export default class JsonStore {

  constructor () {
    this.store = {};
  }

  static get () {
    this.fileContent = require(__dirname + '/log/store.json');    
    return this.fileContent;
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