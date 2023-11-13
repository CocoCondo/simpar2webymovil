import mongoose from 'mongoose';

//Definir un esquema
const schemaPersonas = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    empresa: String,
    notas: String
});

//Crear un modelo basado en el esquema
export const modeloPersonas = mongoose.model('personas', schemaPersonas);