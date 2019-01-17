import React from "react";
import "./Famous.css";

class Famous extends React.Component {
  state = {
    selected: "selected"
  };
  toggleClass = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };

  render() {
    const famStyle = {
      left: this.props.posleft,
      top: this.props.postop
    };
    let dataStyle = {};
    if (this.props.repoData) {
      if (this.props.repoData === "left") {
        dataStyle = {
          left: "5%",
          transform: "none"
        };
      } else {
        dataStyle = {
          right: "10%",
          left: "unset",
          transform: "none"
        };
      }
    }
    const lifeLineWidth = {
      width: this.props.lifeLine + "px"
    };

    return (
      <div
        className={this.state.active ? "famous-item selected" : "famous-item"}
        style={famStyle}
        ages={this.props.age}
        onClick={this.toggleClass}
      >
        <div
          className="famous-lived"
          style={lifeLineWidth}
          title={this.props.name + " (" + this.props.age + ")"}
        />
        <div className="famous-pointer">
          <span className="famous-pointer_dot">·</span>
        </div>
        <div className="famous-data" style={dataStyle}>
          <div className="famous-name">
            {this.props.name + " (" + this.props.age + ")"}
          </div>
          <div className="famous-live">{this.props.live}</div>
          <div className="famous-desc">{this.props.desc}</div>
        </div>
      </div>
    );
  }
}

export default Famous;
