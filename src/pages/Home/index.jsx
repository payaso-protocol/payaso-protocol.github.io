import React, { Component } from 'react'
import { HomeStyled } from './styled'
import Content from './Content'
import Rules from './Rules'
import LinkList from './LinkList'

export default class index extends Component {
    constructor() {
        super()
        this.state = {
            isShowConnect: true
        }
    }
    render() {
        return (
            <HomeStyled>
                <h1>LP on boarding plan</h1>
                <Content
                    changeWalletMask={this.props.changeWalletMask}
                ></Content>
                <Rules></Rules>
                <LinkList></LinkList>
            </HomeStyled>
        )
    }
}
