import express from "express";
import dateFormat from "dateformat";
import mongoose from "mongoose";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://codedipanshu:Dipu123@cluster0.x4k77xh.mongodb.net/todolistDB");

const itemsSchema = new mongoose.Schema({
    name: String
});

const Today = mongoose.model("Today", itemsSchema);
const Work = mongoose.model("Work", itemsSchema);

const today1 = new Today({
    name: "<-- Hit this to delete an item."
});

const today2 = new Today({
    name: "Hit the + button to add new item."
});

const today3 = new Today({
    name: "Welcome to your ToDo List!"
});

app.get("/", async (req, res) => {
    const todayM = await Today.find();
    if (todayM.length === 0) {
        Today.insertMany([today1, today2, today3]);
        res.redirect("/");
    } else {
        res.render("index.ejs", { List: todayM, date: date });
    }
});

app.get("/work", async (req, res) => {
    const workM = await Work.find();
    res.render("work.ejs", { List: workM });
});

app.post("/", async (req, res) => {
    const newItem = req.body["newItem"];
    if (req.body["list"] === date) {
        const item = new Today({
            name: newItem
        });
        await item.save();
        res.redirect("/");
    } else if (req.body["list"] === "work") {
        const item = new Work({
            name: newItem
        });
        await item.save();
        res.redirect("/work");
    }
});

app.post("/delete", async (req, res) => {
    const id = req.body["checkbox"];
    if (req.body["list"] === date) {
        await Today.findByIdAndRemove(id);
        res.redirect("/");
    } else if (req.body["list"] === "work") {
        await Work.findByIdAndRemove(id);
        res.redirect("/work");
    }
});

app.listen(port, () => {
    console.log(`App is running on ${port}!`);
});

const now = new Date();
var date = dateFormat(now, "dddd, mmmm dS");
