import React, { Component } from 'react'

import { EarningsStyled } from './styled'

import { FormattedMessage } from 'react-intl'

export default class Earnings extends Component {
    render () {
        return (
            <EarningsStyled>
                <div className="title">
                    <FormattedMessage
                        id='e_title_1'
                        tagName='h2'
                    />
                    <FormattedMessage
                        id='e_title_2'
                        tagName='h3'
                        values={{ num: 'xxx' }}
                    />
                </div>
                <div className='content'>
                    <div>
                        <FormattedMessage
                            id='e_item_1'
                            tagName='h5'
                        />
                        <p>---</p>
                    </div>
                    <div>
                        <FormattedMessage
                            id='e_item_2'
                            tagName='h5'
                        />
                        <p>---</p>
                    </div>
                    <div>
                        <FormattedMessage
                            id='e_item_3'
                            tagName='h5'
                        />
                        <p>---</p>
                    </div>
                </div>
            </EarningsStyled>
        )
    }
}
