"use strict";

const secret = "agtueagsfdslkatiorepahgdafaurtgasdfjarw fdsa qyt4ewh gajujtyuttrr";
const algorithm = "aes-256-ctr";

const crypto = require('crypto');

class Encryption{

    salt(){
        return  crypto.randomBytes(32).toString('hex').slice(32);
    }

    digest(plaintext){
        const hash = crypto.createHash('sha256');
        hash.update(plaintext);
        has.update(secret);
        return hash.digest('hex');
    }
    // creates a crtographic has using salt


    encypher(plaintext){
        const cipher = crypto.createCipher(algorithm, secret);
        var encrypted = crypto.update(plaintext, 'utf8', 'hex');
        encrypted += cipher.final('hex');

    }

    decrypt(cryptext){
        const decypher = crypto.createCipher(algorithm, secret);
        var decrypted = decypher.update(cryptext, 'hex', 'utf8');
        decrypted += decypher.final('utf8');

        return decrypted;
    }


}
    module.exports = {
        digest:digest,
        encrypt: encrypt
    }