import React from "react";
import Famous from "../Famous/Famous";
import "./Century.css";

const Century = props => {
  const centuryWidth = props.centuryWidth;
  const famous = props.famous.map((fam, idx) => {
    const years = fam.live.split("-");
    const born = years[0];
    const death = years[1] || new Date().getFullYear();
    const lifeLine = Math.floor((centuryWidth * (death - born)) / 100);
    return (
      <Famous
        key={idx}
        id={fam.born.slice(0, 2) + "-" + idx}
        name={fam.name}
        live={fam.live}
        age={death - born}
        lifeLine={lifeLine}
        desc={fam.desc}
        posleft={fam.posLeft}
        postop={fam.posTop}
        repoData={fam.repoData}
      />
    );
  });

  return (
    <div className="century" age={props.ageStatus} onClick={props.clicked}>
      <div className="century-name">{props.age}</div>
      <div className="famous-container">{famous}</div>
    </div>
  );
};

export default Century;
