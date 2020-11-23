<template>
  <div class="mining-list">
    <div
      class="mining-list-item"
      v-for="(item, index) in miningList"
      :key="index"
    >
      <div class="mining-list-left">
        <div class="list-item-title">
          <span>{{ item.name }}</span>
          <p>{{ item.name }} Lp token</p>
        </div>
        <div class="list-item-content">
          <p>{{ $t('Table.RewardsAvailable') }}：</p>
          <span>{{ item.lpt }}</span>
        </div>
        <!-- <p class="list-item-locked">
          {{ $t('Table.Locked', { type: item.name }) }}:{{ item.lpt }}
        </p> -->
        <p class="list-item-time">
          {{ moment(item.lastTime * 1).format('MMM Do HH:mm') }}
        </p>
      </div>
      <div class="mining-list-right">
        <div class="mined">
          <div class="mining-list-stake">
            <div class="list-item-title">
              <span>{{ $t('Table.Minted') }}</span>
            </div>
            <div class="list-item-content">
              <p>PAYA</p>
              <span>{{ item.paya }}</span>
            </div>
            <div class="list-item-btn">
              <button
                class="red"
                @click="toDeposite(item, index)"
                :class="StakeIndex == index && depositeLoading ? 'loading' : ''"
              >
                <img
                  src="~/assets/img/loading.gif"
                  v-if="StakeIndex == index && depositeLoading"
                />
                Stake Tokens
              </button>
              <button
                class="line"
                :class="claimloading && claimIndex == index ? 'loading' : ''"
                @click="toClaim(item, index)"
              >
                <img
                  src="~/assets/img/loading.gif"
                  v-if="claimloading && claimIndex == index"
                />
                {{ $t('Table.Claim') }}
              </button>
            </div>
          </div>
          <i class="cut_line"></i>
          <div class="mining-list-unstake">
            <div class="list-item-title">
              <span>{{ $t('Table.CurrentlyStaked') }}</span>
            </div>
            <div class="list-item-content">
              <p>{{ item.name }} LP tokens</p>
              <span>{{ item.lptoken }}</span>
            </div>
            <div class="list-item-btn">
              <button
                class="red"
                @click="toWithdraw(item, index)"
                :class="
                  withdrawLoading && UnStakeIndex == index ? 'loading' : ''
                "
              >
                <img
                  src="~/assets/img/loading.gif"
                  v-if="withdrawLoading && UnStakeIndex == index"
                />
                Unstake Tokens
              </button>
              <button
                class="line"
                :class="
                  unclaimloading && unclaimIndex == index ? 'loading' : ''
                "
              >
                <img
                  src="~/assets/img/loading.gif"
                  v-if="unclaimloading && unclaimIndex == index"
                />
                Claim&Unstake
              </button>
            </div>
          </div>
        </div>
        <Protect>
          {{ $t('Table.Protected', { num: item.protected }) }}
        </Protect>
      </div>
    </div>
  </div>
</template>

