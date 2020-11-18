import { Factory } from "./index.js";
import { getWei } from "~/assets/utils/address-pool.js";
import { toWei, fromWei } from "~/assets/utils/web3-fun.js";
import bus from "~/assets/js/bus";
import Message from "~/components/common/Message";
import { fixD, addCommom } from "~/assets/js/util.js";

let factoryObj = null;
const netObj = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
};
const getFactory = async () => {
  if (!factoryObj) {
    factoryObj = await Factory();
  }
  return factoryObj;
};

export const settleable = async (seller, short) => {
  const factory = await getFactory();
  return factory.methods
    .settleable(seller, short)
    .call()
    .then((res) => {
      return res;
    });
};

export const burn = async (longOrshort, volume, opt = {}, data) => {
  let colValue = addCommom(data.col + Number(data.longBalance), 4);
  let undValue = addCommom(data.und, 4);
  bus.$emit("OPEN_STATUS_DIALOG", {
    type: "pending",
    conText: `<p>Settlement ${addCommom(volume, 4)} ${data._collateral}</p>`,
  });
  const factory = await getFactory();
  const wei = await getWei(opt._collateral);
  let fix = wei === 'lovelace' ? 6 : 18;
  const fixedVolume = fixD(volume, fix);
  // const address = window.WEB3.currentProvider.selectedAddress;
  const address = window.CURRENTADDRESS;
  return factory.methods
    .burn(longOrshort, toWei(fixedVolume, opt._collateral))
    .send({from: address})
    .on('transactionHash', (hash) => {
      bus.$emit('CLOSE_STATUS_DIALOG');
      bus.$emit('OPEN_STATUS_DIALOG', {
        type: 'submit',
        conText: `<a href="https://${
          netObj[Number(window.chainID)]
        }etherscan.io/tx/${hash}" target="_blank">View on Etherscan</a>`,
      });
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      // callBack('success');
      if (confirmationNumber === 0) {
        let confirmationTit = `<div>${colValue > 0 &&
          data._collateral} ${undValue > 0 &&
          ', ' +
            data._underlying} settlement is successful, Please check in the <span>wallet</span></div>`;
        if (window.statusDialog) {
          bus.$emit('CLOSE_STATUS_DIALOG');
          bus.$emit('OPEN_STATUS_DIALOG', {
            type: 'success',
            title: 'Successfully rented',
            conTit: confirmationTit,
            conText: `<a href="https://${
              netObj[Number(window.chainID)]
            }etherscan.io/tx/${
              receipt.transactionHash
            }" target="_blank">View on Etherscan</a>`,
          });
        } else {
          Message({
            message: `${colValue > 0 && data._collateral} ${undValue > 0 &&
              ', ' +
                data._underlying} settlement is successful, Please check in the wallet`,
            type: 'success',
            // duration: 0,
          });
        }
        setTimeout(() => {
          bus.$emit('REFRESH_ALL_DATA');
          window.$nuxt.$store.state.currentClaimId = '';
        }, 1000);
      }
    })
    .on('error', function(error, receipt) {
      window.$nuxt.$store.state.currentClaimId = '';
      bus.$emit('CLOSE_STATUS_DIALOG');
      if (error && error.message) {
        Message({
          message: `${colValue > 0 && data._collateral} ${undValue > 0 &&
            ', ' +
              data._underlying} settlement is successful, Please check in the wallet`,
          type: 'success',
          // duration: 0,
        });
      }
      setTimeout(() => {
        bus.$emit('REFRESH_ALL_DATA');
      }, 1000);
    });
};

export const settle = async (short, data) => {
  let colValue = addCommom(data.col + Number(data.longBalance), 4);
  let undValue = addCommom(data.und, 4);
  let pendingText = `<p>Settlement <span>${colValue > 0 &&
    colValue + data._collateral} ${undValue > 0 &&
    "And" + undValue + data._underlying}</span></p>`;
  bus.$emit("OPEN_STATUS_DIALOG", {
    type: "pending",
    //   conText: `<p>Settlement <span>${data_.volume} ${data}.category}</span> </p>`,
    conText: pendingText,
  });

  const factory = await getFactory();
  // const address = window.WEB3.currentProvider.selectedAddress;
  const address = window.CURRENTADDRESS;

  return factory.methods
    .settle(short)
    .send({ from: address })
    .on("transactionHash", (hash) => {
      // callBack('approve');
      bus.$emit("CLOSE_STATUS_DIALOG");
      bus.$emit("OPEN_STATUS_DIALOG", {
        type: "submit",
        conText: `<a href="https://${
          netObj[Number(window.chainID)]
        }etherscan.io/tx/${hash}" target="_blank">View on Etherscan</a>`,
      });
    })
    .on("confirmation", (confirmationNumber, receipt) => {
      // callBack('success');
      if (confirmationNumber === 0) {
        let confirmationTit = `<div>${colValue > 0 &&
          data._collateral} ${undValue > 0 &&
          ", " +
            data._underlying} settlement is successful, Please check in the <span>wallet</span></div>`;
        if (window.statusDialog) {
          bus.$emit("CLOSE_STATUS_DIALOG");
          bus.$emit("OPEN_STATUS_DIALOG", {
            type: "success",
            title: "Successfully rented",
            conTit: confirmationTit,
            conText: `<a href="https://${
              netObj[Number(window.chainID)]
            }etherscan.io/tx/${
              receipt.transactionHash
            }" target="_blank">View on Etherscan</a>`,
          });
        } else {
          Message({
            message: `${colValue > 0 && data._collateral} ${undValue > 0 &&
              ", " +
                data._underlying} settlement is successful, Please check in the wallet`,
            type: "success",
            // duration: 0,
          });
        }
        setTimeout(() => {
          bus.$emit("REFRESH_ALL_DATA");
          window.$nuxt.$store.state.currentClaimId = '';
        }, 1000);
      }
    })
    .on("error", function(error, receipt) {
      window.$nuxt.$store.state.currentClaimId = '';
      bus.$emit("CLOSE_STATUS_DIALOG");
      if (error && error.message) {
        Message({
          message: error && error.message,
          type: "error",
          // duration: 0,
        });
      }
    });
  // }
};
// };
