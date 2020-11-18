<template>
  <div class="token-wrap">
    <div class="wrap-title">
      <span>{{ current }} LP token</span>
      <p>
        Deposite ETH-USDT LP Token to mint PAYA
        <a>Read more about PAYA mining</a>
      </p>
    </div>
    <Protect :styleClass="'mining-token'">1,00,986 ETH be protected</Protect>
    <div class="wrap-text">
      <p>
        <span>{{ current }} LP tokens Total Value Locked</span
        ><span>23,100,000</span>
      </p>
      <p>
        <span>{{ current }} Long tokens Total Value Locked</span
        ><span>23,100,000</span>
      </p>
      <p>
        <Tooltip
          name="APY"
          width="300px"
          hint="This is the cost of the insurance claim that the policyholder receives for each bond pledged after the execution of the release operation. "
        ></Tooltip
        ><span>230.16%</span>
      </p>
    </div>
    <div class="wrap-list">
      <div class="wrap-list-item">
        <span>Minted</span>
        <p><span>PAYA Minted</span><span>1,000</span></p>
        <a @click="toDeposite">Deposite ETH-USDT LP tokens</a>
      </div>
      <div class="wrap-list-item">
        <span>Minted</span>
        <p><span>PAYA Minted</span><span>1,000</span></p>
        <a @click="toWithdraw">Withdraw ETH-USDT LP tokens</a>
      </div>
    </div>
  </div>
</template>

<script>
import Protect from './protect.vue';
import Tooltip from '~/components/common/tooltip.vue';
export default {
  props: ['current'],
  components: { Protect, Tooltip },
  methods: {
    toDeposite() {
      this.$bus.$emit('OPEN_DEPOSITE', (data) => {
        this.showDeposite = true;
      });
    },
    toWithdraw() {
      this.$bus.$emit('OPEN_WITHDRAW', (data) => {
        this.showWithdraw = true;
      });
    },
  },
};
</script>

<style lang='scss' scoped>
@import '~/assets/css/base.scss';
@media screen and (min-width: 750px) {
  .token-wrap {
    width: 1200px;
    background: $bg-f;
    border-radius: 3px;
    padding: 40px 220px 0;
    height: 763px;
    .wrap-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        font-size: 30px;
        color: $bg-w;
        margin-top: 18px;
      }
      p {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: $text-g;
        a {
          color: #be3a3b;
        }
      }
    }
    .wrap-text {
      display: flex;
      margin-top: 30px;
      p {
        flex: 1;
        display: flex;
        flex-direction: column;
        span {
          font-size: 18px;
          font-weight: bold;
          color: $text-t;
        }
        &:nth-of-type(1) {
          span:nth-of-type(1) {
            font-size: 14px;
            color: $text-g;
            font-weight: normal;
            margin-bottom: 12px;
          }
        }
        &:nth-of-type(2) {
          text-align: center;
          span:nth-of-type(1) {
            font-size: 14px;
            color: $text-g;
            font-weight: normal;
            margin-bottom: 12px;
          }
        }
        &:nth-of-type(3) {
          align-items: flex-end;
          .tooltip {
            font-size: 14px;
            color: $text-g;
            margin-bottom: 12px;
          }
        }
      }
    }
    .wrap-list {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      .wrap-list-item {
        padding: 50px 0 60px;
        width: 360px;
        height: 296px;
        background: #232323;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          font-size: 16px;
          font-weight: 500;
          color: $text-t;
        }
        p {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          span:nth-of-type(1) {
            font-size: 14px;
            color: $text-g;
          }
          span:nth-of-type(2) {
            margin-top: 4px;
            font-size: 16px;
            font-weight: bold;
            color: $text-t;
          }
        }
        a {
          margin-top: 40px;
          padding: 9px 25px;
          background: $main-color;
          border-radius: 5px;
          &:hover {
            background: $main-hover;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .token-wrap {
    width: 100%;
    border-radius: 3px;
    .wrap-title {
      height: 165px;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        color: $bg-w;
        margin: 47px 0 12px;
        font-size: 24px;
        font-weight: 500;
      }
      p {
        text-align: center;
        width: 300px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: $text-g;
        a {
          color: #be3a3b;
        }
      }
    }
    .wrap-text {
      padding: 0 16px;
      margin-top: 30px;
      p {
        display: flex;
        flex-direction: column;
        margin-top: 24px;
        span {
          font-size: 18px;
          font-weight: bold;
          color: $text-t;
        }
        &:nth-of-type(1) {
          span:nth-of-type(1) {
            font-size: 14px;
            color: $text-g;
            font-weight: normal;
            margin-bottom: 12px;
          }
        }
        &:nth-of-type(2) {
          span:nth-of-type(1) {
            font-size: 14px;
            color: $text-g;
            font-weight: normal;
            margin-bottom: 12px;
          }
        }
        &:nth-of-type(3) {
          .tooltip {
            font-size: 14px;
            color: $text-g;
            margin-bottom: 12px;
          }
        }
      }
    }
    .wrap-list {
      padding: 0 16px;
      margin-top: 40px;
      .wrap-list-item {
        padding: 30px 16px 30px 16px;
        margin-bottom: 10px;
        width: 100%;
        background: #232323;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          font-size: 16px;
          font-weight: 500;
          color: $text-t;
        }
        p {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          span:nth-of-type(1) {
            font-size: 14px;
            color: $text-g;
          }
          span:nth-of-type(2) {
            margin-top: 4px;
            font-size: 16px;
            font-weight: bold;
            color: $text-t;
          }
        }
        a {
          width: 100%;
          margin-top: 40px;
          background: $main-color;
          border-radius: 5px;
          text-align: center;
          height: 36px;
          line-height: 36px;
          &:hover {
            background: $main-hover;
          }
        }
      }
    }
  }
}
</style>