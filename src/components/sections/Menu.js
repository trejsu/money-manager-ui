import React from "react";
import {Link} from "react-router";
import PropTypes from "prop-types";

import ClickableList from "../elements/ClickableList";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedItem: null};
  }

  componentDidMount () {
    this.setState({
      selectedItem: this.findIndex(this.context.router.location.pathname)
    });
  }

  findIndex(pathname) {
    let index = 0;
    this.menuElements.forEach((element, actualIndex) => {
      if (element.route === pathname) {
        index = actualIndex;
      }
    });
    return index;
  }

  get menuElements() {
    let elements = [];
    elements.push({
      name: "wydatki",
      route: "/expenses",
      image: "./resources/icons/menu/price_tag.svg"
    });
    elements.push({
      name: "statystyki",
      route: "/statistics",
      image: "./resources/icons/menu/pie_chart.svg"
    });
    elements.push({
      name: "budżety",
      route: "/budgets",
      image: "./resources/icons/menu/calculator.svg"
    });
    elements.push({
      name: "oszczędności",
      route: "/savings",
      image: "./resources/icons/menu/money.svg"
    });
    elements.push({
      name: "ustawienia",
      route: "/settings",
      image: "./resources/icons/menu/settings.svg"
    });
    return elements;
  }

  get menuLinks() {
    return this.menuElements.map(element =>
      <Link to = {element.route}>
        <img src = {element.image} />
        {element.name}
      </Link>
    );
  }

  onItemSelected(item) {
    this.setState({selectedItem: item});
  }

  render() {
    return (
      <div
        className = "main-container"
        id = "menu">
        <div id = "title">
          MENU
        </div>
        <hr />
        <ClickableList
          elements = {this.menuLinks}
          onClick = {this.onItemSelected.bind(this)}
          selectedItem = {this.state.selectedItem}
        />
      </div>
    );
  }
}

Menu.contextTypes = {
  router: PropTypes.object,
  location: PropTypes.object
};
