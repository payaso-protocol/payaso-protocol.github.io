import styled from 'styled-components'

export const HomeStyled = styled.div`
    width: 100%;
    background-color: #111;
    padding-top: 100px;
    padding-bottom: 20px;
    /* user-select: none; */
    h1{
        font-size: 48px;
        text-align: center;
        color: #fff;
    }
`

export const ContentStyled = styled.div`
    width: 1040px;
    color: #ACACAC;
    display: flex;
    margin: 80px auto;
    margin-bottom: 60px;
    div{
        &:nth-child(1){
            img{
                height: 416px;
            }

            /* #home_canvas{
                width: 264px;
                height: 416px;
                border: 1px solid #ccc;
            } */
            p{
                text-indent: 35px;
                line-height: 2em;
            }
        }

        &:nth-child(2){
            .container{
                margin-top: 120px;
                margin-left: 200px;
                h3{
                font-size: 24px;
                }
                .fund{
                    display:flex;
                    flex-wrap:wrap;
                    margin-top: 30px;
                    div{
                        width: 400px;
                        height: 46px;
                        position: relative;
                        input{
                            width:400px;
                            height: 46px;
                            color:#DBDBDB;
                            border: 1px solid #434343;
                            background-color: #111;
                            text-indent: 1em;
                            border-radius: 3px;
                            appearance: none;
                            &::-webkit-inner-spin-button {
                               display:none;
                            }
                        }

                        span{
                                position: absolute;
                                right: 1em;
                                top: 12px;
                            }

                        &.max{
                            width: 84px;
                            height: 46px;
                            border: 1px solid #873232;
                            color: #873232;
                            text-align: center;
                            line-height: 46px;
                            margin-left: 1em;
                            border-radius: 3px;
                            cursor: pointer;
                        }
                    }
                    .max{
                    }
                    p{
                        text-indent: 0px;
                        width: 100%;
                        font-size: 12px;
                        line-height: 2em;
                    }
                }

                button{
                    width: 506px;
                    height: 48px;
                    margin: 24px 0px 10px 0px;
                    line-height: 48px;
                    background-color: #873232;
                    border-radius: 3px;
                    color: #fff;
                    cursor: pointer;
                }

                .explain{
                    font-size: 12px;
                    p{
                        
                    text-indent: 0;
                        &:nth-child(2){
                            color: #873232;
                        }
                    }
                }
            }
        }
    }
    
`

export const RuleStyled = styled.div`
    width: 1040px;
    margin: 0 auto;
    color: #7d7d7d;
    font-size: 14px;
    line-height: 1.5em;
    h2{
        font-size: 16px;
        color: #acacac;
        line-height: 2em;
    }

    p{
        line-height: 1.8em;
    }
`

export const LinkListStyled = styled.div`
    width: 1040px;
    margin: 0 auto;
    z-index: 11;
    display: flex;
    justify-content: flex-end;
    ul{
        display: flex;
        margin-top: 20px;
        li{
            margin-right: 20px;
            a{
                width: 36px;
                height: 36px;
                img{
                    width: 36px;
                }
            }
        }
    }
`