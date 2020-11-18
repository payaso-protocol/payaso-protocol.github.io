import React, { Component } from 'react'

import { Tip } from './styled'

export default class Successtip extends Component {
    constructor(props) {
        super()
        this.state = {
            type: 'success',
            content: '提示消息',
            ...props
        }
    }
    render () {
        return (
            <Tip>
                <div>
                    <i className={this.state.type}></i>
                    {this.state.content}
                </div>
            </Tip>
        )
    }
}
