const crypto = require('crypto');

class Tool {
  constructor() {

  };
  getid() {
    let time = new Date().getTime();
    let id = time + this.random(4) + this.random(5);
    return crypto.createHash('md5').update(id).digest('hex');
  };
  time() {
    return parseInt(new Date().getTime() / 1000);
  };
  random(num) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var str = "";
    for (let i = 0; i < num; i++) {
      var len = parseInt(Math.random() * 36)
      str += chars[len];
    }
    return str;
  };
  group(arr) {
    let data = {};
    for (i in arr) {
      if (data[arr[i]['say_id']]) {
        data[arr[i]['say_id']].push(arr[i]);
      } else {
        data[arr[i]['say_id']] = [];
        data[arr[i]['say_id']].push(arr[i]);
      }
    }
    return data;
  };
  script(s) {
    return s.replace(/<script.*?>.*?<\/script>/ig, '');
  };
  getId() {
    hash.update(this.time() + random(5) + random(5));
    return hash.digest('hex')
  };
  removeStr(str, wipe) {
    return str = str.replace(wipe, '');
  };
  md5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
  };
  getInnerString(source, prefix, postfix) {
    let regexp = new RegExp(this.encodeReg(prefix) + '.+' + this.encodeReg(postfix), 'gi');
    let matches = String(source).match(regexp);
    let str1 = matches[0].replace(prefix, '');
    str1 = str1.replace(postfix, '');
    return str1;
  };
  encodeReg(source) {
    return String(source).replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
  };
  dataJson(err_code, err_msg, data) {
    if (data) {
      return {
        err_code: err_code,
        err_msg: err_msg,
        data: data
      }

    } else {
      return {
        err_code: err_code,
        err_msg: err_msg,

      }
    }


  }
  getImgurl(str) {
    let regx = /imgurl=['"]([^'"]+)/gi;
    let arr = [];
    str.replace(regx, function (value) {
      arr.push(value);
      return value;
    });
    for (let i = 0, len = arr.length; i < len; i++) {
      arr[i] = arr[i].replace('imgurl="', '').replace('"', '');
    }

    return arr;
  }
  array_remove_repeat(a) { // 去重
    var r = [];
    for (var i = 0; i < a.length; i++) {
      var flag = true;
      var temp = a[i];
      for (var j = 0; j < r.length; j++) {
        if (temp === r[j]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        r.push(temp);
      }
    }
    return r;
  }
  array_intersection(a, b) { // 交集
    var result = [];
    for (var i = 0; i < b.length; i++) {
      var temp = b[i];
      for (var j = 0; j < a.length; j++) {
        if (temp === a[j]) {
          result.push(temp);
          break;
        }
      }
    }
    return this.array_remove_repeat(result);
  }

  array_union(a, b) { // 并集
    return this.array_remove_repeat(a.concat(b));
  }

  array_difference(arr1, arr2) {
    var diff = [];
    var tmp = arr2;

    arr1.forEach(function(val1, i) {
      if (arr2.indexOf(val1) < 0) {
        diff.push(val1);
      } else {
        tmp.splice(tmp.indexOf(val1), 1);
      }
    });
    return this.array_remove_repeat(diff.concat(tmp));

  }

}
module.exports = new Tool();