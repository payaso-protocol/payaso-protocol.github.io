import React, { Component } from "react";
import { TransactionStyled } from "./styled";

// import Page1Underwrite from './Page1_underwrite'
// import Page3Insure from './Page3_insure'
import Page3Underwrite from "./Page3_underwrite";
import Page3Advertising from "./Page3_advertising";
import Settlement from "./Settlement";

export default class index extends Component {
  constructor(props) {
    super();
    this.state = {
      type: props.match.params.type,
      // navList: window.localStorage.getItem('lang') === 'en_US' ?
      //     ['Borrow Orders', 'Supply Orders', 'Supply Advertising'] :
      //     ['投保订单', '承保订单', '承保广告'],
      navList: ["Orders", "Advertising"],
      // currentNav: window.localStorage.getItem('lang') === 'en_US' ?
      //     'Borrow Orders' : '投保订单',
      currentNav: "Orders",
      initDone: true,
      settlement_list: [],
    };
  }

  changeSettlementList = (arr) => {
    this.setState({
      settlement_list: arr,
    });
  };

  handelClickNav = (item) => {
    this.setState({
      currentNav: item,
    });
  };

  renderNav = () => {
    switch (this.state.currentNav) {
      // case '投保订单':
      //     return <Page3Insure></Page3Insure>
      // case 'Borrow Orders':
      //     return <Page3Insure></Page3Insure>
      // case '承保订单':
      //     return <Page3Underwrite></Page3Underwrite>
      case "Orders":
        return (
          <Page3Underwrite changeSettlementList={this.changeSettlementList} />
        );
      // case '承保广告':
      //     return <Page3Advertising></Page3Advertising>
      case "Advertising":
        return <Page3Advertising></Page3Advertising>;
      default:
        return <></>;
    }
  };

  renderPage() {
    return (
      <div className="container">
        <Settlement />
        <div className="nav">
          <ul>
            {this.state.navList.map((item, index) => {
              return (
                <li
                  key={item + index}
                  className={this.state.currentNav === item ? "active" : ""}
                  onClick={() => {
                    this.handelClickNav(item);
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        {this.renderNav()}
      </div>
    );
  }

  render() {
    return <TransactionStyled>{this.renderPage()}</TransactionStyled>;
  }
}
