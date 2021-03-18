const { Circulo } = require("./circulo");

function Cilindro(radio, altura) {
  if (typeof altura !== "number" || altura < 0) {
    throw new Error("Altura invalida");
  }

  return Object.create(
    Object.assign(new Circulo(radio), {
      altura,
      Cilindro() {
        return this.area() * altura;
      },
    })
  );
}

module.exports = {
  Cilindro,
};
