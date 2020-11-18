import Web3 from 'web3'

export const mateMaskInfo = () => {
    
    let obj = {
        status: 1,
        data: {
            isLogin: false
        }
    }
    try {
        let web3 = new Web3(Web3.givenProvider)
        let current = web3.currentProvider.selectedAddress
        
        
        if (!current) {
            return obj
        }
        obj.data.isLogin = true
        obj.data.account = current
        obj.status = 1
        return obj
        
    } catch (error) {
        console.log('util=>matemask=>mateMaskInfo', error)
        return {
            status: -1,
            error,
            msg: 'MateMask 扩展插件未安装或未启用'
        }
    }
}