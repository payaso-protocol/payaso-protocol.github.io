import React, { Component } from "react";
import { HashRouter, Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import "./static/css/common.css";

import Header from "./components/Header";
import Linklist from "./pages/Insurance/Linklist";
import Insurance from "./pages/Insurance";
import Product from "./pages/Product";
import Transaction from "./pages/Guarantee";
// import Transaction_sell from './pages/Guarantee'
import Page3_insure from "./pages/Guarantee/Page3_insure";
import DownLoad from "./pages/Download/index";
import WalletMask from "./components/WalletMask";
import LoadingMask from "./components/LoadingMask";
import intl from "react-intl-universal";
import { LOCALES_DATA, locales, t } from "./locale/locales";

import RiskWarning from "./components/RiskWarning";

import { getOptionCreatedLog, getSellLog, getBuyLog } from "./abi/order";

class App extends Component {
  constructor() {
    super();
    this.state = {
      locale: locales[1].value,
      setInitDone: false,
    };
  }

  componentDidMount() {
    let wWidth = window.screen.width;
    if (wWidth <= 980) {
      // alert(t('t106'))
    }
    // console.log('currentLocale', this.state.locale, LOCALES_DATA)
    intl
      .init({
        currentLocale: this.state.locale,
        // currentLocale: window.localStorage.getItem('lang') || 'zh_CN',
        locales: LOCALES_DATA,
        warningHandler: (message) => {
          console.log(message);
        },
        commonLocaleDataUrls: {},
      })
      .then(() => {
        // setInitDone(true);
        this.setState({
          setInitDone: true,
        });
      });

    // 创建long映射对象
    getOptionCreatedLog((err, data) => {
      if (err) {
        return;
      }
      let long_map = {};
      data.forEach((item) => {
        if (!item.returnValues.long) return;
        long_map[item.returnValues.long] = item.returnValues;
      });

      window.localStorage.setItem("long_map", JSON.stringify(long_map));
    });

    // 创建Sell 映射对象
    getSellLog((err, data) => {
      if (err) {
        return;
      }
      // console.log(data)
      let sell_map = {};
      data.forEach((item, index) => {
        sell_map[item.returnValues.long + index] = item.returnValues;
      });
      window.localStorage.setItem("sell_map", JSON.stringify(sell_map));
    });

    // 创建Buy 映射对象
    getBuyLog((err, data) => {
      if (err) {
        return;
      }
      // console.log(data)
      let buy_map = {};
      data.forEach((item, index) => {
        buy_map[item.returnValues.askID + index] = item.returnValues;
      });
      window.localStorage.setItem("buy_map", JSON.stringify(buy_map));
    });

    this.mapAboutInfoSell();

    // 映射买单数据
    this.mapAboutInfoBuy();
  }

  mapAboutInfoSell = () => {
    let long_map = JSON.parse(window.localStorage.getItem("long_map")) || {};
    let sell_map = JSON.parse(window.localStorage.getItem("sell_map")) || {};
    let sell_arr = [];
    for (let key in sell_map) {
      sell_arr.push(sell_map[key]);
    }
    const all_data = sell_arr.map((item) => {
      return {
        ...item,
        longInfo: long_map[item.long],
      };
    });
    const new_data = all_data.filter((item) => {
      // 过滤垃圾数据
      if (!item.longInfo) return false;
      if (parseInt(item.longInfo.count) < 40) {
        return false;
      }
      // 过滤未创建settleable 之前的数据
      let _expiry = item.longInfo._expiry.substr(0, 13);
      if (parseInt(_expiry) < new Date("2020-10-11").getTime()) {
        return false;
      }
      return true;
    });
    window.localStorage.setItem("about_info_shell", JSON.stringify(new_data));
  };

  mapAboutInfoBuy = () => {
    let long_map = JSON.parse(window.localStorage.getItem("long_map"));
    let sell_map = JSON.parse(window.localStorage.getItem("sell_map"));
    let buy_map = JSON.parse(window.localStorage.getItem("buy_map"));

    let sell_arr = [];
    for (let key in sell_map) {
      sell_arr.push(sell_map[key]);
    }
    let sell_obj = {};
    sell_arr.forEach((item) => {
      sell_obj[item.askID] = {
        ...item,
        longInfo: long_map[item.long],
      };
    });

    let buy_arr = [];
    for (let key in buy_map) {
      buy_arr.push(buy_map[key]);
    }
    const all_data_2 = buy_arr.map((item) => {
      return {
        ...item,
        sellInfo: sell_obj[item.askID],
      };
    });
    const new_data = all_data_2.filter((item) => {
      // 过滤垃圾数据
      if (!item.sellInfo.longInfo) return false;
      if (parseInt(item.sellInfo.longInfo.count) < 40) {
        return false;
      }
      // 过滤未创建settleable 之前的数据
      let _expiry = item.sellInfo.longInfo._expiry.substr(0, 13);
      if (parseInt(_expiry) < new Date("2020-10-11").getTime()) {
        return false;
      }
      // 过滤数量为0的数据
      if (parseInt(item.vol) === 0) {
        return false;
      }
      return true;
    });

    window.localStorage.setItem("about_info_buy", JSON.stringify(new_data));
  };

  renderMask = () => {
    let status = this.props.Status || "default";
    if (!window.localStorage.getItem("readRisk")) {
      status = "risk";
    }
    let loadingText = t("t46");
    if (status === "approve" || status === "pending") {
      loadingText = status;
      status = "loading";
    }
    switch (status) {
      case "WalletMask":
        return <WalletMask></WalletMask>;
      case "loading":
        return (
          <LoadingMask loadingText={loadingText || t("t46")}></LoadingMask>
        );
      case "risk":
        return <RiskWarning></RiskWarning>;
      default:
        return <></>;
    }
  };

  render() {
    return (
      this.state.setInitDone && (
        <HashRouter history={useHistory}>
          <div className="Layout">
            <Header></Header>
            <Switch>
              <Route exact path="/">
                {/* <Home /> */}
                <Insurance />
              </Route>
              <Route exact path="/product/:type" component={Product} />
              <Route exact path="/transaction/sell" component={Transaction} />
              <Route exact path="/transaction/Buy" component={Page3_insure} />
              <Route exact path="/DownLoad" component={DownLoad} />
            </Switch>
            <Linklist></Linklist>

            {this.renderMask()}
          </div>
        </HashRouter>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendAction: (type, obj) => {
      dispatch({
        type: type,
        value: obj,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
