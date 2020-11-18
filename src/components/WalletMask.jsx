import React, { Component } from 'react'
import { connect } from 'react-redux'

import { MaskStyled } from './styled/Mask'
// import { FormattedMessage } from 'react-intl'

class Mask extends Component {
    constructor() {
        super()
        this.state = {
            isSelectWallet: false,
            currentWallect: '',
            walletList: ['MetaMask', 'Fortmatic', 'Ledger', 'Trezor', 'Authereum', 'Dapper', 'WalletConnect', 'WalletLink', 'Portis', 'Torus', 'Squarelink', 'opera', 'Unilogn']
        }
    }
    handelClickLi = (item) => {

        if (item === 'MetaMask') {
            try {
                window.ethereum.request({ method: 'eth_requestAccounts' })
                    .then(async account => {
                        setTimeout(() => {
                            window.location.reload()
                        }, 500)
                    })
            } catch (error) {
                console.log(error)
                alert('MateMask 扩展插件未安装或未启用')
            }
        }

    }

    handelClockMask = (e) => {
        if (e.target.classList.contains('mask')) {
            this.props.changeWalletMask()
        }
    }

    render () {
        return (
            <MaskStyled className='mask' onClick={(e) => { this.handelClockMask(e) }}>
                {this.state.isSelectWallet ?
                    <div className="content" >
                        <div className="top">
                            <h1>
                                <img src={'./assets/images/' + this.state.currentWallect + '@2x.png'} alt="" />{this.state.currentWallect}
                            </h1>
                            <button onClick={this.props.changeWalletMask}></button>
                            <p>使用兼容WalletConnect的钱包扫描二维码</p>
                        </div>
                        <div className='ewm'>
                            <img src="./assets/images/ewm.png" alt="" />
                        </div>
                    </div> : <div className="content">
                        <div className="top">
                            <h1>Select a Wallet</h1>
                            <button onClick={() => { this.props.sendAction('Status') }}></button>
                            <p>Please select a wallet to connect to this dapp:</p>
                        </div>
                        <ul>
                            {this.state.walletList.map((item, index) => {
                                let imgSrc = `./assets/images/${item}@2x.png`
                                return <li
                                    className={item === 'MetaMask' ? 'on' : 'off'}
                                    key={index + item}
                                    onClick={() => { this.handelClickLi(item) }}
                                >
                                    <img src={imgSrc} alt="item" />
                                    <p>{item}</p>
                                </li>
                            })}
                        </ul>
                    </div>
                }
            </MaskStyled>
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

export default connect(mapStateToProps, mapDispatchToProps)(Mask)