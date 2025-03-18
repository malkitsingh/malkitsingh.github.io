# Generics in TypeScript

## Introduction
Generics in TypeScript allow us to create reusable, type-safe components. They provide flexibility while maintaining strong typing. This guide covers everything you need to know about generics with practical examples.

## Table of Contents
- [What are Generics?](#what-are-generics)
- [Generic Functions](#generic-functions)
- [Generic Interfaces](#generic-interfaces)
- [Generic Classes](#generic-classes)
- [Generic Constraints](#generic-constraints)
- [Generic Utility Types](#generic-utility-types)
- [Generic Type Aliases](#generic-type-aliases)
- [Generics in React](#generics-in-react)
- [Conclusion](#conclusion)

## What are Generics?
A **generic** is a placeholder for a type, which allows flexibility while maintaining type safety. Instead of specifying a concrete type, we define a **type parameter** that can be used dynamically.

### Example:
```typescript
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<string>("Hello")); // Output: "Hello"
console.log(identity<number>(42)); // Output: 42
```

## Generic Functions
Generic functions allow us to define functions that work with different data types without losing type safety.

### Example:
```typescript
function reverseArray<T>(items: T[]): T[] {
  return items.reverse();
}

console.log(reverseArray<number>([1, 2, 3]));  // Output: [3, 2, 1]
console.log(reverseArray<string>(["a", "b", "c"]));  // Output: ["c", "b", "a"]
```

## Generic Interfaces
We can use generics in interfaces to define flexible and reusable structures.

### Example:
```typescript
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair: KeyValuePair<string, number> = { key: "age", value: 30 };
console.log(pair);  // Output: { key: 'age', value: 30 }
```

## Generic Classes
Generic classes allow defining reusable components that work with multiple data types.

### Example:
```typescript
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box<number>(100);
console.log(numberBox.getValue()); // Output: 100

const stringBox = new Box<string>("TypeScript");
console.log(stringBox.getValue()); // Output: "TypeScript"
```

## Generic Constraints
Sometimes, we need to restrict a generic type to a subset of types using constraints.

### Example:
```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): number {
  return arg.length;
}

console.log(logLength("Hello")); // Output: 5
console.log(logLength([1, 2, 3])); // Output: 3
// console.log(logLength(10)); // Error: Argument of type 'number' is not assignable
```

## Generic Utility Types
TypeScript provides built-in generic utility types to modify object types dynamically.

### Example: `Partial<T>`

```typescript
interface User {
  name: string;
  age: number;
}

const partialUser: Partial<User> = { name: "Alice" };
console.log(partialUser); // Output: { name: "Alice" }
```

### Example: `Readonly<T>`
```typescript
const user: Readonly<User> = { name: "Bob", age: 30 };
// user.age = 35; // Error: Cannot assign to 'age' because it is a read-only property
```

## Generic Type Aliases
Type aliases with generics allow defining reusable types.

### Example:
```typescript
type ApiResponse<T> = {
  status: number;
  data: T;
};

const response: ApiResponse<string> = { status: 200, data: "Success" };
console.log(response); // Output: { status: 200, data: "Success" }
```

## Generics in React
Generics are widely used in React for defining reusable components.

### Example:
```tsx
import React from "react";

interface ListProps<T> {
  items: T[];
  render: (item: T) => JSX.Element;
}

function List<T>({ items, render }: ListProps<T>) {
  return <ul>{items.map(render)}</ul>;
}

const names = ["Alice", "Bob", "Charlie"];

function App() {
  return <List items={names} render={(name) => <li key={name}>{name}</li>} />;
}

export default App;
```

## Conclusion
Generics improve code reusability and maintainability in TypeScript. They allow us to create flexible, type-safe functions, classes, and interfaces. Mastering generics is essential for writing scalable TypeScript applications.

