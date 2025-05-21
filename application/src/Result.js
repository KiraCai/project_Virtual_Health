import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Result = () => {
  return (
    <div id="resultBloc">
      <div id="resultsPage">
        <div className="bloc">
          <Bloc />
        </div>
        <div className="bloc">
          <Bloc />
        </div>
        <div className="bloc">
          {' '}
          <Bloc />
        </div>
        <div className="bloc">
          {' '}
          <Bloc />
        </div>
      </div>
      <div>1,2,3,4,5</div>
    </div>
  );
};
export default Result;

const Bloc = () => {
  return (
    <div className="blocDoc thin">
      <div id="headBloc">
        <div className="foto"></div>
        <div className="description">
          <div className="namePers fat">Philippus Aureolus Theoph</div>
          <div className="textFull">Dermatologue</div>
          <div className="textFull">Lyon</div>
        </div>
      </div>
      <div className="textFullLarge">
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Nullam imperdiet
          integer fermentum tincidunt amet augue. Massa curae elementum
          vehicula; vel taciti lacinia feugiat urna.
        </p>
      </div>
      <div>
        <Link className="buttonStyleDark fat" to="/choosingDoc">
          sélectionner une date
        </Link>
      </div>
    </div>
  );
};
