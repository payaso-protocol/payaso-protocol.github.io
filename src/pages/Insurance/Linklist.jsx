import React, { Component } from "react";
import { LinklistStyle } from "./styled";
import { Link } from "react-router-dom";

export default class Linklist extends Component {
  constructor() {
    super();
    this.state = {
      link_list: [
        {
          href: "/Download",
          img: "Security",
          link: true,
        },
        {
          href: "https://twitter.com/payasoio",
          img: "Twitter",
          link: false,
        },
        {
          href: "https://medium.com/@payaso.io",
          img: "medium",
          link: false,
        },
        {
          href: "https://t.me/payaso_io",
          img: "Telegram",
          link: false,
        },
        {
          href: "https://discord.gg/pNqEPrD",
          img: "Discord",
          link: false,
        },
        {
          href: "https://github.com/payaso-protocol/",
          img: "Github",
          link: false,
        },
      ],
    };
  }

  render() {
    return (
      <LinklistStyle>
        <ul>
          {this.state.link_list.map((item, index) => {
            return (
              <li key={index}>
                {item.link ? (
                  <Link to={item.href}>
                    <img src={`assets/images/${item.img}@2x.png`} alt="" />
                    <p>{item.img}</p>
                  </Link>
                ) : (
                  <a target="_blank" rel="noopener noreferrer" href={item.href}>
                    <img src={`assets/images/${item.img}@2x.png`} alt="" />
                    <p>{item.img}</p>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </LinklistStyle>
    );
  }
}
