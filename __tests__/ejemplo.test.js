// un archivo .test.js se conoce como suite de pruebas
// Es el lugar donde definen los casos de pruebas agrupados por tematica


// 1. Importamos la funcion o modulo a testear
import { suma } from "../src/utils/ejemplo.js";

// 2. Desarrollo

/*
    1. bloque de prueba (agrupa por metodo) -> describe (una descripcion, funcion flecha)
    2. caso de prueba individual -> it (una descripcion, funcion flecha)
       - es que abarca la mayor parte de los casos posibles
       - usted conozca el resultado esperado
*/

describe("Pruebas de la funcion suma...", () => {
    // caso de prueba individual
    it("Caso 1: suma correcta de numeros positivos", () => {
        expect(suma(2, 3)).toBe(5);
    });

    it("Caso 2: suma correcta de numeros con cero", () => {
        expect(suma(7, 0)).toBe(7);
    });

    it("Caso 3: suma correcta de numeros negativos", () => {
        expect(suma(-2, -4)).toBe(-6);
    });

});



