require('dotenv').config()
const express = require("express"),
     bodyParser = require("body-parser"),
     mysql = require("mysql"),
     q = require("q"),
     cors = require('cors'),
     multer = require('multer'),
     googleStorage = require('@google-cloud/storage');

const admin = require('firebase-admin');
const keys = require(process.env.FIREBASE_KEY);
var session = require('express-session')
var mailgun = require('mailgun.js');
var mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || '',
    public_key: process.env.MAILGUN_PUBLIC_KEY || ''
  });
admin.initializeApp({
    databaseURL: process.env.FIREBASE_DB_URL,
    credential: admin.credential.cert(keys)
});

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
    projectId: process.env.FIREBASE_PROJECT_ID,
    keyFileName: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const bucket = gstorage.bucket(process.env.FIREBASE_BUCKET_NAME);

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
app.use(session({ 
        secret: 'thisisasecretbetweenus', 
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }}))

app.use(cors({credentials: true, 
    origin: [undefined, 'http://localhost:4200', 'http://localhost', 
    'http://192.168.1.88', 'http://192.168.1.88:4200']  }));

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

const findAllBooks = "SELECT id, title, cover_thumbnail, author_firstname, author_lastname FROM books where email=? LIMIT ? OFFSET ?";
const findOneBook = "SELECT * FROM books WHERE id = ?";
const findAllPublicRecipe = "SELECT * FROM reciepe WHERE isPublic = ?";
const deleteOneBook = "DELETE FROM books WHERE id = ?";
const updateBook = "UPDATE books SET title = ?, author_firstname = ?, author_lastname = ? WHERE id = ?";
const saveOneBook = "INSERT INTO books (title, cover_thumbnail, author_firstname, author_lastname, email) VALUES (? ,? ,? ,?, ?)";
const saveOneGallery = "INSERT INTO gallery (filename, fileUrl, remarks, email) VALUES (? ,? ,?, ?)";

const searchBooksByCriteria = "SELECT * FROM books WHERE email=? AND (title LIKE ?) || author_firstname LIKE ? || author_lastname LIKE ?";
const searchBookByTitle = "SELECT * FROM books WHERE email=? AND  title LIKE ?";
const searchBookByName = "SELECT * FROM books WHERE email=? AND  author_firstname LIKE ? || author_lastname LIKE ?";
const NODE_PORT = process.env.PORT;

function isAuthenticate(req,res,next){
    if(req.headers.authorization != null){
        console.log(req.headers.authorization);
        var authIdToken = req.headers.authorization.split(' ')[1];
        console.log("authIdToken" + authIdToken);
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
            req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            admin.auth().verifyIdToken(req.headers.authorization.split(' ')[1]).then(function(result){
                if(result != null){
                    req.session.firebaseEmail = result.email;
                    return next();
                }{
                    throw new Error('Firebase unable to verify');
                }
            }).catch(error => {
                console.log(error);
                return res.status(403).json({error: 'Access Denied with firebase verification error'});
            });    
        }else{
            return res.status(403).json({error: 'Access Denied'});
        }
    }else{
        return res.status(403).json({error: 'Access Denied'});
    } 
}

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

app.get("/api/books", isAuthenticate, function (req, res) {
    console.log(req.query.limit);
    console.log(req.query.offset);
    var limit = parseInt(req.query.limit) || 50;
    var offset = parseInt(req.query.offset) || 0;
    var email = req.session.firebaseEmail;
    console.log(email);
    findAll([email, limit, offset])
        .then(function (results) {
            res.status(200).json(results);
        })
        .catch(function (err) {
            res.status(500).end();
        });
});

app.get("/api/book/:bookId", isAuthenticate, function (req, res) {
    console.log(req.params.bookId);
    findOne([req.params.bookId])
        .then(function (results) {
            res.status(200).json(results[0]);
        })
        .catch(function (err) {
            res.status(500).end();
        });
});

app.post("/api/books", isAuthenticate, function (req, res) {
    console.log(req.body);
    var email = req.session.firebaseEmail;
    saveOne([req.body.book_title, req.body.imageUrl ,req.body.author_firstname, req.body.author_lastname, email])
        .then(function (result) {
            mg.messages.create('sandboxe2ef77d2dea04510b84b5c1423ab1087.mailgun.org', {
                from: "BookWorm User <noreply@bookworm.sg>",
                to: [email],
                subject: `New Book Added ${req.body.book_title}`,
                text: `Yahoo you got a new book added! ${req.body.book_title}`,
                html: `<h1>Yahoo you got a new book added! ${req.body.book_title}</h1> <img src="https://firebasestorage.googleapis.com/v0/b/fsf2018r1.appspot.com/o/1522739894784_tombraider.png?alt=media">`
              })
              .then(msg => console.log(msg)) // logs response data
              .catch(err => console.log(err)); // logs any error
            res.status(200).json(result);
            console.log(result);
        })
        .catch(function (err) {
            res.status(500).end();
        });
});

app.delete("/api/books/:delId", isAuthenticate, function (req, res) {
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

app.put("/api/books", isAuthenticate, function (req, res) {
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

app.get("/api/books/search", isAuthenticate, function (req, res) {
    var searchType = req.query.searchType;
    var keyword = req.query.keyword;
    var email = req.session.firebaseEmail;
    console.log(">>> " + email);
    if(typeof searchType === 'string' && searchType != '1') {
        if(searchType=='Title'){
            console.log('search by title');
            var title = "%" + keyword + "%";
            searchByTitle([email, title])
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
                searchByName([email, firstname, lastname])
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
        searchBooks([email, title, firstname, lastname])
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



//app.post('/upload-firestore',isAuthenticate,  googleMulter.single('coverThumbnail'), (req, res)=>{
app.post('/upload-firestore', isAuthenticate, googleMulter.single('coverThumbnail'), (req, res)=>{
    console.log('upload here ...');
    console.log(req.file);
    console.log(req);
    if(req.file != null){
        uploadToFireBaseStorage(req.file).then((result=>{
            console.log("firebase stored -> " + result);
            var email = req.session.firebaseEmail;
            saveGallery([req.file.originalname, result, req.body.remarks,email]).then((result)=>{
                console.log(result);
            }).catch((error)=>{
                console.log("error ->" + error);
            })
        })).catch((error)=>{
            console.log(error);
        })
    }
    res.status(200).json({});
})

app.post('/upload', isAuthenticate, diskUpload.single('coverThumbnail'), (req, res)=>{
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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-auth, Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(NODE_PORT, function () {
    console.info("App server started on port " + NODE_PORT);
});
