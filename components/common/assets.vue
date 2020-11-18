<template>
  <div class="my-assets">
    <div class="name">
      <img src="~/assets/img/icon/assetsIcon.png" alt="" />
      <div class="hover-box">
        <span>{{ addCommom(myPaya, 2) }} Paya</span>
        <img src="~/assets/img/icon/icon_minor_select@2x.png" alt="" />
        <div class="hint-box">
          <p class="hint-title">My PAYA</p>
          <div class="hint-settle">
            <p class="assets-total">
              <span></span>
              <span>{{ addCommom(myPaya, 2) }}</span>
            </p>
            <div class="assets-claim">
              <!-- <p><span>钱包余额</span><span>1,000</span></p> -->
              <p>
                <span>Minted</span><span>{{ addCommom(payaSettle, 2) }}</span>
              </p>
              <a @click="toClaim()">Claim</a>
            </div>
          </div>
          <div class="hint-content">
            <p>
              <span>Circulation</span
              ><span>{{
                addCommom(precision.minus(totalPaya, mined), 2)
              }}</span>
            </p>
            <p>
              <span>Valid borrowing</span
              ><span>{{ addCommom(frequency, 2) }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { claim } from '~/interface/order.js';
import precision from '~/assets/js/precision.js';
import { fixD, addCommom, autoRounding, toRounding } from '~/assets/js/util.js';

export default {
  data() {
    return {
      precision: precision,
      fixD: fixD,
      addCommom: addCommom,
    };
  },
  computed: {
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
    this.getAssets();
    this.$bus.$on('REFRESH_ASSETS', (data) => {
      this.getAssets();
    });
  },
  watch: {
    assets: {
      handler: 'assetsWatch',
      immediate: true,
    },
  },
  methods: {
    assetsWatch(newValue) {
      if (!newValue) {
        this.getAssets();
      }
    },
    async getAssets() {
      setTimeout(() => {
        this.$store.dispatch('getValidBorrowing');
        this.$store.dispatch('getTotalPaya');
        this.$store.dispatch('getTotalMined');
        this.$store.dispatch('getMyPayaso');
        this.$store.dispatch('getPayaSettle');
      }, 1000);
    },
    async toClaim() {
      let res = await claim();
    },
  },
};
</script>

<style lang='scss' scoped>
@import '~/assets/css/base.scss';
@media screen and (max-width: 750px) {
  .my-assets {
    display: none;
  }
}
@media screen and (min-width: 750px) {
  .my-assets {
    .name {
      display: flex;
      align-items: center;
      > img {
        width: 24px;
        height: 24px;
      }
      > .hover-box {
        height: 60px;
        cursor: pointer;
        display: flex;
        align-items: center;
        position: relative;
        span {
          margin: 0 4px;
          font-size: 16px;
          color: #ffffff;
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .hint-box {
      display: none;
      width: 312px;
      height: 220px;
      background: #232323;
      position: absolute;
      border-radius: 5px;
      right: 0;
      top: 50px;
      z-index: 100;
      .hint-title {
        line-height: 40px;
        height: 40px;
        box-shadow: 0px 1px 0px 0px #2f2f2f;
        font-size: 14px;
        color: $text-g;
        text-align: left;
        padding: 0 16px;
      }
      .hint-settle {
        margin: 0 12px 0 20px;
        height: 113px;
        box-shadow: 0px 1px 0px 0px #2f2f2f;
        .assets-total {
          display: flex;
          flex-direction: column;
          text-align: left;
          span:nth-of-type(1) {
            font-size: 12px;
            color: $text-g;
            margin: 12px 0 3px;
          }
          span:nth-of-type(2) {
            font-size: 18px;
            color: $text-t;
          }
        }
      }
      .assets-claim {
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          display: flex;
          flex-direction: column;
          span {
            text-align: left;
          }
          span:nth-of-type(1) {
            font-size: 12px;
            color: $text-g;
          }
          span:nth-of-type(2) {
            margin-top: 4px;
            font-size: 12px;
            color: $text-t;
          }
        }
        a {
          padding: 4px 8px;
          background: $main-color;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 500;

          &:hover {
            background: $main-hover;
          }
        }
      }
      .hint-content {
        p {
          display: flex;
          justify-content: space-between;
          padding: 0 12px 0 20px;
          margin-top: 10px;
          span {
            font-size: 12px;
          }
          span:nth-of-type(1) {
            color: $text-g;
          }
          span:nth-of-type(2) {
            color: $text-t;
          }
        }
      }
    }
  }
  .hover-box:hover {
    img {
      transform: rotate(180deg);
    }
    .hint-box {
      display: block;
    }
  }
}
</style>