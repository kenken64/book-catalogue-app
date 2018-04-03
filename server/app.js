require('dotenv').config()
const express = require("express"),
     bodyParser = require("body-parser"),
     mysql = require("mysql"),
     q = require("q"),
     cors = require('cors'),
     multer = require('multer'),
     googleStorage = require('@google-cloud/storage');

var app = express();
/**
 * service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth == null;
      allow write: if request.auth != null;
    }
  }
}

export GOOGLE_APPLICATION_CREDENTIALS=D:\Projects\book-catalogue-app\server\fsf2018r1-firebase-adminsdk-r3ido-6dc410e642.json
set GOOGLE_APPLICATION_CREDENTIALS=D:\Projects\book-catalogue-app\server\fsf2018r1-firebase-adminsdk-r3ido-6dc410e642.json
export GOOGLE_APPLICATION_CREDENTIALS=/home/kenneth/Projects/book-catalogue-app/server/fsf2018r1-firebase-adminsdk-r3ido-6dc410e642.json 
*/

const  gstorage = googleStorage({
    projectId: "fsf2018r1",
    keyFileName: process.env.FIREBASE_KEYFILENAME
});

const bucket = gstorage.bucket('fsf2018r1.appspot.com');

const googleMulter = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 20 * 1024 * 1024 // 20MB
    }
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now() + '_' + file.originalname)
    }
  })
  
var diskUpload = multer({ storage: storage })

app.use(cors())

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

var pool = mysql.createPool({
    host: process.env.MYSQL_SERVER,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: process.env.MYSQL_CONNECTION
});

const findAllBooks = "SELECT id, title, cover_thumbnail, author_firstname, author_lastname FROM books LIMIT ? OFFSET ?";
const findOneBook = "SELECT * FROM books WHERE id = ?";
const deleteOneBook = "DELETE FROM books WHERE id = ?";
const updateBook = "UPDATE books SET title = ?, author_firstname = ?, author_lastname = ? WHERE id = ?";
const saveOneBook = "INSERT INTO books (title, cover_thumbnail, author_firstname, author_lastname) VALUES (? ,? ,? ,?)";
const saveOneGallery = "INSERT INTO gallery (filename, fileUrl, remarks) VALUES (? ,? ,?)";

const searchBooksByCriteria = "SELECT * FROM books WHERE (title LIKE ?) || author_firstname LIKE ? || author_lastname LIKE ?";
const searchBookByTitle = "SELECT * FROM books WHERE title LIKE ?";
const searchBookByName = "SELECT * FROM books WHERE author_firstname LIKE ? || author_lastname LIKE ?";
const NODE_PORT = process.env.PORT;

var makeQuery = function (sql, pool) {
    console.log(sql);
    return function (args) {
        var defer = q.defer();
        pool.getConnection(function (err, conn) {
            if (err) {
                defer.reject(err);
                return;
            }
            conn.query(sql, args || [], function (err, results) {
                conn.release();
                if (err) {
                    defer.reject(err);
                    return;
                }
                defer.resolve(results);
            });
        });
        return defer.promise;
    }
};


var findAll = makeQuery(findAllBooks, pool);
var findOne = makeQuery(findOneBook, pool);

var updateOne = makeQuery(updateBook, pool);
var saveOne = makeQuery(saveOneBook, pool);
var saveGallery = makeQuery(saveOneGallery, pool);

var deleteOne = makeQuery(deleteOneBook, pool);

var searchBooks = makeQuery(searchBooksByCriteria, pool);
var searchByTitle = makeQuery(searchBookByTitle, pool);
var searchByName = makeQuery(searchBookByName, pool);

app.get("/api/books", function (req, res) {
    console.log(req.query.limit);
    console.log(req.query.offset);
    var limit = parseInt(req.query.limit) || 50;
    var offset = parseInt(req.query.offset) || 0;
    findAll([limit, offset])
        .then(function (results) {
            res.status(200).json(results);
        })
        .catch(function (err) {
            res.status(500).end();
        });
});

app.get("/api/book/:bookId", function (req, res) {
    console.log(req.params.bookId);
    findOne([req.params.bookId])
        .then(function (results) {
            res.status(200).json(results[0]);
        })
        .catch(function (err) {
            res.status(500).end();
        });
});

