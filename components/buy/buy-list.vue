<template>
  <div class="buy-list-container">
    <OrderOption @search="searchList"></OrderOption>
    <div class="expiration-reminder">
      You currently hold a Safety Helmet that is about to expire, please
      activate or return it in a timely manner. The smart contract will return
      it automatically when it expires!
    </div>
    <div class="buy-list-box">
      <!-- PC展示表格 -->
      <table class="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>
              <Tooltip
                name="Executive Price"
                width="300px"
                hint="This is after the helmet activation action, pay 1 ETH per activation to get an activation reward of 500 USDT."
              ></Tooltip>
            </th>
            <th>Amount</th>
            <th>
              <Tooltip
                name="Rent"
                width="200px"
                hint="Borrowing a Safety Helmet cap requires an immediate payment."
              ></Tooltip>
            </th>
            <!-- <th>Total Rents</th> -->
            <th>
              <Tooltip
                name="Due Date"
                width="200px"
                hint="Until the time you can pledge the underlying of the Safety Helmet for price protection."
              ></Tooltip>
            </th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <!-- Type -->
            <td>
              <div class="type-name">
                <img
                  :src="require(`~/assets/img/icon/${item._underlying}@2x.png`)"
                />
                <span>{{ item._underlying }}</span>
              </div>
            </td>
            <!-- Executive Price -->
            <td>
              {{ autoRounding(precision.divide(1, item._strikePrice)) }}
              {{ item._collateral }}
            </td>
            <!-- Amount -->
            <td>
              {{ toRounding(precision.times(item.vol, item._strikePrice), 2) }}
            </td>
            <!-- Rent -->
            <td>
              {{
                addCommom(precision.divide(item.price, item._strikePrice), 4)
              }}
            </td>
            <!-- Total Rents -->
            <!-- <td>
              {{ addCommom(precision.times(item.price, item.vol), 4) }}
              {{ item.settleToken }}
            </td> -->
            <!-- Due Date -->
            <td>
              {{
                item.status === "Inactivation"
                  ? formatExpiry(item._expiry)
                  : moment(parseInt(item._expiry)).format(
                      "MMMM Do YYYY, HH:mm:ss"
                    )
              }}
            </td>
            <!-- status -->
            <td>{{ item.status }}</td>
            <!-- options -->
            <td v-if="item.status === 'Inactivation'">
              <button @click="toActive(item)" :disabled="pendingObj[item.bidID]">
                <img src="~/assets/img/loading.gif" alt="" class="loading" v-if="pendingObj[item.bidID]"/>
                <span>Activate</span>
              </button>
              <button @click="openDestroyDialog(item)" :disabled="destroyPendingObj[item.bidID]">
                <img src="~/assets/img/loading.gif" alt="" class="loading" v-if="destroyPendingObj[item.bidID]"/>
                <span>Destroy</span>
              </button>
            </td>
            <td v-else></td>
          </tr>
        </tbody>
      </table>
      <!-- H5展示模块 -->
      <div class="tabs-item-box" v-for="(item, index) in list" :key="index">
        <div class="tabs-item-box-title">
          <img :src="require(`~/assets/img/${item._underlying}@2x.png`)" />
          <h3>{{ item._underlying }}</h3>
          <p>
            <i></i><span>{{ item.status }}</span>
          </p>
        </div>
        <div class="tabs-item-box-text">
          <p>
            <span>Executive Price</span>
            <span
              >{{ autoRounding(precision.divide(1, item._strikePrice)) }}
              {{ item._collateral }}
            </span>
          </p>
          <p>
            <span>Amount</span>
            <span>
              {{ toRounding(precision.times(item.vol, item._strikePrice), 2) }}
            </span>
          </p>
        </div>
        <div class="tabs-item-box-text">
          <p>
            <span>Rent</span>
            <span>
              {{
                addCommom(precision.divide(item.price, item._strikePrice), 4)
              }}
            </span>
          </p>
          <p>
            <span>Due Date</span>
            <span>
              {{
                item.status === "Inactivation"
                  ? formatExpiry(item._expiry)
                  : moment(parseInt(item._expiry)).format(
                      "MMMM Do YYYY, HH:mm:ss"
                    )
              }}
            </span>
          </p>
        </div>
        <div class="tabs-item-box-btn" v-if="item.status === 'Inactivation'">
          <p><a class="active" @click="toActive(item)">Activate</a></p>
          <!-- <p><a class="giveBack">归还</a></p> -->
        </div>
      </div>
    </div>
    <div class="loading" v-if="isLoading">
      <img src="~/assets/img/loading.gif" />
    </div>
    <NoData v-if="!isLoading && list.length < 1"></NoData>
    <div class="page" v-if="originList.length >= 10">
      <div :class="['pre', page === 1 ? 'disabled' : '']" @click="preFun"></div>
      <div
        :class="[
          'next',
          page === parseInt(originList.length / limit) + 1 ? 'disabled' : '',
        ]"
        @click="nextFun"
      ></div>
    </div>
    <Active v-if="showActive" :data="currentItem" @close="closeActive"></Active>
    <PDialog
      v-if="showDestroyDialog"
      title="Destroy the helmet"
      @close="closeDestroyDialog"
      @confirm="toDestroy"
    >
      <p class="cancel-dialog">You will not be able to reactivate helmet after it’s destroyed, are you sure you want to destroy it?</p>
    </PDialog>
  </div>
