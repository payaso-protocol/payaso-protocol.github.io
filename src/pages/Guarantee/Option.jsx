import React, { Component } from "react";
import { t } from "../../locale/locales";
import { OptionStyled } from "./styled";
import Category from "./Category";

export default class Option extends Component {
  constructor(props) {
    super();
    this.state = {
      currentPage: props.currentPage,
      currency_list: [
        {
          name: "USDT",
          open: true,
        },
        {
          name: "USDC",
          open: true,
        },
        {
          name: "DAI",
          open: true,
        },
      ],
      data_list: [t("t20"), t("t25"), t("t26"), t("t27"), t("t28")],
      state_list: ["All"],
    };
  }

  componentDidMount() {
    this.initStateList();
  }
  initStateList = () => {
    let hash = window.location.hash;
    let arr = [];
    switch (hash) {
      case "#/transaction/sell":
        arr = ["All", "Being borrowed", "Closed"];
        break;
      case "#/transaction/buy":
        arr = ["All", "Inactivation", "Closed"];
        break;
      default:
        arr = ["All"];
        break;
    }
    this.setState({
      state_list: arr,
    });
  };

  handelClickSearch = () => {
    this.props.filterByoption();
  };

  handelClickCurrencyItem = (index) => {
    let arr = this.state.currency_list;
    arr[index].open = !arr[index].open;
    this.setState({
      currency_list: arr,
    });
    let newArr = [];
    arr.forEach((item) => {
      if (!item.open) return;
      newArr.push(item.name);
    });
    this.props.changeOptionData({ currency: newArr });
  };

  handelChangeStatus = (e) => {
    this.props.changeOptionData({ status: e.currentTarget.value || t("t20") });
  };

  handelChangeDate = (e) => {
    let times = new Date().getTime();
    console.log(e.currentTarget.value);
    switch (e.currentTarget.value) {
      case "1":
        times = times + 1000 * 60 * 60 * 24 * 1;
        break;
      case "2":
        times = times + 1000 * 60 * 60 * 24 * 3;
        break;
      case "3":
        times = times + 1000 * 60 * 60 * 24 * 7;
        break;
      case "4":
        times = times + 1000 * 60 * 60 * 24 * 30;
        break;
      default:
        times = 0;
    }
    this.props.changeOptionData({ expire: times });
  };

  render() {
    return (
      <OptionStyled>
        <div className="left">
          <Category
            current_category={this.props.current_category}
            handelClickCategoryItem={this.props.handelClickCategoryItem}
            flag="option_data"
          />

          <div className="currency">
            <h5>{t("t18")}</h5>
            <ul>
              {this.state.currency_list.map((item, index) => {
                return (
                  <li
                    key={item.name + index}
                    className={item.open ? "on" : ""}
                    onClick={() => {
                      this.handelClickCurrencyItem(index);
                    }}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="right">
          <div className="status select">
            <h5>{t("t19")}</h5>
            <select
              name="select"
              id="select_status"
              onChange={(e) => {
                this.handelChangeStatus(e);
              }}
            >
              {this.state.state_list.map((item, index) => {
                return (
                  <option key={index + "a"} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="expire select">
            <h5>{t("t24")}</h5>
            <select
              name="select"
              id="select_data"
              onChange={(e) => {
                this.handelChangeDate(e);
              }}
            >
              {this.state.data_list.map((item, index) => {
                return (
                  <option key={item + index} value={index}>
                    {item}
                  </option>
                );
              })}
            </select>
            <button
              onClick={() => {
                this.handelClickSearch();
              }}
            >
              Search
            </button>
          </div>
          {/* <button>{t("t8")}</button> */}
        </div>
      </OptionStyled>
    );
  }
}