<script>
import {
  totalSupply,
  balanceOf,
  getLPTOKEN,
  CangetPAYA,
  getPAYA,
  getLastTime,
} from '~/interface/deposite';
import { fixD, addCommom, autoRounding, toRounding } from '~/assets/js/util.js';
import { getAddress, getContract } from '~/assets/utils/address-pool.js';
import moment from 'moment';
import Protect from './protect';
export default {
  name: 'mining-list',
  components: { Protect },
  data() {
    return {
      miningList: [
        {
          name: 'ETH-DAI',
          lpt: 0,
          protected: 0,
          lptoken: 0,
          paya: 0,
          lastTime: 0,
        },
        {
          name: 'ETH-USDT',
          lpt: 0,
          protected: 0,
          lptoken: 0,
          paya: 0,
          lastTime: 0,
        },
        {
          name: 'ETH-USDC',
          lpt: 0,
          protected: 0,
          lptoken: 0,
          paya: 0,
          lastTime: 0,
        },
        {
          name: 'ETH-WBTC',
          lpt: 0,
          protected: 0,
          lptoken: 0,
          paya: 0,
          lastTime: 0,
        },
      ],
      moment: moment,
      allLPT: '',
      TotalValueLocked: 0,
      claimloading: false,
      unclaimloading: false,
      depositeLoading: false,
      withdrawLoading: false,
      current: '',
      curStake: '',
      curUnStake: '',
      claimIndex: '',
      unclaimIndex: '',
      StakeIndex: '',
      UnStakeIndex: '',
    };
  },
  watch: {
    miningList: {
      handler: 'miningListWatch',
      immediate: true,
    },
  },
  mounted() {
    setTimeout(() => {
      this.getAllData();
    }, 1000);
    this.$bus.$on('DEPOSITE_LOADING', (data) => {
      let current = this.curStake.replace('-', '_');
      if (data.type == current && data.status) {
        this.depositeLoading = true;
      } else {
        this.depositeLoading = false;
        this.StakeIndex = '';
      }
    });
    this.$bus.$on('WITHDRAW_LOADING', (data) => {
      let current = this.curUnStake.replace('-', '_');
      if (data.type == current && data.status) {
        this.withdrawLoading = true;
      } else {
        this.withdrawLoading = false;
        this.UnStakeIndex = '';
      }
    });
    this.$bus.$on('CLAIM_LOADING', (data) => {
      this.claimloading = false;
    });
    this.$bus.$on('REFRESH_MINING', (data) => {
      this.getAllData();
    });
  },
  methods: {
    miningListWatch(newValue) {
      if (newValue) {
        this.miningList = newValue;
      }
    },
    async getAllData() {
      for (let i = 0; i < 4; i++) {
        const charID = window.chainID;
        let type = this.miningList[i].name.replace('-', '_');
        let typeLPT = type + '_LPT';
        let PoolAdress = getContract(type, charID);
        let LptAdress = getContract(typeLPT, charID);
        if (PoolAdress && LptAdress) {
          // 获取时间
          let time = await getLastTime(type);
          this.miningList[i].lastTime = time;
          // 获取待领取paya
          let paya = await CangetPAYA(type);
          this.miningList[i].paya = addCommom(paya, 8);
          // 获取Lp-Tokens
          let lpTokens = await getLPTOKEN(type);
          this.miningList[i].lptoken = addCommom(lpTokens, 8);
          //获取当前池子的总量
          let DOUBLEPOOL = await totalSupply(type);
          //获取当前LPT的总量
          let ETH_COIN = await totalSupply(typeLPT);
          this.miningList[i].lpt = addCommom(ETH_COIN, 2);
          // 计算当前保护的WETH
          let WETHCOIN = await balanceOf('WETH', LptAdress);
          this.miningList[i].protected = addCommom(
            (WETHCOIN * DOUBLEPOOL) / ETH_COIN,
            2
          );
        } else {
          this.miningList[i].paya = 0;
          this.miningList[i].lptoken = 0;
          this.miningList[i].lpt = 0;
          this.miningList[i].protected = 0;
        }
      }
    },
    // 结算Paya
    async toClaim(item, index) {
      this.claimloading = true;
      this.claimIndex = index;
      this.current = item.name;
      let type = item.name.replace('-', '_');
      let res = await getPAYA(type);
    },
    toDeposite(item, index) {
      this.curStake = item.name;
      this.StakeIndex = index;
      this.$bus.$emit('OPEN_DEPOSITE', { current: item.name });
    },
    toWithdraw(item, index) {
      this.curUnStake = item.name;
      this.UnStakeIndex = index;
      this.$bus.$emit('OPEN_WITHDRAW', { current: item.name });
    },
  },
};
</script>

