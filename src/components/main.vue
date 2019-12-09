<template>
  <el-container style="height: 100%;padding-top: 60px;">
    <el-header style="display:flex;justify-content: space-between;align-items: center;">
      <el-button
        v-if="showUserList"
        type="primary"
        icon="el-icon-arrow-right"
        @click="showUserList = false"
      >
        查看监控列表
      </el-button>
      <el-button
        v-else
        type="danger"
        icon="el-icon-arrow-left"
        @click="showUserList = true"
      >隐藏监控列表</el-button>
      <el-button
        type="danger"
        icon="el-icon-switch-button"
        :loading="loading"
        @click="ding()"
      >中止监控</el-button>
      <div>
        <el-button
          v-if="!userFlag"
          type="text"
          @click="dialogVisible = true"
        > 登录</el-button>
        <el-button
          v-else
          type="text"
          style="color:#fff;"
        >{{ userFlag }}</el-button>
        <el-button
          type="text"
          @click="logVisible = true"
        >状态日志</el-button>
        <el-button
          type="text"
          @click="UnRegist()"
        >注销</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside
        v-show="!showUserList"
        width="300px"
      >
        <ul class="user-list">
          <li
            v-for="(user, index) in userList"
            :key="index"
          >
            <div>
              <span>{{ user.userName }}</span>
              <el-button
                v-if="user.show"
                type="primary"
                size="mini"
                @click="createWin(index, user)"
                icon="el-icon-view"
                circle
              ></el-button>
            </div>
          </li>
        </ul>
      </el-aside>
      <el-main>
        <div id="divOcxContainer">
          <!--动态控件区域-->
          
        </div>
      </el-main>
    </el-container>
    <el-dialog
      title="管理员登录"
      :visible.sync="dialogVisible"
      width="300px"
    >
      <el-form :model="formData">
        <el-form-item label="用户名">
          <el-input
            v-model="formData.user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="formData.pwd"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="login()"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div
      v-show="logVisible"
      role="dialog"
      aria-modal="true"
      aria-label="状态日志"
      class="el-dialog state-dialog"
      style="margin-top: 15vh; width: 400px;"
    >
      <div class="el-dialog__header">
        <span class="el-dialog__title">状态日志</span>
        <button
          type="button"
          aria-label="Close"
          class="el-dialog__headerbtn"
           @click="logVisible = false"
        >
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </div>
      <div class="el-dialog__body">
        <div class="log-diag">
          <div>
            <textarea
              id="Prompt"
              name="Prompt"
              style="width: 90%; height: 300px;"
            ></textarea>
          </div>
          <div>
            <button
              type="button"
              class="el-button el-button--primary"
              @click="ClearDesp()"
            >
              <span>清除显示</span>
            </button>
          </div>
        </div>
      </div>
      <!---->
    </div>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Mainview",
  data: function() {
    return {
      dialogVisible: false,
      logVisible: false,
      formData: {
        user: "2001",
        pwd: "123456"
      },
      userFlag: false,
      showUserList: true,
      // 监控用户列表
      userList: [],
      loading: false
    };
  },
  created() {
    window.onload()
  },
  mounted: function() {
    window.console.log(this.userFlag);
    this.getUserlist();
    if (!(document.myOcx.ME_GetOcxVersion && document.myOcx.ME_GetOcxVersion())){
      this.$confirm(
        "系统未能正确显示，请检查：1.您是否正确安装了OCX应用。2：您当前使用的浏览器是否为IE10及以下版本的浏览器，或者切换使用双核浏览器的兼容模式。",
        "提示",
        {
          showCancelButton: false,
          type: "warning"
        }
      );
    }

    window.showCreateBtn = (accid) => {
      window.console.log(accid)
      this.userList.forEach((item, index) => {
        if(item.netuserNo === accid) {
          this.userList[index].show = true
        }
      })
    }

    this.login();
  },
  methods: {
    UnRegist() {
      this.userFlag = ''
      window.UnRegist()
    },
    login: function() {
      window.ixuGlobal.loginuser = this.formData.user;
      window.ixuGlobal.pwd = this.formData.pwd;
      let flag = window.Regist();
      if(flag) {
        this.userFlag = '管理员';
        this.dialogVisible = false
      } else {
        this.$message.error('登录失败')
      }
    },
    getUserlist: function() {
      var that = this;
      axios
        .post("http://111.11.4.69:15336/ty/remote/getCustInfo", {})
        .then(function(response) {
          window.console.log(response.data);
          if (response.data.code == 200 && response.data.success === true) {
            let arr = response.data.data;
            arr = [...[{"helmetNo":"2300196","netuserNo":"100071","lon":"117.61459","tyaccount":"yanshi1","userName":"蒙西演示一","lat":"40.22759"},{"helmetNo":"2300196","netuserNo":"100074","lon":"117.61459","tyaccount":"yanshi2","userName":"蒙西演示二","lat":"40.22759"}], ...arr]
            arr.forEach(function(i) {
              i.show = true;
            });
            that.userList = arr;
            window.console.log(that.userList);
          }
        })
        .catch(function(error) {
          window.console.log(error);
          that.$message({
            type: "error",
            message: "获取监控用户列表失败:" + error
          });
        });
    },
    createWin: function(index, user) {
      this.userList[index].show = false;
      window.CreateOcx(user.netuserNo, user.userName);
    },
    ClearDesp() {
      window.ClearDesp();
    },
    ding() {
      this.loading = true;
      window.UnRegist();
      console.log('ocxs', window.ocxDom);
      setTimeout(() => {
        window.Regist();
        for (const key in window.ocxDom) {
          if (window.ocxDom.hasOwnProperty(key)) {
            const element = window.ocxDom[key];
            console.log('ocx item', element)
            window.Dispose(element.ocxId, element.calledId);
            delete window.ocxDom[key];
          }
        }
        this.loading = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  background: #333;
}
#divOcxContainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

#divOcxContainer > div {
  flex-shrink: 0;
  flex-grow: 0;
  width: 320px;
  height: 320px;
  margin: 20px;
}
.el-header {
  background: #000;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
.el-aside {
  background: #f1f1f1;
}
.user-list {
  height: calc(100vh - 70px);
  overflow: auto;
}
.el-aside .user-list li {
  padding: 10px;
  margin: 5px;
  background: #fff;
}
.el-aside .user-list li div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-aside .user-list li div span {
  width: 150px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.control-btns {
  display: flex;
  justify-content: space-around;
}
.state-dialog {
  position: fixed!important;
  right: 0!important;
  bottom: 0!important;
}
.log-diag {
  text-align: center;
}
.log-diag > div {
  margin-bottom: 20px;
}
.call-name {
  margin: 5px 10px;
}
/* 视频边框 */
.bb:before,
.bb:after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.bb {
  width: 320px;
  height: 320px;
  color: #69ca62;
  box-shadow: inset 0 0 0 1px rgba(105, 202, 98, 0.5);
}
.bb {
  position: relative;
}
.bb:before,
.bb:after {
  content: "";
  z-index: -1;
  margin: -10px;
  box-shadow: inset 0 0 0 2px;
  animation: clipMe 8s linear infinite;
}
.bb:before {
  animation-delay: -4s;
}
@keyframes clipMe {
  0%,
  100% {
    clip: rect(0px, 380px, 2px, 0px);
  }
  25% {
    clip: rect(0px, 2px, 380px, 0px);
  }
  50% {
    clip: rect(378px, 380px, 380px, 0px);
  }
  75% {
    clip: rect(0px, 380px, 380px, 378px);
  }
}
</style>
