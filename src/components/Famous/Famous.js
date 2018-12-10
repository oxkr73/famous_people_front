import React from "react";
import "./Famous.css";

class Famous extends React.Component {
  render() {
    const famStyle = {
      left: this.props.posleft,
      top: this.props.postop
    };
    return (
      <div className="famous-item" style={famStyle}>
        <div className="famous-pointer">·</div>
        <div className="famous-data">
          <div className="famous-name">{this.props.name}</div>
          <div className="famous-live">{this.props.live}</div>
          <div className="famous-desc">{this.props.desc}</div>
        </div>
      </div>
    );
  }
}

export default Famous;
