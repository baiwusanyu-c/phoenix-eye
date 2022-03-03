/*
 * @Author: yinian430 
 * @Date: 2020-08-07 13:54:45 
 * @Last Modified by: yinian430
 * @Last Modified time: 2020-12-18 15:02:38
 */
<template>
  <div class="notfound">
    <div class="content-area">
      <img src="@/assets/image/404.png" alt="">
    </div>
  </div>
</template>



<style scoped lang='scss'>
.notfound{
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;

  .content-area{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 120px);

  }
}
</style>
