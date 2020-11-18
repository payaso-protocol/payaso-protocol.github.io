import { web3 as Web3, Factory } from './index'
import { getWei } from '../static/utils/AdressPool'

export const settleable = async (seller, short) => {
    // const web3 = await Web3()
    const factory = await Factory()
    return factory.methods.settleable(seller, short).call().then(res => {
        return res
    })
}

export const burn = async (longOrshort, volme, opt = {}, callBack = () => { }) => {
    const factory = await Factory()
    const web3 = await Web3()
    const wei = await getWei(opt._collateral)
    return factory.methods
        .burn(longOrshort, web3.utils.toWei(volme, wei))
        .send({ from: web3.currentProvider.selectedAddress })
        .on('transactionHash', hash => {
            callBack('approve')
            //onChangeHash(hash);
        })
        .on('confirmation', (_, receipt) => {
            callBack('success')
            //onReceiptChange(receipt);
        })
        .on('error', (err, receipt) => {
            callBack('failed')
            //onReceiptChange(receipt);
        })
}

export const settle = async (short, callBack) => {
    const factory = await Factory()
    const web3 = await Web3()

    return factory.methods
        .settle(short)
        .send({ from: web3.currentProvider.selectedAddress })
        .on('transactionHash', hash => {
            callBack('approve')
            //onChangeHash(hash);
        })
        .on('confirmation', (_, receipt) => {
            callBack('success')
            //onReceiptChange(receipt);
        })
        .on('error', (err, receipt) => {
            callBack('failed')
            //onReceiptChange(receipt);
        })
}