# Testing Race Conditions

This post summarizes some recent ideas in the Clojure community around testing for race conditions, particularly in distributed systems. These ideas draw inspiration from the sources listed at the end—check them out for more in-depth details.

## The Problem

Race conditions occur wherever multiple threads or processes interact: in multi-threaded Clojure apps, web services, or microservices. By definition, race conditions are tricky because they happen intermittently, making them hard to detect and even harder to reproduce.

But how do we confirm we’ve truly fixed a race condition without a reliable way to test it?

- End-to-end tests across multiple systems can be fragile and slow.
- Unit tests might be too narrow, missing issues that occur in other services or processes.

To feel confident in distributed systems, we need systematic ways of catching these fundamental concurrency bugs.

## Key Insights

1. **Most bugs come from event ordering**
   In [Nathan Marz’s Rama testing article](https://blog.redplanetlabs.com/2023/10/24/how-rama-is-tested-a-primer-on-testing-distributed-systems/), he explains that seemingly correct components can fail when events happen in unexpected orders.
2. **Symbolic or model-based testing**
   [David Nolen’s talk](https://www.youtube.com/watch?v=UBUMzWwm2Gc) demonstrates that you can catch many real-world race conditions by running a symbolic or simplified model of your system. It doesn’t have to replicate every detail of the live system.
3. **Aim for targeted complexity**
   Like generative testing, you focus on parts of your system where concurrency bugs are most likely. Testing everything at once can be overkill, but a targeted approach helps you find serious issues without excessive overhead.

## What If We Could…

- Detect race conditions before they ever hit production
- Get the quick feedback of generative testing
- Avoid fully simulating our production environment

## A High-Level Technique: Model + Generative Testing

In normal generative testing, we generate input data, run it against our code, and let the library shrink failing cases to the smallest reproducible scenario.

**For race conditions:**

- We define the set of “commands” or events our system can perform (e.g., create a record, update a record, read a record).
- A testing framework (such as [Fugato](https://www.youtube.com/watch?v=UBUMzWwm2Gc)) runs these commands in all possible orders or combinations allowed by your model.
- If the system fails in some ordering, the framework shrinks the command sequence to the minimal set that reproduces the bug.

This approach systematically explores different event interleavings and reveals hard-to-find concurrency problems.

## Sources

- **FoundationDB**
  [FoundationDB Testing](https://apple.github.io/foundationdb/testing.html)
- **Nathan Marz – Rama Testing**
  [How Rama Is Tested: A Primer on Testing Distributed Systems](https://blog.redplanetlabs.com/2023/10/24/how-rama-is-tested-a-primer-on-testing-distributed-systems/)
- **Allen Rohner – test.contract**
  [Clojure/conj 2024 talk](https://www.youtube.com/watch?v=dvHASrrQSzg)
- **David Nolen – Fugato**
  [Clojure Concurrency Testing](https://www.youtube.com/watch?v=UBUMzWwm2Gc)
