const fs = require('fs');
const path = require('path');

const db = require('./database/models');

async function seedUsuarios() {
    try {
        const usuariosData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf-8'));

        for (const usuario of usuariosData) {
            await db.Usuario.create({
                nombre: usuario.nombre,
                apellido: usuario.apellido, 
                email: usuario.email,
                telefono: usuario.telefono,
                password: usuario.password,
                role: usuario.role,
            });
        }

        console.log('Usuarios insertados correctamente en la base de datos');
    } catch (error) {
        console.error('Error al insertar usuarios', error);
    }
}

seedUsuarios();

