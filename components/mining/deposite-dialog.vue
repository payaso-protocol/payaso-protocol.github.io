<template>
  <PDialog
    title="Deposite"
    @close="closeDeposite"
    :noCancel="true"
    @confirm="submitDeposite"
  >
    <div class="depositeInput">
      <PInput
        type="number"
        v-model="DepositeNum"
        fix="20"
        :right="'LP Token'"
        maxValue="10000"
      ></PInput>
    </div>
    <p class="total-token">
      <span>{{ current }} LP token：{{ lptBalance }}</span
      ><a @click="addAll">ALL</a>
    </p>
    <a
      v-if="current"
      class="to-gettoken"
      :href="`https://app.uniswap.org/#/add/ETH/${getAddress(
        current.split('-')[1]
      )}`"
      target="_blank"
      >To Get LP token</a
    >
    <div class="check">
      <img
        src="~/assets/img/icon/checked1.png"
        alt=""
        v-if="checked"
        @click="depositeCheck"
      />
      <img
        src="~/assets/img/icon/checked2.png"
        alt=""
        v-else
        @click="depositeCheck"
      />
      <p>Infinite Approval</p>
    </div>
  </PDialog>
</template>

<script>
import PDialog from "~/components/common/p-dialog.vue";
import PInput from "~/components/common/p-input.vue";
import { toDeposite, getMined, getLPTOKEN } from "~/interface/deposite";
import { getBalance } from "~/interface/deposite.js";
import { fixD, addCommom } from "~/assets/js/util.js";
import { getAddress } from "~/assets/utils/address-pool.js";

export default {
  props: ["current"],
  components: {
    PDialog,
    PInput,
  },
  data() {
    return {
      checked: false,
      DepositeNum: "",
      getAddress: getAddress,
      lptBalance: 0,
    };
  },
  watch: {
    current: {
      handler: "currentWatch",
      immediate: true,
    },
  },
  mounted() {
    setTimeout(() => {
      this.getBalance();
    }, 1000);
  },
  methods: {
    depositeCheck() {
      this.checked = !this.checked;
      if (this.checked) {
        window.localStorage.setItem("globalDeosite", true);
      }
    },
    closeDeposite() {
      this.$emit("close");
    },
    submitDeposite() {
      let type = this.current.replace("-", "_");
      toDeposite(type, { amount: this.DepositeNum }, (status) => {});
    },
    // 获取余额
    getBalance() {
      let coin = this.current.replace("-", "_") + "_LPT";
      getBalance(coin).then((res) => {
        this.lptBalance = fixD(res, 20);
      });
    },
    currentWatch(newValue) {
      if (newValue) {
        this.getBalance(newValue);
      }
    },
    addAll() {
      this.DepositeNum = this.lptBalance;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .depositeInput {
    margin-top: 44px;
  }
  .total-token {
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
    height: 20px;
    line-height: 20px;
    span {
      font-size: 12px;
      color: $text-g;
    }
    a {
      font-size: 12px;
      color: $text-l;
    }
  }
  .to-gettoken {
    margin-top: 4px;
    font-size: 12px;
    color: $text-l;
  }
  .check {
    margin-top: 26px;
    margin-bottom: 32px;
    display: flex;
    img {
      width: 16px;
      height: 16px;
      margin-right: 5px;
      cursor: pointer;
    }
    p {
      font-size: 12px;
      color: $text-t;
    }
  }
}
@media screen and (max-width: 750px) {
  .depositeInput {
    margin-top: 44px;
  }
  .total-token {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    height: 20px;
    line-height: 20px;
    span {
      font-size: 12px;
      color: $text-g;
    }
    a {
      font-size: 12px;
      color: $text-l;
    }
  }
  .to-gettoken {
    margin-top: 4px;
    font-size: 12px;
    color: $text-l;
  }
  .check {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    img {
      width: 16px;
      height: 16px;
      margin-right: 5px;
      cursor: pointer;
    }
    p {
      font-size: 12px;
      color: $text-t;
    }
  }
}
</style>