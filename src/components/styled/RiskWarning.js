import styled from 'styled-components'

export const RiskStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.8);
    z-index: 20;
    display: flex;
    align-items: center;
    .risk_box{
        width: 496px;
        /* height: 439px; */
        background-color: #101010;
        border-radius: 3px;
        color: #DBDBDB;
        margin: 0 auto;
        padding: 20px 32px;
        box-sizing: border-box;
        font-size: 14px;
        color: #ACACAC;
        h3{
            font-size: 16px;
            color: #DBDBDB;
            margin-bottom: 20px;
        }
        p{
            line-height: 22px;
        }
        div{
            display: flex;
            align-items: center;
            margin-top: 20px;
            i{
                display: block;
                width: 20px;
                height: 20px;
                background: url(/assets/arrows/checked2.png) no-repeat;
                background-size: contain;
                background-position: 0 0;
                cursor: pointer;

                &.checked{
                    background: url(/assets/arrows/checked1.png) no-repeat;
                    background-size: contain;
                    background-position: 0 0;
                }
            }
            p{
                font-size: 8px;
                color: rgba(256,256,256,.85);
                margin-left: 16px;
            }
        }
        .submit{
            button{
                height: 32px;
                padding: 0 15px;
                margin-left: auto;
                border-radius: 3px;
                background-color: #873232;
                color: #fff;
                opacity: .4;
                cursor: pointer;
                &.checked{
                    opacity: .85;  
                }
            }
        }
    }
`