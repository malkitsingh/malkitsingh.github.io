
## Destructuring in JS

World is more beautiful if you can write code this way

```js
const employee = {
  firstName: 'Malkit',
  lastName: 'Singh'
};
const { firstName, lastName } = employee;
firstName;     // => 'Malkit',
lastName; // => 'Singh'
```

Here is a cheat-sheet for the lazy ones ;)

#### 1. To set default values while extracting properties
If the destructured object doesn't have the property specified in the destructuring assignment, then the variable is assigned with `undefined`. Let's see how it happens:
```js
const employee = {
  firstName: 'Malkit',
  lastName: 'Singh'
};
const { designation = ['Manager'] } = employee;
designation;     // => 'Manager'
```

#### 2. To set Aliases
If you'd like to create variables of different names than the properties, then you can use the aliasing feature of object destructuring.
```js
const { identifier: aliasIdentifier } = expression;
```
Here's an example of object destructuring alias feature:

```js
const influencer = {
  name: 'Malkit',
  account_type: 'facebook',
  account_followers: 1024,
};
const { account_type: accountType } = influencer;
accountType; // 'facebook'
```
#### 3. Extracting properties from nested objects
Often objects can be nested in other objects. In other words, some properties can contain objects. 
In such case, you still can use the object destructuring and access properties from deep. Here's the basic syntax:
```js
const { nestedObjectProp: { identifier } } = expression;
```
`nestedObjectProp` is the name of the property that holds a nested object. `identifier` is the property name to access from the nested object. expression should evaluate to the destructured object.

After the destructuring, the variable `identifier` contains the property value of the nested object.

The level of nesting you can extract properties from is unlimited. If you want to extract properties from deep, just add more nested curly braces:

```js
const { propA: { propB: { propC: { .... } } } } = object;
```

Here's an example of accessing nested objects:

```js
const influencer = {
  name: 'Malkit',
  account_type: 'facebook',
  account_followers: 1024,
  account_stats:    {
      posts : 20,
      reach: 2000,
      likes: 5000
  }

};
const { account_stats: {likes} } = influencer;
likes; // 5000
```

#### 4. Extracting a dynamic name property

You can extract to variables properties with a dynamic name (the property name is known at runtime):

```js
const { [propName]: identifier } = expression;
```

`propName` expression should evaluate to a property name (usually a string), and the `identifier` should indicate the variable name created after the destructuring. The second `expression` should evaluate to the object you'd like to destructure.

Let's look at an example where `prop` holds the property name:

```js
const influencer = {
  name: 'Malkit',
  account_type: 'facebook',
  account_followers: 1024,
  account_stats:    {
      posts : 20,
      reach: 2000,
      likes: 5000
  }

};
const prop = 'account_type';
const { [prop]: accountType } = influencer;
accountType; // 'facebook'
```

#### 5. Rest object after destructuring
The rest syntax is useful to collect the remaining properties after the destructuring:

```js
const { identifier, ...rest } = expression;
```

Where `identifier` is the name of the property to access and `expression` should evaluate to an object.

After the destructuring, the variable `identifier` contains the property value. `rest` variable is a plain object with the remaining properties.

For example,
```js
const influencer = {
  name: 'Malkit',
  account_type: 'facebook',
  account_followers: 1024,
  account_stats:    {
      posts : 20,
      reach: 2000,
      likes: 5000
  }

};

const { account_stats, ...influncerDetails } = influencer;
influncerDetails; 
// {
//     account_followers: 1024
//     account_type: "facebook"
//     name: "Malkit"
// }

```

#### 5. Destructuring and assigning to already declared variable

Suppose we already have a variable `accountStats` and we want to destruct and assign `account_stats` from `influencer`. This can be done this way,

```js
let accountStats;
const influencer = {
  name: 'Malkit',
  account_type: 'facebook',
  account_followers: 1024,
  account_stats:    {
      posts : 20,
      reach: 2000,
      likes: 5000
  }

};
({account_stats:accountStats} = influencer)
accountStats; // =>
// {
//     likes: 5000
//     posts: 20
//     reach: 2000
// }
```