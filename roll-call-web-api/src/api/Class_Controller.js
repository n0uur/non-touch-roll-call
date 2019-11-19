var express = require('express')
var ClassController = express()
const conn = require('./mysql')

ClassController.post('/addClass', async (request, response) => {
    try {
        let class_info = request.body;
        console.log(class_info)
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

ClassController.get('/', (req, res) => {
    query = "SELECT * from student_data"

    conn.query(query, (error, results, fields) => {
        if (error) {
            console.log(error)
        }

        res.header("Content-Type", 'application/json')
        res.status(200).send(JSON.stringify(results, null, 2))
    })
    
    // conn.query("", (error, results, fields) => {
    //     if (error) {
    //         console.log(error)
    //     }
    //     console.log(results)
    //     res.header("Content-Type", 'application/json')
    //     res.send(JSON.stringify({ data: results }, null, 2))
    // })
})


module.exports = ClassController;
