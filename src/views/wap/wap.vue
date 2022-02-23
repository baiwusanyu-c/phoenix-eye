/*
 * @Author: yinian430 
 * @Date: 2020-07-06 18:36:12 
 * @Last Modified by: yinian430
 * @Last Modified time: 2020-08-05 11:01:54
 */
<template>
  <div class="wap">
    <img src="@/assets/image/wap/wap.png" alt="">
    <p>本工具暂不支持移动端访问<br>
      请前往PC端使用</p>
  </div>
</template>
<style scoped lang='scss'>
  .wap{
    width: 100vw;
    height: calc(100vh - 1.28rem);
    padding-top: 1.28rem;

    img{
      display: block;
      width: 1.53rem;
      height: 1.53rem;
      margin: auto;
      margin-bottom: .36rem;
    }

    p{
      font-size: .14rem;
      font-weight: 400;
      line-height: .24rem;
      color: #000;
      text-align: center;
    }
  }
</style>