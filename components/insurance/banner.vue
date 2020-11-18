<template>
  <div class="insurance-banner">
    Rent Safety Helmet, Protect Your Assets Prices
  </div>
</template>
<script>
export default {
  name: "insurance-banner",
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .insurance-banner {
    width: 1200px;
    height: 180px;
    line-height: 180px;
    margin: 0 auto;
    background: url("../../assets/img/banner.png") right 36px no-repeat;
    background-size: auto 80%;
    font-size: 40px;
    color: $text-m;
  }
}
@media screen and (max-width: 750px) {
  .insurance-banner {
    display: flex;
    align-items: center;
    padding: 0 75px 0 16px;
    width: 100%;
    height: 180px;
    margin: 0 auto;
    background: url("../../assets/img/banner_h5.png") right no-repeat;
    background-size: auto 100%;
    font-size: 30px;
    color: $text-m;
  }
}
</style>