import React, { Component, Fragment } from "react";
import { t } from "../../locale/locales";
import { DownLoadStyle } from "./styled";
import Security from "./Security";
export default class index extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <DownLoadStyle>
        <div className="top_banner">
          <h1>{t("t5")}</h1>
        </div>
        <Fragment>
          <Security />
        </Fragment>
      </DownLoadStyle>
    );
  }
}
