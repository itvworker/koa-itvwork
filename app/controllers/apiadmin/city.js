const parseString = require('xml2js').parseString;
var pinyinlite = require('pinyinlite');

class City {
  constructor() {
    let url = 'http://uat.topls.top';
    this.city = {
      'city': url + '/xml/TFCityList.xml',
      'company': url + '/xml/TFAirList.xml'
    };
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
      console.log(word,data[i]['CityName_Zh']);
      if (fristWord) {
        data[i]['pinyin'] = fristWord + word.substr(1, word.length);
        data[i]['word'] = fristWord;
      } else {
        data[i]['word'] = word.substr(0, 1)
        data[i]['pinyin'] = word;
      }
    }

    let res={};
    data.forEach(function(item,index){
        if(!res[item.word]){
            res[item.word]=[];
        }

        res[item.word].push(item);
    })

    this.ctx.body = res;

  }
}

module.exports = new City();
