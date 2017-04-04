
function authenticate(req, res, next){
    var auth = req.headers.authorization;
    if(auth){
        var buffer = new Buffer(auth.split(' ')[1], 'base64');
        var stringedBuffer = buffer.toString();
        var credentials = stringedBuffer.split(':');
        var username = credentials[0];
        var password = credentials[1];
        // TODO: check that the username/password pari is good
        console.log ( username, password);

        if(username == "bob" && password == "hope"){
            next(req, res);
        } else{
            res.statusCode = 401;
            res.statusMessage = "Unauthorized";
            res.end("Unauthorized");
        }
        next(req,res);
    }
}