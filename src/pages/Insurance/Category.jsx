import React, { Component } from "react";
import { t } from "../../locale/locales";
import { CategoryStyle } from "./styled";

export default class Category extends Component {
  constructor(props) {
    super();
    this.state = {
      ...props,
    };
  }
  componentDidMount() {
    window.onresize = function () {};
  }
  cancelSelectBox = () => {
    this.refs[this.state.flag].checked = false;
  };

  render() {
    return (
      <CategoryStyle>
        <h5>{t("t30")}</h5>

        <label htmlFor={this.state.flag}>
          <div>
            {/* <img src={'/assets/arrows/' + this.props.current_category + '@2x.png'} alt="" /> */}
            <img
              src={
                "/assets/images/" + this.props.current_category + "_logo.png"
              }
              alt=""
            />
            {this.props.current_category}
            <img src="/assets/arrows/pull.png" alt="" />
          </div>
        </label>
        <input
          type="checkbox"
          name={this.state.flag}
          id={this.state.flag}
          ref={this.state.flag}
        />
        <ul className="category_ul">
          {this.state.category_list.map((item, index) => {
            // if (item === this.state.current_category) return <></>
            return (
              <li
                key={item + index}
                onClick={() => {
                  this.state.handelClickCategoryItem(item, this.state.flag);
                  this.cancelSelectBox();
                }}
              >
                <img src={`/assets/images/${item}_logo.png`} alt="" />
                {item}
              </li>
            );
          })}
        </ul>
      </CategoryStyle>
    );
  }
}
