function Circulo(radio) {
  if (typeof radio !== "number" || radio < 0) {
    throw new Error("Radio invalido");
  }

  this.radio = radio;
}

Circulo.prototype = {
  area() {
    return Math.PI * Math.pow(this.radio, 2);
  },
};

module.exports = {
  Circulo,
};
