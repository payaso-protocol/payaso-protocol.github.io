<template>
  <div class="mining-list">
    <div
      class="mining-list-item"
      v-for="(item, index) in miningList"
      :key="index"
    >
      <div class="list-item-title">
        <img :src="require(`~/assets/img/icon/${item}@2x.png`)" alt="" />
        <span>{{ item }}</span>
      </div>
      <div class="list-item-content">
        <p><span>Total value locked</span><span>123,890 </span></p>
        <p>
          <span>{{ item }} be protected</span><span>1,987,986 ETH</span>
        </p>
      </div>
      <div class="list-item-btn">
        <nuxt-link :to="{ path: `/mining/${item.toLowerCase()}` }">
          Enter
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mining-list',
  data() {
    return {
      miningList: ['ETH-DAI', 'ETH-USDC', 'ETH-USDT', 'ETH-WBTC'],
    };
  },
  methods: {
    toMining(item, index) {},
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
      height: 244px;
      width: 23.5%;
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
      min-width: 290px;
      height: 244px;
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