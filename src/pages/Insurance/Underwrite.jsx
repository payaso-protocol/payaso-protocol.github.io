import React, { Component } from "react";

import { connect } from "react-redux";
import { UnderwriteStyle } from "./styled";
import Category from "./Category";

import moment from "moment";
import { onIssue, getBalance } from "../../abi/order";
import { t } from "../../locale/locales";

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
        price: 400,
        volume: 1,
        premium: 4,
        annual: 1,
      },
      payLook: false,
    };
  }

  componentDidMount() {
    const time = new Date().getTime();
    let dateArr = [];
    for (let i = 1; i <= 3; i++) {
      let times = new Date(time + i * 24 * 60 * 60 * 1000);
      dateArr.push(moment(times).format("YYYY-MM-DD"));
    }
    this.setState({
      date_list: dateArr,
      Insure_data: {
        ...this.state.Insure_data,
        expire: dateArr[0] + "  00:00",
      },
    });

    this.getBalance2();
  }
  getBalance2 = () => {
    getBalance(this.state.Insure_data.currency).then((res) => {
      // console.log(res)
      this.setState({
        balance: res,
      });
      let total =
        parseFloat(this.state.Insure_data.price) *
        parseFloat(this.state.Insure_data.volume);
      if (parseFloat(this.state.balance) < total) {
        this.setState({
          payLook: true,
        });
      } else {
        this.setState({
          payLook: false,
        });
      }
    });
  };

  handelClickCategoryItem = (item, type) => {
    this.setState({
      Insure_data: Object.assign(this.state.Insure_data, { category: item }),
    });
  };

  handelClickCurrencyItem = (item) => {
    this.setState({
      Insure_data: Object.assign(this.state.Insure_data, { currency: item }),
    });
    setTimeout(() => {
      this.getBalance2();
    }, 200);
  };

  handelChangeExpire = (e) => {
    let times = new Date(e.currentTarget.value).getTime();
    this.setState({
      Insure_data: Object.assign(this.state.Insure_data, { expire: times }),
    });
  };

  handelChangePrice = (e) => {
    let price = parseInt(e.currentTarget.value);
    let premium = (price * this.state.Insure_data.annual) / 100;
    this.setState({
      Insure_data: Object.assign(this.state.Insure_data, {
        price: price,
        premium: premium,
      }),
    });
    setTimeout(() => {
      this.getBalance2();
    }, 200);
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
    // console.log(data)
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
    let premium = (val / 100) * this.state.Insure_data.price;
    this.setState({
      Insure_data: Object.assign(this.state.Insure_data, {
        annual: val,
        premium: premium,
      }),
    });
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
              </select>
            </div>
            <div>
              <div className="h5_indexPrice">
                <h5>{t("t49")}</h5>
                <p>{t("t110", { price: 200 })}</p>
              </div>

              <select
                name="set_price"
                id="set_price"
                onChange={(e) => {
                  this.handelChangePrice(e);
                }}
              >
                <option value="400">
                  400 {this.state.Insure_data.currency}
                </option>
                <option value="350">
                  350 {this.state.Insure_data.currency}
                </option>
                <option value="300">
                  300 {this.state.Insure_data.currency}
                </option>
                <option value="250">
                  250 {this.state.Insure_data.currency}
                </option>
                <option value="200">
                  200 {this.state.Insure_data.currency}
                </option>
                <option value="150">
                  150 {this.state.Insure_data.currency}
                </option>
                <option value="100">
                  100 {this.state.Insure_data.currency}
                </option>
              </select>
            </div>
          </div>
          <div className="index_price">
            <p>{t("t110", { price: 200 })}</p>
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
                  {t("t54")} ≈ {this.state.Insure_data.premium}{" "}
                  {this.state.Insure_data.currency}
                </p>
              </div>
            </div>
          </div>
          <div className="show_procedure">
            <div>
              <span>{t("t36")}</span>
              <span>
                {this.state.Insure_data.volume * this.state.Insure_data.price}{" "}
                {this.state.Insure_data.currency}
              </span>
            </div>
            {/* <div>
                        <span>{t('t37')}</span>
                        <span>{this.state.Insure_data.premium * this.state.Insure_data.volume} {this.state.Insure_data.currency}</span>
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
              date: this.state.Insure_data.expire,
              num1:
                this.state.Insure_data.volume * this.state.Insure_data.price,
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
