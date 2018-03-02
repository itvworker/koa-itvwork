const imgModel = require(path.join(webconfig.v1, 'images.js'));
class User {
  constructor() {
    this.schema = new mdb.Schema({
      _id: {
        type: String,
        index: true
      },
      username: {
        type: String,
        default: ''
      },
      pwd: {
        type: String,
        default: ''
      },
      level: {
        type: String,
        default: 1
      },
      type: {
        type: String,
        default: 1
      },
      integral:{
        type:Number,
        default:0,
      },
      header:{
        type:String,
        default:''
      },
      nickname:{
        type:String,
        default:''
      },
      power:{
        type:String,
        default:''
      },
      add_time: {
        type: Number,
        default: tool.time()
      }
    }, {
      collection: 'user',
      versionKey: false
    });
    this.model = mdb.model('uesr', this.schema);
  }
  
  async reg(data) {
    data['add_time'] = tool.time();
    data['_id'] = tool.getid();
    return new this.model(data).save().then(function(result) {
      return tool.dataJson(200, '保存成功', result);
    }, function(err) {
      return tool.dataJson(103, '保存失败', err);
    })

  }

  async findOne(data) {
    return this.model.findOne(data).then(function(result) {
      if (result) {
        return tool.dataJson(200, '查询成功', result)

      } else {
        return tool.dataJson(0, '没有数据');
      }
    }, function(err) {
      return tool.dataJson(104, '错误', err);
    })
  }

  async updataPerson(condition, data) {
    let arr = {}
    for (let i in data) {
      arr['marterial.person.' + i] = data[i];
    }

    return this.model.update(condition, {$set: arr}).then(function(result) {
      return {err_code: 200, err_msg: '修改成功'}
    }, function(err) {
      return tool.dataJson(104, '数据库错误');
    });
  }

}

module.exports = new User();
