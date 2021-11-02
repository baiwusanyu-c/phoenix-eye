<template>
  <div class="formArea">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item class="label" prop='name'>
        <el-input autocomplete="off" placeholder="请输入手机号" v-model="form.name">
          <template slot="prepend"><img class="iconImg" src="../../../../assets/image/pc/user.png" alt=""></template>
        </el-input>
      </el-form-item>
      <div class="flex">
        <el-form-item class="label" prop='code' style="width: 58%;">
          <el-input maxlength="6" type="text" autocomplete="off" placeholder="请输入验证码" v-model="form.code">
            <template slot="prepend"><img class="iconImg" src="../../../../assets/image/pc/code.png" alt=""></template>
          </el-input>
        </el-form-item>
        <p class="codeBtn" v-if="!isTip" @click="getCode">获取验证码</p>
        <p class="tips" v-else>{{number}}s</p>
      </div>
      <el-form-item class="label" prop='newPwd'>
        <el-input maxlength="12" @keyup.native="form.newPwd=form.newPwd.replace(/[ ]/g,'')" :type="visible ? 'text' : 'password'" autocomplete="off" placeholder="请输入新密码" v-model="form.newPwd">
          <template slot="prepend"><img class="iconImg" src="../../../../assets/image/pc/pwd.png" alt=""></template>
          <template slot="append">
            <img class="showIcon" v-if="!visible" @click="visible = !visible" src="../../../../assets/image/pc/hide.png" alt="">
            <img class="showIcon" v-else @click="visible = !visible" src="../../../../assets/image/pc/show.png" alt="">
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="label" prop='password'>
        <el-input maxlength="12" @keyup.native="form.password=form.password.replace(/[ ]/g,'')" :type="visibleAgain ? 'text' : 'password'" autocomplete="off" placeholder="确认新密码" v-model="form.password">
          <template slot="prepend"><img class="iconImg" src="../../../../assets/image/pc/pwd.png" alt=""></template>
          <template slot="append">
            <img class="showIcon" v-if="!visibleAgain" @click="visibleAgain = !visibleAgain" src="../../../../assets/image/pc/hide.png" alt="">
            <img class="showIcon" v-else @click="visibleAgain = !visibleAgain" src="../../../../assets/image/pc/show.png" alt="">
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button class="primary" type="primary" :loading="isLogin" @click="resetPwd">确认重置</el-button>
    <p class="checkArea">
      <span class="phone cursor" @click="$parent.areaType = 1;">已有账号去登录</span>
    </p>
  </div>
</template>

<script>
import {updatePwd, getResetCode} from '@/api/login.js';

export default {
  name: "ResetPassword",
  data() {
    var validatePhonenumber = (rule, value, callback) => {
      if (this.phoneReg.test(value)) {
        callback();
      } else {
        callback(new Error('手机号格式错误'));
      }
    };
    var validateNewPwd = (rule, value, callback) => {
      if(!this.pwdReg.test(value)) {
        callback(new Error('6-12位字母+数字组合，可含特殊字符'));
      }else {
        callback();
      }
    };
    var validatePwd = (rule, value, callback) => {
      if(!this.pwdReg.test(value)) {
        callback(new Error('6-12位字母+数字组合，可含特殊字符'));
      }else{
        if (this.form.newPwd === this.form.password) {
          callback();
        }else {
          callback(new Error('两次输入密码不一致'));
        }
      }
    };
    return {
      form: {
        name: '',
        password: '',
        code: '',
        uuid: '',
        newPwd: '',
      },
      isLogin: false,
      rules: {
        name: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhonenumber, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 12, message: '6-12位字母+数字组合，可含特殊字符', trigger: 'blur' },
          { validator: validateNewPwd, trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请确认新密码", trigger: 'blur' },
          { min: 6, max: 12, message: '6-12位字母+数字组合，可含特殊字符', trigger: 'blur' },
          { validator: validatePwd, trigger: 'blur' }
        ],
      },
      isFocus: false,
      isTip: false,
      number: 60,
      visible: false,
      visibleAgain: false
    };
  },
  methods: {
    getCode() {
      this.form.name = this.trim(this.form.name);
      this.$refs['form'].validateField('name', (error) => {
        if(!error){
          getResetCode({
            userName: this.form.name
          }).then(res => {
            this.$message.success('获取验证码成功');
            this.form.uuid = res;
            this.isTip = true;
            this.number = 60;
            this.codeInerval = setInterval(() => {
              if(this.number > 0){
                this.number--;
              }else{
                clearInterval(this.codeInerval);
                this.isTip = false;
              }
            }, 1000)
          }).catch(error => {console.log(error)});
        }
      })
    },
    resetPwd() {
      this.form.name = this.trim(this.form.name);
      this.form.code = this.trim(this.form.code);
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.isLogin = true;
          updatePwd({
            userName: this.form.name,
            password: this.form.password,
            uuid: this.form.uuid,
            code: this.form.code,
          }).then(() => {
            this.$message.success('重置密码成功');
            this.$parent.areaType = 1;
          }).catch(() => {
            this.isLogin = false;
          });
        } else {
          return false;
        }
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.formArea{
  width: 100%;
  margin: auto;
  .primary{
    width: 100%;
    margin-top: 14px;
    height: 38px
  }
  .showIcon{
    height: 16px;
    position: relative;
    top: -2px;
    display: inline-block;
    cursor: pointer;
  }
  .errBtn{
    cursor: not-allowed;
  }
  .codeBtn{
    width: 34%;
    font-size: 14px;
    line-height: 38px;
    height: 38px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    background-color: #206596;
    opacity: 0.8;
    border-radius: 5px;
  }
  .codeBtn:hover{
      opacity: 1;
  }
  .tips{
    line-height: 37px;
    color: #76838F;
    font-size: 14px;
    width: 110px;
    height: 37px;
    border-radius: 5px;
    background-color: #F2F4F5;
    text-align: center;
  }
  .checkArea{
    margin-top: 15px;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    text-align: right;
    .cursor{
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
    .phone{
      color: #4A4A4A;
    }
  }
}
.flex{
  justify-content: space-between;
  align-items: flex-start;
}
</style>
<style lang="scss">
</style>
