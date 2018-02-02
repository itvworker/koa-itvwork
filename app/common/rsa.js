const fs = require('fs');
const crypto = require('crypto');
const nodeRsa = require('node-rsa');
class Rsa {
    encrypt(data) {
        var publicPem = fs.readFileSync(path.join(webconfig.rsa, 'rsa_public_key.pem')).toString();
        let rsa = new nodeRsa(publicPem);
        rsa.setOptions({encryptionScheme: 'pkcs1'});
        var encrypted = rsa.encrypt(data, 'base64');
        return encrypted;
    }
    decrypt(data) {
        var privatePem = fs.readFileSync(path.join(webconfig.rsa, 'rsa_private_key.pem')).toString();
        let rsa = new nodeRsa(privatePem);
        rsa.setOptions({encryptionScheme: 'pkcs1'});
        var decrypted = rsa.decrypt(data, 'utf8');
        return decrypted;
    }
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
