const crypto = require('crypto');
algorithm = 'aes-256-ctr',password = 'RJ23edrf';
class encryptDecryptClass {
    constructor() {
        this.encryptText = this.encryptText.bind(this);
    }

    encryptText(text) {
        var cipher = crypto.createCipher(algorithm, password);
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }
    decryptText(text){
        var decipher = crypto.createDecipher(algorithm,password)
        var dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
     }
}

var encDecCl = new encryptDecryptClass();
module.exports = encDecCl;