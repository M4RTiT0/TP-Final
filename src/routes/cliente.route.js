const express = require('express')

const enrutador = express.Router();

const pool = require('../database')

enrutador.get('/cliente', async (req,res) => {

    const db = await pool.obtenerConexion()
    //vamos a realizar una consulta a la base. Es decir, una query.
    const rows = await db.query('select * from cliente')

    res.json(rows)
})


enrutador.post('/cliente', async (req,res) => {

    const unCliente = req.body;
    const db = await pool.obtenerConexion()
    await db.query(`insert into cliente (razon_social,telefono,direccion_ip,descripcion_equipo,sistema_operativo) 
    VALUES ('${unCliente.razon_social}','${unCliente.telefono}','${unCliente.direccion_ip}','${unCliente.descripcion_equipo}','${unCliente.sistema_operativo}')`)

    res.json('!El cliente se creo exitosamente!')

})

enrutador.put('/cliente/:codigo', async (req,res) => {

    const db = await pool.obtenerConexion()
    const id = req.params.codigo
    const cm = req.body
    await db.query(`update cliente
    set razon_social = '${cm.razon_social}', telefono ='${cm.telefono}', direccion_ip ='${cm.direccion_ip}', descripcion_equipo ='${cm.descripcion_equipo}', sistema_operativo ='${cm.sistema_operativo}'
    where id_cliente =${id}`)

    res.json('!actualizacion exitosa!')

})

enrutador.delete('/cliente/:codigo', async (req,res) => {

    const db = await pool.obtenerConexion()
    const id = req.params.codigo
    await db.query(`delete from cliente where id_cliente = ${id}`)

    res.json('!eliminacion exitosa!')

})

enrutador.get('/cliente/:codigo', async (req,res) => {

    const db = await pool.obtenerConexion()
    const id = req.params.codigo
    const row = await db.query(`select * from cliente where id_cliente =${id}`)

    res.json(row[0])

})

module.exports = enrutador