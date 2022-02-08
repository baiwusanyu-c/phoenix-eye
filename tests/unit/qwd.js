/*
* @qwd.js
* @deprecated 
* @author czh
* @update (czh 2022/1/22)
*/
let findRepeatNumber = function(nums) {
    const dict = {}
    for(let i = 0;i<nums.length;i++){
        if(dict[nums[i]]){
            return nums[i]
        }
        if(!dict[nums[i]]){
            dict[nums[i]] = true
        }
    }
    console.log(dict)
};
findRepeatNumber([3, 4, 2, 0, 0, 1])