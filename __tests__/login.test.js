import { loginUser } from "../src/controllers/user.controller.js";
import supertest from "supertest";
import mongoose from "mongoose";
import { userModel } from "../src/models/users.model.js";
import bcrypt from "bcryptjs";
import app from "../app";


//2. desarrollar las pruebas

describe("Pruebas de login de usuario", () => {

    // Configuración globlal
    const testUser = {
        fullName: "pepita",
        email: "pepita@gmail.com",
        password: "123"
    }

    // antes de cada caso de prueba
    beforeEach(async () => {
        await userModel.deleteMany({});
    });

    // al finalizar todas las pruebas -> cerrar la conexión a la base de datos
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Los casos de prueba

    // 1. caso exitoso de inicio de sesión
    it("deberia inicar sesion correctamente con credenciales validas", async () => {

        const codedPassword = await bcrypt.hash(testUser.password, 10);
        await userModel.create({ ...testUser, password: codedPassword });

        const response = await supertest(app).post('/iniciarSesion').send({
            emailLogin: "pepita@gmail.com",
            passwordLogin: "123"
        });

        expect(response.statusCode).toBe(200);
    });

    // 2. Caso de error: por usuario no registrado
    it("No deberia inicarse sesion correctamente, correo invalido", async () => {

        const codedPassword = await bcrypt.hash(testUser.password, 10);
        await userModel.create({ ...testUser, password: codedPassword });

        const response = await supertest(app).post('/iniciarSesion').send({
            emailLogin: "carlitos@gmail.com",
            passwordLogin: "123"
        });

        expect(response.statusCode).toBe(404);
    });

    // 3. Caso de error: por usuario con contraseña incorrecta
    it("No deberia inicarse sesion correctamente, contraseña invalidad", async () => {

        const codedPassword = await bcrypt.hash(testUser.password, 10);
        await userModel.create({ ...testUser, password: codedPassword });

        const response = await supertest(app).post('/iniciarSesion').send({
            emailLogin: "pepita@gmail.com",
            passwordLogin: "123456"
        });

        expect(response.statusCode).toBe(401);
    });
});

//conectar a la base de datos antes de las pruebas
