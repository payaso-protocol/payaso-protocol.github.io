import { web3 as Web3 } from "../../abi";
import adressList from "../../abi/config";
import {
  Token,
  WETH,
  Fetcher,
  Trade,
  Route,
  TokenAmount,
  TradeType,
} from "@uniswap/sdk";

export const wrapperAdress = (symbol, charID = 3) => {
  const network = selectNET(charID);
  let adress = adressList[`${network}_${symbol}`];

  if (adress) {
    return adress.toLowerCase();
  } else {
    // console.log(symbol + '获取失败，请确定地址池中存在对应地址')
    return null;
  }
};

export const wrapperContract = (name, charID = 3) => {
  const network = selectNET(charID);
  let contract = adressList[`${network}_CONTRACT_${name}`];
  if (contract) {
    return contract;
  } else {
    // console.log(name + '获取失败，请确定地址池中存在对应合约')
    return null;
  }
};

export const getSymbol = (adress, charID = 3) => {
  let symbol_list = ["WETH", "USDT", "USDC", "DAI", "WBTC", "CRV", "UNI"];

  const symbol = symbol_list.filter((item) => {
    return wrapperAdress(item, charID) === adress.toLowerCase();
  });
  if (symbol) {
    return symbol;
  } else {
    return ["NULL"];
    // return console.log(adress + '没有找到对应的Symbol')
  }
};

export const newGetSymbol = (adress, charID = 3) => {
  let symbol_list = ["WETH", "USDT", "USDC", "DAI", "WBTC", "CRV", "UNI"];

  const symbol = symbol_list.filter((item) => {
    return wrapperAdress(item, charID) === adress.toLowerCase();
  });
  if (symbol) {
    return symbol[0];
  } else {
    return null;
    // return console.log(adress + '没有找到对应的Symbol')
  }
};

export const getWei = (token, charID = 3) => {
  let reg = /^0x[\S]+/;
  if (reg.test(token)) {
    // 0x adress
    token = getSymbol(token, charID)[0];
  }
  // console.log('token####', token);
  switch (token) {
    case "USDT":
      return "lovelace"; // 6
    case "USDC":
      return "lovelace"; // 6
    default:
      return "ether"; // 18
  }
};

export const getWei_2 = (token) => {
  let reg = /^0x[\S]+/;

  if (reg.test(token)) {
    // 0x adress
    token = getSymbol(token)[0];
  }

  switch (token) {
    case "USDT":
      return 6; // 6
    case "USDC":
      return 6; // 6
    // case "WBTC":
    //   return 8;
    default:
      return 18; // 18
  }
};

const selectNET = (charID) => {
  switch (charID) {
    case 1:
      return "Main";

    default:
      // return "Ropsten";
      return "Rinkeby";
  }
};

// getID
export const getID = async () => {
  const web3_A = await Web3();
  window.chainID = web3_A.eth.net.getId().then((r) => r);
  return window.chainID;
};

// UniSwap SDK
export const uniswap = async (token1, token2, charID = 3) => {
  const web3 = await Web3();
  const adress1 = wrapperAdress(token1, charID);
  const adress2 = wrapperAdress(token2, charID);
  const TOKEN1 = new Token(charID, adress1, getWei_2(token1), token1, token1);
  const TOKEN2 = new Token(charID, adress2, getWei_2(token2), token2, token2);
  try {
    const pair = await Fetcher.fetchPairData(TOKEN2, TOKEN1);
    const route = new Route([pair], TOKEN1);
    // let route;
    // if (token1 === 'WBTC') {
    //   const WETHTOKEN = new Token(charID, wrapperAdress('WETH', charID), getWei_2('WETH'), 'WETH', 'WETH');
    //   const pair1 = await Fetcher.fetchPairData(WETHTOKEN, TOKEN2);
    //   const pair2 = await Fetcher.fetchPairData(TOKEN1, WETHTOKEN);
    //   route = new Route([pair1, pair2], TOKEN1);
    // } else {
    //   route = new Route([pair], TOKEN1);
    // }
    // console.log(route.midPrice.toSignificant(6)) // 202.081
    // console.log(route.midPrice.invert().toSignificant(6)) // 0.00494851
    if (token1 == "WBTC") {
      return route.midPrice.toSignificant(6) / 10000000000;
    }
    return route.midPrice.toSignificant(6);
    // const trade = new Trade(route, new TokenAmount(TOKEN1, web3.utils.toWei('1', getWei(token1))), TradeType.EXACT_INPUT)
    // console.log(trade.executionPrice.toSignificant(6))
    // console.log(trade.nextMidPrice.toSignificant(6))
    // return trade.executionPrice.toSignificant(6)
  } catch (error) {
    const charID = 1;
    const adress1 = wrapperAdress(token1, charID);
    const adress2 = wrapperAdress(token2, charID);
    const TOKEN1 = new Token(charID, adress1, getWei_2(token1), token1, token1);
    const TOKEN2 = new Token(charID, adress2, getWei_2(token2), token2, token2);
    const pair = await Fetcher.fetchPairData(TOKEN2, TOKEN1);
    const route = new Route([pair], TOKEN1);

    if (token1 == "WBTC") {
      return route.midPrice.toSignificant(6) / 10000000000;
    }
    return route.midPrice.toSignificant(6);
    // const trade = new Trade(route, new TokenAmount(TOKEN1, web3.utils.toWei('1', getWei(token1))), TradeType.EXACT_INPUT)
    // return trade.executionPrice.toSignificant(6)

    // console.log(WETH[charID], TOKEN1, TOKEN2)
    // // const WETHToken1Pair = await Fetcher.fetchPairData(WETH[charID], TOKEN1)
    // const Token2WETHPair = await Fetcher.fetchPairData(TOKEN2, WETH[charID])
    // console.log(Token2WETHPair)

    // const route = new Route([WETHToken1Pair, Token2WETHPair], WETHToken1Pair)

    // console.log(route.midPrice.toSignificant(6)) // 202.081
    // console.log(route.midPrice.invert().toSignificant(6)) // 0.00494851
  }
};

// setTimeout(() => {
//   uniswap('WETH', 'USDT', 1)
// }, 300)
