import React from "react";
import axios from "axios";
import Century from "./Century/Century";
import TinySlider from "tiny-slider-react";

class Main extends React.Component {
  constructor(props) {
    super(props);
    /* let startAge = 100; */
    this.state = {
      startIndex: 20,
      startCentury: 2000,
      /*get currentCentury() {
        return this.startCentury;
      },
      get prevCentury() {
        return this.currentCentury - 100;
      },
      get nextCentury() {
        return this.currentCentury + 100;
      },*/
      centuries: [],
      ages: [],
      totalCenturies: 1,
      settingsCarousel: {
        items: 1,
        controlsText: ["prv", "nxt"],
        //autoWidth: true,
        center: true,
        loop: false,
        speed: 500,
        mouseDrag: true,
        nav: false,
        gutter: 0,
        edgePadding: 0
      }
    };
  }

  componentWillMount() {
    console.log("willMount");

    axios
      .get(`http://localhost:4000/famous/0/centuries`, {
        headers: {
          "Access-Control-Allow-Origin": true,
          "content-type": "application/json"
        }
      })
      .then(response => {
        const ages = response.data.ages
          .slice(0, response.data.totalCenturies)
          .reverse();

        this.setState({
          centuries: ages,
          totalCenturies: response.data.totalCenturies
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`http://localhost:4000/famous/0`, {
        headers: {
          "Access-Control-Allow-Origin": true,
          "content-type": "application/json"
        }
      })
      .then(response => {
        let currentAges = [];
        this.state.centuries.forEach(age => {
          currentAges[age] = [];
        });

        this.setState({ ages: currentAges });

        const famous = response.data;
        const updatedFams = famous.map(fam => {
          const posLeft = Number(fam.born.slice(2)) + "%";
          const posTop = Math.floor(Math.random() * 90) + "%";
          const repoData = function() {
            if (Number(fam.born.slice(2)) <= 5) {
              return "left";
            } else if (Number(fam.born.slice(2)) >= 95) {
              return "right";
            }
          };

          return {
            ...fam,
            posLeft,
            posTop,
            repoData: repoData()
          };
        });

        for (const famous of updatedFams) {
          currentAges.forEach((age, idx) => {
            if (famous.born >= idx && famous.born < idx + 100) {
              currentAges[idx].push(famous);
            }
          });
        }

        let carousel = document.getElementsByClassName("famous-container");
        let carouselWidth = carousel[0].offsetWidth;

        this.setState({ ages: currentAges, carouselWidth: carouselWidth });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    console.log("didUpdate");
    //console.log(this.state);
  }

  /* centurySelectedHandler = id => {
    console.log("handler");
    this.setState({
      currentCentury: id,
      prevCentury: id - 100,
      nextCentury: id + 100
    });
  }; */

  onIndexChanged = ev => {
    //console.log(ev, ev.index);
    if (this.state.ages[this.state.centuries[ev.index - 1]]) {
      let prevButton = `<div class="century-title">
                          ${this.state.centuries[ev.index - 1]}
                        </div>
                        <div class="century-total">
                        ${
                          this.state.ages[this.state.centuries[ev.index - 1]]
                            .length
                        }
                        </div>`;
      ev.prevButton.innerHTML = prevButton;
    }

    if (this.state.ages[this.state.centuries[ev.index + 1]]) {
      let nextButton = `<div class="century-title">
                          ${this.state.centuries[ev.index + 1]}
                        </div>
                        <div class="century-total">
                        ${
                          this.state.ages[this.state.centuries[ev.index + 1]]
                            .length
                        }
                      </div>`;
      ev.nextButton.innerHTML = nextButton;
    }
  };

  render() {
    const centuries = this.state.ages.map((cent, idx, arr) => {
      /* let ageWidth = "auto";
      let ageStatus = "hidden";
      let currentTotalCenturies = this.state.totalCenturies;
      let currentCenturyPercent = 80;*/
      //let currentCenturyRest = 20 / currentTotalCenturies - 1;
      /*if (currentTotalCenturies === 1) {
        ageWidth = "160px";
      } else {
        console.log(idx, idx !== this.state.currentCentury);
        if (idx === this.state.currentCentury) {
          ageWidth = currentCenturyPercent + "%";
          ageStatus = "current";
        } else if (
          idx === this.state.prevCentury ||
          idx === this.state.nextCentury
        ) {
          ageWidth = "10%";
          ageStatus = "prev-next";
        } else {
          ageWidth = "0";
        }
      }*/
      return (
        <Century
          key={idx}
          age={idx}
          famous={arr[idx]}
          centuryWidth={this.state.carouselWidth}
          //agewidth={ageWidth}
          //century={ageStatus}
          //clicked={() => this.centurySelectedHandler(idx)}
        />
      );
    });

    return (
      <div id="main-content" className="century-container">
        <TinySlider
          settings={this.state.settingsCarousel}
          startIndex={this.state.startIndex}
          onIndexChanged={ev => this.onIndexChanged(ev)}
        >
          {centuries}
        </TinySlider>
      </div>
    );
  }
}

export default Main;
