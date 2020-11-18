import Web3 from 'web3'
import ERC20_abi from './ERC20_abi.json'
import payaso_abi from './payaso_abi.json'
import factory_abi from './factory_abi.json'
import order_abi from './order_abi.json'
import { wrapperAdress, wrapperContract, getID } from '../static/utils/AdressPool'


// web3
export const web3 = async () => {
    return new Web3(Web3.givenProvider)
}

// current_account
export const getCurrentAccount = async () => {
    return web3().then(web3_A => web3_A.currentProvider.selectedAddress)
}

// univ2
export const Univ2 = async () => {
    const web3_A = await web3()
    const charID = await getID()
    return await new web3_A.eth.Contract(ERC20_abi.abi, wrapperAdress('UNIV2', charID))
}

export const Dai = async () => {
    const web3_A = await web3()
    const charID = await getID()
    return await new web3_A.eth.Contract(ERC20_abi.abi, wrapperAdress('DAI', charID))
}

// long
export const Long = async () => {
    const web3_A = await web3()
    const charID = await getID()
    return await new web3_A.eth.Contract(ERC20_abi.abi, wrapperAdress('LONG', charID))
}

// payaso/ERC20
export const Payaso = async () => {
    const web3_A = await web3()
    const charID = await getID()
    return await new web3_A.eth.Contract(payaso_abi.abi, wrapperContract('PAYA', charID))
}

// factory
export const Factory = async () => {
    const web3_A = await web3()
    const charID = await getID()
    return await new web3_A.eth.Contract(factory_abi.abi, wrapperContract('FACTORY', charID))
}

// order
export const Order = async () => {
    const web3_A = await web3()
    const charID = await getID()
    return await new web3_A.eth.Contract(order_abi.abi, wrapperContract('ORDER', charID))
}

// expERC20
export const expERC20 = async (adress) => {
    const web3_A = await web3()
    return await new web3_A.eth.Contract(ERC20_abi.abi, adress)
}

