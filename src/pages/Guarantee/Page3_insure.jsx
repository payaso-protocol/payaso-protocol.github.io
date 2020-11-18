import React, { Component } from "react";
import { connect } from "react-redux";

import { InsureStyled, TransactionStyled } from "./styled";
import Option from "./Option";

import Warning from "../../components/alert/Warning";
import Toptip from "../../components/alert/Toptip";

import { onExercise, bids, asks, getExercise } from "../../abi/order";
import { web3 as Web3 } from "../../abi";
import { getSymbol, getWei, getID } from "../../static/utils/AdressPool";
import moment from "moment";
import { t } from "../../locale/locales";
import { mul, accDiv } from '../../static/utils/calculate'

class Page3Insure extends Component {
  constructor() {
    super();
    this.state = {
      option_data: {
        category: "WETH",
        currency: ["USDT", "USDC", "DAI"],
        status: "All",
        expire: 0,
      },
      warningBox: "",
      isShowSuccessTip: true,
      currentPage: 1,
      ListArr: [],
      backup_list: [],
      currentListItem: {},
      startPageNum: 0,
      endPageNum: 10,
    };
  }

  componentDidMount () {
    try {
      this.getAllData();
    } catch (error) {
      console.log(error);
    }
  }

  getAllData = async () => {
    // if (!this.props.matemask_info.isLogin) {
    //     return
    // }
    const web3 = await Web3();
    const charID = await getID();

    let new_data = JSON.parse(window.localStorage.getItem("about_info_buy"));
    if (!web3.currentProvider.selectedAddress) return false;
    const new_data_2 = new_data.filter((item) => {
      return (
        item.buyer.toLowerCase() ===
        web3.currentProvider.selectedAddress.toLowerCase()
        // '0x0603CD787f45D1b830cEd5AcaEECDaB661B267ca'.toLowerCase()
      );
    });

    const super_data = new_data_2.map((item) => {
      let _collateral = getSymbol(
        item.sellInfo.longInfo._collateral.toLowerCase(),
        charID
      )[0];
      return {
        // 第一层数据
        bidID: item.bidID,
        askID: item.askID,
        buyer: item.buyer,
        vol: web3.utils.fromWei(item.vol, getWei(_collateral)),
        amt: web3.utils.fromWei(item.amt),
        // 第二层数据
        seller: item.sellInfo.seller,
        long: item.sellInfo.long,
        volume: web3.utils.fromWei(item.sellInfo.volume, getWei(_collateral)),
        price: web3.utils.fromWei(item.sellInfo.price, getWei(_collateral)),
        settleToken: getSymbol(
          item.sellInfo.settleToken.toLowerCase(),
          charID
        )[0],
        // 第三层数据
        creator: item.sellInfo.longInfo.creator,
        _collateral: _collateral,
        _underlying: getSymbol(
          item.sellInfo.longInfo._underlying.toLowerCase(),
          charID
        )[0],
        _strikePrice: web3.utils.fromWei(
          item.sellInfo.longInfo._strikePrice,
          getWei(_collateral)
        ),
        _expiry: parseInt(item.sellInfo.longInfo._expiry) * 1000,
        short: item.sellInfo.longInfo.short,
        count: item.sellInfo.longInfo.count,
      };
    });
    const super_data_2 = super_data.map((item) => {
      if (parseInt(item._expiry) < new Date().getTime()) {
        return {
          ...item,
          status: "Closed", // Dated
          sort: 1,
        };
      }
      return {
        ...item,
        status: "Inactivation",
        sort: 3,
      };
    });



    return this.getRemain(super_data_2);
  };

  getRemain = (super_data) => {
    Promise.all(super_data.map(async item => {
      const res = await getExercise(item.buyer)
      const bidID_Arr = res.map(item => {
        return item.returnValues.bidID
      })
      if (bidID_Arr.includes(item.bidID)) {
        return {
          ...item,
          status: 'Exercised',
          sort: 2
        }
      } else {
        return item
      }
    })).then(res => {

      const res_2 = res.sort((a1, a2) => {
        return a2.sort - a1.sort;
      });

      this.setState({
        ListArr: res_2,
        backup_list: res_2,
      });
    })
  };

