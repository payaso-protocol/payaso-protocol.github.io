import styled from "styled-components";

export const ProductStyled = styled.div`
  width: 100%;
  background-color: #111111;
  color: #dbdbdb;
  @media screen and (max-width: 450px) {
    min-height: calc(100vh - 180px);
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

    .container {
      width: 100%;
      margin: 0 auto;
      padding: 0 16px;

      .top_title {
        height: 65px;
        box-shadow: 0px 1px 0px 0px #1d1d1d;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        padding: 20px 0 13px;
        & > div {
          display: flex;
          align-items: center;
          h3 {
            font-size: 12px;
            color: #873232;
            cursor: pointer;
          }
          img {
            width: 20px;
            height: 20px;
            margin: 0 4px;
          }
          span {
            font-size: 12px;
          }
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
          cursor: pointer;
          border-radius: 10px;
        }
        button:hover {
          background: #ffd347;
        }
      }

      .option {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        margin-top: 17px;
        & > div {
          h5 {
            color: #ffffff;
            margin-right: 10px;
          }
        }

        .protect_amount {
          display: flex;
          align-items: center;
          select {
            flex: 1;
            height: 32px;
            box-sizing: border-box;
            border-radius: 3px;
            border: 1px solid #303030;
            color: #dbdbdb;
            padding-left: 8px;
            margin-right: 15px;
            option {
              display: inline-block;
              background-color: #101010;
            }
          }
          button {
            padding: 0 10px;
            height: 32px;
            background: #873232;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 500;
            color: #ffffff;
          }
        }

        .currency {
          display: flex;
          align-items: center;
          margin-top: 20px;
          h5 {
            margin-right: 10px;
          }
          ul {
            display: flex;
            li {
              height: 32px;
              line-height: 32px;
              padding: 0px 10px;
              box-sizing: border-box;
              border-radius: 10px;
              background-color: #303030;
              color: #dbdbdb;
              margin-right: 16px;
              cursor: pointer;
              &.on {
                background-color: #1d1d1d;
                color: #acacac;
              }
            }
            li:hover {
              background-color: #303030;
            }
          }
        }
      }

      .product_list {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        li {
          width: 100%;
          background-color: #161616;
          border-radius: 4px;
          padding: 20px 12px;
          box-sizing: border-box;
          margin-bottom: 10px;
          .banner {
            display: flex;
            align-items: center;
            img {
              width: 52px;
              height: 30px;
            }
            span {
              font-size: 16px;
              color: #7d7d7d;
              margin: 0 4px;
            }
            p {
              font-size: 20px;
              color: #dbdbdb;
              font-weight: 500;
            }
          }

          .info {
            margin-top: 20px;
            p {
              margin-bottom: 12px;
              display: flex;
              justify-content: space-between;
              font-size: 16px;
              span {
                color: #dbdbdb;
                &:first-child {
                  color: #acacac;
                  cursor: pointer;
                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
            }
          }

          .btn_box {
            width: 100%;
            margin-top: 20px;
            > button {
              width: 100%;
              height: 35px;
              text-align: center;
              background-color: #873232;
              color: #fff;
              border-radius: 10px;
            }
            > button:hover {
              background-color: #6c2828;
            }
          }

          > button {
            height: 32px;
            padding: 0 0.8em;
            background-color: #873232;
            color: #fff;
            font-weight: 500;
            border-radius: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            &.underwrite_btn {
              background-color: #ffc819;
              cursor: pointer;
              color: #000000;
              img {
                width: 24px;
                height: 24px;
                margin-right: 8px;
                user-select: none;
              }
            }
            .underWrite_btn:hover {
              background: #ffd347;
            }
          }
        }
      }

      .product_list_0 {
        margin-top: 33px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        .content {
          width: auto;
          text-align: center;
          img {
            width: 180px;
          }
          p {
            color: #dbdbdb;
            font-size: 14px;
            margin-top: 30px;
            a {
              color: #873232;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: 451px) {
    min-height: calc(100vh - 180px);
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

    .container {
      width: 1200px;
      margin: 0 auto;

      button {
        color: #000;
        height: 32px;
        background-color: #873232;
        padding: 0 12px;
        border-radius: 10px;
        cursor: pointer;
      }

      .top_title {
        height: 60px;
        box-shadow: 0px 1px 0px 0px #1d1d1d;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;

        & > div {
          display: flex;
          align-items: center;
          h3 {
            color: #873232;
            cursor: pointer;
          }

          img {
            width: 20px;
            height: 20px;
            margin: 0 4px;
          }
        }

        button {
          i {
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url(/assets/icons/chengbao@2x.png) no-repeat;
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
          cursor: pointer;
          border-radius: 10px;
        }
        button:hover {
          background-color: #ffd347;
        }
      }

      .option {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-top: 17px;
        & > div {
          h5 {
            color: #ffffff;
            margin-right: 6px;
          }
        }

        .protect_amount {
          display: flex;
          align-items: center;
          select {
            width: 120px;
            height: 32px;
            box-sizing: border-box;
            border-radius: 3px;
            border: 1px solid #303030;
            color: #dbdbdb;
            margin-left: 8px;
            padding-left: 8px;
            margin-right: 10px;

            option {
              display: inline-block;
              background-color: #101010;
            }
          }
        }

        .currency {
          display: flex;
          align-items: center;
          margin-left: 26px;
          ul {
            display: flex;
            li {
              height: 32px;
              line-height: 32px;
              padding: 0px 10px;
              box-sizing: border-box;
              border-radius: 10px;
              background-color: #303030;
              color: #dbdbdb;
              margin-right: 16px;
              cursor: pointer;
              &.on {
                background-color: #1d1d1d;
                color: #acacac;
              }
            }
            li:hover {
              background-color: #303030;
            }
          }
        }
      }

      .product_list {
        margin-top: 33px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        min-height: 480px;
        padding-bottom: 90px;
        li {
          width: 285px;
          height: 294px;
          background-color: #161616;
          border-radius: 4px;
          padding: 25px 16px;
          box-sizing: border-box;
          margin-bottom: 30px;
          margin-left: 15px;
          position: relative;

          .banner {
            display: flex;
            align-items: center;
            img {
              width: 98px;
              height: 54px;
            }
            span {
              font-size: 16px;
              color: #7d7d7d;
              margin-left: 18px;
              margin-right: 12px;
            }
            p {
              font-size: 20px;
              color: #dbdbdb;
              font-weight: 500;
            }
          }

          .info {
            margin-top: 30px;
            p {
              margin-bottom: 12px;
              display: flex;
              justify-content: space-between;
              font-size: 16px;
              span {
                color: #dbdbdb;
                &:first-child {
                  color: #acacac;
                  cursor: pointer;
                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
            }
          }

          .btn_box {
            text-align: center;
            button {
              width: 250px;
              height: 35px;
              margin-top: 12px;
              background-color: #873232;
              color: #fff;
              font-weight: 500;
              &.disable {
                opacity: 0.5;
              }
            }
            > button:hover {
              background-color: #6c2828;
            }
          }

          .mask {
            width: 100%;
            height: 100%;
            background: rgba(22, 22, 22, 0.7);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            background-image: url(/assets/images/no_he@2x.png);
            background-repeat: no-repeat;
            background-size: contain;
            background-position: 0 100px;
          }
        }
      }

      .product_list_0 {
        margin-top: 33px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        height: 460px;
        .content {
          width: auto;
          margin: 130px auto;
          text-align: center;
          img {
            width: 180px;
          }
          p {
            color: #dbdbdb;
            font-size: 14px;
            margin-top: 30px;
            a {
              color: #873232;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
`;

