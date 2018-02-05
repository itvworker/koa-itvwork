const parseString = require('xml2js').parseString;
var pinyinlite = require('pinyinlite');

class City {
  init(ctx, next) {
    this.ctx = ctx;
    this.next = next;
    let url = 'http://uat.topls.top';
    this.city = {
      'city': url + '/xml/TFCityList.xml',
      'company': url + '/xml/TFAirList.xml'
    };
    return true;
  }
  async index() {
    let self = this;
    let data = await tool.get(this.city.city);
    let arr = [];
    parseString(data, function(err, result) {
      let city = JSON.stringify(result.CityList.City);
      city = city.replace(/\[/g, "");
      city = city.replace(/\]/g, "");
      data = JSON.parse('[' + city + ']');
    });
    for (let i = 0, l = data.length; i < l; i++) {
      let fristWord = "";
      switch (data[i]['CityName_Zh'].substr(0, 1)) {
        case '重':
          fristWord = 'c';
          break;
        case '衢':
          fristWord = 'q';
          break;
        case '泸':
          fristWord = 'l';
          break;
        case '芷':
          fristWord = 'z';
          break;
      };
      let word = pinyinlite(data[i]['CityName_Zh']);
      word = word.join();
      if (fristWord) {
        data[i]['pinyin'] = fristWord + word.substr(1, word.length);
        data[i]['word'] = fristWord;
      } else {
        data[i]['word'] = word.substr(0, 1)
        data[i]['pinyin'] = word;
      }
    }

    this.ctx.body = data;

  }
}

module.exports = new City();
