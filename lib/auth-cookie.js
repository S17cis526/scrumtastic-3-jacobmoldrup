modules.exports = auth;


function auth(req, res){
    console.log(req.headers.cookie);
    res.setHeader('Set-Cookie', [
        "quote=cookies%20are%20for%20me;",
        "sessionid=212;Expires=Wed, 09 , Jun 2021 10:18:14 GTM",
        "safe=value;HttpOnly"
    ]);
    next(req, res);
}   