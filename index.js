const express = require("express");
const app=express();
const port = 3000;
const path=require("path");
const{v4:uuidv4} =require('uuid');
uuidv4();


app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {   id: uuidv4(),
        username:"apnacollege",
        content : "I love coding"
    },

    {   id:uuidv4(),
        username:"shradhha khapra",
        content:"Hardwork is important to achieve success"
    },

    {   id: uuidv4(),
        username:"Rahul Kumar ",
        content:"I got selected for my 1st internship"
    },
];


app.get("/posts", (req,res) => {
    res.render("index.ejs",{posts});
});

app.get("/posts/new", (req,res) =>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    //console.log(req.body);
    let {username, content}=req.body;
    let id = uuidv4();
    posts.push({id,username,content});
   // res.send('post request working');
   res.redirect('/posts');
});

app.patch("/posts/:id", (req,res) => {
    let {id} =req.params;
    let newContent=req.body.content;
    //console.log(id);
    //console.log(newContent);
    let post=posts.find((p) => id == p.id);
    post.content=newContent;
    console.log(post);
    res.send("Patch request working");
});

app.get("/posts/:id",(req,res)=>{
    let { id }= req.params;
    let post = posts.find((p) => id == p.id);  
    //console.log(id);
    // console.log(post);
    // res.send("Request Working");
    res.render("show.ejs", {post});
});

app.get("/posts/:id/edit", (req,res) =>{
    let {id}=req.params;
    let post=posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.delete(port, () => {
    let { id }= req.params;
    let post= posts.find((p) => id === p.id);
    res.send("Delete Success");
});

app.listen(port,() =>{
    console.log("Listening to the port: 3000");
});
