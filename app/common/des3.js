const assert = require('assert');
const crypto = require('crypto');
class Des3 {

    //加密
    encrypt(param) {
        var key = new Buffer(param.key);
        var iv = new Buffer(param.iv ? param.iv : 0);
        var plaintext = param.plaintext;
        var alg = param.alg;
        var autoPad = param.autoPad;
        //encrypt
        var cipher = crypto.createCipheriv(alg, key, iv);
        cipher.setAutoPadding(autoPad) //default true
        var ciph = cipher.update(plaintext, 'utf8', 'hex');
        ciph += cipher.final('hex');
        return {
            alg: alg,
            ciph: ciph
        };
    }
    decrypt(param) {
        var key = new Buffer(param.key);
        var iv = new Buffer(param.iv ? param.iv : 0);
        var plaintext = param.plaintext;
        var alg = param.alg;
        var autoPad = param.autoPad;
        //decrypt
        var cipher = crypto.createCipheriv(alg, key, iv);
        cipher.setAutoPadding(autoPad);
        var decipher = crypto.createDecipheriv(alg, key, iv);
        var txt = decipher.update(plaintext, 'hex', 'utf8');
        txt += decipher.final('utf8');
        return txt;
    }

}

/**

test_des({
    alg: 'des-ecb',
    autoPad: true,
    key: '01234567',
    plaintext: '1234567812345678',
    iv: null
})

test_des({
    alg: 'des-cbc',
    autoPad: true,
    key: '01234567',
    plaintext: '1234567812345678',
    iv: '12345678'
})

test_des({
    alg: 'des-ede3',    //3des-ecb
    autoPad: true,
    key: '0123456789abcd0123456789',
    plaintext: '1234567812345678',
    iv: null
})

test_des({
    alg: 'des-ede3-cbc',    //3des-cbc
    autoPad: true,
    key: '0123456789abcd0123456789',
    plaintext: '1234567812345678',
    iv: '12345678'
})

**/
module.exports = new Des3();
