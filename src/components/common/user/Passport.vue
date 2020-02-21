<template>
  <div class="passport">
    <div class="passport_frame">
      <header>
        修改密码
        <i class="iconfont iconRectangleCopy" @click="()=>{$parent.showPassport = false}" />
      </header>
      <div class="passport_container">
        <div>
          <label>用户名</label>
          <span>{{au_username}}</span>
        </div>
        <div>
          <label>原密码</label>
          <span>
            <input v-model="p" />
            <p v-if="p_tip">{{p_tip}}</p>
          </span>
        </div>
        <div>
          <label>新密码</label>
          <span>
            <input v-model="pnew" />
            <p v-if="pnew_tip">{{pnew_tip}}</p>
          </span>
        </div>
        <div>
          <label>确认新密码</label>
          <span>
            <input v-model="pnew_confirm" />
          </span>
        </div>
      </div>
      <footer>
        <span @click="VerifyForm">确定</span>
        <span @click="()=>{$parent.showPassport = false}">取消</span>
      </footer>
    </div>
  </div>
</template>

<script>
import { auth_verify, passport_update } from "@/api/beans/auth";
export default {
  name: "passport",
  data() {
    return {
      au_username: undefined,
      p: "",
      p_tip: undefined,
      pnew: "",
      pnew_tip: undefined,
      pnew_confirm: ""
    };
  },
  created() {
    this.au_username = window.user.au_username;
  },
  methods: {
    /**
     * 验证表单
     */
    async VerifyForm() {
      this.p_tip = "";
      this.pnew_tip = "";
      //    清空提示后,验证表单
      const { au_username, p, pnew, pnew_confirm } = this;
      const ptip = [];
      const newtip = [];
      //  原密码长度
      !p && ptip.push("请输入原密码");
      //  新密码长度
      (pnew.length < 6 || pnew.length > 15) &&
        newtip.push("密码长度在6位至14位之间");
      //  密码二次确认
      pnew !== pnew_confirm && newtip.push("两次新密码不一致");
      //  新旧密码
      pnew === p && newtip.push("新旧密码不可相同");
      ptip.length && (this.p_tip = ptip[0]);
      newtip.length && (this.pnew_tip = newtip[0]);
      if (ptip.length || newtip.length) return;
      //    表单验证通过后,验证原密码正确性
      const isCurrent = await auth_verify(au_username, p);
      !isCurrent && ptip.push("原密码错误");
      ptip.length && (this.p_tip = ptip[0]);
      //    原密码验证正确后,修改密码
      !ptip.length && !newtip.length && (await this.updatePassport(pnew));
    },
    /**
     * 更新密码
     * @param {*} pnew  新密码
     */
    async updatePassport(pnew) {
      const { au_userid } = window.user;
      await passport_update(pnew, au_userid);
      window.alert("密码修改成功!");
      this.$parent.showPassport = false;
    }
  }
};
</script>

<style scoped lang="less">
.passport {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  font-size: 16px;

  .passport_frame {
    width: 340px;
    height: auto;
    padding: 8px 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    background: linear-gradient(180deg, #2157a5, #4065a0);
    border-radius: 4px;
    border: 1px #978aff solid;
    header {
      height: 36px;
      line-height: 30px;
      text-align: center;
      color: #32f1fe;
      font-size: 18px;
      .iconfont {
        position: absolute;
        right: 10px;
        font-size: 24px;
        cursor: pointer;
      }
    }
    footer {
      height: 44px;
      padding: 5px;
      span {
        display: inline-block;
        width: 88px;
        height: 30px;
        background: #3b74fd;
        border-radius: 4px;
        font-weight: 500;
        color: #ffffff;
        line-height: 30px;
        cursor: pointer;
      }
      span:first-child {
        margin-right: 14px;
      }
    }
    .passport_container {
      > div {
        display: flex;
        min-height: 50px;
        > * {
          display: line-block;
          vertical-align: top;
          line-height: 50px;
        }
        > label {
          width: 100px;
          text-align: left;
        }
        > span {
          flex: 1;
          text-align: left;
          input {
            height: 26px;
            outline: none;
            box-sizing: border-box;
            padding-left: 10px;
          }
          p {
            line-height: 20px;
            color: #ff3c3c;
          }
        }
      }
    }
  }
}
</style>