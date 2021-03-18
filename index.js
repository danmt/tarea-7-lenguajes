const { Circulo } = require("./circulo");
const { Cilindro } = require("./cilindro");

const init = () => {
  console.log("Circulo");
  const circulo = new Circulo(5);
  console.log(circulo.radio, circulo.area());
  console.log("\nCilindro");
  const cilindro = new Cilindro(5, 3);
  console.log(
    cilindro.radio,
    cilindro.altura,
    cilindro.area(),
    cilindro.Cilindro()
  );
};

init();
