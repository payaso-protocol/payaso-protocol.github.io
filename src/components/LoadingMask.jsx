import React, { Component } from 'react'
import { LoadingStyled } from './styled/Loading'
export default class LoadingMask extends Component {
    render () {
        return (
            <LoadingStyled>
                <div className='loadding_box'>
                    <img src="/assets/loading/loading.gif" alt="" />
                    <h5>{this.props.loadingText} ...</h5>
                    <p>此次操作可能需要一点时间，请耐心等待</p>
                </div>
            </LoadingStyled>
        )
    }
}
