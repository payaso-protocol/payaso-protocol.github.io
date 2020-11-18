import styled from "styled-components";

export const TransactionStyled = styled.div`
  @media screen and (max-width: 450px) {
    width: 100%;
    background-color: #111;
    color: #fff;
    font-size: 14px;
    color: #dbdbdb;
    // padding: 0 16px;
    min-height: calc(100vh - 252px);
    button {
      &.btn1 {
        background-color: #873232;
        color: #fff;
        margin-right: 10px;
      }
      .btn1:hover {
        background-color: #6c2828;
      }
      &.btn2 {
        background-color: #111;
        border: 1px solid #873232;
        color: #be3a3b;
      }
      &.btn3 {
      }
    }

    table {
      display: none;
    }
    .page {
      display: none;
    }
    .option_item {
      margin: 0 16px 10px;
      background: #161616;
      border-radius: 4px;
      padding: 20px 12px;
      .option_item_title {
        display: flex;
        align-items: center;
        img {
          width: 51px;
          height: 32px;
          margin-right: 10px;
        }
        > span {
          font-size: 24px;
          font-weight: 500;
          color: #dbdbdb;
          line-height: 32px;
          margin-right: 4px;
        }
        > div {
          padding: 1px 4px;
          background: #262626;
          border-radius: 4px 4px 4px 0px;
          height: 16px;
          display: flex;
          img {
            display: inline-block;
            width: 12px;
            height: 12px;
          }
          span {
            font-size: 12px;
            font-weight: 400;
            color: #dbdbdb;
            line-height: 14px;
          }
        }
      }
      .option_item_text {
        margin-top: 12px;
        display: flex;
        p {
          min-width: 80px;
          display: flex;
          flex-direction: column;
          span:first-child {
            font-size: 12px;
            font-weight: 400;
            color: #7d7d7d;
            line-height: 16px;
          }
          span {
            font-size: 14px;
            font-weight: 400;
            color: #dbdbdb;
            line-height: 18px;
          }
        }
        p:first-child {
          margin-right: 80px;
        }
      }
      .options_button {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #1d1d1d;
        display: flex;
        justify-content: space-between;
        button:first-child {
          width: 100%;
          height: 32px;
          background: #873232;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
        }
        button:hover {
          background-color: #6c2828;
        }
        // button:last-child {
        //   width: 45%;
        //   height: 32px;
        //   border-radius: 10px;
        //   border: 1px solid #873232;
        //   background: transparent;
        //   font-size: 14px;
        //   font-weight: 500;
        //   color: #be3a3b;
        // }
      }
    }
    .container {
      width: 100%;
      .nav {
        padding: 0 16px;
        .title {
          display: flex;
          h5 {
            line-height: 20px;
            color: #be3a3b;
            cursor: pointer;
          }

          img {
            width: 20px;
            height: 20px;
            /* border: 1px dashed #DBDBDB; */
            margin: 0 4px 0 10px;
          }

          span {
          }
        }

        ul {
          display: flex;
          height: 60px;
          line-height: 58px;
          margin-top: 15px;
          box-shadow: 0px 1px 0px 0px #1d1d1d;
          li {
            margin-right: 48px;
            cursor: pointer;
            &.active {
              border-bottom: 2px solid #be3a3b;
              font-weight: 500;
              color: #be3a3b;
            }
          }
          li:hover {
            color: #be3a3b;
          }
        }
      }
    }

    .category {
      display: flex;
      align-items: center;
      position: relative;
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
          margin-left: 8px;
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
        display: none !important;
        width: 120px;
        position: absolute;
        box-sizing: border-box;
        top: 38px;
        left: 40px;
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
    }
  }
  @media screen and (min-width: 451px) {
    width: 100%;
    background-color: #111;
    min-height: calc(100vh - 200px);
    color: #fff;
    /* padding-bottom: 150px; */
    padding-top: 20px;
    font-size: 14px;
    color: #dbdbdb;

    button {
      &.btn1 {
        background-color: #873232;
        color: #fff;
        margin-right: 10px;
      }
      &.btn1:hover {
        background-color: #6c2828;
      }
      &.btn2 {
        background-color: #111;
        border: 1px solid #873232;
        color: #be3a3b;
      }
      &.btn3 {
      }
    }

    .option_item {
      display: none;
    }
    table {
      width: 100%;
      margin-top: 30px;
      thead {
        height: 44px;
        background-color: #1d1d1d;
        border-radius: 4px;
        /* line-height: 44px; */
        tr {
          th {
            line-height: 44px;
            &:first-child {
              text-indent: 1em;
            }
            &:last-child {
              text-align: center;
            }
            &.price {
              vertical-align: middle;
              span {
                /* background: url(/assets/arrows/paixu.png) no-repeat; */
                /* background-size: 12px 12px;
                background-position: center right;
                cursor: pointer; */
              }
            }
            i.info {
              display: inline-block;
              line-height: 44px;
              width: 16px;
              height: 16px;
              background: url(/assets/arrows/info.png) no-repeat;
              background-size: contain;
              margin-left: 3px;
              vertical-align: middle;
              cursor: help;
              position: relative;
              p {
                position: absolute;
              }
            }
          }
        }
      }

      tbody {
        tr {
          height: 60px;
          line-height: 60px;
          td {
            &:first-child {
              display: flex;
              align-items: center;
              padding-left: 10px;
              /* text-indent: 2em; */
              img {
                width: 20px;
                height: 20px;
                /* margin-left: 10px; */
                margin-right: 8px;
              }
            }
            &:last-child {
              text-align: center;
            }
            button {
              height: 32px;
              padding: 0 10px;
              border-radius: 10px;
              cursor: pointer;
            }

            p {
              text-align: center;
            }
          }
        }
      }
    }

    .page {
      text-align: right;
      margin-top: 20px;
      margin-right: 30px;
      & > i {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin: 0 6px;
        cursor: pointer;
      }

      .page_up {
        background: url(/assets/arrows/left2.png) no-repeat;
        background-size: contain;
        background-position: 0 0;
        &:hover {
          background: url(/assets/arrows/left1.png) no-repeat;
          background-size: contain;
          background-position: 0 0;
        }
      }

      .page_down {
        background: url(/assets/arrows/right2.png) no-repeat;
        background-size: contain;
        background-position: 0 0;
        &:hover {
          background: url(/assets/arrows/right1.png) no-repeat;
          background-size: contain;
          background-position: 0 0;
        }
      }
    }

    .container {
      width: 1200px;
      margin: 0 auto;
      .nav {
        .title {
          display: flex;
          h5 {
            line-height: 20px;
            color: #be3a3b;
            cursor: pointer;
          }

          img {
            width: 20px;
            height: 20px;
            /* border: 1px dashed #DBDBDB; */
            margin: 0 4px 0 10px;
          }

          span {
          }
        }

        ul {
          display: flex;
          height: 60px;
          line-height: 58px;
          margin-top: 15px;
          box-shadow: 0px 1px 0px 0px #1d1d1d;
          li {
            margin-right: 48px;
            cursor: pointer;
            &.active {
              border-bottom: 2px solid #be3a3b;
              font-weight: 500;
              color: #be3a3b;
            }
          }
          li:hover {
            color: #be3a3b;
          }
        }
      }
    }

    .category {
      display: flex;
      align-items: center;
      position: relative;
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
          margin-left: 8px;
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
        display: none !important;
        width: 120px;
        position: absolute;
        box-sizing: border-box;
        top: 38px;
        left: 40px;
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
    }
  }
`;