<style lang='scss' soped>
@import '~/assets/css/base.scss';
.loading {
  pointer-events: none;
  img {
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }
}
@media screen and (min-width: 750px) {
  .cut_line {
    margin: 40px 0 0 0;
    width: 1px;
    border-left: 1px dashed #2f2f2f;
    display: block;
  }
  .mining-list {
    width: 1100px;
    margin: 44px auto 0;
    display: flex;
    flex-direction: column;
    .mining-list-item {
      width: 100%;
      display: flex;
      background: $bg-f;
      height: 280px;
      margin-bottom: 10px;
    }
    .mining-list-left {
      width: 360px;
      background-image: url('../../assets/img/miningbg.png');
      background-repeat: no-repeat;
      background-size: cover;
      padding: 40px 0;
      .list-item-title {
        text-align: center;
        span {
          font-size: 24px;
          font-weight: 500;
          color: $text-m;
          line-height: 33px;
        }
        p {
          margin-top: 10px;
        }
      }
      .list-item-content {
        margin-top: 20px;
        text-align: center;
        p {
          font-size: 14px;
          font-weight: 400;
          color: #be3a3b;
          line-height: 20px;
        }
        span {
          font-size: 40px;
          font-weight: 500;
          color: $text-t;
          line-height: 60px;
        }
      }
      .list-item-locked {
        margin-top: 15px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #acacac;
      }
      .list-item-time {
        margin-top: 15px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #acacac;
      }
    }
    .mining-list-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      .mined {
        text-align: center;
        display: flex;
        padding: 40px 0 0 0;
        > div {
          flex: 1;
          padding: 0 50px;
        }
        .list-item-title {
          font-size: 18px;
          color: $text-t;
          line-height: 20px;
        }
        .list-item-content {
          margin-top: 25px;
          p {
            font-size: 12px;
            color: #acacac;
            line-height: 12px;
          }
          span {
            display: block;
            margin-top: 8px;
            font-size: 18px;
            font-weight: bold;
            color: $text-t;
          }
        }
        .list-item-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .red {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 120px;
            height: 36px;
            background: $main-color;
            border-radius: 5px;
            color: #fff;
            margin-top: 20px;
            padding: 0 15px;
            &:hover {
              background: $main-hover;
            }
          }
          .line {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 120px;
            height: 36px;
            border-radius: 5px;
            border: 1px solid $main-color;
            color: $main-color;
            background: transparent;
            margin-top: 20px;
            padding: 0 15px;
            &:hover {
              border-color: $main-hover;
              color: $main-hover;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .mining-list {
    padding-top: 10px;
    box-shadow: 0px -1px 0px 0px #1d1d1d;
    .mining-list-item {
      margin-top: 10px;
      width: 100%;
      background: #232323;
      border-radius: 4px;
    }
    .mining-list-left {
      padding-top: 20px;
      width: 100%;
      height: 268px;
      background-image: url('../../assets/img/miningbg_h5.png');
      background-repeat: no-repeat;
      background-size: cover;
      text-align: center;
      .list-item-title {
        span {
          font-size: 24px;
          font-weight: 500;
          color: #ffffff;
        }
        p {
          margin-top: 8px;
          font-size: 16px;
          color: #dbdbdb;
          line-height: 22px;
        }
      }
      .list-item-content {
        margin-top: 30px;
        p {
          font-size: 14px;
          color: #be3a3b;
          line-height: 20px;
        }
        span {
          margin-top: 8px;
          font-size: 40px;
          font-weight: 500;
          color: #dbdbdb;
        }
      }
      .list-item-locked {
        margin-top: 20px;
        margin-bottom: 12px;
      }
      p {
        font-size: 12px;
        font-weight: 400;
        color: #acacac;
      }
    }
    .mining-list-right {
      display: flex;
      flex-direction: column;
      .cut_line {
        width: 1px;
        border-left: 1px dashed #2f2f2f;
        display: block;
      }
      .mined {
        display: flex;
        margin-top: 27px;
        > div {
          flex: 1;
          text-align: center;
          .list-item-title {
            span {
              font-size: 16px;
              color: #dbdbdb;
              line-height: 20px;
            }
          }
          .list-item-content {
            margin-top: 20px;
            p {
              font-size: 12px;
              color: #acacac;
            }
            span {
              display: block;
              margin-top: 8px;
              font-size: 18px;
              font-weight: bold;
              color: #dbdbdb;
            }
          }
          .list-item-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            .red {
              display: flex;
              align-items: center;
              justify-content: center;
              min-width: 120px;
              height: 36px;
              background: $main-color;
              border-radius: 5px;
              color: #fff;
              margin-top: 20px;
              padding: 0 15px;
              &:hover {
                background: $main-hover;
              }
            }
            .line {
              display: flex;
              align-items: center;
              justify-content: center;
              min-width: 120px;
              height: 36px;
              border-radius: 5px;
              border: 1px solid $main-color;
              color: $main-color;
              background: transparent;
              margin-top: 20px;
              padding: 0 15px;
              &:hover {
                border-color: $main-hover;
                color: $main-hover;
              }
            }
          }
        }
      }
    }
  }
}
</style>