</template>
<script>
import OrderOption from "~/components/buy/order-option.vue";
import Tooltip from "~/components/common/tooltip.vue";
import NoData from "~/components/common/no-data";
import { toWei, fromWei } from "~/assets/utils/web3-fun.js";
import PDialog from "~/components/common/p-dialog.vue";
import {
  getID,
  newGetSymbol,
  getAddress,
} from "~/assets/utils/address-pool.js";
import { getExercise, onWaive, getWaive } from "~/interface/order.js";
import precision from "~/assets/js/precision.js";
import moment from "moment";
import Active from "./active.vue";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";

export default {
  name: "buy-list",
  components: {
    OrderOption,
    Tooltip,
    NoData,
    Active,
    PDialog
  },
  data() {
    return {
      originList: [],
      list: [],
      precision: precision,
      moment: moment,
      isLoading: true, // 加载中
      showActive: false,
      currentItem: {},
      currentDestroyItem: {},
      offset: 0,
      limit: 10,
      page: 1,
      addCommom: addCommom,
      autoRounding: autoRounding,
      toRounding: toRounding,
      pendingObj: {},
      destroyPendingObj: {},
      showDestroyDialog: false
    };
  },
  computed: {
    aboutInfoBuy() {
      return this.$store.state.aboutInfoBuy;
    },
    myAboutInfoBuy() {
      return this.$store.state.myAboutInfoBuy;
    },
  },
  watch: {
    myAboutInfoBuy: {
      handler: "myAboutInfoBuyWatch",
      immediate: true,
    },
  },
  methods: {
    preFun() {
      if (this.offset > 0) {
        this.offset = this.offset - this.limit;
        this.page = this.page - 1;
        this.searchList(this.searchItem);
      } else {
        this.offset = 0;
      }
    },
    nextFun() {
      const total = this.originList.length;
      if (this.offset < total) {
        this.offset = this.offset + this.limit;
        this.page = this.page + 1;
        this.searchList(this.searchItem);
      }
    },
    toActive(item) {
      this.currentItem = item;
      this.openActive();
    },
    openActive() {
      this.showActive = true;
    },
    closeActive() {
      this.showActive = false;
    },
    myAboutInfoBuyWatch(newValue) {
      if (newValue) {
        this.getBuyList(newValue);
      }
    },
    async getBuyList(list) {
      this.isLoading = true;
      const result = [];
      let item, _collateral, _underlying, settleToken;
      let current = new Date().getTime();
      let resultItem;
      let bidIDArr, waiveBidIDArr;
      for (let i = 0; i < list.length; i++) {
        item = list[i];
        _collateral = newGetSymbol(
          item.sellInfo.longInfo._collateral.toLowerCase(),
          window.chainID
        );
        _underlying = newGetSymbol(
          item.sellInfo.longInfo._underlying.toLowerCase(),
          window.chainID
        );
        settleToken = newGetSymbol(
          item.sellInfo.settleToken.toLowerCase(),
          window.chainID
        );

        resultItem = {
          bidID: item.bidID,
          askID: item.askID,
          buyer: item.buyer,
          vol: fromWei(item.vol, _collateral),
          amt: fromWei(item.amt),
          seller: item.sellInfo.seller,
          long: item.sellInfo.long,
          volume: fromWei(item.sellInfo.volume, _collateral),
          price: fromWei(item.sellInfo.price, _collateral),
          settleToken,
          creator: item.sellInfo.longInfo.creator,
          _collateral,
          _underlying,
          _strikePrice: fromWei(
            item.sellInfo.longInfo._strikePrice,
            _collateral
          ),
          _expiry: parseInt(item.sellInfo.longInfo._expiry) * 1000,
          short: item.sellInfo.longInfo.short,
          count: item.sellInfo.longInfo.count,
        };
        if (parseInt(resultItem._expiry) < current) {
          resultItem["status"] = "Closed"; // Dated 已过期
          resultItem["sort"] = 1;
        } else {
          resultItem["status"] = "Inactivation";
          resultItem["sort"] = 3;
        }
        let res = await getExercise(resultItem.buyer);
        bidIDArr = res.map((bitem) => {
          return bitem.returnValues.bidID;
        });
        if (bidIDArr.includes(resultItem.bidID)) {
          resultItem["status"] = "Exercised";
          resultItem["sort"] = 2;
        }
        let waiveRes = await getWaive(resultItem.buyer);
        waiveBidIDArr = waiveRes.map((witem) => {
          return witem.returnValues.bidID;
        });
        if (waiveBidIDArr.includes(resultItem.bidID)) {
          resultItem["status"] = "Waived";
          resultItem["sort"] = 0;
        }
        result.push(resultItem);
      }

      const sortResult = result.sort((a1, a2) => {
        return a2.sort - a1.sort;
      });

      this.isLoading = false;
      this.originList = sortResult || [];
      // this.list = sortResult || [];
      this.list = sortResult.slice(0, this.limit);
    },
    searchList(data) {
      if (!data) {
        this.list = this.originList.slice(this.offset, this.limit * this.page);
        return;
      }
      let item;
      const result = [];
      const now = new Date().getTime();
      let flag = false;
      for (let i = 0; i < this.originList.length; i++) {
        item = this.originList[i];
        // 时间筛选
        if (
          (data.period === 0 || parseInt(item._expiry) - now <= data.period) &&
          (data.type === "All" || item._underlying === data.type) &&
          (data.coin === "All" || item._collateral === data.coin) &&
          (data.status === "All" || item.status === data.status)
        ) {
          result.push(item);
        }
      }
      this.list = result.slice(this.offset, this.limit * this.page);
    },
    formatExpiry(expiry) {
      let time = parseInt(expiry) - new Date().getTime();
      let total_minute = parseInt(time / (1000 * 60));
      let minute = total_minute % 60;
      let hour = parseInt((total_minute / 60) % 24);
      let day = parseInt(total_minute / 60 / 24);
      if (minute === 0 && hour === 0 && day === 0) {
        return "Order about to expire";
      }
      // return t("t90", { day, hour, minute });
      return `${day}day ${hour}hour ${minute}minute`;
    },
    toDestroy() {
      // this.currentDestroyItem
      // console.log('toDestroy###item####', item);
      onWaive(this.currentDestroyItem);
    },
    openDestroyDialog(item) {
      this.currentDestroyItem = item;
      this.showDestroyDialog = true;
    },
    closeDestroyDialog() {
      this.showDestroyDialog = false;
    },
  },
  mounted() {
    this.$bus.$on("ONEXERCISE_PENDING", (bidID) => {
      if (!this.pendingObj[bidID]) {
        this.pendingObj[bidID] = 1;
      }
    });

    this.$bus.$on("ONEXERCISE_END", (bidID) => {
      if (this.pendingObj[bidID]) {
        let obj = this.pendingObj;
        delete obj[bidID];
        this.pendingObj = JSON.parse(JSON.stringify(obj));
      }
    });

    this.$bus.$on("ONWAIVE_PENDING", (bidID) => {
      if (!this.destroyPendingObj[bidID]) {
        this.destroyPendingObj[bidID] = 1;
      }
    });

    this.$bus.$on("ONWAIVE_END", (bidID) => {
      if (this.destroyPendingObj[bidID]) {
        let obj = this.destroyPendingObj;
        delete obj[bidID];
        this.destroyPendingObj = JSON.parse(JSON.stringify(obj));
      }
    });

  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/base.scss";
@media screen and (max-width: 750px) {
  .buy-list-container {
    .expiration-reminder {
      padding: 20px 16px 0;
      color: $text-w;
      font-size: 14px;
    }
    .buy-list-box {
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .loading {
      text-align: center;
    }
    .type-name {
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 6px;
      }
    }
  }
}
@media screen and (min-width: 750px) {
  .buy-list-container {
    .expiration-reminder {
      color: $text-w;
      font-size: 14px;
      padding-top: 20px;
    }
    .buy-list-box {
      padding-top: 20px;
    }
    .loading {
      text-align: center;
    }
    .type-name {
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 6px;
      }
    }
  }
}
</style>