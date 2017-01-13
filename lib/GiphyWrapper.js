const Giphy = require('giphy-api')();

class GiphyWrapper {

  static findImage(query) {
    console.log(`findImage('${query}')`);
    return Giphy.search({
      q: query,
      limit: 1
    });
  }

}

module.exports = GiphyWrapper;
