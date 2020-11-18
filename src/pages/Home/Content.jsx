import React, { Component } from 'react'
import { ContentStyled } from './styled'
import { connect } from 'react-redux'

import { recruit } from '../../abi/payaso'
import { FormattedMessage } from 'react-intl'

class Content extends Component {
    constructor() {
        super()
        this.state = {
            inputVal: ''
        }
    }

    changeInputVal = (e) => {
        let val = e.target.value
        if (parseFloat(val || 0) > parseFloat(this.props.matemask_info.balance)) {
            val = this.props.matemask_info.balance
        }
        this.setState({
            inputVal: val
        })
    }
    handelClickMax = () => {
        if (this.props.matemask_info.isLogin) {
            this.setState({
                inputVal: this.props.matemask_info.balance
            })
        }
    }

    handelClickSubmit = async () => {
        if (this.state.inputVal > 0) {
            recruit(this.state.inputVal).then(res => {
                console.log(res)
            })
        }
    }

    render () {
        return (
            <ContentStyled>
                <div>
                    <img src=".\assets\images\page1.png" alt="" />
                    {/* <canvas id='home_canvas' ref='home_canvas'></canvas> */}
                    <FormattedMessage
                        id='c_title'
                        tagName='p'
                    />
                </div>
                <div>
                    <div className='container'>
                        <FormattedMessage
                            id='c_title_2'
                            tagName='h3'
                        />
                        <div className='fund'>
                            <div>
                                <input
                                    type="number"
                                    placeholder={window.localStorage.getItem('lang') === 'en_US' ? '请输入数量' : '请输入数量'}
                                    onChange={(e) => { this.changeInputVal(e) }}
                                    value={this.state.inputVal}
                                />
                                <span>ETH</span>
                            </div>
                            <div
                                className="max"
                                onClick={this.handelClickMax}>
                                MAX
                            </div>
                            <FormattedMessage
                                id='c_balance'
                                tagName='p'
                                values={{
                                    num: this.props.matemask_info.balance
                                }}
                            />
                        </div>
                        {this.props.matemask_info.isLogin ?
                            <button onClick={this.handelClickSubmit}>
                                {window.localStorage.getItem('lang') === 'en_US' ? '注入' : '注入'}
                            </button> :
                            <button onClick={()=>{this.props.sendAction('Status','WalletMask')}}>
                                {window.localStorage.getItem('lang') === 'en_US' ? '连接钱包' : '连接钱包'}
                            </button>
                        }
                        <div className='explain'>
                            <FormattedMessage
                                id='c_tip_1'
                                tagName='p'
                            />
                            <FormattedMessage
                                id='c_tip_2'
                                tagName='p'
                            />
                        </div>
                    </div>
                </div>
            </ContentStyled>
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

export default connect(mapStateToProps, mapDispatchToProps)(Content)