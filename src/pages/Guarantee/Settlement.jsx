import React, { Component } from "react";
import { connect } from "react-redux";
import { t } from "../../locale/locales";
import { SettlementStyled } from "./styled";
import { settleable, burn, settle } from "../../abi/factory";
import { web3 as Web3 } from "../../abi";
import { getBalance } from "../../abi/order";
import { getWei, getSymbol, getID, wrapperAdress } from "../../static/utils/AdressPool";
import { add, mul } from "../../static/utils/calculate";
import precision from "../../static/utils/precision";

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
    setTimeout(async () => {
      // let data = JSON.parse(window.localStorage.getItem("long_map"));
      let data = JSON.parse(window.localStorage.getItem("about_info_shell"));
      // 转换成数组
      let data_arr = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          data_arr.push(data[key]);
        }
      }
      const charID = await getID()
      // console.log("wrapperAdress('LONG', charID)#####", wrapperAdress('LONG', charID));
      // let testAddress = '0x0603CD787f45D1b830cEd5AcaEECDaB661B267ca';
      // console.log('data####', data);
      // 过滤数据
      let new_data = data_arr.filter((item) => {
        // return true;
        // if (charID === 1) return true
        // if (item.count < 63) {
        //   return false;
        // }
        // console.log('web3.currentProvider.selectedAddress####', web3.currentProvider.selectedAddress);
        // if (!web3.currentProvider.selectedAddress) return false;
        // if (
        //   item.creator.toLowerCase() ===
        //   web3.currentProvider.selectedAddress.toLowerCase()
        //   // testAddress.toLowerCase()
        // ) {
        //   return true;
        // }
        // return false;
        if (
          item.seller.toLowerCase() ===
          web3.currentProvider.selectedAddress.toLowerCase()
          // testAddress.toLowerCase()
        ) {
          return true;
        }
      });
      // let arr = []
      const  promiseArr = [];
      const result = [];
      let longBalance;
      let shortBalance, _collateral, _underlying, item;
      // new_data.forEach(async (item) => {
      for (let i = 0; i < new_data.length; i ++) {
        item = new_data[i];
        _collateral = getSymbol(item.longInfo._collateral, charID)[0];
        longBalance = await getBalance(item.longInfo.long, _collateral);
        _underlying = getSymbol(item.longInfo._underlying, charID)[0];
        shortBalance = await getBalance(item.longInfo.short, _collateral);
        if (Number(shortBalance) > 0 && Number(longBalance) > 0) {
          result.push({
            creator: item.seller,
            _collateral,
            _underlying,
            col: 0,
            fee: 0,
            // und: web3.utils.fromWei(res.und, getWei(item._underlying, charID)),
            und: 0,
            long: item.longInfo.long,
            short: item.longInfo.short,
            longBalance: longBalance,
          });
        } 
        let number = Number(shortBalance) - Number(longBalance);
        if (number > 0) {
          
          // number = web3.utils.toBN(String(number));
          // console.log('number######', String(number));
          try {
            let volume = web3.utils.toWei(String(number), getWei(_collateral, charID));
            const settle = await settleable(item.longInfo.short, volume);
            if (settle.col !== "0" || settle.und !== "0") {
              result.push({
                creator: item.seller,
                _collateral,
                _underlying,
                col: web3.utils.fromWei(settle.col, getWei(item.longInfo._collateral, charID)),
                fee: web3.utils.fromWei(settle.fee, getWei(item.longInfo._collateral, charID)),
                und: web3.utils.fromWei(settle.und, getWei(item.longInfo._collateral, charID)),
                long: item.longInfo.long,
                short: item.longInfo.short,
                longBalance: Number(longBalance) > 0 ? String(number) : 0,
              });
            }
          } catch(err) {}
        } 
      }
      this.setState({
        settlement_list: result,
      }); 

      // });
      return;
      // Promise.all(
      //   new_data.map(async (item) => {
      //     try {
      //       console.log('item.short####', item.short);
      //       const res = await settleable(item.creator, item.short);
      //       let _collateral = getSymbol(item._collateral, charID)[0];
      //       const longBalance = await getBalance(item.long, _collateral);
      //       console.log('longBalance#####', longBalance);
      //       let _underlying = getSymbol(item._underlying, charID)[0];
      //       const shortBalance = await getBalance(item.short, _underlying);
      //       console.log('shortBalance#####', shortBalance);
      //       if (longBalance !== "0" && shortBalance !== "0") {
      //         return (item = {
      //           creator: item.creator,
      //           _collateral: getSymbol(item._collateral, charID)[0],
      //           _underlying: getSymbol(item._underlying, charID)[0],
      //           col: web3.utils.fromWei(res.col, getWei(item._collateral, charID)),
      //           fee: web3.utils.fromWei(res.fee, getWei(item._collateral, charID)),
      //           // und: web3.utils.fromWei(res.und, getWei(item._underlying, charID)),
      //           und: shortBalance,
      //           long: item.long,
      //           short: item.short,
      //           longBalance: longBalance,
      //         });
      //         // arr.push(item)
      //       }
      //       if (res.col !== "0" || res.und !== "0") {
      //         return (item = {
      //           creator: item.creator,
      //           _collateral: getSymbol(item._collateral, charID)[0],
      //           _underlying: getSymbol(item._underlying, charID)[0],
      //           col: web3.utils.fromWei(res.col, getWei(item._collateral, charID)),
      //           fee: web3.utils.fromWei(res.fee, getWei(item._collateral, charID)),
      //           und: web3.utils.fromWei(res.und, getWei(item._underlying, charID)),
      //           long: item.long,
      //           short: item.short,
      //           longBalance: 0,
      //         });
      //         // arr.push(item)
      //       }
      //       // let _collateral = getSymbol(item._collateral, charID)[0];
      //       // const longBalance = await getBalance(item.long, _collateral);
      //       // if (longBalance !== "0") {
      //       //   return (item = {
      //       //     creator: item.creator,
      //       //     _collateral: getSymbol(item._collateral, charID)[0],
      //       //     _underlying: getSymbol(item._underlying, charID)[0],
      //       //     col: web3.utils.fromWei(res.col, getWei(item._collateral, charID)),
      //       //     fee: web3.utils.fromWei(res.fee, getWei(item._collateral, charID)),
      //       //     und: web3.utils.fromWei(res.und, getWei(item._underlying, charID)),
      //       //     long: item.long,
      //       //     short: item.short,
      //       //     longBalance: longBalance,
      //       //   });
      //       //   // arr.push(item)
      //       // }
      //     } catch (error) {

      //     }
      //   })
      // ).then((res) => {
      //   const list = res.filter((r) => r);
      //   this.setState({
      //     settlement_list: list,
      //   });
      // });
    }, 300);

  };

  handelClickSettle = async (item, index) => {
    // return;
    if (item.longBalance != 0) {
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
            {this.state.settlement_list.length === 0 ?
              <tr className='queshen_tr'>
                <td className='quesheng'>
                  <img src="/assets/images/queshen.png" alt="" />
                  <p>No undrawn funds</p>
                </td>
              </tr> : <tr></tr>
            }
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
                <td>{mul(item.und, 1)} {item._underlying}</td>
                {/* <td>{item.col} {item.longBalance} {add(item.col, item.longBalance)} {item._collateral}</td> */}
                <td>{precision.plus(item.col, item.longBalance)} {item._collateral}</td>
                <td>
                  <button
                    className={item.state === 'active' ? 'active' : ''}
                    onClick={() => {
                      this.handelClickSettle(item, index);
                    }}>Claim</button>
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