  renderAlert = () => {
    switch (this.state.warningBox) {
      case "give_back":
        return (
          <Warning
            title={t("t98")}
            content={t("t99", {
              num: this.state.currentListItem.vol,
              symbol: this.state.currentListItem._collateral,
            })}
            btn={[t("t100"), t("t97")]}
            cancel={this.changeWarningBox}
            submit={this.submitEvent_1}
          />
        );

      case "activate":
        return (
          <Warning
            title={t("t101")}
            content={t("t102", {
              price1: mul(this.state.currentListItem.vol, 1),
              symbol1: this.state.currentListItem._collateral,
              price2:
                mul(this.state.currentListItem.vol,
                  this.state.currentListItem._strikePrice),
              symbol2: this.state.currentListItem._underlying,
            })}
            btn={[t("t103"), t("t97")]}
            cancel={this.changeWarningBox}
            submit={this.submitEvent_2}
            currentListItem={this.state.currentListItem}
          />
        );
      case "toptip_1":
        return (
          <Toptip
            type="success"
            content={t("t104")}
          // content='已经归还，等待区块确认！'
          />
        );
      case "toptip_2":
        return (
          <Toptip
            type="success"
            content={t("t105")}
          // content='激活成功，请等待区块后确认最终余额！'
          />
        );
      default:
        return "";
    }
  };

  submitEvent_1 = () => {
    this.changeWarningBox("toptip_1");
    setTimeout(() => {
      this.changeWarningBox("");
    }, 1500);
  };

  submitEvent_2 = async () => {
    let data = this.state.currentListItem;
    onExercise(
      {
        token: data._underlying,
        _underlying_vol: data.vol * data._strikePrice,
        vol: data.vol,
        bidID: data.bidID,
        long: data.long,
      },
      (status) => {
        let Look = false;
        if (status === "pending") {
          // this.props.sendAction('Status', 'padding')
          this.changeWarningBox("toptip_2"); // 行权成功弹框
        } else if (status === "approve") {
          this.props.sendAction("Status", "approve");
        } else if (status === "success" || status === "failed") {
          this.props.sendAction("Status", "off");
          if (!Look) {
            this.changeWarningBox("");
            Look = true;
          }
          this.props.sendAction("Status", "off");
        }
      }
    );

    // setTimeout(() => {
    //     this.changeWarningBox('')
    // }, 1500)
  };

  filterByoption = () => {
    console.log(this.state.option_data);
    let data = this.state.backup_list;
    let option = this.state.option_data;

    const res = data.filter((item) => {
      // filter Type
      if (item._underlying !== option.category) return false;
      // filter Collateral
      if (!option.currency.includes(item._collateral)) return false;
      // filter State
      if (option.status !== "All" && item.status !== option.status)
        return false;
      // filter Period
      if (option.expire !== 0 && option.expire < parseInt(item._expiry))
        return false;

      return true;
    });
    this.setState({
      ListArr: res,
    });
  };

  handelClickCategoryItem = (item, type) => {
    if (type === "option_data") {
      this.setState({
        option_data: Object.assign(this.state.option_data, { category: item }),
      });
    }
  };

  changeOptionData = (data) => {
    this.setState({
      option_data: Object.assign(this.state.option_data, data),
    });
  };

  changeWarningBox = (falg, index) => {
    this.setState({
      warningBox: falg || "",
      currentListItem: this.state.ListArr[index],
    });
  };

  formatExpiry = (expiry) => {
    expiry = parseInt(expiry);
    let time = expiry - new Date().getTime();
    let total_minute = parseInt(time / (1000 * 60));
    let minute = total_minute % 60;
    let hour = parseInt((total_minute / 60) % 24);
    let day = parseInt(total_minute / 60 / 60 / 24);
    if (minute === 0 && hour === 0 && day === 0) {
      return t("t91");
    }
    return t("t90", { day, hour, minute });
  };

  handleClickPageUp () {
    if (this.state.startPageNum == 0 && this.state.endPageNum == 10) {
      return;
    }
    let start = this.state.startPageNum - 10;
    let end = this.state.endPageNum - 10;
    this.setState({
      startPageNum: start,
      endPageNum: end,
    });
  }

  handleClickPageDown () {
    if (this.state.endPageNum > this.state.ListArr.length) {
      return;
    }
    let start = this.state.startPageNum + 10;
    let end = this.state.endPageNum + 10;
    this.setState({
      startPageNum: start,
      endPageNum: end,
    });
  }

