import { web3 as Web3, Factory, Order, expERC20 } from './index'
import { wrapperAdress, wrapperContract, getWei, getID } from '../static/utils/AdressPool'

export const onIssue = async (data_, callBack) => {
    let data = { ...data_ }
    const web3 = await Web3()
    let charID = await getID()
    data.category = wrapperAdress(data.category, charID)
    data.currency = wrapperAdress(data.currency, charID)
    data.expire = new Date(data.expire).getTime()
    data.expire = web3.utils.toWei('' + data.expire)

    data.total = web3.utils.toWei(data.price * data.volume + '', getWei(data.currency))
    data.premium = web3.utils.toWei('' + (data.premium / data.price), getWei(data.currency))
    data.volume = web3.utils.toWei('' + (data.volume * data.price), getWei(data.currency))
    data.price = web3.utils.toWei('' + (1 / data.price), getWei(data.currency))
    // console.log(getWei(data.currency))
    // console.log(data)
    try {
        const Contract = await expERC20(data.currency)
        // 一键判断是否需要授权，给予无限授权
        await oneKeyArrpove(Contract, 'ORDER', data.total, callBack)

        const orderContract = await Order()
        orderContract.methods.sell(
            true,
            data.currency,  // 抵押物 DAI
            data.category,  // 保险品类 WETH
            data.price,    // 触发保险金额 抵押物单位   // 1/200
            data.expire,
            data.volume,    // 200
            data.currency,   // 支付货币
            data.premium // 单价
        ).send({ from: web3.currentProvider.selectedAddress })
            .on('transactionHash', hash => {
                callBack('pending')
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
    } catch (error) {
        console.log(data)
        console.log('onIssue', error)
    }
}

export const buyInsurance = async (_data, callBack) => {
    let data = { ..._data }
    const web3 = await Web3()
    const charID = await getID()
    data.settleToken = wrapperAdress(data.settleToken, charID)
    data.payPrice = web3.utils.toWei(data.volume / data._strikePrice * data.price + '', getWei(data.settleToken))
    data.volume = web3.utils.toWei(data.volume / data._strikePrice + '', getWei(data.settleToken))
    const Contract = await expERC20(data.settleToken)
    try {
        // 一键判断是否需要授权，给予无限授权
        await oneKeyArrpove(Contract, 'ORDER', data.payPrice, callBack)
        const orderContract = await Order()
        orderContract.methods.buy(
            data.askID,
            data.volume
        ).send({ from: web3.currentProvider.selectedAddress })
            .on('transactionHash', hash => {
                callBack('pending')
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
    } catch (error) {
        console.log(error)
    }
}

export const getSellLog = async (callback) => {
    Order().then((contract => {
        contract.getPastEvents('Sell', {
            fromBlock: 0, toBlock: "latest"
        }, (error, events) => {
            callback(error, events)
        });
    }))
}

export const getOptionCreatedLog = async (callback) => {
    return Factory().then((contract => {
        contract.getPastEvents('OptionCreated', {
            fromBlock: 0, toBlock: "latest"
        }, (error, events) => {
            callback(error, events)
        });
    }))
}

export const getBuyLog = async (callback) => {
    Order().then((contract => {
        contract.getPastEvents('Buy', {
            fromBlock: 0, toBlock: "latest"
        }, (error, events) => {
            callback(error, events)
        });
    }))
}

export const asks = async (askID, type = 'default', token = 'default') => {
    const web3 = await Web3()
    // console.log(askID)
    if (!askID) return 0
    const order = await Order()
    if (type === 'default') {
        return order.methods.asks(askID).call()
    }
    const res = await order.methods.asks(askID).call()
    return web3.utils.fromWei(res.remain, getWei(token))
}

export const bids = async (bidID, type = 'default', token = 'default') => {
    const web3 = await Web3()
    // console.log(bidID)
    if (!bidID) return 0
    const order = await Order()
    if (type === 'sync') {
        const res = await order.methods.bids(bidID).call()
        return web3.utils.fromWei(res.remain, getWei(token))
    }

    return order.methods.bids(bidID).call()
}

export const getMySellLog = async (callback) => {

}

export const getBalance = async (type) => {
    const web3 = await Web3()
    const charID = await getID()
    let adress = type
    if (type.indexOf('0x') === -1) {
        adress = wrapperAdress(type, charID)
    }
    const contract = await expERC20(adress)
    return contract.methods.balanceOf(web3.currentProvider.selectedAddress).call().then(res => {
        // console.log(res)
        return web3.utils.fromWei(res, getWei(type))
    })
}

export const onExercise = async (data, callBack) => {
    const web3 = await Web3()
    const charID = await getID()
    let adress = wrapperAdress(data.token, charID)
    const Contract = await expERC20(adress)
    const long = await expERC20(data.long)
    const order = await Order()
    // 一键判断是否需要授权，给予无限授权
    console.log(data)
    await oneKeyArrpove(Contract, 'ORDER', 100000, callBack)
    await oneKeyArrpove(long, 'ORDER', 100000, callBack)

    order.methods.exercise(data.bidID).send({ from: web3.currentProvider.selectedAddress })
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

const allowance = async (token_exp, contract_str) => {
    const web3 = await Web3()
    const charID = await getID()
    const result = await token_exp.methods
        .allowance(web3.currentProvider.selectedAddress, wrapperContract(contract_str, charID))
        .call({ from: web3.currentProvider.selectedAddress })

    return web3.utils.fromWei(result, getWei())
}

const approve = async (token_exp, contract_str, callback = (status) => { }) => {
    const web3 = await Web3()
    const charID = await getID()
    const result = await token_exp.methods
        .approve(wrapperContract(contract_str, charID), '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
        .send({ from: web3.currentProvider.selectedAddress })
        .on('transactionHash', hash => {
            callback('approve')
        })
        .on('confirmation', (_, receipt) => {
            callback('success')
        })
        .on('error', (err, receipt) => {
            callback('failed')
        })
    return result
}

// 一键授权
const oneKeyArrpove = async (token_exp, contract_str, num, callback) => {
    // 校验参数
    if (!token_exp || !contract_str) return
    // 判断授权额度是否充足
    const awc = await allowance(token_exp, contract_str)
    if (parseInt(awc) > parseInt(num)) {
        console.log('额度充足', parseInt(awc))
        return
    }
    // 无限授权
    const res = await approve(token_exp, contract_str, callback)
    console.log(res)
}

export const onCancel = async (askID, callBack) => {
    const web3 = await Web3()
    const order = await Order()

    order.methods.cancel(askID).send({ from: web3.currentProvider.selectedAddress })
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
