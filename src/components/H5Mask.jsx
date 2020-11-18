import React, { Component } from "react";
import { connect } from "react-redux";
import { H5MaskStyled } from "./styled/H5Mask";
import { t } from "../locale/locales";
import { NavLink } from "react-router-dom";
import { template } from "@babel/core";

class H5Mask extends Component {
  constructor() {
    super();
    this.state = {
      // LangOption: ["中文简体", "English"],
      LangOption: ["English"],
      h5_mask_flag: false,
    };
  }

  renderWallet = () => {
    let account = this.props.props.account.matemask_info.account;
    if (account) {
      let str1 = account.substr(0, 6);
      let str2 = account.substr(-5);
      account = str1 + "..." + str2;
    }
    // let isLogin = true
    switch (this.props.props.account.matemask_info.isLogin) {
      case true:
        return (
          <div>
            <div className="h5_wallet wallet">
              <div className="yes_login">
                {account}
                <i></i>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div
            className="h5_wallet wallet"
            onClick={(e) => {
              this.handleClickMask(e);
            }}
          >
            <div
              className="no_login"
              onClick={() => {
                this.connectWallet();
              }}
            >
              Connect to a wallet
            </div>
          </div>
        );
    }
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  connectWallet = () => {
    this.props.props.account.sendAction("Status", "WalletMask");
  };

  handleClickMask() {
    this.setState({
      h5_mask_flag: !this.state.h5_mask_flag,
    });
  }

  renderDom = () => {
    if (this.state.h5_mask_flag) {
      return (
        <div className="h5_mask">
          <div className="h5_mask_title">
            <img src="./assets/h5_images/logo.png" alt="" />
            <img
              src="./assets/icons/guanbi.png"
              alt=""
              onClick={(e) => {
                this.handleClickMask(e);
              }}
            />
          </div>
          <div className="h5_nav_list">
            {/* <li>
                            LP Plan
                        </li>
                        <li>
                            <NavLink to='/mining'>
                                流动性挖矿
                            </NavLink>
                        </li> */}

            <span>
              <NavLink
                to="/"
                onClick={(e) => {
                  this.handleClickMask(e);
                }}
              >
                {t("t1")}
              </NavLink>
            </span>
            <span>
              <NavLink
                to="/transaction/buy"
                onClick={(e) => {
                  this.handleClickMask(e);
                }}
              >
                {t("t2")}
              </NavLink>
            </span>
            <span>
              <NavLink
                to="/transaction/sell"
                onClick={(e) => {
                  this.handleClickMask(e);
                }}
              >
                {t("t3")}
              </NavLink>
            </span>
            <span
              onClick={(e) => {
                this.handleClickMask(e);
              }}
            >
              <a
                href="http://www.payaso.io/guides"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("t4")}
              </a>
              {/* <NavLink to='/'>
                                {t('t4')}
                            </NavLink> */}
            </span>
          </div>
          <div className="h5_nav_lang">
            {this.state.LangOption.map((item, index) => {
              return (
                <span
                  key={index}
                  onClick={(e) => {
                    this.handleClickMask(e);
                  }}
                >
                  {item}
                </span>
              );
            })}
          </div>
          <span>V 0.1.0</span>
          {this.renderWallet()}
        </div>
      );
    }
  };

  render() {
    return <H5MaskStyled>{this.renderDom()}</H5MaskStyled>;
  }
}
export default H5Mask;
