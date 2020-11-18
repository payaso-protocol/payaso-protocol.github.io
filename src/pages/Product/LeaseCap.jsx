import React, { Component } from "react";
import { connect } from "react-redux";

import { LeaseCapStyled } from "./styled";
import moment from "moment";
import { buyInsurance, getBalance } from "../../abi/order";
import { t } from "../../locale/locales";
import { accDiv, mul } from "../../static/utils/calculate";

export class LeaseCap extends Component {
  constructor(props) {
    super();
    this.state = {
      inputVal: "",
      settleToken: props.current_item.settleToken,
      balance: "",
      payLook: true,
    };
  }

  handelChangeInput = (e, remain) => {
    let val = e.target.value;

    if (val.indexOf(".") !== -1) {
      let str = (val + "").substr(val.indexOf("."));
      if (str.length > 3) {
        val = parseFloat(val).toFixed(2);
      }
    }

    if (parseFloat(val) > parseFloat(remain)) {
      val = remain;
    }

    this.checkBalance(val);

    this.setState({
      inputVal: val,
    });
  };

  componentDidMount() {
    getBalance(this.state.settleToken).then((res) => {
      this.setState({
        balance: res,
      });
    });
  }

  checkBalance = (val) => {
    let balance = parseFloat(this.state.balance);
    const { price, _strikePrice } = this.props.current_item;
    let pay = (mul(accDiv(price, _strikePrice), (val || 0)));
    if (pay !== 0 && balance > pay) {
      this.setState({
        payLook: false,
      });
    }
  };

  handelClickLeaseCap = (data) => {
    this.props.handelClickLeaseCap();
    buyInsurance(data, (status) => {
      console.log(status);
      if (status === "pending") {
        this.props.sendAction("Status", "padding");
      } else if (status === "approve") {
        this.props.sendAction("Status", "approve");
      } else if (status === "success" || status === "failed") {
        this.props.sendAction("Status", "off");
      }
    });
  };

  render() {
    const {
      askID,
      price,
      remain,
      _expiry,
      settleToken,
      _strikePrice,
    } = this.props.current_item;
    // console.log(this.props.current_item);
    return (
      <LeaseCapStyled>
        <div className="container">
          <div className="title">
            <h4>{t("t67")}</h4>
            <img
              src="/assets/icons/guanbi.png"
              alt=""
              onClick={() => {
                this.props.handelClickLeaseCap();
              }}
            />
          </div>
          <div className="input_box">
            <h3>{t("t32")}</h3>
            <div>
              <input
                type="number"
                placeholder={t("t51")}
                autoFocus={true}
                value={this.state.inputVal}
                onChange={(e) => {
                  this.handelChangeInput(e, mul(parseInt(remain), _strikePrice));
                }}
              />
              <span>{t("t52")}</span>
            </div>
            <p>
              <span>{t("t69", { num: mul(remain, _strikePrice) })}</span>
              <span>
                {t("t70")} {parseFloat(this.state.balance).toFixed(4)}{" "}
                {this.state.settleToken}
              </span>
            </p>
          </div>
          <div className="procedure">
            <span title={t("t71")}>{t("t73")}</span>
            <span>
              {
                mul((accDiv(parseFloat(price), _strikePrice)), this.state.inputVal)
              }{" "}
              {this.state.settleToken}
            </span>
          </div>
          <div className="expire">
            <span title={t("t72")}>{t("t74")}</span>
            <span>{moment(parseInt(_expiry)).format("llll")}</span>
          </div>
          <div className="submit">
            <span>{t("t75")}</span>
            <div>
              {this.state.payLook ? (
                <button className="insufficient">Insufficient</button>
              ) : (
                  <button
                    onClick={() => {
                      this.handelClickLeaseCap({
                        settleToken: settleToken,
                        _strikePrice: _strikePrice,
                        price: price,
                        askID: askID,
                        volume: this.state.inputVal,
                      });
                    }}
                  >
                    {t("t76")}
                  </button>
                )}
            </div>
          </div>
        </div>
      </LeaseCapStyled>
    );
  }
}

const mapStateToProps = (state) => ({});

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
export default connect(mapStateToProps, mapDispatchToProps)(LeaseCap);
