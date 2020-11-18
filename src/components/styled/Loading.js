import styled from 'styled-components'

export const LoadingStyled = styled.div`
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.6);
    z-index: 20;
    display: flex;
    user-select: none;
    .loadding_box{
            width: 300px;
            margin: 0 auto;
            align-self: center;
            justify-self: center;
        img{
            display: block;
            margin: 0 auto;
            width: 100px;
        }
        h5{
            color: #DBDBDB;
            font-size: 18px;
            text-align: center;
            margin: 10px 0;
        }
        p{
            color: #ACACAC;
            font-size: 14px;
            text-align: center;
        }
    }
    
`