export const InsureStyled = styled.div`
  @media screen and (max-width: 450px) {
    .status_tip {
      color: #cb7e7e;
      text-indent: 1em;
      padding: 0 16px;
      margin-bottom: 20px;
    }

    .status_jh {
      color: #c43909;
    }
    .status_th {
      color: #ac0904;
    }
    .status_faild {
      color: #acacac;
    }
  }
  @media screen and (min-width: 451px) {
    .status_tip {
      color: #cb7e7e;
      text-indent: 1em;
    }

    .status_jh {
      color: #c43909;
    }
    .status_th {
      color: #ac0904;
    }
    .status_faild {
      color: #acacac;
    }
  }
`;

export const UnderwriteStyled = styled.div`
  @media screen and (max-width: 450px) {
  }
  @media screen and (min-width: 451px) {
    .status_tip {
      color: #cb7e7e;
      text-indent: 1em;
    }

    table {
      td.confirm_ing {
        color: #dbdbdb;
      }
      td.confirm_ed {
        color: #7d7d7d;
      }
      td.confirm_bf {
        color: #cb7e7e;
      }
    }
  }
`;

export const AdvertisingStyled = styled.div`
  .status_tip {
    color: #cb7e7e;
    text-indent: 1em;
  }

  td.off {
    color: #7d7d7d;
  }
`;

