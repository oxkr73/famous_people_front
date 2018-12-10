import React from "react";
import axios from "axios";
import Famous from "../Famous/Famous";
import "./Century.css";

class Century extends React.Component {
  state = {
    famous: []
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/famous/1800", {
        headers: {
          "Access-Control-Allow-Origin": true,
          "content-type": "application/json"
        }
      })
      .then(response => {
        const fams = response.data;
        const updatedFams = fams.map(fam => {
          const posLeft = Number(fam.born.slice(2)) + "%";
          const posTop = Math.floor(Math.random() * 90) + "%";
          return {
            ...fam,
            posLeft,
            posTop
          };
        });
        //console.log(updatedFams);
        this.setState({ famous: updatedFams });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const famous = this.state.famous.map((fam, idx) => {
      return (
        <Famous
          key={idx}
          name={fam.name}
          live={fam.live}
          desc={fam.desc}
          posleft={fam.posLeft}
          postop={fam.posTop}
        />
      );
    });
    const centuryStyle = {
      width: this.props.agewidth
    };
    return (
      <div className="century" style={centuryStyle}>
        <div className="century-name">{this.props.age}</div>
        <div className="famous-container">{famous}</div>
      </div>
    );
  }
}

export default Century;
