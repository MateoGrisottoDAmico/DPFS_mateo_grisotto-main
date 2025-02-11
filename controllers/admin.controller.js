const path = require('path');
const fs = require('fs');

module.exports = {
    index: (req,res) =>{
        let modelos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/modelos.json')));
        res.render('admin/', {modelos});
    },

    add: (req,res) =>{
        let modelos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/modelos.json')));
        res.render('admin/add');
    }
}