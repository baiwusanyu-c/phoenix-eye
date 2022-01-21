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
        let elm = 0
        this.arr.pop()
        this.arr.forEach((val,index)=>{

            if(val <= elm){
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
        obj.push(2)
        obj.push(0)
        obj.push(3)
        obj.push(0)
        debugger
        expect(obj.min()).toBe(0)
        obj.pop()
        expect(obj.min()).toBe(0)
        obj.pop()
        expect(obj.min()).toBe(0)
        obj.pop()
        debugger
        expect(obj.min()).toBe(2)
    })

})