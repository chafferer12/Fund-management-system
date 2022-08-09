<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="12" class="logo-container">
        <img src="../assets/logo.png" alt="" class="logo" />
        <span class="title">在线后台管理系统</span>
      </el-col>
      <el-col :span="12" class="user">
        <div class="userinfo">
          <img
            src="https://ts1.cn.mm.bing.net/th?id=OIP-C.vcqgLIBrbKn1v7A3Bgz5qgHaHa&w=150&h=170&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"
            class="avatar"
            alt=""
          />
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{ user.name }}</p>
          </div>
          <div class="username">
            <!--下拉箭头-->
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <el-icon color="#fff" :size="20" class="el-icon--right">
                  <CaretBottom />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="info">个人信息</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
  export default {
    name: "head-nav",
    computed: {
      user() {
        return this.$store.getters.user;
      },
    },
    methods: {
      setDialogInfo(cmdItem) {
        // console.log(cmdItem);
        switch (cmdItem) {
          case "info":
            this.showInfoList();
            break;
          case "logout":
            this.logout();
            break;
        }
      },
      showInfoList() {
        this.$router.push('/infoshow')
      },
      logout() {
        //清除token
        localStorage.removeItem('eleToken')
        //设置vuex store
        this.$store.dispatch('clearCurrentState')
        //跳转
        this.$router.push('/login')
      },
    },
  };
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .head-nav {
    width: 100%;
    height: 70px;
    min-width: 700px;
    padding: 5px;
    background: #324057;
    color: #fff;
    border-bottom: 1px solid #1f2d3d;
  }
  .logo-container {
    line-height: 60px;
    min-width: 400px;
  }
  .logo {
    height: 50px;
    width: 50px;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
  }
  .title {
    vertical-align: middle;
    font-size: 22px;
    font-family: "Microsoft YaHei";
    letter-spacing: 3px;
  }
  .user {
    line-height: 60px;
    text-align: right;
    float: right;
    padding-right: 10px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
  }
  .welcome {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: 0 5px;
  }
  .name {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }
  .comename {
    font-size: 12px;
  }
  .avatarname {
    color: #409eff;
    font-weight: bolder;
  }
  .username {
    cursor: pointer;
    margin-right: 5px;
    display: inline-block;
  }
  .el-dropdown {
    vertical-align: middle;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
  }
</style>
