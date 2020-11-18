<template>
  <div class="mining_container">
    <Banner></Banner>
    <p class="mining-list-title">LP token 可抵押池</p>
    <MiningList></MiningList>
    <Protect :styleClass="'mining-home'"></Protect>
  </div>
</template>

<script>
import Banner from "~/components/mining/banner.vue";
import MiningList from "~/components/mining/mining-list.vue";
import Protect from "~/components/mining/protect.vue";
export default {
  components: {
    Banner,
    MiningList,
    Protect,
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";

@media screen and (min-width: 750px) {
  .mining-list-title {
    height: 60px;
    line-height: 60px;
  }
}
@media screen and (max-width: 750px) {
  .mining-list-title {
    font-size: 16px;
    color: $text-t;
    height: 60px;
    line-height: 60px;
    padding-left: 16px;
  }
}
</style>