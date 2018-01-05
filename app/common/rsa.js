const fs = require('fs');
const crypto = require('crypto');

class Rsa {
    encrypt(data) {
        var privatePem = fs.readFileSync(path.join(webconfig.rsa, 'rsa_private_key.pem'));
        var publicPem = fs.readFileSync(path.join(webconfig.rsa, 'rsa_public_key.pem'));
        var key = privatePem.toString();
        var pubkey = publicPem.toString()
        var sign = crypto.createSign('RSA-SHA256');
        sign.update(data);
        var sig = sign.sign(pubkey, 'hex');
        return sig;
    }
    // decrypt(data) {
    //     var privatePem = fs.readFileSync(path.join(webconfig.rsa, 'rsa_private_key.pem'));
    //     var publicPem = fs.readFileSync(path.join(webconfig.rsa, 'rsa_public_key.pem'));
    //     var key = privatePem.toString();
    //     var pubkey = publicPem.toString();
    //     var verify = crypto.createVerify('RSA-SHA256');
    //     verify.update(data);
    //     return verify.verify(pubkey, data, 'hex');
    //
    // }

}

/**

var crypto = require('crypto')
    ,fs = require('fs');
var privatePem = fs.readFileSync('./pem/rsa_private_key.pem');
var publicPem = fs.readFileSync('./pem/rsa_public_key.pem');
var key = privatePem.toString();
var pubkey = publicPem.toString();
var data = "cdss";
//加密
var sign = crypto.createSign('RSA-SHA256');
sign.update(data);
var sig = sign.sign(key, 'hex');
console.log(sig);
//解密
var verify = crypto.createVerify('RSA-SHA256');
verify.update(data);
console.log(verify.verify(pubkey, sig, 'hex'));


**/


module.exports = new Rsa();
