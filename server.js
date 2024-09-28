const express = require('express');
const app = express();
const HTTP_PORT = process.env.PORT || 3000;

const legoData = require("./modules/legoSets.js");

legoData.initialize();



app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));

app.get('/', (req, res) => {
    res.send('Assignment 2: Prakhar Dhanesh Mavi - Student Id - 152781225');
  });


  app.get('/lego/sets', async (req, res) => {
    try {
        let sets = await legoData.getAllSets(); 
        res.send(sets); 
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message }); 
    }
});

app.get('/lego/sets/num-demo', async (req, res) => {
    const setNum = '001-1'; 
    
    try {
        const set = await legoData.getSetByNum(setNum);
        res.json(set); 
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message }); 
    }
});

app.get('/lego/sets/theme-demo', async(req,res)=>{
    const theme = 'tech'
    try{
        const sets = await legoData.getSetsByTheme(theme)
        res.json(sets);
    }
    catch(error){
        console.error(error);
        res.status(404).json({ error: error.message });
    }
})