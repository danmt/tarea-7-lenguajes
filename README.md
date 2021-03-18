# Tarea 7

## Autores ✒️

- **Denylson Romero 13-11270** - [DenylR](https://github.com/DenylR)
- **Daniel Marin 10-10419** - [danmt](https://github.com/danmt)

## Ejercicio 0

Implementamos la funcion Circulo que recibe un numero `radio`, dado que Javascript no es fuertemente tipado debemos hacer el chequeo de tipos manualmente. Para la funcion area, usamos el concepto de prototipos de Javascript para simular los metodos de una instancia.

```javascript
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
```

```javascript
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
```

Al igual que con la funcion `Circulo` debemos verificar el tipo de altura y que sea un valor positivo. Usamos el metodo create y assign para generar un nuevo objeto que tenga el prototipo de circulo e incluya los valores adicionales de `Cilindro`.
