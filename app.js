const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const port = 8080;
const dbServer = require("./db/database");
const Contact = require("./models/contacts");

dbServer();
const app = express();
app.use(express.json());

app.post("/v1/contacts", async(req, res) => {
    try{
        const postData = await Contact.create(req.body)
        res.status(201).json({
            message: "success",
            result: postData
        })
    }catch(err){
        res.status(404).json({
            message: err.message
        })
    }
    
})

app.get("/v1/contacts", async(req, res) => {
    const getData = await Contact.find({});
    res.status(200).json({
        message: "success",
        result: getData
    })
})

app.get("/v1/contacts/:id", async(req, res) => {
    try{
        const getData = await Contact.find({_id: req.params.id});
        res.status(200).json({
            message: "success",
            result: getData
        })
    }catch{
        res.status(404).json({
            message: "failure",
            error: "There is no contact with that id"
        })
    }
})

app.delete("/v1/contacts/:id", async(req, res) => {
    const deleteData = await Contact.deleteOne({_id: req.params.id})
    res.status(204).json({
        message: "The selected contact is deleted"
    })
})

app.put("/v1/contacts/:id", async(req, res) => {
    try{
        const updateData = await Contact.find({_id: req.params.id}).updateOne(req.body);
        res.status(204).json({
            message: "The selected contact is updated"
        });
    }catch{
        res.status(404).json({
            error: "There is no contact with that id"
        })
    }
    
})

app.patch("/v1/contacts/:id", async(req, res) => {
    try{
        const updateData = await Contact.find({_id: req.params.id}).updateOne(req.body);
        res.status(204).json({
            message: "The selected contact is updated"
        })
    }catch{
        res.status(404).json({
            error: "There is no contact with that id"
        })
    }
})

app.listen(port, () => console.log(`Server is listening port ${port}`));