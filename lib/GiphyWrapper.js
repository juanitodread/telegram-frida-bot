const Plugin = require('./Plugin');
const Giphy = require('giphy-api')();

class GiphyWrapper extends Plugin {

  static findImage(query) {
    console.log(`findImage('${query}')`);
    return Giphy.search({
      q: query,
      limit: 1
    });
  }

}

module.exports = GiphyWrapper;
