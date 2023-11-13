import mongoose from 'mongoose';

//Definir un esquema
const schemaUser = new mongoose.Schema({
    name: String,
    password: String
});

//Crear un modelo basado en el esquema
export const modeloUser = mongoose.model('User', schemaUser);