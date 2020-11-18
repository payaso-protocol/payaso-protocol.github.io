import styled from "styled-components";

export const H5MaskStyled = styled.div`
  @media screen and (max-width: 450px) {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    > .h5_mask {
      width: 100%;
      height: 100%;
      align-items: normal;
      padding: 5px 16px;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99;
      > span {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        letter-spacing: 1px;
        margin: 15px 0;
        color: #ffffff;
      }
      > .h5_mask_title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        margin-bottom: 15px;
        > img:first-child {
          width: 148px;
          height: 50px;
        }
        > img:last-child {
          width: 24px;
          height: 24px;
        }
      }
      > .h5_nav_list {
        display: flex;
        flex-direction: column;
        align-items: normal;
        > span {
          font-size: 14px;
          font-weight: 400;
          line-height: 14px;
          letter-spacing: 1px;
          margin: 15px 0;
          > a {
            color: #ffffff;
          }
        }
      }
      > .h5_nav_lang {
        display: flex;
        flex-direction: column;
        align-items: normal;
        > span {
          font-size: 14px;
          font-weight: 400;
          line-height: 14px;
          letter-spacing: 1px;
          margin: 15px 0;
          cursor: pointer;
          > a {
            color: #ffffff;
          }
        }
      }
      .h5_wallet {
        margin-top: 15px;
        > .yes_login {
          width: 173px;
          height: 40px;
          border-radius: 100px;
          border: 1px solid #ffffff;
          i {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #14b465;
            margin-left: 8px;
          }
        }
        > .no_login {
          height: 40px;
          border-radius: 100px;
          border: 1px solid #ffffff;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }
      }
    }
  }
  @media screen and (min-width: 451px) {
    position: fixed;
    display: none;
    .h5_mask {
      display: none;
    }
  }
`;
