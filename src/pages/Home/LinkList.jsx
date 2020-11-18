import React, { Component } from "react";
import { LinkListStyled } from "./styled";

export default class LinkList extends Component {
  constructor() {
    super();
    this.state = {
      linkList: [
        {
          href: "https://twitter.com/payasoio",
          img: "twitter@2x.png",
        },
        {
          href: "https://medium.com/@payaso.io",
          img: "Medium@2x.png",
        },
        {
          href: "https://t.me/payaso_io",
          img: "telegram@2x.png",
        },
        {
          href: "https://discord.gg/pNqEPrD",
          img: "discord@2x.png",
        },
        {
          href: "https://github.com/payaso-protocol/",
          img: "github@2x.png",
        },
      ],
    };
  }
  render() {
    return (
      <LinkListStyled>
        <ul>
          {this.state.linkList.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.href}>
                  <img src={"./assets/images/" + item.img} alt="" />
                </a>
              </li>
            );
          })}
        </ul>
      </LinkListStyled>
    );
  }
}
