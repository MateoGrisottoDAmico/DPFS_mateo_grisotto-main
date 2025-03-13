const path = require('path');
const fs = require('fs');

module.exports = {
    index: (req,res) =>{
        let modelos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/modelos.json')));
        res.render('admin/index', {modelos});
    },

    add: (req,res) =>{
        let modelos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/modelos.json')));
        res.render('admin/add');
    },
    
    save: (req,res) =>{
        let modelos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/modelos.json')));
        let ultimoModelo = modelos.pop();
        modelos.push(ultimoModelo);
        let nuevoModelo = {
            id: ultimoModelo.id +1,
            titulo: req.body.titulo,
            marca: req.body.marca,
            kilometraje: req.body.kilometraje,
            color: req.body.color,
            combustible: req.body.combustible,
            transmision: req.body.transmision,
            precio: req.body.precio,
            stock: req.body.stock,
            categoria: req.body.categoria,
            condicion: req.body.condicion,
            imagen: req.file.filename
        }
        modelos.push(nuevoModelo);
        let nuevoProductoGuardar = JSON.stringify(modelos,null,2);
        fs.writeFileSync(path.resolve(__dirname, '../data/modelos.json'), nuevoProductoGuardar);
        res.redirect('/');
    },

    show: (req,res) =>{
        let modelos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/modelos.json')));
        let miModelo = modelos.find(modelo => modelo.id == req.params.id);
        res.render('admin/detalle', {miModelo});
    },

    edit: (req,res) =>{
        let modelos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/modelos.json')));
        let idModelo = req.params.id;
        let editModelo = modelos.find(modelo=> modelo.id == idModelo);
        res.render('admin/edit', {editModelo});
    },

    update: (req,res) =>{
        let modelos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/modelos.json')));
        req.body.id = req.params.id;
        req.body.imagen = req.file ? req.file.filename : req.body.oldimagen;
        let modelosUpdate = modelos.map(modelo=> {
            if(modelo.id == req.body.id){
                return moto = req.body;
            }
            return modelo;
        })
        let modeloActualizar = JSON.stringify(modelosUpdate, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/modelos.json'), modeloActualizar);
        res.redirect('/');
    },

    destroy: (req,res) =>{
        let modelos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/modelos.json')));
        const modeloDeleteId = req.params.id;
        const modelosFinal = modelos.filter(modelo => modelo.id != modeloDeleteId);
        let modelosGuardar = JSON.stringify(modelosFinal, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/modelos.json'), modelosGuardar);
        res.redirect('/admin');
    }
}