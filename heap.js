function Heap(cmp){
    this.clear();
    var self=this;
    this.cmp=cmp||function(x, y) {
        x=self._eva(x);
        y=self._eva(y);
        if (x < y)
            return -1;
        if (x > y)
            return 1;
        return 0;
    }
}
Heap.prototype={
    clear:function(){
        this.arr=[];
        this.poses={};
    },
    size:function(){
        return this.arr.length;
    },
    indexOf:function(item){
        var pos=this.poses[this._hash(item)];
        if(pos===undefined)
            return -1;
        return pos;
    },
    contains:function(item) {
        return this.indexOf(item) !== -1;
    },
    push:function(item){
        this._aPush(item);
        this._siftdown(0, this.arr.length - 1);
    },
    pop:function() {
        var out, last;
        last = this._aPop();
        if (this.arr.length === 0)
            return last;
        else {
            out = this.arr[0];
            this._aSet(0,last);//array[0] = last;
            this._siftup(0);
        }
        return out;
    },
    getItem:function(item){
        return this.arr[this.indexOf(item)];
    },
    updateItemPos:function(item, updateVal){
        var pos=this.indexOf(item);
        if(updateVal)
            this.arr[pos]=item;
        this._siftdown(0, pos);
        this._siftup(pos);
    },
    peek:function() {
        return this.arr[0];
    },
    _siftdown:function(start, pos) {
        var newItem = this.arr[pos];
        while (pos > start) {
            var parentPos = (pos - 1) >> 1;
            var parent = this.arr[parentPos];
            if (this.cmp(newItem, parent) >= 0)
                break;
            this._aSet(pos,parent);
            pos = parentPos;
        }
        this._aSet(pos,newItem);
    },
    _siftup:function(pos) {
        var len = this.arr.length;
        var start = pos;
        var newItem = this.arr[pos];
        var childPos = 2 * pos + 1;
        while (childPos < len) {
            var rightPos = childPos + 1;
            if (rightPos < len && this.cmp(this.arr[childPos], this.arr[rightPos]) >= 0)
                childPos = rightPos;
            this._aSet(pos,this.arr[childPos]);
            pos = childPos;
            childPos = 2 * pos + 1;
        }
        this._aSet(pos,newItem);
        this._siftdown(start, pos);
    },
    _hash:function(item){
        return typeof(item)==='object' ? item.hash : item;
    },
    _eva:function(item){
        return typeof(item)==='object' ? item.eva : item;
    },
    _removeOldIndex:function(item, ifIndex){
        var oldHash=this._hash(item);
        if(this.poses[oldHash]===ifIndex)
            delete this.poses[oldHash];
    },
    _aSet:function(index,item){
        this._removeOldIndex(this.arr[index],index);
        this.poses[this._hash(item)]=index;
        return this.arr[index]=item;
    },
    _aPop:function(){
        var pop=this.arr.pop();
        this._removeOldIndex(pop,this.arr.length);
        return pop;
    },
    _aPush:function(item){
        this.poses[this._hash(item)]=this.arr.length;
        return this.arr.push(item);
    }
};
if(typeof module !== "undefined" && module !== null)
    module.exports = Heap;