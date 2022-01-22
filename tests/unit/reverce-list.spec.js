/*
* @deprecated 
* @author czh
* @update (czh 2022/1/22)
*/
let reverseList = function(head) {
    let resList = {}
    if(!head) return head
    const gf = (node)=>{
        if(!node) return
        // 鏈表沒有到頭則遞歸，
        if(node.next){
            // 從鏈表頭返回時，返回的直接是 resList，所有修改都是對 resList 修改
            // 此後每次遞歸出來都是反轉鏈表的 next
            const res  = gf(node.next)
            // 將反轉鏈表頭 當前遞歸層級
            res.next = {val:node.val,next:null}
            // 返回反轉鏈表 next
            return res.next
        }
        // 鏈表到頭，則是反轉鏈表尾部
        if(!node.next){
            resList = {val:node.val,next:null}
            return resList
        }

    }
    gf(head)
    return resList
};

describe('test-reverce-list', () => {
    test('exp-10', () => {
        const res = reverseList( {
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
            val:5,
            next:{
                val:4,
                next:{
                    val:3,
                    next:{
                        val:2,
                        next:{
                            val:1,
                            next:null
                        }
                    }
                }
            }
        })

    })

})
