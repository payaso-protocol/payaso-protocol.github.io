import React, { Component } from "react";

import { connect } from "react-redux";
import { UnderwriteStyle } from "./styled";
import Category from "./Category";

import moment from "moment";
import { onIssue, getBalance } from "../../abi/order";
import { t } from "../../locale/locales";
import { uniswap, getID } from "../../static/utils/AdressPool";
import { accDiv, mul, sub, toPrecision } from "../../static/utils/calculate";

class Underwrite extends Component {
  constructor(props) {
    super();
    this.state = {
      category_list: ["WETH", "UNI", "WBTC", "CRV"],
      // currency_list: ["USDT", "USDC", "DAI"],
      currency_list: ["USDT", "USDC", "DAI"],
      date_list: [],
      Insure_data: {
        category: "WETH",
        currency: "USDT",
        expire: "",
        price: 0,
        volume: 1,
        premium: 0,
        annual: 1,
        _yield: 0,
      },
      payLook: false,
      share: [0],
    };
  }

  componentDidMount() {
    const time = new Date().getTime();
    let dateArr = [];
    for (let i = 1; i <= 3; i++) {
      let times = new Date(time + i * 24 * 60 * 60 * 1000);
      dateArr.push(moment(times).format("YYYY-MM-DD"));
    }
    let time1031 = moment(new Date(1604073600000)).format("YYYY-MM-DD");
    let time1130 = moment(new Date(1606665600000)).format("YYYY-MM-DD");
    dateArr.push(time1031);
    dateArr.push(time1130);
    this.setState({
      date_list: dateArr,
      Insure_data: {
        ...this.state.Insure_data,
        expire: dateArr[0] + "  00:00",
      },
    });

    // 获取指数期权
    setTimeout(() => {
      this.getShare();
    }, 300);

    this.getBalance2();
  }

  getShare = async () => {
    const charID = await getID();
    let conversion = await uniswap(
      this.state.Insure_data.category,
      this.state.Insure_data.currency,
      charID
    );
    let arr = [];
    let count = 0,
      rate = 1;
    while (count < 10) {
      let price = toPrecision((conversion / 100) * (100 + rate));
      rate++;
      if (!arr.includes(price)) {
        arr.push(price);
        count++;
      }
      if (rate > 100) {
        count = 10;
      }
    }

    this.setState(
      {
        share: arr,
        index_price: conversion,
        Insure_data: { ...this.state.Insure_data, price: arr[0] || 0 },
      },
      () => {
        this.getYield();
      }
    );
  };

  getBalance2 = () => {
    getBalance(this.state.Insure_data.currency).then((res) => {
      this.setState({
        balance: res,
      });
      let total =
        parseFloat(this.state.Insure_data.price) *
        parseFloat(this.state.Insure_data.volume);
      if (parseFloat(this.state.balance) > total && total > 0) {
        this.setState({
          payLook: false,
        });
      } else {
        this.setState({
          payLook: true,
        });
      }
    });
  };

  getYield = () => {
    // 预期日化收益=[（执行价格-指数价格）+保费]/[执行价格*天数[]
    let yield_1 = this.state.Insure_data.annual / 100;
    let time1 = new Date(this.state.Insure_data.expire).getTime();
    let time2 = new Date().getTime();
    let day = parseInt((time1 - time2) / (1000 * 60 * 60 * 24)) + 1;
    let yield_2 = mul(this.state.Insure_data.price, day);
    let premium = sub(
      mul(yield_1, yield_2),
      sub(this.state.index_price, this.state.Insure_data.price)
    );

    this.setState({
      Insure_data: {
        ...this.state.Insure_data,
        premium: premium,
      },
    });
  };

  handelClickCategoryItem = (item, type) => {
    this.setState(
      {
        Insure_data: Object.assign(this.state.Insure_data, { category: item }),
      },
      () => {
        this.getShare();
      }
    );
  };

