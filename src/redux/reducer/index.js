// 这个文件是创建reducer 函数的，专门用来处理发过来的action
const initState = {
    matemask_info: {
        isLogin: false,
        balance: '--',
        account: null
    },
    Status: 'default',
    fixObbj: {
        'CRV-DAI': 2,
        'CRV-USDC': 1,
        'CRV-USDT': 2,
        'UNI-DAI': 0,
        'UNI-USDC': 0,
        'UNI-USDT': 0,
        'WBTC-DAI': 0,
        'WBTC-USDC': 0,
        'WBTC-USDT': 0,
        'WETH-DAI': 0,
        'WETH-USDC': 0,
        'WETH-USDT': 0
    }
}

const reducer = (state = initState, action) => {
    // console.log(state)
    switch (action.type) {
        case 'Account':
            return {
                fixObj: state.fixObj,
                matemask_info: Object.assign({}, state.matemask_info, action.value)
            }
        case 'Status':
            return Object.assign({}, state, { Status: action.value })
        case 'FixObj':
            return Object.assign({}, state, {fixObj: action.value })
        default:
            return state
    }
}


module.exports = {
    reducer
}