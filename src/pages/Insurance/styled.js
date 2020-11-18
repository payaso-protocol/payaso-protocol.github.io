import styled from "styled-components";

export const InsuranceStyled = styled.div`
  @media screen and (max-width: 450px) {
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
    .connect_wallet {
      width: 100%;
      height: 94px;
      background: #111111;
      display: flex;
      justify-content: center;
      padding-top: 20px;
      button {
        width: 173px;
        height: 40px;
        background: #873232;
        border-radius: 100px;
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
      }
      button:hover {
        background-color: #6c2828;
      }
    }
    .container {
      width: 100%;
      .option_box {
        display: flex;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        width: 100%;
        height: 32px;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 16px;
          font-weight: 400;
          color: #dbdbdb;
          line-height: 32px;
        }
        button {
          i {
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url(/assets/h5_images/chengbao@2x.png) no-repeat;
            background-size: 100% 100%;
            margin-right: 8px;
          }
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 10px;
          height: 32px;
          background: #ffc819;
          border-radius: 10px;
          cursor: pointer;
        }
        button:hover {
          background: #ffd347;
        }
      }

      .content {
        padding-bottom: 10px;
        li {
          margin: 0 16px;
          height: 241px;
          background-color: #161616;
          border-radius: 3px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-bottom: 10px;
          padding: 20px 12px;
          .product {
            width: 200px;
            & > div {
              display: flex;
              align-items: center;
              img {
                width: 51px;
                height: 32px;
              }
              h2 {
                color: #dbdbdb;
                font-size: 24px;
                font-weight: 500;
                color: #dbdbdb;
                line-height: 32px;
                margin-left: 10px;
              }
            }
            p {
              font-size: 16px;
              color: #7d7d7d;
              margin-top: 12px;
              line-height: 24px;
            }
          }
          .pair_wrap {
            display: flex;
            justify-content: space-between;
          }
          .pair {
            display: flex;
            align-items: center;
            span {
              font-size: 16px;
              color: #ffffff;
            }
            img {
              width: 23px;
              margin: 0 10px;
            }
            i {
              display: inline-block;
              width: 17px;
              height: 17px;
              &.lamp {
                width: 23px;
                height: 17px;
                background: url(/assets/images/un@2x.png) no-repeat;
                background-size: contain;
                background-position: 0 0;
                margin-left: 8px;
              }
              &.eth {
                background: url(/assets/arrows/ETH@2x.png) no-repeat;
                background-size: contain;
                background-position: 0 0;
                margin-left: 8px;
              }
              &.usdt {
                background: url(/assets/images/USDT@2x.png) no-repeat;
                background-size: contain;
                background-position: 0 0;
                margin-left: 8px;
              }
            }
          }
          .date {
            span {
              font-size: 16px;
              color: #fff;
              &:first-child {
                color: #7d7d7d;
              }
            }
          }
          button {
            width: 104px;
            height: 35px;
            background-color: #873232;
            color: #fff;
            border-radius: 10px;
            margin-right: 16px;
            cursor: pointer;
          }
          button:hover {
            background-color: #6c2828;
          }
        }
      }
    }
  }
  @media screen and (min-width: 451px) {
    padding-bottom: 90px;
    min-height: calc(100vh - 270px);
    .top_banner {
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: url(/assets/images/banner@2x.png) no-repeat;
      background-size: contain;
      background-position: 0 0;
      h1 {
        width: 1200px;
        margin: 0 auto;
        font-size: 40px;
        color: #ffffff;
        font-weight: 500;
        line-height: 180px;
      }
    }
    .connect_wallet {
      display: none;
    }
    .container {
      margin: 0 auto;
      width: 1200px;
      .option_box {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0px 1px 0px 0px #1d1d1d;

        & > div {
          display: flex;
          span {
            display: inline-block;
            height: 1.8em;
            color: #be3a3b;
            border-bottom: 2px solid #be3a3b;
            margin-right: 35px;
          }

          div {
            position: relative;
            display: flex;
            align-items: center;
            img {
              position: absolute;
              top: 10px;
              left: 10px;
              width: 16px;
              height: 16px;
              user-select: none;
            }
            input {
              width: 215px;
              height: 32px;
              border-radius: 3px;
              border: 1px solid #303030;
              box-sizing: border-box;
              background-color: #101010;
              color: #dbdbdb;
              font-size: 14px;
              text-indent: 36px;
              margin-right: 16px;

              &::placeholder {
                color: #7d7d7d;
              }
            }
          }
        }

        /* common */
        button {
          i {
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url(/assets/h5_images/chengbao@2x.png) no-repeat;
            background-size: 100% 100%;
            margin-right: 8px;
          }
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 10px;
          height: 32px;
          background: #ffc819;
          border-radius: 10px;
          cursor: pointer;
        }
        button:hover {
          background: #ffd347;
        }
        > button {
          i {
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url(/assets/h5_images/chengbao@2x.png) no-repeat;
            background-size: 100% 100%;
            margin-right: 5px;
          }
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 108px;
          height: 32px;
          background: #ffc819;
          border-radius: 10px;
          color: #000000;
          cursor: pointer;
        }
        > button:hover {
          background: #ffd347;
        }
      }

      .content {
        margin-top: 20px;
        padding-bottom: 20px;
        li {
          height: 124px;
          background-color: #161616;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          .product {
            padding-left: 30px;
            width: 200px;
            & > div {
              display: flex;
              align-items: center;
              img {
                width: 77px;
                height: 48px;
              }
              h2 {
                font-size: 26px;
                font-weight: 500;
                color: #dbdbdb;
                margin-left: 25px;
              }
            }
            p {
              font-size: 16px;
              color: #7d7d7d;
              margin-top: 15px;
            }
          }
          .pair_wrap {
            display: flex;
            width: 450px;
          }
          .pair:first-child {
            margin-right: 140px;
          }
          .pair {
            display: flex;
            align-items: center;
            span {
              font-size: 16px;
              color: #ffffff;
            }
            img {
              width: 23px;
              margin: 0 10px;
            }
            i {
              display: inline-block;
              width: 17px;
              height: 17px;
              &.lamp {
                width: 23px;
                height: 17px;
                background: url(/assets/images/un@2x.png) no-repeat;
                background-size: contain;
                background-position: 0 0;
                margin-left: 8px;
              }
              &.eth {
                background: url(/assets/arrows/ETH@2x.png) no-repeat;
                background-size: contain;
                background-position: 0 0;
                margin-left: 8px;
              }
              &.usdt {
                background: url(/assets/images/USDT@2x.png) no-repeat;
                background-size: contain;
                background-position: 0 0;
                margin-left: 8px;
              }
            }
          }

          .date {
            span {
              font-size: 16px;
              color: #fff;
              &:first-child {
                color: #7d7d7d;
              }
            }
          }

          button {
            width: 100px;
            height: 35px;
            background-color: #873232;
            color: #fff;
            border-radius: 10px;
            margin-right: 16px;
            cursor: pointer;
          }
          button:hover {
            background-color: #6c2828;
          }
        }
      }
    }
  }
  width: 100%;
  height: 100%;
  background-color: #111111;
`;

