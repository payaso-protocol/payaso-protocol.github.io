import React, { Component } from "react";
import { t } from "../../locale/locales";
export default class index extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="Security_wrap">
        <h3>Security</h3>
        <p>
          PAYASO smart contracts were audited by KNOWNSEC. However, security
          audits don't eliminate risks completely. Please don' t supply your
          life savings or assets you can' t afford to lose.
        </p>
        <div className="Security_link">
          <a target="_blank" href="./assets/doc/en_US.pdf">
            Download the PAYASO Smart Contract Audit Report.pdf
          </a>
          <a
            target="_blank"
            href="https://etherscan.io/address/0xe172500462DCD407f2E42590c4ed21B926c2CC60"
          >
            View the Contract Address
          </a>
        </div>
      </div>
    );
  }
}
