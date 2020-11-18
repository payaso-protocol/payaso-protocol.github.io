import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Underwrite from "./Underwrite";
import { Link } from "react-router-dom";
// import Linklist from './Linklist'
import { t } from "../../locale/locales";

import { InsuranceStyled } from "./styled";

import { web3 as Web3 } from "../../abi";
import { getWei, wrapperAdress, getID } from "../../static/utils/AdressPool";

export class index extends Component {
  constructor(props) {
    super();
    this.state = {
      // product_list: ['ETH', 'LINK', 'YFII', 'DAI'],
      product_list: ["WETH", "WBTC", "UNI", "CRV"],
      isShowIWantUnderwrite: false,
      // type_list: ['ETH', 'LINK', 'YFII', 'DAI'],
      type_list: ["WETH", "WBTC", "UNI", "CRV"],
      count_list: [0, 0, 0, 0],
      min_list: [0, 0, 0, 0],
      max_list: [0, 0, 0, 0],
      windowWidth: "",
    };
  }
  componentDidMount() {
    this.getCountByType(this.state.type_list);
    window.addEventListener("resize", this.screenChange);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.screenChange);
  }
  screenChange = () => {
    let windowWidth = document.documentElement.clientWidth;
    this.setState({
      windowWidth: windowWidth, // 宽
    });
  };

  handelClickIWantUnderwrite = () => {
    if (!this.props.matemask_info.isLogin) {
      return alert("请先连接钱包再操作");
    }
    this.setState({
      isShowIWantUnderwrite: !this.state.isShowIWantUnderwrite,
    });
  };

  getCountByType = async (typeArr) => {
    const web3 = await Web3();
    let charID = getID();
    let long_map = JSON.parse(window.localStorage.getItem("long_map"));
    let sell_map = JSON.parse(window.localStorage.getItem("sell_map"));
    // console.log('long_map', long_map)
    // console.log('sell_map', sell_map)
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

    // console.log(all_data)
    let type_list = [];
    let count_list = [];
    let min_list = [];
    let max_list = [];
    typeArr.map((type) => {
      const new_data = all_data.filter((item) => {
        // 过滤垃圾数据
        if (!item.longInfo) return false;
        // 按条件过滤
        return (
          item.longInfo._underlying.toLowerCase() ===
          wrapperAdress(type, charID).toLowerCase()
        );
      });
      // console.log(new_data)
      let time = new Date().getTime();
      let new_data_2 = new_data.filter((item) => {
        // 过滤过期数据
        let _expiry = web3.utils.fromWei(item.longInfo._expiry);

        return parseInt(_expiry) > time;
      });
      let count = 0;
      let min = 500000;
      let max = 0;
      new_data_2.forEach((item) => {
        console.log();
        let vol = parseInt(
          web3.utils.fromWei(item.volume, getWei(item.settleToken))
        );
        let _strikePrice = web3.utils.fromWei(
          item.longInfo._strikePrice,
          getWei(item.settleToken)
        );
        count += parseInt(vol * _strikePrice);
        const price = 1 / _strikePrice;
        if (price > max) {
          max = price;
        }
        if (price < min) {
          min = price;
        }
      });

      if (min === 500000) {
        min = 0;
      }

      type_list.push(type);
      count_list.push(count);
      min_list.push(min);
      max_list.push(max);
    });

    setTimeout(() => {
      this.setState({
        type_list,
        count_list,
        min_list,
        max_list,
      });
    }, 500);
  };

  connectWallet = () => {
    this.props.sendAction("Status", "WalletMask");
  };

  render() {
    let connect_flag = this.props.matemask_info.isLogin;
    let option_box;
    // if (this.state.windowWidth > 450) {
    option_box = (
      <div className="option_box">
        <div>
          <span>{t("t6")}</span>
          {/* <div>
              <img src="/assets/icons/search.png" alt="" />
              <input type="text" placeholder={t("t7")} />
            </div>
            <button>{t("t8")}</button> */}
        </div>
        <button
          onClick={() => {
            this.handelClickIWantUnderwrite();
          }}
        >
          <i></i>

          {t("t11")}
        </button>
      </div>
    );
    return (
      <InsuranceStyled>
        <div className="top_banner">
          <h1>{t("t5")}</h1>
        </div>
        <div className="container">
          {/* 连接钱包  H5显示 */}
          {connect_flag ? (
            <Fragment />
          ) : (
            <div className="connect_wallet">
              <button
                onClick={(e) => {
                  this.connectWallet();
                }}
              >
                Connect to a wallet
              </button>
            </div>
          )}

          {option_box}
          <ul className="content">
            {this.state.product_list.map((item, index) => {
              return (
                <li key={item + index}>
                  <div className="product">
                    <div>
                      <img
                        src={
                          this.state.windowWidth > 450
                            ? `/assets/images/${item}@2x.png`
                            : `/assets/h5_images/${item}.png`
                        }
                        alt=""
                      />
                      <h2>{item}</h2>
                    </div>
                    <p>
                      {this.state.count_list[index]}
                      {t("t9")}
                    </p>
                  </div>
                  <div className="pair_wrap">
                    <div className="pair">
                      <span>1</span>
                      <i className="icon lamp" />
                      <img src="/assets/arrows/weibiaoti40.png" alt="" />
                      <span>1</span>
                      {/* <i className='icon eth' /> */}
                      <img
                        className="pair_img"
                        src={
                          this.state.windowWidth > 450
                            ? `/assets/icons/${item}@2x.png`
                            : `/assets/h5_images/${item}_logo.png`
                        }
                        alt=""
                      />
                    </div>
                    <div className="pair">
                      <span>1</span>
                      <i className="icon lamp" />
                      {/* <img src="/assets/arrows/weibiaoti40.png" alt="" /> */}
                      <span>
                        {" "}
                        = $ {Math.floor(this.state.min_list[index])}-
                        {Math.ceil(this.state.max_list[index])}
                      </span>
                      {/* <i className='icon usdt' /> */}
                    </div>
                  </div>
                  {/* <div className="date">
                    <span>{t("t10")}</span>
                    <span>{t("t26")}</span>
                  </div> */}
                  <Link to={`/product/${item}`}>
                    <button>{t("t47")}</button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* <Linklist /> */}

        {this.state.isShowIWantUnderwrite ? (
          <Underwrite
            handelClickIWantUnderwrite={this.handelClickIWantUnderwrite}
          />
        ) : (
          ""
        )}
      </InsuranceStyled>
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
export default connect(mapStateToProps, mapDispatchToProps)(index);