export const LeaseCapStyled = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  z-index: 21;
  @media screen and (max-width: 450px) {
    .container {
      width: 90%;
      min-height: 334px;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 10px;
      background-color: #101010;
      font-size: 14px;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h4 {
          color: #dbdbdb;
        }
        img {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }

      .input_box {
        color: #7d7d7d;
        margin-top: 18px;
        & > div {
          position: relative;
          margin-top: 4px;
          input {
            width: 100%;
            height: 40px;
            background: none;
            text-indent: 1em;
            border: 1px solid #303030;
            border-radius: 3px;
            padding-right: 20px;
            box-sizing: border-box;
            color: #dbdbdb;
          }
          span {
            color: #acacac;
            position: absolute;
            top: 10px;
            right: 12px;
          }
        }
        p {
          font-size: 12px;
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
        }
      }

      .procedure,
      .expire {
        min-height: 32px;
        line-height: 32px;
        margin-top: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .procedure {
        font-size: 12px;
        span {
          &:first-child {
            color: #7d7d7d;
            cursor: pointer;
          }
        }
      }

      .expire {
        font-size: 12px;
        span {
          &:first-child {
            font-size: 12px;
            color: #a83d35;
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }

      .submit {
        flex-direction: column;
        span {
          width: 100%;
          line-height: 24px;
          &:first-child {
            font-size: 14px;
            color: #a83d35;
            cursor: pointer;
          }
        }
        div {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          button {
            margin-top: 20px;
            height: 32px;
            background: #873232;
            border-radius: 3px;
            font-size: 14px;
            font-weight: 500;
            color: #ffffff;
            padding: 0 10px;
          }
          button:hover {
            background: #6c2828;
          }
        }
      }
    }
  }
  @media screen and (min-width: 451px) {
    .container {
      width: 509px;
      height: 308px;
      padding: 20px 32px;
      box-sizing: border-box;
      border-radius: 10px;
      background-color: #101010;
      font-size: 14px;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h4 {
          color: #dbdbdb;
        }
        img {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }

      .input_box {
        color: #7d7d7d;
        margin-top: 20px;
        margin-left: 10px;
        & > div {
          position: relative;
          margin-top: 4px;
          input {
            width: 100%;
            height: 40px;
            background: none;
            text-indent: 1em;
            border: 1px solid #303030;
            border-radius: 3px;
            padding-right: 20px;
            box-sizing: border-box;
            color: #dbdbdb;
          }
          span {
            color: #acacac;
            position: absolute;
            top: 10px;
            right: 12px;
          }
        }
        p {
          margin-top: 6px;
          display: flex;
          justify-content: space-between;
        }
      }

      .procedure,
      .expire,
      .submit {
        height: 32px;
        line-height: 32px;
        margin-top: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
          color: #ffffff;
          &.insufficient {
            background-color: #873232;
            opacity: 0.5;
            font-weight: 500;
          }
        }
      }

      .procedure {
        span {
          &:first-child {
            color: #7d7d7d;
            cursor: pointer;
          }
        }
      }

      .expire {
        span {
          &:first-child {
            font-size: 12px;
            color: #a83d35;
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }

      .submit {
        span {
          &:first-child {
            font-size: 14px;
            color: #a83d35;
            cursor: pointer;
          }
        }
        button:hover {
          background: #6c2828;
        }
      }
    }
  }
`;
