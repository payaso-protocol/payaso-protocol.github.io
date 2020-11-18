import React, { Component } from 'react'
import { NavItemStyled } from './styled'
import Input from './Input'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'


class Pledge extends Component {
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

    render () {
        return (
            <NavItemStyled>
                <FormattedMessage
                    tagName='h5'
                    id='pl_title'
                />
                <Input
                    placeholder={window.localStorage.getItem('lang') === 'en_US' ? '输入抵押数量' : '输入抵押数量'}
                    total={this.props.matemask_info.balance}
                ></Input>
                <div className='from_tip'>
                    <FormattedMessage
                        tagName='span'
                        id='pl_tip_1'
                        values={{ num: this.props.matemask_info.balance }}
                    />
                    <FormattedMessage
                        tagName='span'
                        id='pl_tip_2'
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
                {this.props.matemask_info.isLogin ?
                    <button>确认抵押</button> :
                    <button onClick={() => { this.props.sendAction('Status', 'WalletMask') }}>链接钱包</button>}
            </NavItemStyled>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendAction: (type, value) => {
            dispatch({
                type: type,
                value: value
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pledge)