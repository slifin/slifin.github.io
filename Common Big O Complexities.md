# Common Big O Complexities

In scale of severity, Big O notion focuses on the rate of growth, rather than an exact measure

- Time complexity
  - Measures how the number of operations grows.
- Space complexity
  - Measures how memory usage grows.

Focus on the most expensive complexity 

## Constant Time O(1)

**Description:**

The algorithm takes the same amount of time, no matter the input

**Example:**

Accessing an array by index

## Logarithmic Time O(log n)

**Description:**

The algorithm reduces the problem size with each step, (e.g. dividing the input in half).

**Example:**

Binary search, particularly applicable for sorted data.

## Linear Time O(n)

**Description:**

Time grows linearly with input size.

**Example:**

Iterating through an array, this often the baseline complexity.

## Linearithmic Time O(n log n)

**Description:**

Often appears in divide-and-conquer algorithms.

**Example:**

Merge sort, quicksort (average case), the best complexity achievable for comparison-based sorting.

## Quadratic Time O(n²)

**Description:**

Time grows quadratically with input size (nested loops), acceptable for small inputs.

**Example:**

Bubble sort, insertion sort (worse case).

## Exponential Time O(2ⁿ)

**Description:**

Time doubles with each additional input. impractical for large inputs.

**Example:**

Recursive algorithms like solving the Tower of Hanoi or subset problems.

## Factorial Time O(n!)

**Description:**

Time grows factorially, typically for algorithms solving permutations.
A factorial is the sum of all positive integers from 1 up to N.

**Example:**

Solving the traveling salesman problem, avoid these unless absolutely necessary.

## Code

### O(1): Constant Time

```clojure
(defn get-first [arr]
  (first arr)) ;; Accessing the first element → O(1)
```

### O(logn): Logarithmic Time

```clojure
(defn binary-search [arr target]
  (loop [left 0, right (dec (count arr))]
    (if (<= left right)
      (let [mid (quot (+ left right) 2)]
        (cond
          (= (arr mid) target) mid
          (< (arr mid) target) (recur (inc mid) right)
          :else (recur left (dec mid))))
      -1))) ;; Binary search on a sorted array → O(log n)
```

### O(n): Linear Time

```clojure
(defn find-sum [arr]
  (reduce + arr)) ;; Summing all elements in the array → O(n)
```

### O(nlogn): Linearithmic Time

```clojure
(defn merge-sort [arr]
  (if (< (count arr) 2)
    arr
    (let [mid (quot (count arr) 2)
          left (subvec arr 0 mid)
          right (subvec arr mid)]
      (loop [l (merge-sort left)
             r (merge-sort right)
             merged []]
        (cond
          (empty? l) (concat merged r)
          (empty? r) (concat merged l)
          (<= (first l) (first r))
          (recur (rest l) r (conj merged (first l)))
          :else
          (recur l (rest r) (conj merged (first r)))))))) ;; Merge sort → O(n log n)
```

### O(n2): Quadratic Time

```clojure
(defn find-all-pairs [arr]
  (for [x arr, y arr]
    [x y])) ;; Generating all pairs of elements → O(n²)

```

### O(2n): Exponential Time

```clojure
(defn fib [n]
  (if (<= n 1)
    n
    (+ (fib (dec n)) (fib (- n 2))))) ;; Recursive Fibonacci → O(2ⁿ)
```

### O(n!): Factorial Time

```clojure
(defn permutations [coll]
  (if (empty? coll)
    [[]]
    (for [x coll
          perm (permutations (remove #{x} coll))]
      (cons x perm)))) ;; Generating all permutations → O(n!)
```

