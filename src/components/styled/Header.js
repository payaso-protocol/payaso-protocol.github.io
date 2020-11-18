import styled from "styled-components";

export const HeaderStyled = styled.div`
  @media screen and (max-width: 450px) {
    height: 60px;
    padding: 0 16px;
    a {
      display: flex;
    }
    img {
      width: 148px;
      height: 50px;
    }
    i {
      display: block;
      width: 20px;
      height: 20px;
      background: url("./assets/h5_images/more@2x.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  @media screen and (min-width: 451px) {
    height: 60px;
    padding: 0 60px;
    img {
      width: 177px;
      /* height: 36px; */
      margin-right: 50px;
    }
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #873232;
  color: #fff;

  div {
    display: flex;
    align-items: center;

    .navList {
      display: flex;
      li {
        margin-right: 50px;
        height: 58px;
        line-height: 58px;
        box-sizing: border-box;
        &.active {
          border-bottom: 2px solid #cb7e7e;
        }
        a {
          color: #fff;
        }
      }
    }
  }

  div {
    .wallet {
      .yes_login {
        padding: 0 1em;
        height: 40px;
        box-sizing: border-box;
        border: 1px solid #fff;
        border-radius: 3px;
        margin-right: 20px;
        cursor: pointer;
        i {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #14b465;
          margin-left: 8px;
        }
      }

      .no_login {
        height: 40px;
        padding: 0 1em;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 600;
        background-color: rgba(256, 256, 256, 0.12);
        border-radius: 100px;
        margin-right: 20px;
        cursor: pointer;
      }
    }
    ._lang_box {
      position: relative;
      user-select: none;
      .lan_btn {
        width: 130px;
        height: 36px;
        border-radius: 20px;
        border: 1px solid #ffffff;
        text-indent: 1.5em;
        background: url(./assets/icons/下箭头.svg) no-repeat;
        background-size: 10px;
        background-position: 95px;
        cursor: pointer;
      }
      .lan_box {
        position: absolute;
        width: 130px;
        background-color: #fff;
        border-radius: 10px;
        top: 42px;
        overflow: hidden;
        display: none;

        &.showBox {
          display: block;
        }

        li {
          font-size: 14px;
          width: 100%;
          height: 40px;
          color: #1d2023;
          line-height: 40px;
          text-indent: 3em;
          background: url(./assets/icons/weixuanzhong.svg) no-repeat;
          background-size: 16px;
          background-position: 10px 12px;
          cursor: pointer;
        }

        li.active {
          background: url(./assets/icons/selected-copy.svg) no-repeat;
          background-size: 16px;
          background-position: 10px 12px;
          background-color: #e8eaec;
        }
      }
    }
  }
`;
