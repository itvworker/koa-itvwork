class Session {
  constructor() {
    this.schema = mdb.Schema({
      _id: {
        type: String,
        default: tool.getid()
      },
      data: {
        type: Object,
        default: ''
      },
      time: {
        type: Number,
        defaut: tool.time() + 60 * 60 * 24
      },
      add_time: {
        type: Number,
        default: tool.time()
      },
      expires_time: {
        type: Date,
        default: new Date((tool.time() + 60 * 60 * 24) * 1000),
        expires: 0
      }
    }, {
      collection: 'session',
      versionKey: false
    });
    this.model = mdb.model('session', this.schema);
  }

  async add(data) {
    data['expires_time'] = new Date((tool.time() + 60 * 60 * 24) * 1000);
    return new this.model(data).save().then(function(result) {
      return tool.dataJson(200, '操作成功', result);
    }, function(err) {
      return tool.dataJson(103, '操作失败', err);
    })
  }

  async findOne(data) {
    return this.model.findOne(data).then(function(result) {
      return tool.dataJson(200, '操作成功', result);
    }, function(err) {
      return tool.dataJson(103, '操作失败', err);
    })
  }
}

module.exports = new Session();
