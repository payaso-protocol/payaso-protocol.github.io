import React, { Component } from 'react'
import { NavItemStyled } from './styled'
import { FormattedMessage } from 'react-intl'

export default class Award extends Component {
    render () {
        return (
            <NavItemStyled>
                <div className='claim_page'>
                    <div className='logo'>
                        <img src="./assets/logo/黑底logo带文字.png" alt="" />
                    </div>
                    <div className='no_get'>
                        <FormattedMessage
                            tagName='h5'
                            id='aw_no_get'
                        />
                        <p>0</p>
                    </div>
                    <div className='get'>
                        <FormattedMessage
                            tagName='span'
                            id='aw_get'
                            values={{ num: 0 }}
                        />
                        <FormattedMessage
                            tagName='span'
                            id='aw_total_get'
                            values={{ num: 0 }}
                        />
                    </div>
                </div>
                <button className='claim'>
                    {window.localStorage.getItem('lang') === 'en_US' ? '领取奖励' : '领取奖励'}
                </button>
            </NavItemStyled>
        )
    }
}
