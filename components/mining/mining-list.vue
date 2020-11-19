<template>
  <div class="mining-list">
    <div
      class="mining-list-item"
      v-for="(item, index) in miningList"
      :key="index"
    >
      <div class="list-item-title">
        <img :src="require(`~/assets/img/icon/${item.name}@2x.png`)" alt="" />
        <span>{{ item.name }}</span>
      </div>
      <!-- <div class="list-item-content">
        <p>
          <span>Total value locked</span><span>{{ item.lpt }} </span>
        </p>
        <p>
          <span>{{ item.name }} be protected</span
          ><span>{{ item.protected }} ETH</span>
        </p>
      </div> -->
      <div class="list-item-btn">
        <nuxt-link
          :to="{
            name: 'mining-id',
            params: {
              id: item.name.toLowerCase(),
              list: miningList,
            },
          }"
        >
          Select
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { totalSupply, balanceOf } from '~/interface/deposite';
import { fixD, addCommom, autoRounding, toRounding } from '~/assets/js/util.js';
import { getAddress, getContract } from '~/assets/utils/address-pool.js';
export default {
  name: 'mining-list',
  data() {
    return {
      miningList: [
        { name: 'ETH-DAI', lpt: 0, protected: 0 },
        { name: 'ETH-USDT', lpt: 0, protected: 0 },
        { name: 'ETH-USDC', lpt: 0, protected: 0 },
        { name: 'ETH-WBTC', lpt: 0, protected: 0 },
      ],
      allLPT: '',
      TotalValueLocked: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.getAllData();
    }, 1000);
  },
  methods: {
    async getAllData() {
      const charID = window.chainID;

      //LPT 总量
      let DOUBLEPOOL1 = await totalSupply('ETH_DAI');
      let DOUBLEPOOL2 = await totalSupply('ETH_USDT');
      let DOUBLEPOOL3 = await totalSupply('ETH_USDC');
      let DOUBLEPOOL4 = await totalSupply('ETH_WBTC');
      console.log(DOUBLEPOOL1, DOUBLEPOOL2);
      //ETH-DAI质押总量
      let ETH_DAI = await totalSupply('ETH_DAI_LPT');
      this.miningList[0].lpt = addCommom(ETH_DAI, 2);
      // ETH_DAI_LPT 包含的WETH
      let DAIAdress = getContract('ETH_DAI_LPT', charID);
      let WETHDAI = await balanceOf('WETH', DAIAdress);
      this.miningList[0].protected = addCommom(
        (WETHDAI * DOUBLEPOOL1) / ETH_DAI,
        2
      );
      //ETH_USDT质押总量
      let ETH_USDT = await totalSupply('ETH_USDT_LPT');
      this.miningList[1].lpt = addCommom(ETH_USDT, 2);
      // ETH_DAI_LPT 包含的WETH
      let USDTAdress = getContract('ETH_USDT_LPT', charID);
      let WETHUSDT = await balanceOf('WETH', USDTAdress);
      this.miningList[1].protected = addCommom(
        (WETHUSDT * DOUBLEPOOL2) / ETH_USDT,
        2
      );
      //ETH_USDC质押总量
      let ETH_USDC = await totalSupply('ETH_USDC_LPT');
      this.miningList[2].lpt = addCommom(ETH_USDC, 2);
      // ETH_USDC_LPT 包含的WETH
      let USDCAdress = getContract('ETH_USDC_LPT', charID);
      let WETHUSDC = await balanceOf('WETH', USDCAdress);
      this.miningList[2].protected = addCommom(
        (WETHUSDC * DOUBLEPOOL3) / ETH_USDC,
        2
      );
      //ETH-DAI质押总量
      let ETH_WBTC = await totalSupply('ETH_WBTC_LPT');
      this.miningList[3].lpt = addCommom(ETH_WBTC, 2);
      // ETH_WBTC_LPT 包含的WETH
      let WBTCAdress = getContract('ETH_WBTC_LPT', charID);
      let WETHWBTC = await balanceOf('WETH', WBTCAdress);
      this.miningList[3].protected = addCommom(
        (WETHWBTC * DOUBLEPOOL4) / ETH_WBTC,
        2
      );
    },
  },
};
</script>

<style lang='scss' soped>
@import '~/assets/css/base.scss';

@media screen and (min-width: 750px) {
  .mining-list {
    display: flex;
    justify-content: space-between;
    .mining-list-item {
      min-width: 280px;
      // height: 244px;
      width: 23.5%;
      background: #232323;
      border-radius: 4px;
      padding: 20px 16px;
      .list-item-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 48px;
          height: 48px;
          margin-right: 8px;
        }
        span {
          margin-top: 20px;
          color: $text-t;
        }
      }
      .list-item-content {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        p {
          display: flex;
          flex-direction: column;
          span:nth-of-type(1) {
            font-size: 14px;
            color: $text-g;
          }
          span:nth-of-type(2) {
            margin-top: 8px;
            font-size: 16px;
            font-weight: bold;
            color: $text-t;
          }
        }
        p:nth-of-type(1) {
          width: 110px;
        }
        p:nth-of-type(2) {
          width: 137px;
          text-align: right;
        }
      }
      .list-item-btn {
        margin-top: 30px;
        display: flex;
        justify-content: center;
        a {
          padding: 7px 99px;
          background: $main-color;
          border-radius: 5px;
          font-weight: 500;
          color: #ffffff;
          &:hover {
            background: $main-hover;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .mining-list {
    padding-top: 10px;
    margin: 0px 14px;
    box-shadow: 0px -1px 0px 0px #1d1d1d;
    .mining-list-item {
      margin-top: 10px;
      // min-width: 290px;
      // height: 244px;
      width: 100%;
      background: #232323;
      border-radius: 4px;
      padding: 20px 16px;
      .list-item-title {
        display: flex;
        align-items: center;
        img {
          width: 48px;
          height: 48px;
          margin-right: 8px;
        }
        span {
          color: $text-t;
        }
      }
      .list-item-content {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        p {
          display: flex;
          flex-direction: column;
          span:nth-of-type(1) {
            font-size: 14px;
            color: $text-g;
          }
          span:nth-of-type(2) {
            margin-top: 8px;
            font-size: 16px;
            font-weight: bold;
            color: $text-t;
          }
        }
        p:nth-of-type(2) {
          text-align: right;
        }
      }
      .list-item-btn {
        margin-top: 30px;
        display: flex;
        justify-content: center;
        a {
          width: 100%;
          height: 36px;
          background: $main-color;
          border-radius: 5px;
          font-weight: 500;
          color: #ffffff;
          text-align: center;
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