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
          PAYASO smart contracts were Audited by KNOWNSEC.However, security
          audits don't eliminate risks completely. Please don’t supply your life
          savings, or assets you can’t afford to lose, to PAYASO, especially as
          a liquidity provider.Using PAYASO as an exchange user should be
          significantly less risky, but this is not advice.
        </p>
        <div className="Security_link">
          <a>Download the PAYASO Smart Contract Audit Report.pdf</a>
          <a>View the Contract Address</a>
        </div>
      </div>
    );
  }
}
