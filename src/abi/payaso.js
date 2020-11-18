import { web3, getCurrentAccount, Payaso } from './index'

// getProgess
export const getProgess = async () => {
    const contract_A = await Payaso()
    return contract_A.methods.getProgess().call()
}

// recruit
export const recruit = async (amount) => {
    const payaso = await Payaso()
    const web3_A = await web3()
    const account = await getCurrentAccount()
    amount = web3_A.utils.toWei(amount, 'ether')
    return await payaso.methods.recruit().send({ from: account, value: amount })
}

export default Payaso