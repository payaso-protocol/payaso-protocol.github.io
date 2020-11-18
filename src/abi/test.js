import { Long, Order, Univ2, Factory, web3 } from './index'

let beginTime = new Date().getTime()
// 第三步： 查询保险列表
const queryList = async () => {
    let order = await Order()
    return order.methods.asksN().call()
        .then(async count => {
            count = parseInt(count)
            let begin = count - 1
            let over = count > 10 ? count - 10 : 0
            let asksList = []
            for (let i = begin; i >= over; i--) {
                await order.methods.asks(i).call()
                    .then(res => {
                        asksList.push(res)
                    })
            }
            return asksList
        })
}


queryList().then(async res => {
    const web3_exp = await web3()
    const long = await Long()
    res.map(async (item, index) => {
        let obj = {
            askID: item.askID,
            volume: web3_exp.utils.fromWei(item.volume),
            price: web3_exp.utils.fromWei(item.price),
            remain: web3_exp.utils.fromWei(item.remain),
            seller: item.seller,
            long: item.long,
            settleToken: item.settleToken,
        }
        console.log(obj)
        // await long.methods.
    })
    console.log('运行一共花费时间：' + (new Date().getTime() - beginTime) + 'ms')
})













// 第二步骤: 卖保险
// Order().then(async exp => {
//     const web3_A = await web3()
//     const long = await Long()
//     let Order_interface = exp._jsonInterface.filter((item) => item.type === 'function')
//     console.log(Order_interface)

//     setTimeout(() => {
//         let account = web3_A.currentProvider.selectedAddress
//         console.log(long)
//         long.methods.approve('0xd24E446a073BA20baF5Da0ad0E01e02c4db8f9fD', web3_A.utils.toWei('100')).send({ from: account })
//             .then(res => {
//                 exp.methods.sell(
//                     '0x17Fb84455795e9536a0ada52fCe7913EBa2135e2',
//                     web3_A.utils.toWei('10'),
//                     '0xad6d458402f60fd3bd25163575031acdce07538d',
//                     web3_A.utils.toWei('1'),
//                 ).send({ from: account })
//                     .then(res => {
//                         console.log(res)
//                     })
//             })


//     }, 200)
// })





// 第一步骤： 铸币


// Factory().then(async exp => {
//     const web3_A = await web3()
//     let Factory_interface = exp._jsonInterface.filter((item) => item.type === 'function')
//     console.log(Factory_interface)
//     const univ2 = await Univ2()
//     let Univ2_interface = univ2._jsonInterface.filter((item) => item.type === 'function')
//     console.log(Univ2_interface) 
//     setTimeout(() => {
//         let account = web3_A.currentProvider.selectedAddress
//         // 铸币
//         // 通过ERC20给合约授权
//         univ2.methods.approve('0xd96147234126dCedfaAbf75fF1128BFF136e9486', web3_A.utils.toWei('100')).send({ from: account })
//             .then(res => {
//                 // 调用铸币方法先铸币
//                 // 1. 调用转账，先往合约内充值抵押物（必须先授权）
//                 exp.methods.mint(
//                     '0xb9b1e9b13d1848d6be8b98acc8ca5922d19419b4',
//                     '0x72e844813C587367Cc82876B9f759b815C4b7Aee',
//                     web3_A.utils.toWei('100'),
//                     web3_A.utils.toWei('' + new Date().getTime() + 5 * 1000 * 60),
//                     web3_A.utils.toWei('100'),

//                 ).send({ from: account })
//                     .then(res => {
//                         console.log(res)
//                     })
//             })
//     }, 200);
// })

