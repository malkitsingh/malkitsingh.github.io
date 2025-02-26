### 1. `Lists`
A list is a dynamic array-like structure that can store elements of different types. It is mutable, meaning you can modify its contents (add, remove, or change elements).

**Key Characteristics:**
- Ordered collection of elements.
- Allows duplicate values.
- Mutable (can be modified after creation).
- Accessed by index (0-based indexing).

**Example:**
```python
# Creating a list
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# Accessing elements
print(fruits[0])  # Output: apple

# Modifying elements
fruits[1] = "blueberry"
print(fruits)  # Output: ['apple', 'blueberry', 'cherry']

# Common list methods
numbers.append(6)      # Add element to end
numbers.insert(0, 0)   # Insert at index
numbers.pop()         # Remove and return last element
numbers.remove(3)     # Remove first occurrence of value
numbers.sort()        # Sort in-place
numbers.reverse()     # Reverse in-place
length = len(numbers) # Get length

# Slicing
first_three = numbers[0:3]    # Get elements 0,1,2
last_two = numbers[-2:]       # Get last two elements
```

### 2. `Tuples`
A tuple is similar to a list but immutable, meaning its elements cannot be changed after creation.

**Key Characteristics:**
- Ordered collection of elements.
- Allows duplicate values.
- Immutable (cannot be modified after creation).
- Accessed by index (0-based indexing).

**Example:**
```python
# Creating a tuple
coordinates = (10, 20)

# Accessing elements
print(coordinates[0])  # Output: 10

# Attempting to modify (will raise an error)
# coordinates[0] = 15  # TypeError: 'tuple' object does not support item assignment

single_item = (1,)    # Note the comma

# Tuple methods
count = coordinates.count(10)  # Count occurrences
index = coordinates.index(20)  # Find index of value

# Tuple unpacking
x, y = coordinates    # x = 10, y = 20
```

### 3. `Sets`
A set is an unordered collection of unique elements. It is useful for tasks like removing duplicates or performing mathematical operations like union, intersection, etc.

**Key Characteristics:**
- Unordered collection of elements.
- No duplicate values allowed.
- Mutable (can add or remove elements).

**Example:**
```python
# Creating a set
numbers = {1, 2, 3, 4, 4}  # Duplicate 4 will be removed
print(numbers)  # Output: {1, 2, 3, 4}

# Adding elements
numbers.add(5)
print(numbers)  # Output: {1, 2, 3, 4, 5}

# Removing elements
numbers.remove(3)
print(numbers)  # Output: {1, 2, 4, 5}

# Set operations
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1.union(set2))       # Output: {1, 2, 3, 4, 5}
print(set1.intersection(set2))  # Output: {3}

letters = set(['a', 'b', 'c'])

# Set methods
numbers.add(6)              # Add element
numbers.remove(1)           # Remove element (raises error if not found)
numbers.discard(1)         # Remove element (no error if not found)

# Set operations
union = numbers | letters   # Union
intersect = numbers & letters  # Intersection
diff = numbers - letters   # Difference
```

### 4. `Dictionaries`
A dictionary is a collection of key-value pairs. It is mutable and allows fast lookups based on keys.

**Key Characteristics:**
- Unordered collection of key-value pairs.
- Keys must be unique and immutable (e.g., strings, numbers, tuples).
- Values can be of any type.

**Example:**
```python
# Creating a dictionary
student = {
    "name": "Alice",
    "age": 25,
    "major": "Computer Science"
}

# Accessing values
print(student["name"])  # Output: Alice

# Modifying values
student["age"] = 26
print(student)  # Output: {'name': 'Alice', 'age': 26, 'major': 'Computer Science'}

# Adding new key-value pairs
student["gpa"] = 3.8
print(student)  # Output: {'name': 'Alice', 'age': 26, 'major': 'Computer Science', 'gpa': 3.8}

# Removing key-value pairs
del student["major"]
print(student)  # Output: {'name': 'Alice', 'age': 26, 'gpa': 3.8}

# Dictionary methods
student.get('name')           # Safe access with default
student.keys()               # Get all keys
student.values()            # Get all values
student.items()             # Get key-value pairs
student.update({'age': 31}) # Update multiple key-values
student.pop('major')         # Remove and return value
```

Here's an easy and interesting video explaining about all these datastructures

<iframe width="560" height="315" src="https://www.youtube.com/embed/R-HLU9Fl5ug" frameborder="0" allowfullscreen></iframe>


### 5. `Stacks and Queues`
While Python doesn't have built-in stack or queue types, you can implement them using lists or the `collections` module.

**Stack (LIFO - Last In, First Out):**
```python
stack = []

# Push elements
stack.append(1)
stack.append(2)
stack.append(3)

# Pop elements
print(stack.pop())  # Output: 3
print(stack.pop())  # Output: 2
```
**Queue (FIFO - First In, First Out):**
```python
from collections import deque

queue = deque()

# Enqueue elements
queue.append(1)
queue.append(2)
queue.append(3)

# Dequeue elements
print(queue.popleft())  # Output: 1
print(queue.popleft())  # Output: 2
```

### 6. `Linked Lists`
Linked lists are not built into Python, but you can create them using classes.

**Example:**
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node

    def display(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

# Usage
ll = LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.display()  # Output: 1 -> 2 -> 3 -> None
```

### 7. `Trees`
Trees are hierarchical data structures. A common example is a binary tree.

**Example:**
```python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self, root_value):
        self.root = TreeNode(root_value)

    def insert_left(self, current_node, value):
        if current_node.left is None:
            current_node.left = TreeNode(value)
        else:
            new_node = TreeNode(value)
            new_node.left = current_node.left
            current_node.left = new_node

    def insert_right(self, current_node, value):
        if current_node.right is None:
            current_node.right = TreeNode(value)
        else:
            new_node = TreeNode(value)
            new_node.right = current_node.right
            current_node.right = new_node

# Usage
tree = BinaryTree(1)
tree.insert_left(tree.root, 2)
tree.insert_right(tree.root, 3)
```

### 8. `Graphs`
Graphs can be represented using adjacency lists or matrices.

**Example:**
```python
graph = {
    "A": ["B", "C"],
    "B": ["A", "D", "E"],
    "C": ["A", "F"],
    "D": ["B"],
    "E": ["B", "F"],
    "F": ["C", "E"]
}

# Traversing the graph
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    print(node, end=" ")
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

dfs(graph, "A")  # Output: A B D E F C
```
