const url=require('url')
const express = require("express");
const needle= require('needle')
const apiCache= require('apicache')
const router = express.Router();

//ENV var
const API_BASE_URL=process.env.API_BASE_URL
const API_KEY_NAME=process.env.API_KEY_NAME
const API_KEY_VALUE=process.env.API_KEY_VALUE

let cache= apiCache.middleware

router.get("/",cache('2 minutes'),async (req, res) => {
    try{
        console.log(url.parse(req.url,true).query);
 
           const params=new URLSearchParams({
            [API_KEY_NAME]:API_KEY_VALUE,
            ...url.parse(req.url,true).query
        })
        const apiRes= await needle('get',`${API_BASE_URL}?${params}`)
        const data= apiRes.body
        console.log(`Request : ${API_BASE_URL}?${params}`);
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({error})
    }
 
});

module.exports = router;
