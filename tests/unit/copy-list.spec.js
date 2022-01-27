/*
* @copy-list.spec.js.js
* @deprecated 
* @author czh
* @update (czh 2022/1/22)
*/
let copyRandomList = function(head) {
    if(!head) return null
    let list = {}
    const gf = (node,resList)=>{
        if(!node) return
        if(node.next){
            resList = node
             gf(node.next,resList.next)
            return resList
        }
        if(!node.next){
            resList = node
            return resList;
        }
    }
    list = gf(head,list)
    return list
};
describe('test-reverce-list', () => {
    test('exp-11', () => {
        const res = copyRandomList( {
            val:1,
            next:{
                val:2,
                next:{
                    val:3,
                    next:{
                        val:4,
                        next:{
                            val:5,
                            next:null
                        }
                    }
                }
            }
        })
        expect(res).toStrictEqual({
            val:1,
            next:{
                val:2,
                next:{
                    val:3,
                    next:{
                        val:4,
                        next:{
                            val:5,
                            next:null
                        }
                    }
                }
            }
        })

    })
})