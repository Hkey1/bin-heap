bin-heap
=======
A binary heap implementation in JavaScript.
Based on [Heap.js](https://github.com/qiao/heap.js).

Changes from [Heap.js](https://github.com/qiao/heap.js)
--------
* updateItem and contains is now have O(log(N)) time
* pure js, not coffee
* much size reduce
* some function names are changed
* removed some functions
* can work with objects

Download
--------
This module can be used in either the browser or node.js.

for browser use, you may [download the script](https://raw.github.com/hkey1/bin-heap/master/lib/heap.js) and include it in you web page.

```html
<script type="text/javascript" src="./heap.js"></script>
```

for node.js, you may install it via npm:

```bash
npm install bin-heap
```

then require it:

```
var Heap = require('heap');
```

Examples
-------

push and pop

```js
var heap = new Heap();
heap.push(3);
heap.push(1);
heap.push(2);
heap.pop(); // 1
```

custom comparison function

```js
var heap = new Heap(function(a, b) {
    return ...;
});
```

Document
--------

This module exposes only one object, namely the Heap class.

### Constructor: Heap([cmp]) ###

The constructor receives a comparison function as an optional parameter. If omitted, the heap is built as a min-heap, which means that the smallest element will be popped out first.

If the comparison function is supplied, the heap will be built according to the 
return value of the comparison function.

* if cmp(a, b) < 0, then item a will come prior to b
* if cmp(a, b) > 0, then item b will come prior to a

So, the comparison function has the following form:

```js
function cmp(a, b) {
  if (a is prior to b) {
    return -1;
  } 
  if (b is prior to a) {
    return 1;
  }
  return 0;
}
```

To compare numbers, simply: 

```js
function cmp(a, b) {
  return a - b;
}
```
### Storing Objects###
If Heap are store objects, objects must have hash and eva field. Eva (from evaluate) field must contain score;
To rename this fields you need to overload _hash and _eva methods of heap.

```js
heap=new Heap();
heap._hash = function(item){... return hash;}
heap._eva  = function(item){... return eva;}
```



### Instance Methods ###

**push(item)**

Push item onto heap.

**pop()**

Pop the smallest item off the heap and return it.

**peep()**

Return the smallest item of the heap.

**updateItemPos(item)**

Update the position of the given item in the heap.
This function should be called every time the item is being modified.

**empty()**

Determine whether the heap is empty.

**size()**

Get the number of elements stored in the heap.

**getItem()**
getItem by hash

**contains()**
return true if item in heap