export const UnderwriteStyle = styled.div`
  @media screen and (max-width: 450px) {
    .form {
      width: 90%;
      margin: 0 auto;
      background-color: #101010;
      border-radius: 10px;
      box-sizing: border-box;
      padding: 20px 20px 20px 33px;
      display: flex;
      flex-direction: column;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 14px;
          font-weight: 400;
          color: #dbdbdb;
        }
        img {
          width: 20px;
          height: 20px;
          user-select: none;
          cursor: pointer;
        }
      }
      > span {
        font-size: 14px;
        font-weight: 400;
        color: #acacac;
        margin: 15px 0 12px;
      }

      .select_currency {
        display: flex;
        margin-top: 15px;
        li {
          margin-right: 50px;
          display: flex;
          align-items: center;
          cursor: pointer;
          label {
            display: flex;
            cursor: pointer;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #acacac;
            i {
              display: block;
              width: 16px;
              height: 16px;
              background: url(/assets/arrows/radio2.png) no-repeat;
              background-size: contain;
              background-position: 0 0;
              margin-right: 8px;
              &.active {
                background: url(/assets/arrows/radio1.png) no-repeat;
                background-size: contain;
                background-position: 0 0;
              }
            }
          }
        }
      }

      .select_option {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        & > div {
          h5 {
            font-size: 14px;
            font-weight: 400;
            color: #acacac;
            margin-bottom: 5px;
          }
          select {
            width: 100%;
            height: 40px;
            box-sizing: border-box;
            border-radius: 3px;
            border: 1px solid #303030;
            margin-bottom: 10px;
            background-color: #101010;
            color: #dbdbdb;
            padding-left: 1em;
            option {
              color: #dbdbdb;
              background-color: #111;
              padding-left: 20px;
            }
          }
        }
      }
      .index_price {
        display: none;
      }
      .h5_indexPrice {
        display: flex;
        justify-content: space-between;
        p {
          font-size: 12px;
          font-weight: 400;
          color: #7d7d7d;
        }
      }
      .select_input {
        display: flex;
        flex-direction: column;
        & > div {
          h5 {
            font-size: 14px;
            font-weight: 400;
            color: #acacac;
            margin-bottom: 5px;
          }
          div {
            margin-bottom: 10px;
            position: relative;
            input {
              width: 100%;
              height: 40px;
              box-sizing: border-box;
              border-radius: 3px;
              border: 1px solid #303030;
              background-color: #111;
              color: #dbdbdb;
              text-indent: 1em;
              padding-right: 50px;
              &::-webkit-inner-spin-button {
                display: none;
              }
            }
            span {
              position: absolute;
              top: 10px;
              right: 10px;
            }
            p {
              font-size: 12px;
              color: #7d7d7d;
              text-align: right;
              margin-top: 5px;
            }
          }
        }
      }

      .show_procedure {
        & > div {
          border-bottom: 1px solid #1d1d1d;
          margin-bottom: 5px;
          span {
            font-size: 14px;
            font-weight: 400;
            color: #acacac;
          }
          display: flex;
          justify-content: space-between;
          color: #acacac;
          line-height: 32px;
          span:last-child {
            color: #dbdbdb;
          }
        }
      }

      .show_tip {
        margin-top: 20px;
        font-size: 12px;
        color: #cb7e7e;
        color: #cb7e7e;
        line-height: 17px;
      }

      .submit {
        margin-top: 20px;
        text-align: right;
        padding-bottom: 10px;
        button {
          height: 30px;
          padding: 0 10px;
          border-radius: 3px;
          margin-left: 10px;
          background-color: #873232;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          box-sizing: border-box;

          &:first-child {
            border: 1px solid #873232;
            color: #873232;
            background: none;
          }
        }
      }
    }
  }
  @media screen and (min-width: 451px) {
    .form {
      width: 496px;
      /* height: 580px; */
      background-color: #101010;
      border-radius: 10px;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 10px 30px;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        img {
          width: 20px;
          height: 20px;
          user-select: none;
          cursor: pointer;
        }
      }
      .category {
        margin-top: 20px;
      }
      .select_currency {
        display: flex;
        margin-top: 20px;
        li {
          margin-right: 50px;
          display: flex;
          align-items: center;
          cursor: pointer;
          label {
            display: flex;
            cursor: pointer;
            display: flex;
            align-items: center;
            i {
              display: block;
              width: 16px;
              height: 16px;
              background: url(/assets/arrows/radio2.png) no-repeat;
              background-size: contain;
              background-position: 0 0;
              margin-right: 8px;
              &.active {
                background: url(/assets/arrows/radio1.png) no-repeat;
                background-size: contain;
                background-position: 0 0;
              }
            }
          }
        }
      }

      .select_option {
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        & > div {
          select {
            width: 200px;
            height: 40px;
            box-sizing: border-box;
            border-radius: 3px;
            border: 1px solid #303030;
            margin-top: 5px;
            background-color: #101010;
            color: #dbdbdb;
            /* text-indent: 1em; */
            padding-left: 1em;
            option {
              color: #dbdbdb;
              background-color: #111;
              padding-left: 20px;
            }
          }
        }
      }
      .index_price {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: 5px;
        p {
          font-size: 12px;
          font-weight: 400;
          color: #7d7d7d;
        }
      }
      .h5_indexPrice {
        > p {
          display: none;
        }
      }
      .select_input {
        display: flex;
        margin-top: 10px;
        justify-content: space-between;
        & > div {
          div {
            position: relative;
            input {
              width: 200px;
              height: 40px;
              box-sizing: border-box;
              border-radius: 3px;
              border: 1px solid #303030;
              margin-top: 5px;
              background-color: #111;
              color: #dbdbdb;
              text-indent: 1em;
              padding-right: 50px;
              &::-webkit-inner-spin-button {
                display: none;
              }
            }
            span {
              position: absolute;
              top: 16px;
              right: 10px;
            }
            p {
              font-size: 12px;
              color: #7d7d7d;
              text-align: right;
              margin-top: 5px;
            }
          }
        }
      }

      .show_procedure {
        margin-top: 20px;
        & > div {
          display: flex;
          justify-content: space-between;
          color: #acacac;
          line-height: 32px;
          span:last-child {
            color: #dbdbdb;
          }
        }
      }

      .show_tip {
        margin-top: 20px;
        font-size: 12px;
        color: #cb7e7e;
      }

      .submit {
        margin-top: 20px;
        text-align: right;
        padding-bottom: 10px;
        button {
          height: 30px;
          padding: 0 10px;
          border-radius: 3px;
          margin-left: 10px;
          background-color: #873232;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          box-sizing: border-box;

          &:first-child {
            border: 1px solid #873232;
            color: #873232;
            background: none;
          }
        }
      }
    }
  }
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0px;
  left: 0px;
  color: #dbdbdb;
  display: flex;
  align-items: center;
  justify-items: center;
`;

