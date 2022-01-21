/*

* @deprecated 
* @author czh
* @update (czh 2021/11/24)
*/

/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.minVal = 0
    this.minIndex = 0
    this.arr = []
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    if(this.arr.length === 0){
        this.minVal = x
    }
    if(x <= this.minVal){
        this.minVal = x
        this.minIndex = this.arr.length
    }
    this.arr.push(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if((this.arr.length - 1) === this.minIndex){
        this.arr.pop()
        if( this.arr.length === 1){
            this.minIndex = 0
        }
        let elm = this.arr[this.arr.length - 1]
        this.arr.forEach((val,index)=>{

            if(val <= elm){
                this.minVal = val
                this.minIndex = index
                elm = val
            }
        })
        return
    }
    this.arr.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.arr[(this.arr.length - 1)]
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    return this.arr[this.minIndex]
};



describe('test-min-stack', () => {
    test('exp-10', () => {
        const obj = new MinStack()
        obj.push(395)
        expect(obj.min()).toBe(395)
        expect(obj.top()).toBe(395)
        expect(obj.min()).toBe(395)
        obj.push(276)
        obj.push(29)
        expect(obj.min()).toBe(29)
        obj.push(-482)
        expect(obj.min()).toBe(-482)
        obj.pop()
        obj.push(-108)
        obj.push(-251)
        debugger
        expect(obj.min()).toBe(-251)

    })

})