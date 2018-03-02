
class Money {
  constructor() {
    this.schema = new mdb.Schema({
      _id: {
        type: String,
        index: true
      },
      balance: {
        type: Number,
        default: 0
      },
      pwd: {
        type: String,
        default: ''
      },
      add_time: {
        type: Number,
        default: tool.time()
      }
    }, {
      collection: 'money',
      versionKey: false
    });
    this.model = mdb.model('money', this.schema);
  }

  async add(data) {
    data['add_time'] = tool.time();
    return this.model(data).save().then(function(result) {
      return tool.dataJson(200, '注册成功', result);
    }, function(err) {
      return tool.dataJson(103, '注册失败', err);
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
}

module.exports = new Money();