export const CategoryStyle = styled.div`
  @media screen and (max-width: 450px) {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 20px;
    h5 {
      display: none;
      margin-right: 10px;
    }
    label {
      & > div {
        display: flex;
        align-items: center;
        width: 120px;
        height: 32px;
        box-sizing: border-box;
        background-color: #303030;
        text-indent: 40px;
        color: #dbdbdb;
        border-radius: 10px;
        cursor: pointer;
        user-select: none;
        position: relative;
        img {
          width: 20px;
          height: 20px;
          &:first-child {
            margin: 0 10px;
          }
          &:last-child {
            position: absolute;
            right: 8px;
            top: 6px;
          }
        }
      }
    }
    ul.category_ul {
      left: 0;
    }
  }
  @media screen and (min-width: 451px) {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 30px;
    h5 {
      margin-right: 10px;
    }
    label {
      & > div {
        display: flex;
        align-items: center;
        width: 120px;
        height: 32px;
        box-sizing: border-box;
        background-color: #303030;
        text-indent: 40px;
        color: #dbdbdb;
        border-radius: 10px;
        cursor: pointer;
        user-select: none;
        position: relative;
        img {
          width: 20px;
          height: 20px;
          &:first-child {
            margin: 0 10px;
          }
          &:last-child {
            position: absolute;
            right: 8px;
            top: 6px;
          }
        }
      }
    }
    ul.category_ul {
      left: 46px;
    }
  }

  ul.category_ul {
    display: none !important;
    width: 120px;
    position: absolute;
    box-sizing: border-box;
    top: 38px;
    flex-direction: column;
    border: 1px solid #303030;
    border-radius: 4px;
    overflow: hidden;
    li {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 40px !important;
      width: 100%;
      background-color: #101010;
      color: #dbdbdb !important;
      padding: 0 !important;
      &:hover {
        background-color: #303030;
      }
      img {
        width: 20px;
        height: 20px;
        margin: 0 10px;
      }
    }
  }
  input {
    display: none;
    &:checked + ul.category_ul {
      display: flex !important;
    }
  }
  input[type="checkbox"]:checked {
  }
`;

export const LinklistStyle = styled.div`
  @media screen and (max-width: 450px) {
    width: 100%;
    height: 192px;
    background-color: #1c1c1c;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    ul {
      width: 100%;
      display: flex;
      align-items: center;
      justify-items: center;
      justify-content: space-around;
      padding: 20px 35px;
      flex-wrap: wrap;
      height: 100%;
      li {
        width: 33%;
        text-align: center;
        a {
          display: flex;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        img {
          width: 24px;
          height: 24px;
        }
        p {
          font-size: 14px;
          color: #7d7d7d;
          text-align: center;
          line-height: 20px;
          margin-top: 6px;
        }
      }
    }
  }
  @media screen and (min-width: 451px) {
    width: 100%;
    height: 120px;
    /* margin-top: 90px; */
    background-color: #1c1c1c;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    ul {
      display: flex;
      align-items: center;
      justify-items: center;
      margin: 0 auto;
      li {
        width: 50px;
        height: 60px;
        text-align: center;
        margin: 20px;
        display: flex;
        img {
          width: 24px;
          height: 24px;
        }
        p {
          font-size: 14px;
          color: #7d7d7d;
          text-align: center;
          line-height: 20px;
          margin-top: 6px;
        }
      }
    }
  }
`;
