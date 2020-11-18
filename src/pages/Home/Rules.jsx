import React, { Component } from 'react'
import { RuleStyled } from './styled'
import { FormattedMessage } from 'react-intl'

export default class Rules extends Component {
    render () {
        return (
            <RuleStyled>
                <FormattedMessage
                    tagName='h2'
                    id='r_title'
                />
                {[1, 2, 3, 4].map(item => {
                    return <FormattedMessage
                        key={item}
                        tagName='p'
                        id={'r_rule_' + item}
                    />
                })}
            </RuleStyled>
        )
    }
}
