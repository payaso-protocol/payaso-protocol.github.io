import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Underwrite from "./Underwrite";
import { Link } from "react-router-dom";
// import Linklist from './Linklist'
import { t } from "../../locale/locales";

import { InsuranceStyled } from "./styled";

import { web3 as Web3 } from "../../abi";
import {
  getWei,
  wrapperAdress,
  getID,
  newGetSymbol,
} from "../../static/utils/AdressPool";
import { asks } from "../../abi/order";
import { accDiv, add, mul, fixD } from "../../static/utils/calculate";

export class index extends Component {
  constructor(props) {
    super();
    this.state = {
      product_list: ["WETH", "WBTC", "UNI", "CRV"],
      isShowIWantUnderwrite: false,
      total_info: {},
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
      // return alert("请先连接钱包再操作");
      return alert("Please connect your wallet");
    }
    this.setState({
      isShowIWantUnderwrite: !this.state.isShowIWantUnderwrite,
    });
  };

  getCountByType = async (typeArr) => {
    const web3 = await Web3();
    let charID = await getID();

    let data = JSON.parse(window.localStorage.getItem("about_info_shell"));
    const super_data = data.map((item) => {
      let _col = newGetSymbol(item.longInfo._collateral, charID);
      return {
        askID: item.askID,
        volume: web3.utils.fromWei(item.volume, getWei(_col)),
        price: web3.utils.fromWei(item.price, getWei(_col)),
        _underlying: newGetSymbol(item.longInfo._underlying, charID),
        _collateral: _col,
        _strikePrice: web3.utils.fromWei(
          item.longInfo._strikePrice,
          getWei(_col)
        ),
        _expiry: parseInt(item.longInfo._expiry) * 1000,
      };
    });

    // 过滤过期数据
    const super_data_2 = super_data.filter((item) => {
      return item._expiry > new Date().getTime();
    });

    Promise.all(
      super_data_2.map(async (item) => {
        const res = await asks(item.askID);
        return {
          ...item,
          remain: web3.utils.fromWei(res.remain, getWei(item.settleToken)),
        };
      })
    ).then((res) => {
      let und_arr = [];
      let data_obj = {};
      res.forEach((item) => {
        let remain = mul(item.remain, item._strikePrice);
        let count = mul(item.volume, item._strikePrice);
        let min = accDiv(1, item._strikePrice);
        let max = accDiv(1, item._strikePrice);
        if (und_arr.includes(item._underlying)) {
          data_obj[item._underlying] = {
            remain: add(data_obj[item._underlying].remain, remain),
            count: add(data_obj[item._underlying].count, count),
            min:
              min < data_obj[item._underlying].min
                ? min
                : data_obj[item._underlying].min,
            max:
              max > data_obj[item._underlying].max
                ? max
                : data_obj[item._underlying].max,
          };
        } else {
          data_obj[item._underlying] = {
            remain,
            count,
            min,
            max,
          };
          und_arr.push(item._underlying);
        }
      });
      this.setState({
        total_info: data_obj,
      });
    });
  };

  connectWallet = () => {
    this.props.sendAction("Status", "WalletMask");
  };

  render() {
    const fixObj = this.props.fixObj;
    let connect_flag = this.props.matemask_info.isLogin;
    let option_box;
    // if (this.state.windowWidth > 450) {
    option_box = (
      <div className="option_box">
        <div>
          <span>{t("t6")}</span>
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
              let min =
                (this.state.total_info[item] &&
                  this.state.total_info[item].min) ||
                0;
              let max =
                (this.state.total_info[item] &&
                  this.state.total_info[item].max) ||
                0;
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
                      {(this.state.total_info[item] &&
                        this.state.total_info[item].count) ||
                        0}
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
                        = ${" "}
                        {(fixObj && fixD(min, fixObj[`${item}-USDT`])) || min}-
                        {(fixObj && fixD(max, fixObj[`${item}-USDT`])) || max}
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
