import React, { Component } from 'react'
import { NavItemStyled } from './styled'
import { getBalance } from '../../abi/ERC20'
import { web3 } from '../../abi'

import Input from './Input'
import { FormattedMessage } from 'react-intl'

export default class Redeem extends Component {
    constructor() {
        super()
        this.state = {
            isChecked: true,   // 是否确定协议
            balance: '--'
        }
    }

    changeChecked = () => {
        this.setState({
            isChecked: !this.state.isChecked
        })
    }

    componentDidMount () {
        getBalance().then(async res => {
            const web3_A = await web3()
            let balance = web3_A.utils.fromWei(res, 'ether')
            // balance = parseInt(parseFloat(balance) * 10000) / 10000
            this.setState({
                balance: balance
            })
        })
    }


    render () {
        return (
            <NavItemStyled>
                <FormattedMessage
                    id='re_title'
                    tagName='h5'
                />
                <Input
                    placeholder={window.localStorage.getItem('lang') === 'en_US' ? '输入赎回数量' : '输入赎回数量'}
                    total={this.state.balance}
                ></Input>
                <div className='from_tip'>
                    <FormattedMessage
                        tagName='span'
                        id='re_tip_1'
                        values={{ num: this.state.balance }}
                    />
                </div>
                <div className='agree'>
                    <div
                        className={this.state.isChecked ? 'cheched' : ''}
                        onClick={this.changeChecked}
                    ></div>
                    <FormattedMessage
                        tagName='span'
                        id='pl_tip_3'
                    />
                </div>
                <button>确认赎回</button>
            </NavItemStyled>
        )
    }
}
