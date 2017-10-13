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
    }

}
module.exports = new Tool();
