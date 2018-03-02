class Verify {
    constructor(obj) {
        this.obj = obj;
    }
    async init(data) {
        let arr = this.argUrl(data);
        let obj = false;
        for (let i in arr) {
            let as = this.key(arr[i]['name']);
            if (as&&as['schema']) {
                let res = this[as['schema']](arr[i]['value'], as['schemaVal']);
                //let awt = await this.findOne({username: data.username});
                if (res === true) {
                    obj = true;
                } else {
                    obj = as['schemaMsg'];
                    break;
                }
            }
        }

        for (let i in this.obj) {

            if (this.obj[i]['schemaReqiure'] && data[i]) {
                switch (tool.dataType[data[i]]) {
                    case 'array':
                        if (data[i].length > 0) {
                            if (!obj) {
                                obj = true;
                            }
                        } else {
                            obj = this.obj[i]['schemaReqiure'];
                        }
                        break;
                    case 'object':
                        if (JSON.stringify(data[i]) != '{}') {
                            if (!obj) {
                                obj = true;
                            }
                        } else {
                            obj = this.obj[i]['schemaReqiure'];
                        }
                        break;
                    default:
                        if (this.trim(data[i])) {
                            if (!obj) {
                                obj = true;
                            }
                        } else {

                            obj = this.obj[i]['schemaReqiure'];
                        }

                }

            }else{
                obj = this.obj[i]['schemaReqiure'];
            }

            if (this.obj[i]['schemaUniq'] && data[i]) {
                let arrobj = {};
                arrobj[i] = data[i];
                let is = await this.obj[i]['schemaUniq'][1].model.findOne(arrobj);
                if (is == null) {
                    if (!obj) {
                        obj = true;
                    }
                } else {
                    obj =this.obj[i]['schemaUniq'][0];
                }
            }
        }
        return obj;

    }
    async update(data) {
        let arr = this.argUrl(data);
        let obj = false;
        for (let i in arr) {
            let as = this.key(arr[i]['name']);
            if (as) {
                let res = this[as['schema']](arr[i]['value'], as['schemaVal']);
                //let awt = await this.findOne({username: data.username});
                if (res === true) {
                    obj = true;
                } else {
                    obj = {
                        msg: as['schemaMsg'],
                        value: arr[i]['value'],
                        path: arr[i]['name']
                    }
                    break;
                }
            }
        }
        return obj;

    }
    between(schema, value) {
        var value = "" + value + "";
        let len = tool.strlen(value);
        let test = value.split('-');
        if (len >= test[0] && len <= test[1]) {
            return true;
        } else {
            return false;
        }
    }
    alltel(str) {
        var value = "" + value + "";
        return this.tel(value) || this.tel400(value) || this.phone(value);
    }
    //正整数包含0
    int0(value) {
        var value = "" + value + "";
        var v = /^\d+$/;
        return v.test(value);

    }
    //正整数不包含0
    int(value) {
        var value = "" + value + "";
        var v = /^[0-9]*[1-9][0-9]*$/;
        return v.test(value);
    }
    //非正整数（负整数 + 0）
    _int0(value) {
        var value = "" + value + "";
        var v = /^((-\d+)|(0+))$/;
        return v.test(value);
    }
    //负整数
    _int(value) {
        var value = "" + value + "";
        var v = /^-[0-9]*[1-9][0-9]*$/;
        return v.test(value);
    }
    //整数
    allInt(value) {
        var value = "" + value + "";
        var v = /^-?\d+$/;
        return v.test(value);
    }
    require(str) { //必须字段
        if (str) {
            return true;
        } else {
            return false;
        }
    }
    tel(value) { //国内固话验证
        var value = "" + value + "";
        var result = value.match(/^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/);
        if (result == null) return false;
        return true;
    }
    tel400(value) {
        var value = "" + value + "";
        if (value.match(/^400\-[\d|\-]{7}[\d]{1}$/)) { //第一次匹配 400-（七个数字和-）（数字结尾）
            if (value.match(/[\-]/g) == "-,-") { //第二次匹配两个 -
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    trim(value) { //去除前后空格
        var value = "" + value + "";
        return value.replace(/(^\s*)|(\s*$)/g, '');
    }
    phone(value) {
        var value = "" + value + "";
        var result = value.match(/^1[34578]\d{9}$/);
        if (result == null) return false;

        return true;
    }
    email(value) { //email
        var value = "" + value + "";
        var result = value.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
        if (result == null) return false;
        return true;
    }
    argUrl(obj) {
        var result = [];

        function argFormat(obj, name) {
            if (typeof obj === "object") {
                for (let i in obj) {
                    if (typeof obj[i] === "object") {
                        name ? argFormat(obj[i], name + '.' + i) : argFormat(obj[i], i);
                    } else {
                        if (name) {

                            result.push({
                                name: name + "." + i,
                                value: obj[i]
                            });
                        } else {
                            result.push({
                                name: i,
                                value: obj[i]
                            });
                        }
                    }
                }
                return result;
            } else {
                result += obj;
                return result;
            }
        }
        return argFormat(obj);
    }

    key(name) {
        var v = /^\d+$/;
        var arr = name.split('.');
        let res = this.obj;
        for (let i = 0, l = arr.length; i < l; i++) {
            if (!v.test(arr[i])) {
                res = res[arr[i]];
                if (!res) {
                    res = false;
                    break;
                }
            }
        }

        return res;
        //for(let i=0)
    }
    strlen(value){
        return value.length>=6&&value.length<=16;
    }
    hasnum(value){
      return !!value.match(/\d/i);
    }

    hasUpper(value){
      return !!value.match(/[A-Z]/g);
    }
    hasLower(value){
      return !!value.match(/[a-z]/g);
    }
    pwd(value){
      return this.hasnum(value)&&this.hasUpper(value)&&this.hasLower(value)&&this.strlen(value);
    }
}
module.exports = Verify;

/**
phone:{
  schema:'object',
  schemaVal:'1-2',
  schemaMsg:'内容是必填的',
  data:{
      email:{
        type:email,
        msg:'什么内容'
    }
   }
}




**/
