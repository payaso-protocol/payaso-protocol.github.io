import React, { Component } from 'react'
import { RiskStyled } from './styled/RiskWarning.js'
import { connect } from 'react-redux'

export class RiskWarning extends Component {
    constructor() {
        super()
        this.state = {
            isCheck: false
        }
    }

    handelClickChecked = () => {
        this.setState({
            isCheck: !this.state.isCheck
        })
    }

    handelClickSubmit = () => {
        if (!this.state.isCheck) return
        window.localStorage.setItem('readRisk', new Date())
        this.props.sendAction('Status', 'no_risk')
    }

    render() {
        return (
            <RiskStyled>
                <div className="risk_box">
                    <h3>Risk Warning</h3>
                    <p>PAYASO V0.1 is currently a beta version, but the assets of ERC-20 used are real assets . V0.1 version contract were audit performed by KNOWNSEC and tested by community , but there' s still a risk of unintended use. Please communicate with community in discord #official channel if you encounter unintended product issues!
                    
                    Supply a safety helmet may take a risk of token price falling！We highly recommend that you use Payaso with a clear understanding of its functionality.
                    </p>
                    <div>
                        <i
                            className={this.state.isCheck ? 'checked' : ''}
                            onClick={() => { this.handelClickChecked() }}
                        ></i>
                        <p>I hereby declare that I am fully aware of the risks involved in participating in the following activities</p>
                    </div>
                    <div className='submit'>
                        <button
                            className={this.state.isCheck ? 'checked' : ''}
                            onClick={() => { this.handelClickSubmit() }}
                        >Confirm</button>
                    </div>
                </div>
            </RiskStyled>
        )
    }
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


export default connect(null, mapDispatchToProps)(RiskWarning)
