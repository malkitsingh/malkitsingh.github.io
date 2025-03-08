# Declarative vs. Imperative Programming (Examples in JS)

## Overview
A comparison of **imperative** (step-by-step control) and **declarative** (outcome-focused) programming paradigms in JavaScript.

---

## Key Differences

| **Aspect**               | **Imperative**                                                                 | **Declarative**                                                                 |
|--------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| **Focus**                | **How** to achieve a result (step-by-step instructions).                       | **What** the result should be (abstracting implementation details).             |
| **Control**              | Fine-grained control over flow and state.                                      | Relies on built-in abstractions (e.g., `map`, `filter`).                        |
| **Readability**          | Verbose, explicit logic.                                                      | Concise, expressive, and intent-focused.                                        |
| **Performance**          | Can optimize manually (e.g., single loops for multiple operations).           | May create intermediate data structures (e.g., new arrays).                     |

---

## Code Examples

### 1. Squaring and Summing Numbers
**Imperative Approach**:
```javascript
const numbers = [1, 2, 3, 4];
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i] * numbers[i];
}
console.log(sum); // Output: 30
```

**Declarative Approach**:
```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers
  .map(x => x * x)  // Square each number
  .reduce((acc, x) => acc + x, 0); // Sum them
console.log(sum); // Output: 30
```

### 2. Filtering Even Numbers
**Imperative Approach**:
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = [];
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evens.push(numbers[i]);
  }
}
console.log(evens); // Output: [2, 4]
```

**Declarative Approach**:
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(x => x % 2 === 0);
console.log(evens); // Output: [2, 4]
```

## Video Tutorial

Nicely done video explanation

<iframe width="560" height="315" src="https://www.youtube.com/embed/dYqwdwTsZVY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
