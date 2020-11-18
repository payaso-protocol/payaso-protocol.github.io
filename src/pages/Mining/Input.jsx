import React, { Component } from 'react'
import { InputStyle } from './styled'


export default class Input extends Component {
    constructor() {
        super()
        this.state = {
            liList: ['25%', '50%', '75%', '100%'],
            inputVal: ''
        }

    }

    handelClickLi = (item) => {
        if (this.props.total !== '--') {
            this.setState({
                inputVal: parseFloat(this.props.total) * (parseInt(item) / 100)
            })
        }
    }

    changeInputVal = (e) => {
        let val = e.target.value
        if (parseFloat(val) > parseFloat(this.props.total)) {
            this.setState({
                inputVal: this.props.total
            })
        } else {
            this.setState({
                inputVal: val
            })
        }

    }

    render () {
        return (
            <InputStyle>
                <input
                    name="number"
                    type='number'
                    placeholder={this.props.placeholder}
                    value={this.state.inputVal}
                    onChange={(e) => { this.changeInputVal(e) }
                    } />
                <ul>
                    {this.state.liList.map(item => {
                        return <li
                            key={item}
                            onClick={() => { this.handelClickLi(item) }}
                        >{item}</li>
                    })}
                </ul>
            </InputStyle>
        )
    }
}
