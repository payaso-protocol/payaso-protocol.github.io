import React, { Component } from "react";
import { connect } from "react-redux";
import Option from "./Option";
import { t } from "../../locale/locales";
import { UnderwriteStyled } from "./styled";

import { web3 as Web3 } from "../../abi";
import { getSymbol, getWei, getID } from "../../static/utils/AdressPool";
import moment from "moment";
import { mul, accDiv } from '../../static/utils/calculate'
import { getExercise } from "../../abi/order";

class Page3Underwrite extends Component {
  constructor(props) {
    super();
    this.state = {
      option_data: {
        category: "WETH",
        currency: ["USDT", "USDC", "DAI"],
        status: "All",
        expire: 0,
      },
      ListArr: [],
      backup_list: [],
      startPageNum: 0,
      endPageNum: 10,
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = async () => {
    const web3 = await Web3();
    const charID = await getID();
    setTimeout(() => {
      // let info = JSON.parse(window.localStorage.getItem('about_myinfo'))
      let info = JSON.parse(window.localStorage.getItem("about_info_buy"));
      const new_data = info.filter((item) => {
        // 按条件过滤
        if (!web3.currentProvider.selectedAddress) return false;
        return (
          item.sellInfo.seller.toLowerCase() ===
          web3.currentProvider.selectedAddress.toLowerCase()
          // '0x0603CD787f45D1b830cEd5AcaEECDaB661B267ca'.toLowerCase()
        );
      });
      const super_data = new_data.map((item) => {
        let _collateral = getSymbol(item.sellInfo.longInfo._collateral, charID)[0];
        return {
          // 第一层数据
          askID: item.askID,
          bidID: item.bidID,
          buyer: item.buyer,
          amt: web3.utils.fromWei(item.amt, getWei(_collateral)),
          vol: web3.utils.fromWei(item.vol, getWei(_collateral)),
          // 第二层数据
          seller: item.sellInfo.seller,
          volume: web3.utils.fromWei(item.sellInfo.volume, getWei(_collateral)),
          settleToken: getSymbol(item.sellInfo.settleToken, charID)[0],
          price: web3.utils.fromWei(item.sellInfo.price, getWei(_collateral)),

          // 第三层数据
          creator: item.sellInfo.longInfo.creator,
          _expiry: parseInt(item.sellInfo.longInfo._expiry) * 1000,
          _underlying: getSymbol(item.sellInfo.longInfo._underlying, charID)[0],
          _collateral: _collateral,
          _strikePrice: web3.utils.fromWei(item.sellInfo.longInfo._strikePrice, getWei(_collateral)),
          short: item.sellInfo.longInfo.short,
          count: item.sellInfo.longInfo.count
        };
      });

      let time = new Date().getTime()
      const super_data_2 = super_data.map((item) => {
        if (item._expiry < time) {
          return {
            ...item,
            status: 'Dated',
            sort: 0
          }
        } else {
          return {
            ...item,
            status: 'Processed',
            sort: 2
          }
        }
      });
      this.getRemain(super_data_2);
    }, 300);

  };

  getRemain = async (super_data) => {
    Promise.all(super_data.map(async item => {
      const res = await getExercise(item.buyer)
      const bidID_Arr = res.map(item => {
        return item.returnValues.bidID
      })
      if (bidID_Arr.includes(item.bidID)) {
        return {
          ...item,
          status: 'Activated',
          sort: 1
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
    // try {
    //   const res = await getExercise(super_data[0].buyer)
    //   const bidID_Arr = res.map(item => {
    //     return item.returnValues.bidID
    //   })
    //   const super_data_2 = super_data.map(item => {

    //     if (bidID_Arr.includes(item.bidID)) {
    //       return {
    //         ...item,
    //         status: 'Activated',
    //         sort: 1
    //       }
    //     } else {
    //       return item
    //     }
    //   })

    //   const data = super_data_2.sort((a1, a2) => {
    //     return a2.sort - a1.sort;
    //   })

    //   this.setState({
    //     ListArr: data,
    //     backup_list: data,
    //   });
    // } catch (error) {
    //   console.log(error)
    // }
  };

  filterByoption = () => {
    let data = this.state.backup_list;
    let option = this.state.option_data;

    const res = data.filter((item) => {
      // filter Type
      if (item._underlying !== option.category) return false;
      // filter Collateral
      if (!option.currency.includes(item._collateral)) return false;
      // return true
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

  handleClickPageUp() {
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

  handleClickPageDown() {
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

  render() {
    let { startPageNum, endPageNum } = this.state;
    let ListArr = JSON.parse(JSON.stringify(this.state.ListArr)).splice(
      startPageNum,
      endPageNum
    );
    return (
      <UnderwriteStyled>
        <Option
          currentNav='underwrite'
          current_category={this.state.option_data.category}
          handelClickCategoryItem={this.handelClickCategoryItem}
          changeOptionData={this.changeOptionData}
          filterByoption={this.filterByoption}
        ></Option>
        <table>
          <thead>
            <tr>
              <th>{t("t30")}</th>
              <th className="price">
                <span>{t("t39")}</span>
                <i className="info" title={t("t88")}></i>
              </th>
              <th>{t("t32")}</th>
              <th>{t("t89")}</th>
              <th>
                {t("t54")}
                <i className="info" title={t("t82")}></i>
              </th>
              <th>
                {t("t48")}
                <i className="info" title={t("t83")}></i>
              </th>
              <th>{t("t19")}</th>
            </tr>
          </thead>
          <tbody>
            {ListArr.map((item, index) => {
              return (
                <tr key={index + "a"}>
                  <td>{item._underlying}</td>
                  <td>
                    {accDiv(1, item._strikePrice)} {item._collateral}
                  </td>
                  <td>
                    {mul(item.vol, item._strikePrice)} {t("t93")}
                  </td>
                  <td>
                    {mul(item.vol, 1)} {item._collateral}
                  </td>
                  <td>
                    {mul(item.price,item.vol)} {item.settleToken}
                  </td>
                  <td>
                    {moment(parseInt(item._expiry)).format(
                      "MMMM Do YYYY, HH:mm:ss"
                    )}
                  </td>
                  <td className="confirm_ing">
                    {item.status}
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
        <div className="option_wrap">
          {this.state.ListArr.map((item, index) => {
            return (
              <div className="option_item" key={index + "b"}>
                <div className="option_item_title">
                  <img
                    src={`./assets/h5_images/${item._underlying}.png`}
                    alt=""
                  />
                  <span>{item._underlying}</span>
                  <div>
                    <i></i>
                    <span>{item.remain ? t("t15") : t("t23")}</span>
                  </div>
                </div>
                <div className="option_item_text">
                  <p>
                    <span>{t("t39")}</span>
                    <span>
                      {1 / item._strikePrice} {item._collateral}
                    </span>
                  </p>
                  <p>
                    <span>{t("t32")}</span>
                    <span>
                      {item.volume * item._strikePrice} {t("t93")}
                    </span>
                  </p>
                </div>
                <div className="option_item_text">
                  <p>
                    <span>{t("t89")}</span>
                    <span>
                      {item.volume} {item._collateral}
                    </span>
                  </p>
                  <p>
                    <span>{t("t54")}</span>
                    <span>
                      {item.price} {item._collateral}
                    </span>
                  </p>
                </div>
                <div className="option_item_text">
                  <p>
                    <span>{t("t48")}</span>
                    <span>
                      {moment(parseInt(item._expiry)).format(
                        "MMMM Do YYYY, h:mm:ss"
                      )}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </UnderwriteStyled>
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

export default connect(mapStateToProps, mapDispatchToProps)(Page3Underwrite);
