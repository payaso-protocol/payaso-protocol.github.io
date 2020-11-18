import { web3 } from '../../abi'
import adressList from '../../abi/config'
// import { ChainId } from '@uniswap/sdk'
// console.log(`The chainId of mainnet is ${ChainId.MAINNET}.`)

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
    return wrapperAdress(item, (charID = 3)) === adress.toLowerCase();
  });
  if (symbol) {
    return symbol;
  } else {
    return ["NULL"];
    // return console.log(adress + '没有找到对应的Symbol')
  }
};

export const getWei = (token) => {
  let reg = /^0x[\S]+/;
  if (reg.test(token)) {
    // 0x adress
    token = getSymbol(token)[0];
  }
  switch (token) {
    case "USDT":
      return "lovelace"; // 6
    case "USDC":
      return "lovelace"; // 6
    default:
      return "ether"; // 18
  }
};

const selectNET = (charID) => {
  switch (charID) {
    case 1:
      return "Main";

    default:
      return "Ropsten";
  }
};

// getID
export const getID = async () => {
    const web3_A = await web3();
    if(web3_A.eth.net.getId()){
      return web3_A.eth.net.getId();
    }
};


// UniSwap SDK
const uniswap = (token1, token2) => {
  // console.log(123)
  // const HOT = new Token(ChainId.MAINNET, '0xc0FFee0000000000000000000000000000000000', 18, 'HOT', 'Caffeine')
  // const NOT = new Token(ChainId.MAINNET, '0xDeCAf00000000000000000000000000000000000', 18, 'NOT', 'Caffeine')
}



uniswap()