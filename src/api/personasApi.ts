import express from 'express';
import { modeloPersonas } from '../models/personas';
import authMiddleWare from './auth';

const router = express.Router();

router.get('/getPersonas',authMiddleWare, async (req, res) => {
    try {
        const personas = await modeloPersonas.find({}, "nombre");

        // Verificar si se encontró la sala
        if (!personas) {
            return res.status(404).json({ mensaje: `personas no encontradas` });
        }
        res.json({ personas });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/getPersona/:id',authMiddleWare, async (req, res) => {
    try {
        const idPersona = req.params.id;
        const personas = await modeloPersonas.find({id : idPersona});

        // Verificar si se encontró la sala
        if (!personas) {
            return res.status(404).json({ mensaje: `persona no encontradas` });
        }
        res.json({ personas });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/addPersona',authMiddleWare, async (req, res) => {
    try {
        const newPersona = new modeloPersonas({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            telefono: req.body.telefono,
            empresa: req.body.empresa,
            notas: req.body.notas
        });

        await newPersona.save();

        res.json({ newPersona });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delPersona',authMiddleWare, async (req, res) => {
    try {
        const result = await modeloPersonas.deleteOne({
            telefono: req.body.telefono
        });
        res.json({ result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/searchPersona',authMiddleWare, async (req, res) => {
    try {
        // Accede a los parámetros de consulta
        const nombre = req.query.nombre;
        const apellido = req.query.apellido;

        // Realiza la búsqueda en la base de datos
        const result = await modeloPersonas.findOne({
            nombre: nombre,
            apellido: apellido
        });

        // Envía el resultado como respuesta
        res.json({ result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});


export default router;
