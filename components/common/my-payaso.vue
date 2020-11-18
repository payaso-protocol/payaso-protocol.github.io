<template>
  <div class="my-payaso" v-if="showPayaso">
    <Header></Header>
    <div class="payaso-title">My PAYA</div>
    <div class="payaso-settle">
      <div class="assets">
        <p>
          <span>PayaAmount</span><span>{{ addCommom(myPaya, 2) }}</span>
        </p>
        <p>
          <span>Minted</span><span>{{ addCommom(payaSettle, 2) }}</span>
        </p>
      </div>
      <a @click="toClaim">Claim</a>
    </div>
    <div class="payaso-assets">
      <p>
        <span>Circulation</span
        ><span>{{ addCommom(precision.minus(totalPaya, mined), 2) }}</span>
      </p>
      <p>
        <span>Valid borrowing</span><span>{{ addCommom(frequency, 2) }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Header from '~/components/common/header.vue';
import { claim } from '~/interface/order.js';
import { fixD, addCommom, autoRounding, toRounding } from '~/assets/js/util.js';
import precision from '~/assets/js/precision.js';
export default {
  data() {
    return {
      precision: precision,
      addCommom: addCommom,
    };
  },
  components: {
    Header,
  },
  computed: {
    showPayaso() {
      return this.$store.state.showDialog.showPayaso;
    },
    frequency() {
      return this.$store.state.assets.validBorrowing;
    },
    mined() {
      return this.$store.state.assets.mined;
    },
    totalPaya() {
      return this.$store.state.assets.totalPaya;
    },
    myPaya() {
      return this.$store.state.assets.myPaya;
    },
    payaSettle() {
      return this.$store.state.assets.payaSettle;
    },
    assets() {
      return this.$store.state.assets;
    },
  },
  mounted() {
    // totalSupply();
    this.$bus.$on('REFRESH_ASSETS', (data) => {
      this.getAssets();
    });
  },
  methods: {
    async toClaim() {
      let res = await claim();
      this.$store.dispatch('setPayasoDialog', false);
    },
  },
};
</script>

<style lang='scss' soped>
@import '~/assets/css/base.scss';
.my-payaso {
  width: 100%;
  overflow: hidden;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #111111;
  .payaso-title {
    height: 60px;
    font-size: 16px;
    color: $text-t;
    line-height: 60px;
    margin: 15px 16px 0;
    box-shadow: 0px 1px 0px 0px #1d1d1d;
  }
  .payaso-settle {
    margin: 0 16px;
    padding: 12px 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    box-shadow: 0px 1px 0px 0px #1d1d1d;
    .assets {
      p {
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;
        span:nth-of-type(1) {
          font-size: 12px;
          color: $text-g;
          margin-bottom: 7px;
        }
      }
    }
    a {
      margin-top: 8px;
      padding: 4px 8px;
      font-size: 12px;
      font-weight: 500;
      background: #873232;
      border-radius: 5px;
      color: $text-m;
    }
  }
  .payaso-assets {
    padding: 4px 16px 0;
    p {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      span:nth-of-type(1) {
        font-size: 12px;
        color: $text-g;
      }
      span:nth-of-type(2) {
        font-size: 12px;
        color: $text-t;
      }
    }
  }
}
</style>