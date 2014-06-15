var should = require('should');
var Heap   = require('../lib/heap.js');


var i,arr,heap;

//push/pop
heap=new Heap();
for(i=0;i<100;i++)
    heap.push(Math.random());
arr=[];
while(heap.size()!==0)
    arr.push(heap.pop());
arr.sort().should.eql(arr);


//push/pop with costume function
heap=new Heap(function(a,b){
    if (a > b)
        return -1;
    if (a < b)
        return 1;
    return 0;
});
arr=[];
for(i=0;i<100;i++)
    heap.push(Math.random());
while(heap.size()!==0)
    arr.push(heap.pop());
arr.sort().reverse().should.eql(arr);

//indexOf
for(i=0;i<heap.arr.length;i++)
    heap.indexOf(heap.arr[i]).should.eql(i);

for(i=0;i<10;i++)
    heap.indexOf(Math.random()).should.eql(-1);

heap.indexOf(heap.pop()).should.eql(-1);


//contains
for(i=0;i<heap.arr.length;i++)
    heap.contains(heap.arr[i]).should.eql(true);

for(i=0;i<10;i++)
    heap.contains(Math.random()).should.eql(false);

heap.contains(heap.pop()).should.eql(false);
