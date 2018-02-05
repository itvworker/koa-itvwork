const des = require(path.join(webconfig.common, 'pinyin.js'));
const parseString = require('xml2js').parseString;

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
    async index(){
      let self=this;
      let data=await tool.get(this.city.city);
       parseString(data, function (err, result) {
      //将返回的结果再次格式化
        self.ctx.body=result
    });
  }
}

module.exports = new City();
