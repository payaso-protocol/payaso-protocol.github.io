import styled from "styled-components";

export const MiningStyled = styled.div`
  width: 100%;
  height: 100%;
  background-color: #111;
  /* height: 1000px; */
  color: #fff;
  padding-top: 130px;
  padding-bottom: 150px;
  h1 {
    display: block;
    height: 62px;
    font-size: 44px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 62px;
    text-align: center;
  }
`;

export const EarningsStyled = styled.div`
  width: 1200px;
  height: 180px;
  margin: 130px auto;
  margin-bottom: 0px;
  background-color: #161616;
  padding: 20px;
  box-sizing: border-box;

  .title {
    display: flex;
    align-items: center;
    h2 {
      font-size: 20px;
      margin-right: 8px;
    }
    h3 {
      font-size: 14px;
      color: #acacac;
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    & > div {
      width: 330px;
      color: #7d7d7d;
      margin-top: 55px;
      h5 {
        font-size: 14px;
        line-height: 22px;
      }

      p {
        font-size: 20px;
        line-height: 28px;
      }
    }
  }
`;

export const NavStyled = styled.div`
  width: 1200px;
  min-height: 324px;
  background-color: #161616;
  margin: 10px auto;
  padding: 0 20px;
  box-sizing: border-box;

  ul.nav {
    display: flex;
    height: 60px;
    align-items: center;

    li {
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      color: #dbdbdb;
      margin: 0 25px;
      cursor: pointer;

      &:nth-child(1) {
        margin-left: 0px;
      }
    }

    li.active {
      color: #873232;
      border-bottom: 2px solid #873232;
    }
  }
`;

export const NavItemStyled = styled.div`
  color: #acacac;
  h5 {
    font-size: 14px;
    line-height: 22px;
    margin-top: 20px;
  }

  .from_tip {
    span {
      color: #acacac;
      font-size: 12px;
      line-height: 20px;
      margin-right: 1em;
    }
  }

  .agree {
    display: flex;
    align-items: center;
    margin: 20px 0px;
    div {
      width: 16px;
      height: 16px;
      border: 1px dashed #acacac;
      margin-right: 0.5em;
      cursor: pointer;

      &.cheched {
        background: url(./assets/icons/duigou.svg) no-repeat;
        background-size: 16px;
      }
    }
    span {
      font-size: 12px;
    }
  }

  button {
    width: 104px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background-color: #873232;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
  }

  .claim_page {
    .logo {
      margin-top: 18px;
      img {
        /* width: 60px; */
        height: 24px;
      }
    }
    .no_get {
      h5 {
        color: #7d7d7d;
        font-size: 14px;
        line-height: 1.5em;
      }
      p {
        font-size: 20px;
        line-height: 1.5em;
        margin-top: 8px;
      }
    }
    .get {
      margin-top: 16px;
      margin-bottom: 27px;
      span {
        font-size: 12px;
        color: #acacac;
        margin-right: 60px;
      }
    }
  }
`;

export const InputStyle = styled.div`
  display: flex;
  margin: 8px auto;
  input {
    width: 400px;
    height: 40px;
    background-color: #161616;
    text-indent: 1em;
    color: #dbdbdb;
    border-radius: 3px;
    box-sizing: border-box;
    border: 1px solid #434343;
    &::-webkit-inner-spin-button {
      display: none;
    }
  }

  ul {
    display: flex;
    margin-left: 20px;
    li {
      width: 75px;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      background-color: #262626;
      font-size: 16px;
      text-align: center;
      margin-right: 10px;
      cursor: pointer;
      border-radius: 3px;

      &:hover {
        color: #873232;
        border: 2px solid #873232;
        background-color: #111;
        line-height: 36px;
      }
    }
  }
`;
