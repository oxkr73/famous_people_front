import React from "react";
import axios from "axios";
import Century from "./Century/Century";

class Main extends React.Component {
  state = {
    centuries: [],
    totalCenturies: 1
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/famous/2000/centuries", {
        headers: {
          "Access-Control-Allow-Origin": true,
          "content-type": "application/json"
        }
      })
      .then(response => {
        const cents = response.data.ages.slice(0, response.data.totalCenturies);
        this.setState({
          centuries: cents,
          totalCenturies: response.data.totalCenturies
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const centuries = this.state.centuries.map((cent, idx) => {
      let ageWidth = "auto";
      if (this.state.totalCenturies === 1) {
        ageWidth = "160px";
      }
      return <Century key={idx} age={cent} agewidth={ageWidth} />;
    });
    return <div id="main-content">{centuries}</div>;
  }
}

export default Main;
