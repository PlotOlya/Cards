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

  static async readAwnsers(topic) {
    this.awnsers = await fs
      .readFile(`${__dirname}/topics/${topic}_flashcard_data.txt`, 'utf-8')
      .then((data) => data.split('\n').filter((el, i) => i % 3 === 1));
  }

  static async readQuestions(topic) {
    this.questions = await fs
      .readFile(`${__dirname}/topics/${topic}_flashcard_data.txt`, 'utf-8')
      .then((data) => data.split('\n').filter((el, i) => i % 3 === 0));

    this.answers = this.readAwnsers(topic);

    return this.questions.map((el, i) => ({
      type: 'input',
      message: el,
      answer: this.answers[i],
    }));
  }

  constructor(score = 0) {
    this.score = score;
  }
}

module.exports = Model;
