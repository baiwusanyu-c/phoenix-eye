<template>
    <span
        v-html="textInner"
        :title="content"
        :class="customClass"
        @click="expandTriggerFunc"
        :style="styleStr">
    </span>
</template>

<script>
export default {
  name: "BeEllipsis",
  data(){
    return{
      styleStr:'',
      isExpand:false,
      elpNumCache:5,
      textCache:'',
      textInner:''
    }
  },
  props: {
      /**
       * 自定义样式
       */
      'customClass': {
          type: String,
          default: ''
      },
    /**
     * 提示显示内瓤
     */
    'content': {
      type: String,
      default: ''
    },
    /**
     * 显示内容
     */
    'text': {
      type: String,
      default: ''
    },
    /**
     * 点击展开
     */
    'expandTrigger': {
      type: Boolean,
      default: false
    },
    /**
     * 多行省略
     */
    'lineClamp': {
      type: Number,
      default: 2
    },
    /**
     * 缩略字符数
     */
    'elpNum': {
      type: Number,
      default: 5
    },
    /**
     * 缩略字符数
     */
    'placement': {
      type: String,
      default: 'left'
    },
  },
  computed:{
    textCompute(){
      return this.text
    },
    elpNumCompute(){
        return this.elpNum
    }
  },
  watch:{
    textCompute: {
      handler: function (nVal) {
        this.textCache = nVal
        this.handleText()
      },
      deep: true,
      immediate: true
    },
    elpNumCompute: {
      handler: function (nVal) {
          this.elpNumCache = nVal
          this.handleText()
      },
      deep: true,
      immediate: true
    },
  },
  methods:{
    /**
     * 展开方法
     */
    expandTriggerFunc(){
      if(!this.expandTrigger) return
      this.isExpand = !this.isExpand
      this.styleStr = this.isExpand ? '' : `-webkit-line-clamp:${this.lineClamp};display:-webkit-inline-box;-webkit-box-orient:vertical;overflow:hidden;`
      this.isExpand && (this.textInner = this.textCache)
      !this.isExpand && this.handleText()
    },
    /**
     * 处理字符串数据
     */
    handleText(){
     if(this.elpNumCache === 0 || this.elpNumCache === '0') return
      if(this.placement === 'left'){
        this.textInner = this.text.slice(0, this.text.length - this.elpNumCache) + '...'
      }
      if(this.placement === 'center'){
        let elpNumCenter = this.elpNumCache/2
        let lenCenter = this.text.length/2
        let subStr1 = this.text.substr( 0, lenCenter - elpNumCenter);
        let subStr2 = this.text.substr( lenCenter + elpNumCenter, this.text.length);
        let subStr = subStr1 + "..." + subStr2 ;
        this.textInner = subStr;
      }
      if(this.placement === 'right'){
        this.textInner = '...' + this.text.slice(0, this.text.length - this.elpNumCache)
      }
    }

  },
  created(){
    this.styleStr = `-webkit-line-clamp:${this.lineClamp};display:-webkit-inline-box;-webkit-box-orient:vertical;overflow:hidden;`
  }
}
</script>