app.post("/api/books", function (req, res) {
    console.log(req.body);
    
    saveOne([req.body.book_title, req.body.imageUrl ,req.body.author_firstname, req.body.author_lastname])
        .then(function (result) {
            res.status(200).json(result);
            console.log(result);
        })
        .catch(function (err) {
            res.status(500).end();
        });
});

app.delete("/api/books/:delId", function (req, res) {
    console.log(req.body);
    res.status(200).json({});
    console.log(req.params.delId);
    deleteOne([req.params.delId])
        .then(function (result) {
            res.status(200).json(result);
            console.log(result);
        })
        .catch(function (err) {
            res.status(500).end();
        });
});

app.put("/api/books", function (req, res) {
    console.log(req.body);
    updateOne([req.body.book_title, req.body.author_firstname, req.body.author_lastname, req.body.id])
        .then(function (result) {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).end();
        });
});

app.get("/api/books/search", function (req, res) {
    console.log(req.query);
    var searchType = req.query.searchType;
    var keyword = req.query.keyword;
    if(typeof searchType === 'string' && searchType != '1') {
        if(searchType=='Title'){
            console.log('search by title');
            var title = "%" + keyword + "%";
            searchByTitle([title])
                .then(function (results) {
                    res.status(200).json(results);
                    //console.log(results);
                })
                .catch(function (err) {
                    console.log(err);
                    res.status(500).end();
                });
        }
        else {
            console.log('search by author');
            var authorName = keyword.split(' ');
            if(!authorName[1]) authorName[1] = authorName[0];
            var firstname = "%" + authorName[0] + "%";
            var lastname = "%" + authorName[1] + "%";
                searchByName([firstname, lastname])
                .then(function (results) {
                    res.status(200).json(results);
                    //console.log(results);
                })
                .catch(function (err) {
                    console.log(err);
                    res.status(500).end();
                });
        }
    }
    else {
        console.log('search by both');
        var title = "%" + keyword + "%";
        var authorName = keyword.split(' ');
        if(!authorName[1]) authorName[1] = authorName[0];
        var firstname = "%" + authorName[0] + "%";
        var lastname = "%" + authorName[1] + "%";
        console.log(title);
        console.log(firstname);
        console.log(lastname);
        searchBooks([title, firstname, lastname])
            .then(function (results) {
                res.status(200).json(results);
                //console.log(results);
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).end();
            });
    }
});



//app.post('/upload-firestore', googleMulter.single('coverThumbnail'), (req, res)=>{
app.post('/upload-firestore', googleMulter.single('coverThumbnail'), (req, res)=>{
    console.log('upload here ...');
    console.log(req.file);
    console.log(req);
    uploadToFireBaseStorage(req.file).then((result=>{
        console.log("firebase stored -> " + result);
        saveGallery([req.file.originalname, result, req.body.remarks]).then((result)=>{
            console.log(result);
        }).catch((error)=>{
            console.log("error ->" + error);
        })
    })).catch((error)=>{
        console.log(error);
    })
    res.status(200).json({});
})

app.post('/upload', diskUpload.single('coverThumbnail'), (req, res)=>{
    console.log('upload here ...');
    
    res.status(200).json(req.file);
})

// upload the incoming file from the angular5 ui 
const uploadToFireBaseStorage = function(file) {
    return new Promise((resolve, reject)=>{
        if(!file){
            reject('Invalid file upload');
        }

        let newfileName = `${Date.now()}_${file.originalname}`;
        let fileupload = bucket.file(newfileName);
        const blobStream = fileupload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });
        blobStream.on('error', (error)=>{
            console.log(error);
            reject('Something went wrong during file upload');
        });

        blobStream.on('finish', ()=>{
            console.log(fileupload.name);
            const url = `https://firebasestorage.googleapis.com/v0/b/fsf2018r1.appspot.com/o/${fileupload.name}?alt=media`;
            file.fileURL = url;
            resolve(url)
        });
            
        blobStream.end(file.buffer);
    });
}

app.use(express.static(__dirname + "/public"));

app.listen(NODE_PORT, function () {
    console.info("App server started on port " + NODE_PORT);
});