export const OptionStyled = styled.div`
  @media screen and (max-width: 450px) {
    display: flex;
    line-height: 32px;
    flex-direction: column;
    padding: 0 16px;
    img {
      width: 20px;
      height: 20px;
    }
    .left {
      width: 100%;
      display: flex;
      flex-direction: column;
      & > div {
        display: flex;
        margin-right: 50px;
        h5 {
          color: #ffffff;
        }
      }
      .category {
        margin-top: 20px;
      }
      .currency {
        margin-top: 20px;
        ul {
          display: flex;
          margin-left: 8px;
          li {
            padding: 0 10px;
            background-color: #303030;
            color: #dbdbdb;
            height: 32px;
            border-radius: 10px;
            margin-right: 1em;
            cursor: pointer;
            &.on {
              background-color: #1d2023;
              color: #acacac;
            }
          }
          li:hover {
            background-color: #303030;
          }
        }
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      & > div {
        display: flex;
        h5 {
          margin-right: 8px;
          color: #ffffff;
        }
      }
      .select {
        margin-top: 20px;
        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 180px;
          height: 32px;
          border: 1px solid #303030;
          border-radius: 3px;
          padding: 0 8px;
          box-sizing: border-box;
        }

        select {
          width: 180px;
          height: 32px;
          border: 1px solid #303030;
          border-radius: 3px;
          background-color: #111;
          color: #dbdbdb;
          padding: 0 8px;
          option {
            color: #dbdbdb;
            background-color: #111;
          }
        }
      }

      button {
        padding: 0 15px;
        box-sizing: border-box;
        background-color: #873232;
        color: #fff;
        border-radius: 10px;
        margin-left: 17px;
        cursor: pointer;
      }
      button:hover {
        background-color: #6c2828;
      }
    }
  }
  @media screen and (min-width: 451px) {
    display: flex;
    justify-content: space-between;
    height: 32px;
    margin: 20px 0;
    line-height: 32px;

    img {
      width: 20px;
      height: 20px;
    }
    .left {
      display: flex;

      & > div {
        display: flex;
        margin-right: 50px;
        h5 {
          color: #ffffff;
        }
      }

      .currency {
        ul {
          display: flex;
          margin-left: 8px;
          li {
            padding: 0 10px;
            background-color: #303030;
            color: #dbdbdb;
            height: 32px;
            border-radius: 10px;
            margin-right: 1em;
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

    .right {
      display: flex;
      & > div {
        display: flex;
        margin-left: 50px;
        h5 {
          margin-right: 8px;
          color: #ffffff;
        }
      }
      .select {
        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 150px;
          height: 32px;
          border: 1px solid #303030;
          border-radius: 3px;
          padding: 0 8px;
          box-sizing: border-box;
        }

        select {
          width: 150px;
          height: 32px;
          border: 1px solid #303030;
          border-radius: 3px;
          background-color: #111;
          color: #dbdbdb;
          padding: 0 8px;
          option {
            color: #dbdbdb;
            background-color: #111;
          }
        }
      }

      button {
        padding: 0 15px;
        box-sizing: border-box;
        background-color: #873232;
        color: #fff;
        border-radius: 10px;
        margin-left: 20px;
        cursor: pointer;
      }
      button:hover {
        background-color: #6c2828;
      }
    }
  }
`;

export const Page1Styled = styled.div`
  .container {
    .top_nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0px 45px 0px;

      ul {
        display: flex;
        li {
          color: #be3a3b;
          height: 32px;
          line-height: 32px;
          padding: 0px 10px;
          cursor: pointer;
          &.active {
            color: #fff;
            background-color: #873232;
            border-radius: 10px;
          }
        }
      }
    }

    .btn1 {
      margin-right: 0 !important;
      /* cursor: pointer; */
    }
  }

  /* isShowIhaveUnderwrite */
  .IWantUnderwrite {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0px;
    left: 0px;

    .form {
      width: 496px;
      /* height: 580px; */
      background-color: #101010;
      border-radius: 10px;
      margin: 150px auto;
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
          p {
            font-size: 12px;
            color: #7d7d7d;
            text-align: right;
            margin-top: 5px;
          }
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
          cursor: pointer;
        }
      }
    }
  }

  .IWantInsure {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0px;
    left: 0px;
    .form {
      width: 496px;
      background-color: #101010;
      border-radius: 10px;
      margin: 150px auto;
      box-sizing: border-box;
      padding: 10px 30px;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 20px;
        img {
          width: 20px;
          height: 20px;
          user-select: none;
          cursor: pointer;
        }
      }

      .insure_info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        h5 {
          font-size: 12px;
          color: #7d7d7d;
          text-align: right;
          margin-bottom: 5px;
        }
      }

      .premium {
        margin-top: 17px;
        display: flex;
        justify-content: space-between;
        h5 {
          color: #7d7d7d;
        }
      }

      .number {
        margin-top: 17px;
        h5 {
          color: #7d7d7d;
          margin-bottom: 5px;
        }
        div.input {
          position: relative;
          input {
            width: 100%;
            height: 40px;
            border: 1px solid #303030;
            border-radius: 3px;
            background-color: #101010;
            text-indent: 1em;
            padding-right: 50px;
            box-sizing: border-box;
            color: #dbdbdb;

            &::placeholder {
              color: #7d7d7d;
            }
          }
          span {
            position: absolute;
            top: 10px;
            right: 10px;
          }
        }
        div.tip {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #7d7d7d;
          margin-top: 5px;
        }
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
          cursor: pointer;
        }
      }
    }
  }
`;

