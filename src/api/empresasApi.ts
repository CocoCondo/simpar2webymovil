import express from 'express';
import { modeloEmpresas } from '../models/empresas';
import { modeloPersonas } from '../models/personas';
import authMiddleWare from "./auth";

const router = express.Router();

router.get('/getEmpresas', authMiddleWare, async (req, res) => {
    try {
        const empresas = await modeloEmpresas.find({}, "nombre");

        // Verificar si se encontró la sala
        if (!empresas) {
            return res.status(404).json({ mensaje: `empresas no encontradas` });
        }
        res.json({ empresas });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/getEmpresa/:id', authMiddleWare, async (req, res) => {
    try {
        const idEmpresa = req.params.id;
        const empresas = await modeloEmpresas.find({ id: idEmpresa });

        // Verificar si se encontró la sala
        if (!empresas) {
            return res.status(404).json({ mensaje: `empresa no encontradas` });
        }
        res.json({ empresas });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/addEmpresa', authMiddleWare, async (req, res) => {
    try {
        const newEmpresa = new modeloEmpresas({
            nombre: req.body.nombre,
            web: req.body.web,
            notas: req.body.notas
        });

        await newEmpresa.save();

        res.json({ newEmpresa });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delEmpresa', authMiddleWare, async (req, res) => {
    try {
        let result = null;
        const isAssosiated = await modeloPersonas.findOne({
            empresa: req.body.nombre
        })
        console.log("ACA", isAssosiated);
        if (!isAssosiated) {
            result = await modeloEmpresas.deleteOne({
                nombre: req.body.nombre
            });
            res.json({ result });
        }
        else {
            throw (new Error("La empresa tiene personas asociadas"))
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
export default router;
