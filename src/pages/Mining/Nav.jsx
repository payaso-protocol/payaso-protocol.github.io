import React, { Component } from 'react'

import { NavStyled } from './styled'
import Pledge from './Pledge'
import Redeem from './Redeem'
import Award from './Award'

export default class Nav extends Component {
    constructor() {
        super()
        this.state = {
            navOption: ['抵押', '赎回', '挖矿奖励'],
            navOption_en: ['抵押', '赎回', '挖矿奖励'],
        }
    }

    renderNav = () => {
        switch (this.props.currentNav) {
            case '抵押':
                return <Pledge
                    changeIsMask={this.props.changeIsMask}
                ></Pledge>
            case '赎回':
                return <Redeem></Redeem>
            case '挖矿奖励':
                return <Award></Award>
            default:
                return <></>
        }
    }

    render() {
        return (
            <NavStyled>
                <ul className='nav'>
                    {this.state.navOption.map((item, index) => {
                        return <li
                            key={item + index}
                            onClick={() => {
                                this.props.changeCurrentNav(item)
                            }}
                            className={this.props.currentNav === item ? 'active' : ''}
                        >{window.localStorage.getItem('lang')==='en_US'?this.state.navOption_en[index]:item}</li>
                    })}
                </ul>
                {this.renderNav()}
            </NavStyled>
        )
    }
}
