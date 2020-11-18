// 这个文件是创建reducer 函数的，专门用来处理发过来的action
const initState = {
    matemask_info: {
        isLogin: false,
        balance: '--',
        account: null
    },
    Status: 'default'
}

const reducer = (state = initState, action) => {
    // console.log(state)
    switch (action.type) {
        case 'Account':
            return {
                matemask_info: Object.assign({}, state.matemask_info, action.value)
            }
        case 'Status':
            return Object.assign({}, state, { Status: action.value })
        default:
            return state
    }
}


module.exports = {
    reducer
}