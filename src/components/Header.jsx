import React, { Component } from "react";
import { HeaderStyled } from "./styled/Header";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { mateMaskInfo } from "../static/utils/Matemask";
// import { FormattedMessage } from 'react-intl'
// import test from '../abi/test'
import H5Mask from "./H5Mask";
import {} from "../abi";
import { t } from "../locale/locales";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isShowLang: false, // 是否展示语言切换框
      LangOption: ["English", "中文简体"],
      currentLang:
        window.localStorage.getItem("lang") === "en_US"
          ? "English"
          : "中文简体",
      windowWidth: "",
      navIndex: 1,
    };
  }

  changeLangShow = () => {
    this.setState({
      isShowLang: !this.state.isShowLang,
    });
  };

  changeLang = async (item) => {
    await this.setState({
      currentLang: item,
    });
    let lang = item === "English" ? "en_US" : "zh_CN";
    window.localStorage.setItem("lang", lang);
    window.location.reload();
  };

  componentDidMount() {
    setTimeout(() => {
      let res = mateMaskInfo();
      this.screenChange();
      if (res.status === -1) {
        return;
      }
      this.props.sendAction("Account", res.data);
    }, 300);

    this.recordNav();
  }

  recordNav = () => {
    let hash = window.location.hash;
    let nav_index = 1;
    switch (hash) {
      case "#/transaction/buy":
        nav_index = 2;
        break;
      case "#/transaction/sell":
        nav_index = 3;
        break;
      default:
        nav_index = 1;
        break;
    }
    this.setState({
      navIndex: nav_index,
    });
  };

  connectWallet = () => {
    this.props.sendAction("Status", "WalletMask");
  };

  renderWallet = () => {
    let account = this.props.matemask_info.account;
    if (account) {
      let str1 = account.substr(0, 6);
      let str2 = account.substr(-5);
      account = str1 + "..." + str2;
    }
    // let isLogin = true
    if (this.state.windowWidth > 450) {
      switch (this.props.matemask_info.isLogin) {
        case true:
          return (
            <div>
              <div className="wallet">
                <div className="yes_login">
                  {account}
                  <i></i>
                </div>
                V 0.1.0
              </div>
            </div>
          );

        default:
          return (
            <div>
              <div className="wallet">
                <div
                  className="no_login"
                  onClick={() => {
                    this.connectWallet();
                  }}
                >
                  Connect to a wallet
                </div>
                V 0.1.0
              </div>
            </div>
          );
      }
    }
  };

  screenChange() {
    let that = this;
    window.onresize = function () {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth;
        that.setState({
          windowWidth: window.fullWidth, // 宽
        });
      })();
    };
    var myEvent = new Event("resize");
    window.dispatchEvent(myEvent);
  }

  onRef = (ref) => {
    this.child = ref;
  };

  handleClickShowMask = (e) => {
    this.child.handleClickMask();
  };

  handelClickNav = (index) => {
    this.setState({
      navIndex: index,
    });
  };

  render() {
    return (
      <HeaderStyled>
        <div>
          <a href="http://payaso.io" target="_blank" rel="noopener noreferrer">
            <img
              src={
                this.state.windowWidth > 450
                  ? "./assets/logo/logo_1.png"
                  : "./assets/h5_images/logo.png"
              }
              alt=""
            />
          </a>
          {this.state.windowWidth > 450 ? (
            <ul className="navList">
              <li className={this.state.navIndex === 1 ? "active" : ""}>
                <NavLink
                  onClick={() => {
                    this.handelClickNav(1);
                  }}
                  to="/"
                >
                  {t("t1")}
                </NavLink>
              </li>
              <li className={this.state.navIndex === 2 ? "active" : ""}>
                <NavLink
                  onClick={() => {
                    this.handelClickNav(2);
                  }}
                  to="/transaction/buy"
                >
                  {t("t2")}
                </NavLink>
              </li>
              <li className={this.state.navIndex === 3 ? "active" : ""}>
                <NavLink
                  onClick={() => {
                    this.handelClickNav(3);
                  }}
                  to="/transaction/sell"
                >
                  {t("t3")}
                </NavLink>
              </li>
              <li>
                <a
                  href="http://www.payaso.io/guides"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("t4")}
                </a>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
        <i
          onClick={(e) => {
            this.handleClickShowMask(e);
          }}
        ></i>
        {this.renderWallet()}
        {/* <div className='_lang_box'>
                        <div className='lan_btn' onClick={this.changeLangShow}>{this.state.currentLang}</div>
                        <ul className={this.state.isShowLang ? 'lan_box showBox' : 'lan_box'}>
                            {this.state.LangOption.map((item, index) => {
                                return <li key={index}
                                    className={item === this.state.currentLang ? 'active' : ''}
                                    onClick={() => {
                                        this.changeLang(item)
                                    }}
                                >{item}</li>

                            })}
                        </ul>
                    </div> */}
        <H5Mask props={{ account: this.props }} onRef={this.onRef} />
      </HeaderStyled>
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

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
