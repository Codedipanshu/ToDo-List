import express from "express";
import dateFormat from "dateformat";
const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(arrayCheck);

app.get("/", (req, res) => {
    res.render("index.ejs", { List: today, date: date });
});

app.get("/work", (req, res) => {
    res.render("work.ejs", { List: work });
});

app.post("/", (req, res) => {
    if (req.body["list"] === date) {
        today.push(req.body["newItem"]);
        res.redirect("/");
    } else if (req.body["list"] === "work") {
        work.push(req.body["newItem"]);
        res.redirect("/work");
    }
});

app.listen(port, () => {
    console.log(`App is running on ${port}!`);
});

var today = [];
var work = [];

function arrayCheck(req, res, next) {
    if (today.length > 20) {
        today = [];
    }
    if (work.length > 20) {
        today = [];
    }
    next();
}


const now = new Date();
var date = dateFormat(now, "dddd, mmmm dS");
