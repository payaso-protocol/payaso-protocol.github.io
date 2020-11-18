<template>
  <PDialog title="Withdraw" @close="closeWithdraw" :oCancel="true">
    <div class="withdrawInput">
      <PInput
        type="number"
        v-model="WithdrawNum"
        fix="2"
        :right="stringStr(current)"
        maxValue="10000"
      ></PInput>
    </div>
    <p class="total-token">
      <span>{{ 0 }} Available</span><a>ALL</a>
    </p>
    <div class="checkPer">
      <span
        v-for="item in perList"
        :key="item"
        @click="handleClickPer(item)"
        :class="curPer === item ? 'active' : ''"
        >{{ item }}%</span
      >
    </div>
    <div class="check">
      <img
        src="~/assets/img/icon/checked1.png"
        alt=""
        v-if="checked"
        @click="withdrawCheck"
      />
      <img
        src="~/assets/img/icon/checked2.png"
        alt=""
        v-else
        @click="withdrawCheck"
      />
      <p>Global.infinite Approval</p>
    </div>
  </PDialog>
</template>

<script>
import PDialog from '~/components/common/p-dialog.vue';
import PInput from '~/components/common/p-input.vue';
export default {
  props: ['current'],
  components: {
    PDialog,
    PInput,
  },
  data() {
    return {
      checked: false,
      WithdrawNum: '',
      perList: [25, 50, 75, 100],
      curPer: 100,
    };
  },
  mounted() {},
  methods: {
    handleClickPer(item) {
      console.log(item);
      this.curPer = item;
    },
    withdrawCheck() {
      this.checked = !this.checked;
    },
    stringStr(str) {
      return str.substr('eth-usdt'.indexOf('-') + 1).toUpperCase();
    },
    closeWithdraw() {
      this.$emit('close');
    },
    submitSupply() {},
  },
};
</script>

<style lang='scss' scoped>
@import '~/assets/css/base.scss';
@media screen and (min-width: 750px) {
  .withdrawInput {
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
  .checkPer {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 40px;
      border-radius: 3px;
      border: 1px solid #434343;
      font-size: 16px;
      color: $text-t;
      cursor: pointer;
    }
    .active {
      border: 2px solid #be3a3b;
    }
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
</style>