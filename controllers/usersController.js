const express = require('express');
const Usuario = require('../models/UsuariosSchema');

const listarUsuarios = async(req, res = express.request) => {
    const usuarios = await Usuario.find().populate('propiedades', 'name')

    try{
        res.status(200).json({
                ok: true,
                usuarios,
            })
        } catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error Interno',
        })
    }
}

module.exports =  {
    listarUsuarios
}