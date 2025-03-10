# Understanding JavaScript Prototypes

JavaScript's object-oriented system is built around prototypes rather than classes (even though modern JavaScript has a `class` syntax, it's just syntactic sugar over prototypes). 

## The `prototype` Property

Every JavaScript function has a property called `prototype`, which is an object. When you use a function as a constructor with the `new` keyword, the new object's internal `[[Prototype]]` property gets set to the constructor's `prototype` property.

```javascript
// Constructor function
function Person(name) {
  this.name = name;
}

// Adding a method to the prototype
Person.prototype.sayHello = function() {
  return `Hello, my name is ${this.name}`;
};

// Creating objects using the constructor
const john = new Person('John');
const sarah = new Person('Sarah');

// Both objects can access the sayHello method
console.log(john.sayHello());  // "Hello, my name is John"
console.log(sarah.sayHello()); // "Hello, my name is Sarah"
```

In this example, `sayHello` exists only once in memory (on `Person.prototype`), but all `Person` instances can use it.

## The `__proto__` Property

Every JavaScript object has an internal `[[Prototype]]` property. The deprecated `__proto__` accessor property allows us to access this internal property:

```javascript
console.log(john.__proto__ === Person.prototype); // true
```

Modern code should use these methods instead:

```javascript
// Get an object's prototype
console.log(Object.getPrototypeOf(john) === Person.prototype); // true

// Set an object's prototype (not common)
Object.setPrototypeOf(newObject, prototypeObject);
```

## Prototype Chain

When you try to access a property on an object, JavaScript:

1. Checks if the property exists on the object itself
2. If not, it checks the object's prototype
3. If still not found, it checks the prototype's prototype, and so on
4. This continues until it reaches `Object.prototype`
5. If still not found, it returns `undefined`

This sequence of linked prototypes is called the "prototype chain":

## Object Creation and Prototypes

There are several ways to create objects with specific prototypes:

### Constructor Functions

As shown in previous examples, constructor functions create objects with their `prototype` property as the new object's prototype.

```javascript
function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.getType = function() {
  return this.type;
};

const car = new Vehicle('car');
console.log(car.getType()); // "car"
```

### Object.create()

The `Object.create()` method creates a new object with the specified prototype object:

```javascript
const personProto = {
  sayHello() {
    return `Hello, my name is ${this.name}`;
  }
};

const alex = Object.create(personProto);
alex.name = 'Alex';
console.log(alex.sayHello()); // "Hello, my name is Alex"
```

### ES6 Classes

ES6 introduced class syntax, but it's important to understand that this is syntactic sugar over JavaScript's prototype-based inheritance:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}

const rex = new Dog('Rex');
console.log(rex.speak()); // "Rex barks"
```

Behind the scenes, ES6 classes still use prototypal inheritance.

## Video explanations

Here is nicely done video about the topic.

<iframe width="560" height="315" src="https://www.youtube.com/embed/1UTqFAjYx1k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>