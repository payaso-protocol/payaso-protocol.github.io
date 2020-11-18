import styled from "styled-components";

export const AlertStyled = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
`;

export const WarningStyled = styled.div`
  @media screen and (max-width: 450px) {
    width: 90%;
    background: #101010;
    border-radius: 3px;
    margin: 0 auto;
    padding: 18px 20px;
    box-sizing: border-box;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        font-size: 16px;
        color: #dbdbdb;
      }
      img {
        width: 20px;
        height: 20px;
        user-select: none;
        cursor: pointer;
      }
    }

    .content {
      font-size: 14px;
      color: #acacac;
      line-height: 1.5em;
      margin: 40px 0 20px;
      height: 60px;
    }

    .btn_box {
      text-align: right;
      justify-content: flex-end;
      display: flex;
      button {
        padding: 0 0.4em;
        height: 30px;
        border-radius: 3px;
        border: 1px solid #873232;
        color: #be3a3b;
        background: none;
        font-weight: 500;
        margin-left: 10px;
        cursor: pointer;
        &.submit {
          background-color: #873232;
          color: #dbdbdb;
        }
        &.submit:hover {
          background-color: #6c2828;
        }
        &.Insufficient {
          background-color: #873232;
          color: #fff;
          opacity: 0.5;
        }
      }
    }
  }
  @media screen and (min-width: 451px) {
    width: 496px;
    height: 190px;
    background: #101010;
    border-radius: 3px;
    margin: 0 auto;
    padding: 18px 30px;
    box-sizing: border-box;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        font-size: 16px;
        color: #dbdbdb;
      }
      img {
        width: 20px;
        height: 20px;
        user-select: none;
        cursor: pointer;
      }
    }

    .content {
      font-size: 14px;
      color: #acacac;
      line-height: 1.5em;
      margin-top: 40px;
      height: 60px;
    }

    .btn_box {
      text-align: right;
      button {
        padding: 0 0.8em;
        height: 30px;
        border-radius: 3px;
        border: 1px solid #873232;
        color: #be3a3b;
        background: none;
        font-weight: 500;
        margin-left: 10px;
        cursor: pointer;
        &.submit {
          background-color: #873232;
          color: #dbdbdb;
        }
        &.submit:hover {
          background-color: #6c2828;
          border: 1px solid #6c2828;
        }
        &.Insufficient {
          background-color: #873232;
          color: #fff;
          opacity: 0.5;
        }
      }
    }
  }
`;

export const Tip = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  background-color: #1d2c24;
  top: 0px;
  left: 0;
  display: flex;
  align-items: center;
  justify-items: center;
  z-index: 22;

  & > div {
    margin: 0 auto;
    display: flex;
    align-items: center;
    i {
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url(/assets/icons/icon@2x.png) no-repeat;
      background-size: contain;
      background-position: 0 0;
      margin-right: 12px;
    }
  }
`;