export const SettlementStyled = styled.div`
  background-color: #161616;
  @media screen and (max-width: 450px) {
    h1 {
      color: #ffffff;
      font-weight: 20px;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #1d1d1d;
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
      padding-left: 16px;
    }
    .pc_image {
      display: none;
    }
    .pc_button {
      display: none;
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          display: flex;
          align-items: center;
          width: 100%;
        }
        .order_info_text {
          display: flex;
          margin-top: 15px;
        }
        .order_info_text_two {
          justify-content: flex-end;
        }
        .order_info {
          margin: 20px 0px 16px;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 0 16px;
          & > div {
            .order_info_title {
              flex: 1;
            }

            img {
              width: 47px;
              height: 27px;
            }
            h5 {
              font-size: 20px;
              color: #dbdbdb;
              margin-left: 6px;
            }
            span {
              &:nth-child(1) {
                font-size: 16px;
                color: #dbdbdb;
              }

              &:nth-child(2) {
                font-size: 14px;
                color: #7d7d7d;
                margin-left: 5px;
              }
            }
          }
        }

        button {
          background-color: #873232;
          color: #ffffff;
          font-size: 14px;
          height: 32px;
          padding: 0 12px;
          border-radius: 10px;
          cursor: pointer;
        }
        button:hover {
          background-color: #6c2828;
        }
      }
    }
  }
  @media screen and (min-width: 451px) {
    h1 {
      color: #ffffff;
      font-weight: 20px;
      height: 60px;
      line-height: 60px;
      margin-left: 20px;
    }
    .h5_image {
      display: none;
    }
    .h5_button {
      display: none;
    }
    /* ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .order_info_title {
          margin-right: 120px;
        }
        .order_info_text {
          display: flex;
          div {
            margin-right: 120px;
          }
        }
        .order_info {
          margin: 20px 0px;

          & > div {
            img {
              width: 47px;
              height: 27px;
              margin-left: 20px;
            }
            h5 {
              font-size: 20px;
              color: #dbdbdb;
              margin-left: 6px;
            }
            span {
              &:nth-child(1) {
                font-size: 16px;
                color: #dbdbdb;
              }

              &:nth-child(2) {
                font-size: 14px;
                color: #7d7d7d;
                margin-left: 5px;
              }
            }
          }
        }

        button {
          background-color: #873232;
          color: #ffffff;
          font-size: 14px;
          height: 32px;
          padding: 0 12px;
          border-radius: 10px;
          cursor: pointer;
          margin-right: 20px;
        }
        button:hover {
          background-color: #6c2828;
        }
      }
    } */
    table {
      tbody {
        
        position: relative;
        tr {
          td {
            img.un_logo {
              width: 50px;
              height: 32px;
              margin-right: 10px;
            }
          }

          button {
            background-color: #873232;
            color: #ffffff;
            font-weight: 500;

            &.active {
              color: rgba(256, 256, 256, 0.4);
              text-indent: 20px;
              background-image: url(/assets/loading/loading.gif);
              background-repeat: no-repeat;
              background-position: 8px 7px;
              background-size: 16px;
            }
          }
        }

        .queshen_tr{
          height: 250px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          .quesheng{
            display: block;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            img{
                width: 180px;
                height: 114px;
            } 
            p{
              font-size: 14px;
              line-height: 20px;
              color: #DBDBDB;
            }
          }
        }

        
      }
    }
  }
`;
