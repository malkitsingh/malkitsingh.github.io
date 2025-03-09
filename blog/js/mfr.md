# JS Array Methods: map, filter, and reduce

## The map() Method

The `map()` method creates a new array by calling a provided function on every element in the original array. It transforms each element and returns a new array of the same length.

### Syntax

```javascript
const newArray = array.map((currentValue, index, array) => {
  // Return the transformed element
});
```

### Parameters

- `currentValue`: The current element being processed
- `index` (optional): The index of the current element
- `array` (optional): The array `map()` was called upon

### Examples

#### Example 1: Doubling Numbers

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);

console.log(doubled); // [2, 4, 6, 8, 10]
```

#### Example 2: Extracting Properties from Objects

```javascript
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
];

const names = users.map(user => user.name);
console.log(names); // ['Alice', 'Bob', 'Charlie']
```

#### Example 3: Formatting Data

```javascript
const dates = ['2023-01-15', '2023-02-20', '2023-03-25'];
const formattedDates = dates.map(date => {
  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year}`;
});

console.log(formattedDates); // ['01/15/2023', '02/20/2023', '03/25/2023']
```

## The filter() Method

The `filter()` method creates a new array with elements that pass a test implemented by a provided function. It's perfect for extracting a subset of elements that meet certain criteria.

### Syntax

```javascript
const newArray = array.filter((currentValue, index, array) => {
  // Return true to keep the element, false to exclude it
});
```

### Parameters

- `currentValue`: The current element being processed
- `index` (optional): The index of the current element
- `array` (optional): The array `filter()` was called upon

### Examples

#### Example 1: Filtering Even Numbers

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter(num => num % 2 === 0);

console.log(evenNumbers); // [2, 4, 6, 8, 10]
```

#### Example 2: Filtering Objects Based on Properties

```javascript
const products = [
  { name: 'Laptop', price: 1200, inStock: true },
  { name: 'Phone', price: 800, inStock: true },
  { name: 'Tablet', price: 650, inStock: false },
  { name: 'Monitor', price: 300, inStock: true }
];

const availableProducts = products.filter(product => product.inStock && product.price < 1000);
console.log(availableProducts);
// [
//   { name: 'Phone', price: 800, inStock: true },
//   { name: 'Monitor', price: 300, inStock: true }
// ]
```

#### Example 3: Filtering Strings by Length

```javascript
const words = ['apple', 'banana', 'kiwi', 'strawberry', 'orange', 'grapefruit'];
const shortWords = words.filter(word => word.length < 6);

console.log(shortWords); // ['apple', 'kiwi']
```

## The reduce() Method

The `reduce()` method executes a reducer function on each element of the array, resulting in a single output value. It's incredibly versatile and can be used for summing values, flattening arrays, grouping data, and much more.

### Syntax

```javascript
const result = array.reduce((accumulator, currentValue, index, array) => {
  // Return the updated accumulator
}, initialValue);
```

### Parameters

- `accumulator`: The accumulated value from previous iterations
- `currentValue`: The current element being processed
- `index` (optional): The index of the current element
- `array` (optional): The array `reduce()` was called upon
- `initialValue` (optional but recommended): The initial value of the accumulator

### Examples

#### Example 1: Summing an Array of Numbers

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(sum); // 15
```

Let's trace through this execution:
1. Initial accumulator: 0 (our initialValue), currentValue: 1 → accumulator becomes 1
2. accumulator: 1, currentValue: 2 → accumulator becomes 3
3. accumulator: 3, currentValue: 3 → accumulator becomes 6
4. accumulator: 6, currentValue: 4 → accumulator becomes 10
5. accumulator: 10, currentValue: 5 → accumulator becomes 15

#### Example 2: Finding the Maximum Value

```javascript
const numbers = [5, 10, 15, 3, 8, 12];
const max = numbers.reduce((accumulator, currentValue) => {
  return Math.max(accumulator, currentValue);
}, numbers[0]);

console.log(max); // 15
```

#### Example 3: Counting Occurrences of Values

```javascript
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const fruitCount = fruits.reduce((accumulator, fruit) => {
  // If we've seen this fruit before, increment its count
  if (accumulator[fruit]) {
    accumulator[fruit] += 1;
  } else {
    // Otherwise initialize it to 1
    accumulator[fruit] = 1;
  }
  return accumulator;
}, {});

console.log(fruitCount); 
// Output: { apple: 3, banana: 2, orange: 1 }
```

#### Example 4: Flattening Nested Arrays

```javascript
const nestedArrays = [[1, 2], [3, 4], [5, 6]];
const flattened = nestedArrays.reduce((accumulator, currentArray) => {
  // Concatenate current array to our accumulator array
  return accumulator.concat(currentArray);
}, []);

console.log(flattened); // [1, 2, 3, 4, 5, 6]
```

#### Example 5: Grouping Objects by Property

```javascript
const people = [
  { name: 'Alice', age: 25, department: 'Engineering' },
  { name: 'Bob', age: 32, department: 'Marketing' },
  { name: 'Charlie', age: 28, department: 'Engineering' },
  { name: 'David', age: 35, department: 'Marketing' },
  { name: 'Eve', age: 29, department: 'Engineering' }
];

const groupedByDepartment = people.reduce((accumulator, person) => {
  // Get the department
  const department = person.department;
  
  // If we haven't seen this department before, initialize it as an array
  if (!accumulator[department]) {
    accumulator[department] = [];
  }
  
  // Add the current person to the appropriate department array
  accumulator[department].push(person);
  
  return accumulator;
}, {});

console.log(groupedByDepartment);
/* Output:
{
  Engineering: [
    { name: 'Alice', age: 25, department: 'Engineering' },
    { name: 'Charlie', age: 28, department: 'Engineering' },
    { name: 'Eve', age: 29, department: 'Engineering' }
  ],
  Marketing: [
    { name: 'Bob', age: 32, department: 'Marketing' },
    { name: 'David', age: 35, department: 'Marketing' }
  ]
}
*/
```
