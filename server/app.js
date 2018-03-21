require('dotenv').config()
var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var q = require("q");
var cors = require('cors');

var app = express();

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
const updateBook = "UPDATE books SET title = ?, author_firstname = ?, author_lastname = ? WHERE id = ?";
const saveOneBook = "INSERT INTO books (title, cover_thumbnail, author_firstname, author_lastname) VALUES (? ,? ,? ,?)";
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
        .then(function (results) {
            res.status(200).json(results);
            console.log(results);
        })
        .catch(function (err) {
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

app.use(express.static(__dirname + "/public"));

app.listen(NODE_PORT, function () {
    console.info("App server started on port " + NODE_PORT);
});
