<template>
  <div :class="`mining-protect ${styleClass}`">
    <img src="~/assets/img/icon/mining_safe.png" alt="" />
    <div class="text_pc">
      <!-- <p>{{ current }} Mining Pool</p> -->
      <p><slot></slot></p>
    </div>
    <span class="text_pc_btn" @click="toBorrowed">Borrowed</span>
    <div class="text_h5">
      <!-- <p>{{ current }} Mining Pool</p> -->

      <p><slot></slot><span class="text_h5_btn" @click="toBorrowed">Borrowed</span></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["styleClass", "current"],
  methods: {
   toBorrowed(){
     this.$router.push('/')
   }
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .mining-home {
    padding: 18px 67px 18px 20px;
    background-color: $text-b2;
    margin-top: 36px;
  }
  .mining-token {
    background: #191919;
    padding: 18px 30px 18px 30px;
    margin-top: 20px;
  }
  .mining-protect {
    width: 100%;
    height: 94px;
    display: flex;
    align-items: center;
    img {
      width: 73px;
      height: 56px;
      margin-right: 16px;
    }
    .text_h5 {
      display: none;
    }
    .text_pc {
      flex: 1;
      p {
        font-size: 16px;
        color: #dbdbdb;
      }
      p:nth-of-type(1) {
      }
      p:nth-of-type(2) {
        margin-top: 8px;
      }
    }
    .text_pc_btn {
      font-size: 14px;
      font-weight: 400;
      color: $text-l;
      &:hover {
        color: #c34b4c;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .mining-home {
    padding: 0 21px;
    background-color: $text-b2;
    margin: 12px 14px 0;
  }
  .mining-token {
    background: #191919;
    padding: 21px 8px;
    margin: 0 16px;
  }
  .mining-protect {
    height: 92px;
    display: flex;
    align-items: center;
    img {
      width: 58px;
      height: 45px;
      margin-right: 4px;
    }
    .text_pc {
      display: none;
    }
    .text_pc_btn {
      display: none;
    }
    .text_h5 {
      flex: 1;
      p {
        color: #dbdbdb;
      }
      p:nth-of-type(1) {
        font-size: 14px;
      }
      p:nth-of-type(2) {
        display: flex;
        justify-content: space-between;
        margin-top: 4px;
        font-size: 12px;
        span {
          font-size: 12px;
          margin-right: 20px;
        }
      }
    }
    .text_h5_btn {
      font-size: 14px;
      font-weight: 400;
      color: #be3a3b;
    }
  }
}
</style>