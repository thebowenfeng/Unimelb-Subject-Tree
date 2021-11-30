var express = require('express');
var router = express.Router();
var subject = require("../models/subjects");
var stringSim = require("string-similarity")

router.use('/search/:id', async (req, res, next) =>{
    let result;
    try{
        result = await subject.findOne({"code": req.params.id});
        if(result == null){
            return res.send("null result");
        }
    }catch(err){
        return res.json({err: err.message});
    }

    res.result = result;
    next();
})

router.get("/", async function(req, res) {
    try{
        var subjects = await subject.find();
        res.json(subjects);
    }catch(err){
        res.json({error: err.message});
    }
})

router.get("/all_codes", async function(req, res){
    try{
        var subjects = await subject.find();
        var names = [];

        subjects.forEach((subject) => {
            names.push(subject["code"]);
        });

        res.json(names);
    }catch(err){
        res.json({error: err.message});
    }
})

router.get("/match/:name", async function(req, res){
    try{
        var subjects = await subject.find();
        var all = [];
        var final = [];

        subjects.forEach((subject) => {
            var subjectSim = {};
            subjectSim["obj"] = subject;
            subjectSim["sim"] = stringSim.compareTwoStrings(req.params.name.toLowerCase(), subject["name"].toLowerCase());
            all.push(subjectSim);
        })

        all.sort(function(x, y){
            if(x["sim"] > y["sim"]){
                return -1;
            }
            if(x["sim"] < y["sim"]){
                return 1;
            }
            return 0;
        })

        for(var i = 0; i < all.length; i++){
            if(all[i]["sim"] <= 0.2){
                break;
            }

            final.push(all[i]);
        }

        res.json(final);
    }catch(err){
        res.json({error: err.message});
    }
})

router.get('/search/:id', function(req, res){
    res.json(res.result);
});

router.post('/', async function(req, res) {
    var newSubject = new subject({
        name: req.body.name,
        array: []
    });

    try{
        var result = await newSubject.save();
        res.json(result);
    }catch(err){
        res.json({err: res.message});
    }
})

module.exports = router;