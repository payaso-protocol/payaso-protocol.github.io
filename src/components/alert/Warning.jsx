import React, { Component } from 'react'

import { AlertStyled, WarningStyled } from './styled'

import { t } from '../../locale/locales'

import { getBalance } from '../../abi/order'

export default class Warning extends Component {
    constructor(props) {
        super()
        this.state = {
            title: t('t94'),
            content: t('t95'),
            btn: [t('t96'), t('t97')],
            cancel: () => { console.log('cancel filed') },
            submit: () => { console.log('submit filed') },
            payLook: false,
            ...props
        }
    }

    componentDidMount() {
        this.setPayLook()
    }

    setPayLook = async () => {
        let data = this.state.currentListItem
        if (!data) return
        // 判断余额是否足够
        const balance = await getBalance(data._underlying)
        console.log(balance, data.amt)
        if (parseFloat(balance) < parseFloat(data._strikePrice) * parseFloat(data.vol)) {
            // 余额不够
            this.setState({
                payLook: true
            })
        }
    }

    render() {
        return (
            <AlertStyled>
                <WarningStyled>
                    <div className="top">
                        <h2>{this.state.title}</h2>
                        <img
                            onClick={() => { this.state.cancel() }}
                            src="/assets/icons/guanbi-red.png"
                            alt="" />
                    </div>
                    <div className='content'>
                        {this.state.content}
                    </div>
                    <div className='btn_box'>
                        {this.state.btn[1] ? <button
                            onClick={() => { this.state.cancel() }}
                        >{this.state.btn[1]}</button> : ''}

                        {/* 余额不足拦截 */}
                        {
                            !this.state.payLook ?
                                // 余额足够
                                <button className='submit'
                                    onClick={() => { this.state.submit() }}
                                >{this.state.btn[0]}</button> :
                                // 余额不足
                                <button className='Insufficient'>
                                    Insufficient {this.state.currentListItem._underlying} Balance
                                </button>


                        }

                    </div>
                </WarningStyled>
            </AlertStyled>
        )
    }
}
