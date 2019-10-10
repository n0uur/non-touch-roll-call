var express = require('express');
var auth = express();

auth.post('/login', async (request, response) => {
    try {
        let {username, password} = request.body;
    //   let {token, status, err} = await Auth.login(username, password);
        if (status) {
        response.send({
            statusCode: 200,
            status: true,
            message: "Login success",
            token: token
        });
        } else {
        response.send({
            statusCode: 400,
            status: false,
            message: "login false",
            err: err
        });
        }
    } catch (e) {
        console.log(e);
        response.send({
        statusCode: 500,
        status: false,
        message: 'Internal Server Error',
        err: e
        });
    }
});

auth.get('/myid/:id/:test', async (req, res) => {
    try {
        res.send('Your ID : ' + req.params.id + ' ' + req.param.test)
    } catch (e) {
        console.log(e)
    }
})

module.exports = auth;

