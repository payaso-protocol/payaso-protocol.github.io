import styled from "styled-components";

export const DownLoadStyle = styled.div`
  background: #111111;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 450px) {
    height: calc(100vh - 252px);

    .top_banner {
      width: 100%;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: url(/assets/h5_images/banner@2x.png) no-repeat;
      background-size: 100% 100%;
      h1 {
        width: 284px;
        margin-left: 16px;
        color: #ffffff;
        font-weight: 500;
        font-size: 30px;
        font-weight: 500;
        color: #ffffff;
        line-height: 42px;
      }
    }
    .Security_wrap {
      width: 100%;
      margin: 0 auto;
      padding: 0 20px;
      > h3 {
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
        height: 40px;
        margin-bottom: 20px;
        box-shadow: 0px 1px 0px 0px #1d1d1d;
      }
      > p {
        font-size: 14px;
        font-weight: 400;
        color: #dbdbdb;
      }
      .Security_link {
        display: flex;
        flex-direction: column;
        margin-top: 40px;
        height: 84px;
        justify-content: space-between;
        a {
          font-size: 14px;
          font-weight: 400;
          color: #be3a3b;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
  @media screen and (min-width: 451px) {
    height: calc(100vh - 180px);
    .top_banner {
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: url(/assets/images/banner@2x.png) no-repeat;
      background-size: contain;
      background-position: 0 0;
      margin: 0 auto;
      width: 100%;
      background-size: contain;
      h1 {
        width: 1200px;
        margin: 0 auto;
        font-size: 40px;
        color: #ffffff;
        font-weight: 500;
        line-height: 180px;
      }
    }
    .Security_wrap {
      width: 1200px;
      margin: 0 auto;
      > h3 {
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
        height: 60px;
        margin: 20px 0;
        box-shadow: 0px 1px 0px 0px #1d1d1d;
        line-height: 60px;
      }
      > p {
        font-size: 14px;
        font-weight: 400;
        color: #dbdbdb;
      }
      .Security_link {
        display: flex;
        flex-direction: column;
        margin-top: 40px;
        height: 54px;
        justify-content: space-between;
        a {
          font-size: 14px;
          font-weight: 400;
          color: #be3a3b;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
`;
