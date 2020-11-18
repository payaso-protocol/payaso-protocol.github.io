<template>
  <PDialog title="Deposite" @close="closeDeposite" :oCancel="true">
    <div class="depositeInput">
      <PInput
        type="number"
        v-model="DepositeNum"
        fix="2"
        :right="stringStr(current)"
        maxValue="10000"
      ></PInput>
    </div>
    <p class="total-token">
      <span>{{ current }} LP token：{{ 0 }}</span
      ><a>ALL</a>
    </p>
    <a class="to-gettoken">To Get LP token</a>
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
      DepositeNum: '',
    };
  },
  mounted() {},
  methods: {
    depositeCheck() {
      this.checked = !this.checked;
    },
    stringStr(str) {
      return str.substr('eth-usdt'.indexOf('-') + 1);
    },
    closeDeposite() {
      this.$emit('close');
    },
    submitSupply() {},
  },
};
</script>

<style lang='scss' scoped>
@import '~/assets/css/base.scss';
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
</style>