<template>
  <div style="width: 100%;height: 100%;position: fixed">
  <!--  api 参考 https://www.cnblogs.com/chengxu931106/p/7196601.html  -->
    <ace-editor v-model="content"
                @init="editorInit"
                lang="javascript"
                :options="editorOptions"
                theme="chrome"
                width="100%"
                height="100%">
    </ace-editor>
  </div>

</template>

<script>
export default {
  name: "test.vue",
  data() {
    return {
      content: '',
      editorInst:null,
      editorOptions: {
        // 设置代码编辑器的样式
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2,
        fontSize: 16,
        showPrintMargin: false, //去除编辑器里的竖线
        autoScrollEditorIntoView: true,
        highlightSelectedWord: false
        // maxLines:1000,
        //  minLines:20,
      },
    }
  },
  components: {
    AceEditor: require('vue2-ace-editor'),
  },
  methods: {
    editorInit(editorInst){
      this.editorInst = editorInst
      require("brace/theme/chrome");
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/yaml");
      require("brace/mode/java");
      require("brace/mode/less");
      require("brace/snippets/java");
      require("brace/snippets/javascript");
      require("brace/theme/monokai");
      require("brace/ext/emmet");
    }
  },
  mounted() {
    // 手动设置编辑器内容
    this.editorInst.setValue('请选择合约文件\n wqdwqdq');
    // 设置当前高亮行数
    this.editorInst.gotoLine(2);
    // 设置只读
    this.editorInst.setReadOnly(true);
    // 获取编辑器内容
    console.log(this.editorInst.getValue())
  }
}
</script>
