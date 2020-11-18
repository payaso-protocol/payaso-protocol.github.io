import styled from "styled-components";

export const MaskStyled = styled.div`
  @media screen and (max-width: 450px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10;

    .content {
      width: 90%;
      background-color: #fff;
      margin: 7% auto;
      border-radius: 10px;
      padding: 30px;
      box-sizing: border-box;
      transform: translate(50%, 50%);
      position: absolute;
      margin-left: -40%;
      margin-top: -50%;
      .top {
        position: relative;
        h1 {
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: 500;
          img {
            width: 36px;
            height: 36px;
            margin-right: 10px;
          }
        }
        button {
          position: absolute;
          top: 5px;
          right: 0px;
          width: 20px;
          height: 20px;
          background-image: url(./assets/icons/guanbi.png);
          background-size: contain;
          cursor: pointer;
        }

        p {
          font-size: 14px;
          margin-top: 8px;
        }
      }

      ul {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 120px;
          height: 32px;
          border: 2px solid #dbdbdb;
          border-radius: 10px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          user-select: none;
          cursor: pointer;
          margin: 12px 0 8px 0;
          &.off {
            opacity: 0.5;
            border: 2px solid #dbdbdb;
            cursor: wait;
            img,
            p {
              opacity: 0.5;
            }
          }

          &.on:hover {
            border: 2px solid #acacac;
          }

          img {
            width: 24px;
            height: 24px;
            margin: 0px 4px 0 4px;
          }

          P {
            font-size: 12px;
            color: #1c1c1c;
          }
        }
      }

      .ewm {
        margin-top: 20px;
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
  @media screen and (min-width: 451px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10;

    .content {
      width: 480px;
      height: 602px;
      background-color: #fff;
      margin: 7% auto;
      border-radius: 10px;
      padding: 40px 30px;
      box-sizing: border-box;

      .top {
        position: relative;
        h1 {
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: 500;
          img {
            width: 36px;
            height: 36px;
            margin-right: 10px;
          }
        }
        button {
          position: absolute;
          top: 5px;
          right: 0px;
          width: 20px;
          height: 20px;
          background-image: url(./assets/icons/guanbi.png);
          background-size: contain;
          cursor: pointer;
        }

        p {
          font-size: 14px;
          margin-top: 8px;
        }
      }

      ul {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 180px;
          height: 50px;
          border: 1px solid #dbdbdb;
          border-radius: 10px;
          margin-bottom: 1em;
          display: flex;
          align-items: center;
          padding: 0 1em;
          box-sizing: border-box;
          user-select: none;
          cursor: pointer;
          &.off {
            cursor: wait;
            img,
            p {
              opacity: 0.5;
            }
          }

          &.on:hover {
            border: 2px solid #acacac;
          }

          img {
            width: 36px;
            height: 36px;
          }

          P {
            font-size: 14px;
            color: #1c1c1c;
            text-indent: 1em;
          }
        }
      }

      .ewm {
        margin-top: 20px;
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
`;