  handelClickCurrencyItem = (item) => {
    this.setState(
      {
        Insure_data: Object.assign(this.state.Insure_data, { currency: item }),
      },
      () => {
        this.getBalance2();
        this.getShare();
      }
    );
  };

  handelChangeExpire = (e) => {
    let times = new Date(e.currentTarget.value).getTime();
    this.setState(
      {
        Insure_data: Object.assign(this.state.Insure_data, { expire: times }),
      },
      () => {
        this.getYield();
      }
    );
  };

  handelChangePrice = (e) => {
    let price = parseFloat(e.currentTarget.value);
    let premium = mul(price, this.state.Insure_data.annual) / 100;

    this.setState(
      {
        Insure_data: Object.assign(this.state.Insure_data, {
          price: price,
          // premium: premium,
        }),
      },
      () => {
        this.getYield();
        this.getBalance2();
      }
    );
    // setTimeout(() => {
    //   this.getBalance2();
    // }, 200);
  };

  handelChangeVolume = (e) => {
    let val = e.target.value;
    if (val.indexOf(".") !== -1) {
      let str = (val + "").substr(val.indexOf("."));
      if (str.length > 3) {
        val = parseFloat(val).toFixed(2);
      }
    }
    if (parseInt(val) > 10000) {
      val = 10000;
    }

    if (parseFloat(val) === NaN) {
      val = 0;
    }
    this.setState({
      Insure_data: Object.assign(this.state.Insure_data, { volume: val }),
    });
    this.getBalance2();
  };

  handelSubmit = () => {
    // let Look = false
    this.props.handelClickIWantUnderwrite();
    let data = this.state.Insure_data;
    onIssue(data, (status) => {
      if (status === "pending") {
        this.props.sendAction("Status", "padding");
      } else if (status === "approve") {
        this.props.sendAction("Status", "approve");
      } else if (status === "success" || status === "failed") {
        // if (!Look) {
        //     this.props.handelClickIWantUnderwrite()
        //     Look = true
        // }
        this.props.sendAction("Status", "off");
      }
    });
  };

  handelChangePremium = (e) => {
    let val = e.target.value;
    if (val.indexOf(".") !== -1) {
      let str = (val + "").substr(val.indexOf("."));
      if (str.length > 3) {
        val = parseFloat(val).toFixed(2);
      }
    }
    if (parseInt(val) > 1000) {
      val = 1000;
    }
    if (parseFloat(val) === NaN) {
      val = 0;
    }
    this.setState(
      {
        Insure_data: Object.assign(this.state.Insure_data, {
          annual: val,
        }),
      },
      () => {
        this.getYield();
      }
    );
  };

