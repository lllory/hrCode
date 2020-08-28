<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="login_mointor">
          <!-- <span class="logo"></span> -->
          <span class="logo_title">中移集成考勤管理</span>
        </div>
        <div class="login-main">
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="keyup()" status-icon>
            <!-- <div class="login_mointor_user">用户名</div> -->
            <el-form-item prop="userName">
              <el-input v-model="dataForm.userName" placeholder="用户名" class="input_class"></el-input>
            </el-form-item>
            <!-- <div class="login_mointor_password">密码</div> -->
            <el-form-item prop="password">
              <el-input v-model="dataForm.password" type="password" placeholder="密码" class="input_class"></el-input>
            </el-form-item>
            <!-- <div class="login_mointor_captcha">验证码</div> -->
            <el-form-item prop="captcha">
              <el-row :gutter="20">
                <el-col :span="18" class="captcha_left">
                  <el-input v-model="dataForm.captcha" placeholder="验证码" class="input_captcha input_class">
                  </el-input>
                
                </el-col>
                <el-col :span="6" class="login-captcha">
                  <img :src="captchaPath" @click="getCaptcha()" alt="">
                </el-col>
              </el-row>
              
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col class="remerber_class" style="">
                  <input type="checkbox" name="" id="" style="vertical-align:middle; "><span style="font-size: 12px;vertical-align:middle;margin-left: 3px;color: #3F3F3F; ">记住我</span></input>
                </el-col>
              </el-row>
            </el-form-item>
            
            <el-form-item>
              <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getUUID
  } from '@/utils'
  import {
    Base64
  } from '../../utils/utils' //账号密码加密
  export default {
    data() {
      return {
        tabIndex: 0,
        tabs: ['400客户端', '终端注册', '专线开通'],
        showPic: true,
        leftIcon: "",
        keyword: "",
        dataForm: {
          userName: '',
          password: '',
          uuid: '',
          captcha: ''
        },
        dataRule: {
          userName: [{
            required: true,
            message: '帐号不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }],
          captcha: [{
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          }]
        },
        captchaPath: ''
      }
    },
    created() {
      this.getCaptcha()
    },
    computed: {
      leftIcon1() {
        if (this.dataForm.userName != '') {
          return 'active1'
        } else {
          return 'activeGray1'
        }
      },
    },
    mounted() {
      if (process.env.NODE_ENV == 'production' && window.location.hostname.split(".")[3] == '106') {
        this.showPic = true
      } else {
        this.showPic = false
      }
    },

    methods: {
      changeSelect(index, tab) {
        this.tabIndex = index
      },
      keyup() {
        // 延迟0.5秒请求服务，记录当前的值
        setTimeout(() => {
          this.dataFormSubmit()
        }, 1000)
      },
     
      // 提交表单
      dataFormSubmit() {
        var base = new Base64();
        // typeData["item"].wlanUser = base.encode(typeData["item"].wlanUser);
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/sys/login'),
              method: 'post',
              data: this.$http.adornData({
                'username': base.encode(this.dataForm.userName),
                'password': base.encode(this.dataForm.password),
                // 'username':this.dataForm.userName ,
                // 'password':this.dataForm.password ,
                'uuid': this.dataForm.uuid,
                'captcha': this.dataForm.captcha
              })
            }).then(({
              data
            }) => {
              if (data && data.code === 0) {
                sessionStorage.setItem('userName', JSON.stringify(this.dataForm.userName || ''));
                this.$cookie.set('creator', this.dataForm.userName)
                this.$cookie.set('token', data.token)
                this.$cookie.set('roleid', data.roleid)
                sessionStorage.removeItem("tabIndex");
                sessionStorage.setItem('menuNmae',data.data.name)
                this.$router.replace({
                    name: 'time-distribution'
                  })
                // if(data.data.url == '' || data.data.url == 'null' || data.data.url == undefined || data.data.url == null){
                //   this.$router.replace({
                //     name: 'time-attendance'
                //   })
                // }else{
                //   let url = data.data.url.replace("/",'-')
                //   this.$router.replace({
                //     name: url
                //   })
                // }
                 
                
              } else {
                this.getCaptcha()
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      // 获取验证码
      getCaptcha() {
        this.dataForm.uuid = getUUID()
        this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.dataForm.uuid}`)
      }
    }
  }

</script>

<style lang="scss">
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none
  }

  .site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* background-color: rgba(38, 50, 56, .2); */
    overflow: hidden;

    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: "";
      background-image: url(~@/assets/img/hrloginBg.png);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center -100px;
      

    }

    .site-content__wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0;
      margin: 0;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: transparent;
      padding-top:100px;
    }

    .site-content {
      min-height: 100%;
      padding: 30px 500px 30px 30px;
    }

    .brand-info {
      margin: 220px 100px 0 90px;
      color: #fff;
    }

    .brand-info__text {
      margin: 0 0 22px 0;
      font-size: 48px;
      font-weight: 400;
      text-transform: uppercase;
    }

    .brand-info__intro {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.58;
      opacity: .6;
    }

    

    .login-title {
      font-size: 16px;
    }

    .login-captcha {
      overflow: hidden;
      margin-left: -45px;
      height: 40px;
      line-height: 40px;
      padding: 0 !important;
      width: 80px !important;

      >img {
        width: 100%;

        cursor: pointer;
        height: 80%;
      }
    }

    .login-btn-submit {
      width: 300px;
      /* margin-top: 10px; */
      height: 35px;
      background: rgba(24, 144, 255, 1);
      /* box-shadow: 0px 2px 4px 0px rgba(24, 144, 255, 0.71);
      border-radius: 25px; */
      font-size: 18px;
    }
  }

//   .login_mointor {
//     /* background-color: skyblue; */
//     height: 92px;
//     // width: 450px;
//     width: 30%;
//     line-height: 92px;
//     padding: 20px 20px;
//     display: inline-block;
//     position: absolute;
//     // top: -48px;
//     // right:171px;
//     top: -9%;
//     right: 15%;
//     background: #fff;
//     border-radius: 5px;
//     text-align: center;

//     /* background: url(~@/assets/img/logoqt.png) no-repeat center center; */
//   }

// .login-main {
//       position: fixed;
//       top:140px;
//       right: 215px;
//       /* padding: 150px 60px 180px; */
//       width: 380px;
//       height: 340px;
//       overflow: hidden;
//       /* height: 500px; */
//       background-color: #fff;
//       border-radius: 5px;
//       padding: 20px 0 0 0;
//     }

@media screen and (max-width: 1920px) {
   .login_mointor {
    /* background-color: skyblue; */
    height: 92px;
    width: 500px;
    // width: 30%;
    line-height: 92px;
    padding: 20px 20px;
    display: inline-block;
    position: absolute;
    top: 40px;
    right:320px;
    // top: -9%;
    // right: 15%;
    background: #fff;
    border-radius: 5px;
    text-align: center;

    /* background: url(~@/assets/img/logoqt.png) no-repeat center center; */
  }
  .logo_title{
    font-size: 28px !important;
  }

    .login-main {
      position: fixed;
      top:250px;
      right: 300px;
      /* padding: 150px 60px 180px; */
      width: 500px;
      height: 400px;
      overflow: hidden;
      /* height: 500px; */
      background-color: #fff;
      border-radius: 5px;
      padding: 20px 0 0 0;
    }
    .input_class {
      width: 400px !important;
      height: 50px !important;
    }
    .input_captcha {
      width: 320px !important;
      height: 50px !important;
      margin-left: 52px;

    }
    .login-captcha {
      margin-left: 0px !important;
      height: 60px !important;
    }
    .login-btn-submit{
      width: 400px !important;
      height: 50px !important;
    }
    .remerber_class{
      text-align: left;
      padding-left: 80px;
      margin-top: 0px;
    }
}

@media screen and (max-width: 1680px) {
   .login_mointor {
    /* background-color: skyblue; */
    height: 92px;
    width: 500px;
    // width: 30%;
    line-height: 92px;
    padding: 20px 20px;
    display: inline-block;
    position: absolute;
    top: 0px;
    right:220px;
    // top: -9%;
    // right: 15%;
    background: #fff;
    border-radius: 5px;
    text-align: center;

    /* background: url(~@/assets/img/logoqt.png) no-repeat center center; */
  }
  .logo_title{
    font-size: 28px !important;
  }

    .login-main {
      position: fixed;
      top:200px;
      right: 200px;
      /* padding: 150px 60px 180px; */
      width: 500px;
      height: 350px;
      overflow: hidden;
      /* height: 500px; */
      background-color: #fff;
      border-radius: 5px;
      padding: 20px 0 0 0;
    }
    .input_class {
      width: 400px !important;
      height: 40px !important;
    }
    .input_captcha {
      width: 320px !important;
      height: 40px !important;
      margin-left: 52px;

    }
    .login-captcha {
      margin-left: 0px !important;
      height: 40px !important;
    }
    .login-btn-submit{
      width: 400px !important;
      height: 45px !important;
    }
    .remerber_class{
      text-align: left;
      padding-left: 80px;
      margin-top: 0px;
    }
}


  @media screen and (max-width: 1480px) {
   .login_mointor {
      height: 92px;
      width: 450px;
      line-height: 92px;
      padding: 20px 20px;
      display: inline-block;
      position: absolute;
      top: -48px;
      right:171px;
      right: 15%;
      background: #fff;
      border-radius: 5px;
      text-align: center;
    }

    .login-main {
      position: fixed;
      top:140px;
      right: 215px;
      /* padding: 150px 60px 180px; */
      width: 380px;
      height: 340px;
      overflow: hidden;
      /* height: 500px; */
      background-color: #fff;
      border-radius: 5px;
      padding: 20px 0 0 0;
    }
    .input_class {
      width: 300px !important;
      height: 40px !important;
    }
    .input_captcha {
      width: 200px !important;
      height: 40px !important;
      margin-left: 0px;
      }
      .login-captcha {
      margin-left: -45px !important;
    }

    .login-btn-submit{
      width: 300px !important;
      height: 35px !important;
    }
    .login-captcha {
      margin-left: -45px !important;
      height: 40px !important;
    }
    .remerber_class{
      text-align: left;
      padding-left: 60px;
      margin-top: -10px;
    }
  }



  .input_class input{
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0px;
  }
  .input_class input::placeholder{
    font-size: 12px !important;
    color: #3F3F3F;
  }

// .remerber_class{
//   text-align: left;
//     padding-left: 80px;
//     margin-top: 0px;
// }
 

  .input_captcha .el-input__inner {
    width: 100%;
    height: 100%;
    background: #fff;
    text-indent: 3em;

  }

  .input_class .el-input__inner {
    width: 100%;
    height: 100%;
    background: #fff;
    text-indent: 0em;

  }

  .login-main .el-form-item__error {
    margin-left: 60px;
  }

  .login-main .el-form-item__content {
    text-align: center;
  }

  .login_mointor_user,
  .login_mointor_password,
  .login_mointor_captcha {
    margin-left: 60px;
    color: #1890FF;
    font-size: 16px;
  }

  // .logo{
  //   width: 41px;
  //   height: 41px;
  //   display: inline-block;
  //   background: url(~@/assets/img/logo.png) ;
  //   background-size:cover;

  // }
  .logo_title {
    font-size: 25px;
    margin-top: -35px;
    display: inline-block;
    vertical-align: middle;
    color: #2277FF;
    font-weight: 700;
    margin-left: 10px;
  }

  .left_icon1,
  .left_icon2,
  .left_icon3 {
    display: inline-block;
    width: 20px;
    height: 20px;
    /* border: 1px solid gray; */
    position: absolute;
    z-index: 999;
  }

  
  .activeGray1 {

    background: url(~@/assets/img/userGray.png) no-repeat center center;
    background-size: 100% 100%;
  }

  .activeGray2 {

    background: url(~@/assets/img/passwordGray.png) no-repeat center center;
    background-size: 100% 100%;
  }

  .activeGray3 {

    background: url(~@/assets/img/captchaGray.png) no-repeat center center;
    background-size: 100% 100%;
  }

  .active1 {

    background: url(~@/assets/img/user.png) no-repeat center center;
    background-size: 100% 100%;
  }

  .active2 {
    background: url(~@/assets/img/password.png) no-repeat center center;
    background-size: 100% 100%;
  }

  .active3 {
    background: url(~@/assets/img/captcha.png) no-repeat center center;
    background-size: 100% 100%;
  }

  .tab_select {
    width: 380px;
    height: 250px;
    margin-top: 570px;
    margin-right: -410px;
    border-radius: 10px;
    float: right;
    /* border: 1px solid #2d5868; */
    padding: 5px 0 0 0;
    display: flex;
    justify-content: space-around;

  }

  .tab_select ul li {
    float: left;
    padding: 5px 25px;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }

  .clickBck {
    background: #1890ff;
    box-shadow: 0px 2px 4px 0px rgba(24, 144, 255, 0.71);
    border-radius: 5px;
  }

  .img_Logo {
    width: 150px;
    height: 150px;
    float: right;
    margin-right: -300px;
    margin-top: 630px;
    background: url(~@/assets/img/formal.png) no-repeat center center;
    background-size: 100% 100%;
    /* border: 1px solid gray; */
    /* position: fixed; */
    /* bottom: 20%;
    right: 16.5% */
  }

  .img_word {
    float: right;
    margin-right: -287px;
    margin-top: 795px;
    color: white;
  }

  .formal {
    background: url(~@/assets/img/formal.png) no-repeat center center;
    background-size: 100% 100%;
  }

  .test {
    background: url(~@/assets/img/test.png) no-repeat center center;
    background-size: 100% 100%;
  }

  .terminal {
    background: url(~@/assets/img/terminal.png) no-repeat center center;
    background-size: 100% 100%;
  }

  .line {
    background: url(~@/assets/img/line.png) no-repeat center center;
    background-size: 100% 100%;
  }

</style>
