var express = require('express');
// var router = express.Router(); instead use router.get | .post | .put | .delete
// var cors = require("cors");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.options('*', cors());

// app.use(cors);
var admin = require("firebase-admin");


var serviceAccount = require("../kachrisma-access.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kachrisma-73ae2.firebaseio.com"
});

/* GET users listing. */
app.get('/', function(req, res, next) {


    var database_ref = admin.database().ref();

    database_ref.once('value', function(snapshot) {
        var record_list = [];

        snapshot.forEach(function(childSnap) {
            var childData = childSnap.val();
            record_list.push(childData.codigo);
        });

        console.log(record_list);
        res.status(200).json({
            ok: true,
            records: record_list
        });
    });

});

// este endpoint debería invocarse de la sig forma: nombre_dominio.loquesea/function?id=funcion_id
app.get('/function', function(req, res, next) {

    var id = req.query.id;

    var database_ref = admin.database().ref();

    database_ref.once('value', function(snapshot) {
        var record_list = [];

        snapshot.forEach(function(childSnap) {
            var childData = childSnap.val();
            if (childData.id == id) {
                record_list.push(childData.codigo);

            }

        });

        /*res.status(200).json({
            ok: true,
            records: record_list
        });*/
        res.send(record_list[0]);
    });

});

/*app.post('/', function(req, res, next) {
    res.send('respond with a resource');
});*/

module.exports = app;