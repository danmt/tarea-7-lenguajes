# Tarea 7

## Autores ✒️

- **Denylson Romero 13-11270** - [DenylR](https://github.com/DenylR)
- **Daniel Marin 10-10419** - [danmt](https://github.com/danmt)

## Ejercicio 0

### Circulo

Implementamos la funcion `Circulo` que recibe un numero `radio`, dado que Javascript no es fuertemente tipado debemos hacer el chequeo de tipos manualmente. Para la funcion area, usamos el concepto de prototipos de Javascript para simular los metodos de una instancia.

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

### Cilindro

Al igual que con la funcion `Circulo` debemos verificar el tipo de altura y que sea un valor positivo. Usamos el metodo create y assign para generar un nuevo objeto que tenga el prototipo de circulo e incluya los valores adicionales de `Cilindro`. De esta manera simulamos la herencia de lenguajes orientados a objetos.

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
## Investigacion
### a)
La idea es que los lenguajes sigan el Principio de sustitución de Liskov, que dice que si tienes un S subtipo de T, entonces objetos de tipo T pueden ser sutituidos por objetos de tipo S. Sin embargo, esto no es tan intuitivo a la hora de pasar argumentos a funciones con Lista de objetos, como en Java, donde si tenemos una clase Perro que extiende a Animal (Perro es subclase de Animal), y una función que acepta Animal como parámetro, al intentar pasarle un Perro, el compilador dará error, por lo que debemos hacer uso de wildcards que serán explicadas a continuación:

### Java
En Java, tenemos este ejemplo:

```java
List<Integer> myInts = new ArrayList<Integer>();
myInts.add(1);
myInts.add(2);
List<Number> myNums = myInts; // Error de compilador
myNums.add(3.14); // heap polution
```

Integer es subclase de Number, es decir, Integer hereda de Number. Sin embargo, en la línea 4, el compilador no nos detiene, ya que en tiempo de ejecución no hay manera de determinar de que esta era una lista de Integers inicialmente. La línea 4 no es segura y si se permitiese la compilación, rompería la estructura del sistema de tipos. 

Para esto, Java utiliza covarianza y contravarianza.
 
En el siguiente ejemplo usamos varianza con la wildcard <? extends Type> 

List<? extends Number> myNums = new ArrayList<Integer>();

Podemos hacer la siguiente lectura:

Number n = myNums.get(0);
Ya que lo que sea que la lista tenga (Integer, Float, ...) estamos seguros de que es de tipo Number (su superclase)

Sin embargo, no podemos colocar nada dentro de la estructura covariante:

myNumst.add(45L); // error de compilador

El compilador no permite esto porque no puede determinar el tipo de objeto en la estructura genérica, ya que podría ser cualquier clase que extienda a Number (por ejemplo, Integer, Float, Long). Así que podemos leer, pero no escribir.


En el caso de la contravarianza, usamos la wildcard <? super Type>

En este caso, podríamos tener algo tipo: 

ArrayList<Integer> intArrList = new ArrayList<>();
ArrayList<? super Integer> numArrList = intArrList;

Donde numArrList puede recibir cualquier Integer o cualquier super clase de Integer (por ejemplo, Number, Object). En la contravarianza, podemos escribir en la lista pero no podemos realizar lectura. Es decir, no podemos hacer

Integer n = numArrList.get(0);

Ya que numArrList puede tener un Integer o cualquier super clase de Integer, es decir, podría estar haciendo referencia a un ArrayList de Objects.

### Scala 
En el caso de escala, la forma de comportarse con las listas es similar al de Java, si queremos covarianza, podemos marcar los parámetros de los tipos en una clase genérica como covariantes agregando un símbolo de “+” y el símbolo de “-“ en caso de contravarianza.

Por ejemplo, si ejecutamos lo siguiente en REPL:

scala> abstract class Vehicle
scala> case class Car() extends Vehicle
scala> case class Parking[A](value: A)
scala> val carParking: Parking[Vehicle] = Parking[Car](new Car)

Tendremos el siguiente error:

<console>:12: error: type mismatch;
 found   : Parking[Car]
 required: Parking[Vehicle]
Note: Car <: Vehicle, but class Parking is invariant in type A.

Para esto, debemos cambiar la tercera línea y definir la clase con el símbolo “+” de la siguiente forma:

scala> case class Parking[+A](vehicle: A)

De esta forma, ya podemos escribir:
scala> val carParking : Parking[Vehicle] = Parking[Car](new Car)

En el caso de la contravarianza tendríamos:
scala> case class Parking[-A]()
scala> val parking: Parking[Car] = Parking[Vehicle]

Usualmente, la covarianza se usa para productores (tipos que retornan algo) y tipos inmutables. La contravarianza se usa normalmente con consumidores (tipos que aceptan pero no retornan nada), también es una manera de expresar que sólo acepta el tipo básico o un tipo especializado de un tipo dado.

### b)
En el caso de una función A->C, como es orientado a objetos, debe aceptar polimorfismo siguiendo el principio de sustitución de Liskov. La función puede aceptar un tipo A, B o C como input y estas pueden ser instanciadas a tipo C, ya que en la jerarquía, C hereda de B, y B hereda de A. De manera similar ocurre con la función B->C. Acepta un tipo B o C como input y este puede ser instanciado a tipo C.


En el caso de la función de C->A y C->B, no hay herencia dentro de las funciones, ya que ambas solo pueden recibir objetos de tipo C, pero no de tipo A ni B (al menos que se use contravarianza en el lenguaje que permita cualquier super clase como input). Si se quiere devolver el mismo objeto C de tipo A, o C de tipo B, debe hacerse un casting y convertir la variable al tipo deseado.
