import axios from "axios";

console.log(Main);

const fetchData = {
  centuriesData: axios
    .get(
      `http://localhost:4000/famous/${Main.state.currentCentury}/centuries`,
      {
        headers: {
          "Access-Control-Allow-Origin": true,
          "content-type": "application/json"
        }
      }
    )
    .then(response => {
      console.log(response);
      const ages = response.data.ages.slice(0, response.data.totalCenturies);
      this.setState({
        centuries: ages,
        totalCenturies: response.data.totalCenturies
      });
    })
    .catch(err => {
      console.log(err);
    }),

  famousData: axios
    .get(`http://localhost:4000/famous/${Main.state.currentCentury}`, {
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
        return {
          ...fam,
          posLeft,
          posTop
        };
      });
      for (const famous of updatedFams) {
        currentAges.forEach((age, idx) => {
          if (famous.born >= idx && famous.born < idx + 100) {
            currentAges[idx].push(famous);
          }
        });
      }
      this.setState({ ages: currentAges });
    })
    .catch(err => {
      console.log(err);
    })
};

export default fetchData;