  render() {
    return (
      <UnderwriteStyle>
        <div className="form">
          <div className="title">
            <span>{t("t11")}</span>
            <img
              src="/assets/icons/guanbi.png"
              alt=""
              onClick={() => {
                this.props.handelClickIWantUnderwrite();
              }}
            />
          </div>
          <Category
            category_list={this.state.category_list}
            current_category={this.state.Insure_data.category}
            handelClickCategoryItem={this.handelClickCategoryItem}
            flag="Insure_data"
          />
          <ul className="select_currency">
            {this.state.currency_list.map((item, index) => {
              return (
                <li key={item + index}>
                  <label
                    onClick={() => {
                      this.handelClickCurrencyItem(item);
                    }}
                  >
                    <i
                      className={
                        this.state.Insure_data.currency === item ? "active" : ""
                      }
                    ></i>
                    {item}
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="select_option">
            <div>
              <h5>{t("t48")}</h5>
              <select
                name="set_expire"
                id="set_expire"
                onChange={(e) => {
                  this.handelChangeExpire(e);
                }}
              >
                {this.state.date_list.map((item, index) => {
                  return (
                    <option key={item + index} value={item + "  00:00"}>
                      {item + "  00:00"}
                    </option>
                  );
                })}

                {/* <option
                  value={moment(new Date().getTime() + 1000 * 60 * 5).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                >
                  {moment(new Date().getTime() + 1000 * 60 * 5).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </option>
                <option
                  value={moment(new Date().getTime() + 1000 * 60 * 15).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                >
                  {moment(new Date().getTime() + 1000 * 60 * 15).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </option>
                <option
                  value={moment(new Date().getTime() + 1000 * 60 * 30).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                >
                  {moment(new Date().getTime() + 1000 * 60 * 30).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </option>
                <option
                  value={moment(new Date().getTime() + 1000 * 60 * 60).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                >
                  {moment(new Date().getTime() + 1000 * 60 * 60).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </option> */}
              </select>
            </div>
            <div>
              <div className="h5_indexPrice">
                <h5>{t("t49")}</h5>
                <p>{t("t110", { price: this.state.index_price || "-- " })}</p>
              </div>

              <select
                name="set_price"
                id="set_price"
                onChange={(e) => {
                  this.handelChangePrice(e);
                }}
              >
                {this.state.share.map((item, index) => {
                  return (
                    <option key={index + "b"} value={item}>
                      {item} {this.state.Insure_data.currency}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="index_price">
            <p>{t("t110", { price: this.state.index_price || "-- " })}</p>
          </div>
          <div className="select_input">
            <div>
              <h5>{t("t50")}</h5>
              <div>
                <input
                  type="number"
                  maxLength="4"
                  // placeholder={t('t51')}
                  placeholder="0.00"
                  value={this.state.Insure_data.volume}
                  onChange={(e) => {
                    this.handelChangeVolume(e);
                  }}
                />
                <span>{t("t52")}</span>
              </div>
            </div>
            <div>
              <h5>{t("t53")}</h5>
              <div>
                <input
                  type="number"
                  placeholder={t("t53")}
                  value={this.state.Insure_data.annual}
                  onChange={(e) => {
                    this.handelChangePremium(e);
                  }}
                />
                {/* <span></span> */}
                <span>%</span>
                {/* parseInt(this.state.premium) / 100 * parseInt(this.state.price) */}
                <p>
                  Rent ≈{" "}
                  {mul(
                    this.state.Insure_data.premium,
                    this.state.Insure_data.volume
                  )}{" "}
                  {this.state.Insure_data.currency}
                </p>
              </div>
            </div>
          </div>
          <div className="show_procedure">
            <div>
              <span>{t("t36")}</span>
              <span>
                {mul(
                  this.state.Insure_data.volume,
                  this.state.Insure_data.price
                )}{" "}
                {this.state.Insure_data.currency}
              </span>
            </div>
            {/* <div>
              <span>{t('t37')}</span>
              <span>{mul(this.state.Insure_data.premium, this.state.Insure_data.volume)} {this.state.Insure_data.currency}</span>
            </div> */}
            <div>
              <span>{t("t38")}</span>
              <span>
                {parseFloat(this.state.balance).toFixed(4)}{" "}
                {this.state.Insure_data.currency}
              </span>
            </div>
          </div>
          <div className="show_tip">
            {/* <p>保费在投保人成交时直接获得</p> */}
            {t("t55", {
              date: moment(this.state.Insure_data.expire).format(
                "YYYY-MMM Do HH:mm"
              ),
              num1: mul(
                this.state.Insure_data.volume,
                this.state.Insure_data.price
              ),
              symbol: this.state.Insure_data.currency,
              num2: this.state.Insure_data.volume,
              token: this.state.Insure_data.category,
            })}
          </div>
          <div className="submit">
            <button
              onClick={() => {
                this.props.handelClickIWantUnderwrite();
              }}
            >
              {t("t41")}
            </button>
            {this.state.payLook ? (
              <button style={{ opacity: 0.5 }}>{t("t56")}</button>
            ) : (
              <button
                onClick={() => {
                  this.handelSubmit();
                }}
              >
                {t("t57")}
              </button>
            )}
          </div>
        </div>
      </UnderwriteStyle>
    );
  }
}

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

export default connect(null, mapDispatchToProps)(Underwrite);
