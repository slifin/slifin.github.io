# Dynamic Programming Fibonacci

Dynamic programming is a method of splitting a problem into many sub problems that typically roll together to solve the larger problem.

These solutions often call for these sub problems to be solved many times, and because of this remembering the results of subsequent calls with the same arguments can often optimise these programs.



## Fibonacci Memorized

The Fibonacci seqeunce is a common starter problem for this class of problem

It's defined as a sequence of numbers where the two proceding numbers are summed together provide the current number

The first two numbers are 0, 1 it's often easier to hardcode those values which gives you enough numbers to calculate the next numbers

The problem often requires you to return the sequence at the provided **N**th number

```clojure
(fn [n])
```

The core of the problem is:

```clojure
(+ (fibonacci (dec n))
   (fibonacci (- n 2)))
```

Where our currently named function is called fibonacci - we have basically said look back at the previously defined offsets and add them together to arrive at the current value, we could have used loop and recur but here we have a named function because we want to use memorize to prevent the need to recalculate duplicate function calls.

Any type of recursion can be mentally mapped as a tree, with this implementation we are spreading the branches 2 at a time.

In any kind of pratical recursion we need a short circuit and this is no different so:
```clojure
(if (<= n 1)
  n
  ...)
```

What's interesting about our solution here is that we build down to the base cases of 0s and 1s, instead of build up to it, let's finish with the caching and method for calling ourselves:

```clojure
(def fibonacci
  (memorize 
    (fn [n]
      (if (<= n 1)
        n
				(+ (fibonacci (dec n))
           (fibonacci (- n 2)))))))
```


This is not the only approach, we could have built up to N from 0, 1 building the sequence as we go this is referred to as tabulation and is more efficient as it avoids stackoverflow and space problems, if we build the sequence then we can start forgetting anything older than 2 Nths ago.

## Fibonacci Tabulation

`(range 2 (inc n))` continues the sequence lazily all the way to a given N.
`[0 1]` lets us begin our sequence with enough numbers to generate new numbers in the sequence.

Here we're using values kind of like trailing pointers, A and B representing the last two values in the sequence, we will return B in the A location and add A and B together to calculate new B, to get the new state required to expand the sequence.

```clojure
(reduce (fn [[a b] _]
          [b (+ a b)]) 
        [0 1] 
        (range 2 (inc n)))
```

to put this together:
```clojure
(defn fibonacci
  [n]
  (if (<= n 1)
    n
  	(let [[a b] (reduce (fn [[a b] _] [b (+ a b)])
      	                [0 1]
        	              (range 2 (inc n)))]
	    b)))
```

