import React, { Component } from "react";
import { connect } from "react-redux";

import { ProductStyled } from "./styled";
// import Linklist from "../Insurance/Linklist";
import Underwrite from "../Insurance/Underwrite";
import LeaseCap from "./LeaseCap";
import moment from "moment";
import { t } from "../../locale/locales";

import { getOptionCreatedLog, asks } from "../../abi/order";
import {
  getSymbol,
  wrapperAdress,
  getWei,
  getID,
} from "../../static/utils/AdressPool";
import { web3 as Web3 } from "../../abi";

export class index extends Component {
  constructor(props) {
    super();
    this.state = {
      type: props.match.params.type, //ETH
      product_list: [],
      price_list: {},
      currency_list: [
        {
          name: "USDT",
          selected: true,
        },
        {
          name: "USDC",
          selected: true,
        },
        {
          name: "DAI",
          selected: true,
        },
      ],
      isShowIWantUnderwrite: false,
      isShowLeaseCap: false,
      current_item: {},
    };
  }

  componentDidMount() {
    // this.getListByType(this.state.type)
    this.getAllData();
  }

  getAllData = async () => {
    const web3 = await Web3();
    const charID = await getID();
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

    window.localStorage.setItem("about_info_shell", JSON.stringify(all_data));
    // console.log(all_data)

    const new_data = all_data.filter((item) => {
      // 过滤垃圾数据
      if (!item.longInfo) return false;
      // 按条件过滤
      return (
        item.longInfo._underlying.toLowerCase() ===
        wrapperAdress(this.state.type, charID)
      );
    });
    // console.log(new_data)
    let time = new Date().getTime();
    let new_data_2 = new_data.filter((item) => {
      // 过滤过期数据
      let _expiry = web3.utils.fromWei(item.longInfo._expiry);

      return parseInt(_expiry) > time;
    });

    const data = new_data_2.map((item) => {
      let _collateral = getSymbol(
        item.longInfo._collateral.toLowerCase(),
        charID
      )[0];
      return {
        askID: item.askID,
        seller: item.seller,
        long: item.long,
        _collateral: _collateral,
        price: web3.utils.fromWei(item.price, getWei(_collateral)),
        volume: web3.utils.fromWei(item.volume, getWei(_collateral)),
        settleToken: getSymbol(item.settleToken.toLowerCase(), charID)[0],
        _underlying: getSymbol(
          item.longInfo._underlying.toLowerCase(),
          charID
        )[0],
        _strikePrice: web3.utils.fromWei(
          item.longInfo._strikePrice,
          getWei(_collateral)
        ),
        _expiry: parseInt(web3.utils.fromWei(item.longInfo._expiry)),
        count: item.longInfo.count,
      };
    });
    this.updateRemain(data);
  };

  renderProductList = () => {
    if (this.state.product_list.length === 0) {
      return (
        <ul className="product_list_0">
          <div className="content">
            <img src="/assets/images/queshen.png" alt="" />
            <p>
              {t("t43")}
              <span>{t("t58")}</span>
              {t("t45")}
            </p>
          </div>
        </ul>
      );
    }

    return (
      <ul className="product_list">
        {this.state.product_list.map((item, index) => {
          return (
            <li key={index}>
              <div className="banner">
                <img src={`/assets/images/${this.state.type}@2x.png`} alt="" />
                <span>=</span>
                <p>
                  {1 / item._strikePrice} {item._collateral}
                </p>
              </div>
              <div className="info">
                <p>
                  <span>{t("t59")}:</span>
                  <span>
                    {parseFloat(item.price) / item._strikePrice}{" "}
                    {item.settleToken}
                  </span>
                </p>
                <p>
                  <span>{t("t60")}:</span>
                  <span>
                    {item.remain * item._strikePrice || 0} /{" "}
                    {item.volume * item._strikePrice} {t("t65")}
                  </span>
                </p>
                <p>
                  <span>{t("t61")}:</span>
                  <span>
                    {moment(parseInt(item._expiry)).format("MMM Do HH:mm")}
                  </span>
                </p>
              </div>
              <div className="btn_box">
                {/* 传入askID */}
                {item.remain === "0" ? (
                  <button className="disable">{t("t66")}</button>
                ) : (
                  <button
                    onClick={() => {
                      this.handelClickLeaseCap(item, index);
                    }}
                  >
                    {t("t66")}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  updateRemain = async (Produce) => {
    const web3 = await Web3();
    Promise.all(
      Produce.map((item) => {
        return asks(item.askID).then(async (res) => {
          if (!res) return false;
          const remain = await web3.utils.fromWei(
            res.remain + "",
            getWei(item._collateral)
          );
          return {
            ...item,
            remain: remain,
          };
        });
      })
    ).then((res) => {
      this.setState({
        product_list: res,
      });
    });
  };

  handelClickIWantUnderwrite = () => {
    if (!this.props.matemask_info.isLogin) {
      return alert(t("t62"));
    }
    this.setState({
      isShowIWantUnderwrite: !this.state.isShowIWantUnderwrite,
    });
  };

  handelClickLeaseCap = (item, index) => {
    if (!this.props.matemask_info.isLogin) {
      return alert(t("t62"));
    }
    this.setState({
      isShowLeaseCap: !this.state.isShowLeaseCap,
    });
    if (item) {
      this.setState({
        current_item: item,
      });
    }
  };

  changeLeaseCap = () => {
    this.setState({
      isShowLeaseCap: !this.state.isShowLeaseCap,
    });
  };

  handelClickCurrncyItem = (index) => {
    let arr = this.state.currency_list;
    arr[index].selected = !arr[index].selected;
    this.setState({
      currency_list: arr,
    });
  };

  render() {
    return (
      <ProductStyled>
        <div className="top_banner">
          <h1>{t("t5")}</h1>
        </div>
        <div className="container">
          <div className="top_title">
            <div>
              <h3
                onClick={() => {
                  this.props.history.push("/");
                }}
              >
                {t("t6")}
              </h3>
              <img src="/assets/arrows/right2.png" alt="" />
              <span>
                {this.state.type} {t("t64")}
              </span>
            </div>
            <button
              className="under_btn"
              onClick={() => {
                this.handelClickIWantUnderwrite();
              }}
            >
              <i></i>
              {t("t11")}
            </button>
          </div>

          <div className="option">
            {/* <div className="protect_amount">
              <h5>{t("t31")}</h5>
              <select name="amount" id="amount">
                <option value="ALL">{t("t20")}</option>
              </select>
              <button>{t("t8")}</button>
            </div> */}

            <div className="currency">
              <h5>{t("t18")}</h5>
              <ul>
                {this.state.currency_list.map((item, index) => {
                  return (
                    <li
                      key={item.name + index}
                      className={item.selected ? "on" : ""}
                      onClick={() => {
                        this.handelClickCurrncyItem(index);
                      }}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {this.renderProductList()}
        </div>
        {/* <Linklist /> */}
        {/* 我要承保 */}
        {this.state.isShowIWantUnderwrite ? (
          <Underwrite
            handelClickIWantUnderwrite={this.handelClickIWantUnderwrite}
          />
        ) : (
          ""
        )}

        {/* 租借帽子 */}
        {this.state.isShowLeaseCap ? (
          <LeaseCap
            current_item={this.state.current_item}
            type={this.state.type}
            handelClickLeaseCap={this.handelClickLeaseCap}
          />
        ) : (
          ""
        )}
      </ProductStyled>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendAction: (type, value) => {
      dispatch({
        type: type,
        value: value,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
