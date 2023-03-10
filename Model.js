const fs = require('fs').promises;
const path1 = `${__dirname}/topics`;

class Model {
  static async checkDir(path) {
    this.path = path;
    const topics = await fs
      .readdir(`${__dirname}/topics`)
      .then((data) => data.map((el) => el.slice(0, -4)));
    return topics;
  }

  static async readQuestions(topic) {
    const questions = await fs
      .readFile(`${__dirname}/topics/${topic}_flashcard_data.txt`, 'utf-8')
      .then((data) => data.split('\n').filter((el, i) => i % 3 === 0));

    return this.questions.map((el, i) => ({
      type: 'input',
      message: el,
      answer: this.answers[i],
    }));
  }

  static async readAwnsers(topic) {
    const awnsers = await fs
      .readFile(`${__dirname}/topics/${topic}_flashcard_data.txt`, 'utf-8')
      .then((data) => data.split('\n').filter((el, i) => i % 3 === 1));
  }

  constructor(score = 0) {
    this.score = score;
  }
}
Model.checkDir();
Model.readQuestions('nighthawk');
Model.readAwnsers('nighthawk');

module.exports = Model;

// .then((data) => data.forEach((el, i) => console.log(`👉 ${i + 1}) ${el}`)));
