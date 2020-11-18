import React, { Component } from "react";
import { connect } from "react-redux";
import { t } from "../../locale/locales";
import { SettlementStyled } from "./styled";
import { settleable, burn, settle } from "../../abi/factory";
import { web3 as Web3 } from "../../abi";
import { getBalance } from "../../abi/order";
import { getWei, getSymbol, getID } from "../../static/utils/AdressPool";

export class Settlement extends Component {
  constructor() {
    super();
    this.state = {
      settlement_list: [],
    };
  }

  componentDidMount() {
    this.getsettlementList();
  }

  getsettlementList = async () => {
    const web3 = await Web3();
    const charID = await getID();
    setTimeout(async () => {
      let data = JSON.parse(window.localStorage.getItem("long_map"));

      // 转换成数组
      let data_arr = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          data_arr.push(data[key]);
        }
      }
      // 过滤数据
      let new_data = data_arr.filter((item) => {
        if (item.count < 40) {
          return false;
        }
        if (!web3.currentProvider.selectedAddress) return false;
        if (
          item.creator.toLowerCase() ===
          web3.currentProvider.selectedAddress.toLowerCase()
        ) {
          return true;
        }
        return false;
      });
      // let arr = []
      Promise.all(
        new_data.map(async (item) => {
          const res = await settleable(item.creator, item.short);
          if (res.col !== "0" || res.und !== "0") {
            return (item = {
              creator: item.creator,
              _collateral: getSymbol(item._collateral, charID)[0],
              _underlying: getSymbol(item._underlying, charID)[0],
              col: web3.utils.fromWei(res.col, getWei(item._collateral)),
              fee: web3.utils.fromWei(res.fee, getWei(item._collateral)),
              und: web3.utils.fromWei(res.und, getWei(item._underlying)),
              long: item.long,
              short: item.short,
              longBalance: 0,
            });
            // arr.push(item)
          }
          const longBalance = await getBalance(item.long);
          if (longBalance !== "0") {
            return (item = {
              creator: item.creator,
              _collateral: getSymbol(item._collateral, charID)[0],
              _underlying: getSymbol(item._underlying, charID)[0],
              col: web3.utils.fromWei(res.col, getWei(item._collateral)),
              fee: web3.utils.fromWei(res.fee, getWei(item._collateral)),
              und: web3.utils.fromWei(res.und, getWei(item._underlying)),
              long: item.long,
              short: item.short,
              longBalance: longBalance,
            });
            // arr.push(item)
          }
        })
      ).then((res) => {
        const list = res.filter((r) => r);
        this.setState({
          settlement_list: list,
        });
      });
    }, 500);
  };

  handelClickSettle = async (item, index) => {
    if (item.longBalance !== 0) {
      // burn
      burn(
        item.short,
        item.longBalance,
        { _collateral: item._collateral },
        (status) => {
          console.log(status);
        }
      );
    } else {
      // 正常结算
      settle(item.short, (status) => {
        console.log(status);
        // let item_status = ''
        // switch (status) {
        //   case 'pending':
        //     item_status = 'active'
        //     break;
        //   case 'approve':
        //     item_status = 'active'
        //     break;

        //   default:
        //     item_status = ''
        //     break;
        // }
        // let list = this.state.settlement_list
        // list[index].status = 'active'
        // this.setState({
        //   settlement_list: list
        // })
      });
    }


  };

  render() {
    return (
      <SettlementStyled>
        <h1>{t("t107")}</h1>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>underlying</th>
              <th>collaborate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.settlement_list.map((item, index) => {
              return (<tr key={index + 'a'}>
                <td>
                  <img
                    className='un_logo'
                    src={`/assets/images/${item._underlying}@2x.png`}
                    alt=""
                  />
                  <h5>{item._underlying}</h5>
                </td>
                <td>{item.und} {item._underlying}</td>
                <td>{item.col} {item._collateral}</td>
                <td>
                  <button
                    className={item.state === 'active' ? 'active' : ''}
                    onClick={() => {
                      this.handelClickSettle(item, index);
                    }}>结算</button>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
      </SettlementStyled>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Settlement);
