import mongoose from 'mongoose';

//Definir un esquema
const schemaEmpresas = new mongoose.Schema({
    nombre: String,
    web: String,
    notas: String
});

//Crear un modelo basado en el esquema
export const modeloEmpresas = mongoose.model('Empresas', schemaEmpresas);