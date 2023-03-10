const fs = require('fs').promises;
const path1 = `${__dirname}/topics`;
class Model {
  constructor(path) {
    this.path = path;
  }

  async checkDir() {
    await fs
      .readdir(this.path)
      .then((data) => data.map((el) => `👉${el.slice(0, -4)}`))
      .then((data) => data.forEach((el) => console.log(el)));
  }
}

let test = new Model(path1);

test.checkDir();

module.exports = Model;
