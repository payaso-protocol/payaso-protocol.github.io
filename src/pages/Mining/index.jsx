import React, { Component } from 'react'

import { MiningStyled } from './styled'
import Earnings from './Earnings'
import Nav from './Nav'



class Mining extends Component {
    constructor(props) {
        super()
        this.state = {
            currentNav: '抵押'
        }
    }

    changeCurrentNav = (item = '抵押') => {
        this.setState({
            currentNav: item
        })
    }

    render() {
        return (
            <MiningStyled>
                <h1>PAYASO流动性挖矿</h1>
                <div className='content'>
                    <Earnings></Earnings>
                    <Nav
                        currentNav={this.state.currentNav}
                        changeCurrentNav={this.changeCurrentNav}
                        changeIsMask={this.props.changeIsMask}
                    ></Nav>
                </div>
            </MiningStyled>

        )
    }
}

export default Mining