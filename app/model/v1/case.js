const imgModel = require(path.join(webconfig.v1, 'images.js'));
class Case {
  constructor() {
    this.schema = new mdb.Schema({
      _id: {
        type: String,
        index: true
      },
      title: {
        type: String,
        default: ""
      },
      update_time: {
        type: Number,
        default: 0
      },
      source: {
        type: String,
        default: ''
      },
      author: {
        type: String,
        default: ''
      },
      cover: {
        type: Object,
        default: ''
      },
      views: {
        type: Number,
        default: 0
      },
      sort: {
        type: String,
        default: ''
      },
      like: {
        type: Number,
        default: 0
      },
      content: {
        type: String,
        default: ''
      },
      add_time: {
        type: Number,
        default: 0
      }

    }, {
      collection: 'case',
      versionKey: false
    });

    this.model = mdb.model('case', this.schema);

  }

  //添加品牌案例
  async add(data) {
    data['add_time'] = tool.time();
    data['_id'] = tool.getid();
    data['update_time'] = data['add_time'];
    let arr = tool.getImgurl(data.content)
    arr.push(data.cover);

    let err = await imgModel.useInc({
      path: arr
    }, 1);

    return new this.model(data).save().then(function(result) {
      return tool.dataJson(200, '查询成功', result);

    }, function(err) {
      return tool.dataJson(103, '添加失败');

    })

  }
  count(query) {
    return this.model.find(query).count(function(result) {
      return result;
    });
  }

  async find(arg) {
    arg['query'] = arg['query']
      ? arg['query']
      : {};
    arg['sort'] = arg['sort']
      ? arg['sort']
      : {
        add_time: -1
      };
    arg['num'] = arg['num']
      ? arg['num']
      : 10;
    arg['page'] = arg['page']
      ? arg['num'] * (arg['page'] - 1)
      : 0;


    let count = await this.count(arg['query']);
    return this.model.aggregate([
      {
        $lookup: {
          from: 'case_sort',
          localField: "sort",
          foreignField: "_id",
          as: "docs"
        }
      }, {
        $match: arg['query']
      }, {
        $project: {
          content: 0
        }
      }
    ]).sort(arg.sort).skip(parseInt(arg.page)).limit(parseInt(arg.num)).then(function(result) {
      if (result) {
        return tool.dataJson(200, '查询成功', {
          count: count,
          result: result
        })
      } else {
        return tool.dataJson(0, '没有数据');
      }

    }, function(err) {
      return tool.dataJson(104, '错误', err);
    })
  }

  async findOne(check, asc, keys) {
    let data = arguments[0]
      ? arguments[0]
      : {};
    let sort = arguments[1]
      ? arguments[1]
      : {};
    let key = arguments[2]
      ? arguments[2]
      : {};
    return this.model.findOne(data, keys).sort(sort).then(function(result) {
      if (result) {
        return tool.dataJson(200, '查询成功', result)

      } else {
        return tool.dataJson(0, '没有数据');
      }

    }, function(err) {
      return tool.dataJson(104, '错误', err);

    })
  }
  async updata(data) {
    let newImg = tool.getImgurl(data.content);
    newImg.push(data.cover);
    let olddata = await this.findOne({_id: data._id})
    let oldImg = tool.getImgurl(olddata.data.content);
    oldImg.push(olddata.data.cover);
    var old = tool.array_intersection(newImg, oldImg);
    var del = tool.array_difference(old, oldImg);
    var add = tool.array_difference(old, newImg);
    if (del.length > 0)
      await imgModel.useInc({
        path: del
      }, -1);
    if (add.length > 0)
      await imgModel.useInc({
        path: add
      }, 1);
    return this.model.update({
      _id: data._id
    }, {$set: data}).then(function(result) {
      return {err_code: 200, err_msg: '修改成功', data: result}
    }, function(err) {
      return tool.dataJson(104, '数据库错误');
    });

  }
  async del(data) {

    if (!data['_id']) {
      return tool.dataJson(104, '数据库错误');
    }
    let olddata = await this.findOne({_id: data._id})
    let oldImg = tool.getImgurl(olddata.data.content);
    oldImg.push(olddata.data.cover);
    await imgModel.useInc({
      path: oldImg
    }, -1);

    return this.model.remove(data).then(function(result) {
      return tool.dataJson(200, '删除成功');
    }, function(err) {
      return tool.dataJson(104, '数据库错误');

    });
  }
  async useInc(data, num) {
    return this.model.update(data, {
      $inc: {
        views: num
      }
    }).then(function(result) {
      return tool.dataJson(200, '更新成功', result);
    }, function(err) {
      return tool.dataJson(104, '更新失败', err);
    })
  }

  // async changeNumber() {
  //   let data = await this.model.find({}).then(function(result) {
  //     return result;
  //   }, function(err) {
  //     return err;
  //   });
  //   let l = data.length;
  //   for (let i = 0; i < l; i++) {
  //     await this.model.update({_id: data[i]['_id']
  //     }, {
  //       $set: {
  //         add_time: parseInt(data[i]['add_time']),
  //         update_time: parseInt(data[i]['add_time'])
  //       }
  //     }).then(function(result) {
  //
  //       return {err_code: 200, err_msg: '修改成功', data: result}
  //     }, function(err) {
  //       return tool.dataJson(104, '数据库错误');
  //     });
  //
  //   }
  //
  //   console.log(data);
  //
  // }

}

module.exports = new Case();
