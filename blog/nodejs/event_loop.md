The `Event Loop` is the core of Node.js' asynchronous, non-blocking I/O model. It allows Node.js to handle multiple operations concurrently without creating multiple threads. Let's break it down with examples and diagrams.

### Event loop phases

The event loop operates in `6 phases`, each handling specific tasks:

1. Timers: Executes callbacks from `setTimeout()` and `setInterval()`.

2. Pending Callbacks: Executes deferred I/O callbacks (e.g., TCP errors).

3. Idle/Prepare: Internal use (ignored for most practical purposes).

4. Poll: Retrieves new I/O events and executes I/O-related callbacks.

5. Check: Executes `setImmediate()` callbacks.

6. Close: Executes "close" event callbacks (e.g., `socket.on('close', ...)`).

```javascript
┌───────────────────────┐
│        Timers         │ ← setTimeout callback queued
└──────────┬────────────┘
           │
┌──────────┴────────────┐
│   Pending Callbacks   │
└──────────┬────────────┘
           │
┌──────────┴────────────┐
│         Poll          │ ← Event loop waits here
└──────────┬────────────┘
           │
┌──────────┴────────────┐
│        Check          │
└──────────┬────────────┘
           │
┌──────────┴────────────┐
│    Close Callbacks    │
└───────────────────────┘
```
### Execution Order Example

```javascript
    setTimeout(() => console.log('Timeout'), 0);
    setImmediate(() => console.log('Immediate'));
```

#### Output

Non-deterministic! If run in the main module, it depends on how quickly the timer expires. In I/O cycles, `setImmediate` always runs first.

### Microtasks vs. Macrotasks

- _Microtasks_ (higher priority): `process.nextTick(), Promises`.

- *Macrotasks* (lower priority): `setTimeout, setImmediate, I/O callbacks`.

```javascript
    console.log('Start');
    setTimeout(() => console.log('Timeout'), 0); // Macrotask
    Promise.resolve().then(() => console.log('Promise')); // Microtask
    process.nextTick(() => console.log('nextTick')); // Microtask (higher priority)
    console.log('End');
    // Output: Start → End → nextTick → Promise → Timeout
```

### Poll Phase Behavior
- If the poll queue is empty:

    - Checks for setImmediate() callbacks and proceeds to the `Check phase`.

    - Checks for expired timers and proceeds to the `Timers phase`.

### Key Takeaways

- `Microtasks` execute `between phases` (e.g., nextTick before Promises).

- `Timers` are not guaranteed to run at exact times (minimum delay only).

- Use `setImmediate` for code that should run after I/O, and `process.nextTick` for high-priority tasks.

Here are some interesting videos explaining about all these concepts

<iframe width="560" height="315" src="https://www.youtube.com/embed/okkHnAo8GmE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

and here is another one.

<iframe width="560" height="315" src="https://www.youtube.com/embed/okkHnAo8GmE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