  render () {
    let { startPageNum, endPageNum } = this.state;
    let ListArr = JSON.parse(JSON.stringify(this.state.ListArr)).splice(
      startPageNum,
      endPageNum
    );
    return (
      <TransactionStyled>
        <div className="container">
          <InsureStyled>
            <Option
              current_category={this.state.option_data.category}
              handelClickCategoryItem={this.handelClickCategoryItem}
              changeOptionData={this.changeOptionData}
              filterByoption={this.filterByoption}
            ></Option>
            <div className="status_tip">
              <p>{t("t29")}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>{t("t30")}</th>
                  <th className="price">
                    <span>{t("t39")}</span>
                    <i className="info" title={t("t81")}></i>
                  </th>
                  <th width="150px">{t("t32")}</th>
                  <th>
                    {t("t33")}
                    <i className="info" title={t("t82")}></i>
                  </th>
                  <th width="200px">{t("t84")}</th>
                  <th>
                    {t("t48")}
                    <i className="info" title={t("t83")}></i>
                  </th>
                  <th>{t("t19")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ListArr.map((item, index) => {
                  return (
                    <tr key={item + index}>
                      {/* <td><img src="/assets/arrows/ETH@2x.png" alt="" /></td> */}
                      <td>
                        <img
                          src={`/assets/icons/${item._underlying}@2x.png`}
                          alt=""
                        />
                        <span>{item._underlying}</span>
                      </td>
                      <td>
                        {accDiv(1, item._strikePrice)} {item._collateral}
                      </td>
                      <td>{mul(item.vol, item._strikePrice)}</td>
                      <td>
                        {accDiv(item.price, item._strikePrice)}
                        {item.settleToken}
                      </td>
                      <td>
                        {mul(parseFloat(item.price), parseFloat(item.vol))}
                        {item.settleToken}
                      </td>
                      <td>
                        {item.status === "Inactivation"
                          ? this.formatExpiry(item._expiry)
                          : moment(parseInt(item._expiry)).format(
                            "MMMM Do YYYY, HH:mm:ss"
                          )}
                      </td>
                      <td>
                        {item.status}
                      </td>
                      <td>
                        {item.status === "Inactivation" ? (
                          <button
                            className="btn1"
                            onClick={() => {
                              this.changeWarningBox("activate", index);
                            }}
                          >
                            {t("t87")}
                          </button>
                        ) : (
                            ""
                          )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="page">
              <i
                className="page_up"
                onClick={() => {
                  this.handleClickPageUp();
                }}
              ></i>
              <i
                className="page_down"
                onClick={() => {
                  this.handleClickPageDown();
                }}
              ></i>
            </div>
          </InsureStyled>
        </div>
        {this.renderAlert()}
        <div className="option_wrap">
          {this.state.ListArr.map((item, index) => {
            return (
              <div className="option_item" key={index}>
                <div className="option_item_title">
                  <img
                    src={`./assets/h5_images/${item._underlying}.png`}
                    alt=""
                  />
                  <span>{item._underlying}</span>
                  <div>
                    <i></i>
                    <span>{parseInt(item.remain) ? t("t22") : t("t23")}</span>
                  </div>
                </div>
                <div className="option_item_text">
                  <p>
                    <span>{t("t39")}</span>
                    <span>{mul(item.vol, item._strikePrice)}</span>
                  </p>
                  <p>
                    <span>{t("t32")}</span>
                    <span>{mul(item.vol, item._strikePrice)}</span>
                  </p>
                </div>
                <div className="option_item_text">
                  <p>
                    <span>{t("t84")}</span>
                    <span>
                      {mul(parseFloat(item.price), parseFloat(item.volume))}
                      {item.settleToken}
                    </span>
                  </p>
                  <p>
                    <span>{t("t48")}</span>
                    <span>
                      {t[index]
                        ? this.formatExpiry(item._expiry)
                        : moment(parseInt(item._expiry)).format(
                          "MMMM Do YYYY, h:mm:ss"
                        )}
                    </span>
                  </p>
                </div>
                <div className="options_button">
                  <button
                    onClick={() => {
                      this.changeWarningBox("activate", index);
                    }}
                  >
                    {t("t87")}
                  </button>
                  {/* <button>归还</button> */}
                </div>
              </div>
            );
          })}
        </div>
      </TransactionStyled>
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
export default connect(mapStateToProps, mapDispatchToProps)(Page3Insure);
