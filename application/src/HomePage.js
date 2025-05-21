import React, { useState } from 'react';

import man from '../pictures/man.jpg';
import forest from '../pictures/forest.jpg';
import red from '../pictures/red.jpg';
import left from '../pictures/leftarrow.png';
import right from '../pictures/rightarrow.png';

const HomePage = () => {
  /*hook original state*/
  const [selectedValue, setSelectedValue] = useState('man1');
  const [iteration, setIteration] = useState(0);
  var arrayFoto = ['man1', 'work1', 'nature1'];
  const images = {
    man1: man,
    work1: red,
    nature1: forest,
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  //function for click
  const clickMeL = () => {
    const newIndex = (iteration - 1 + arrayFoto.length) % arrayFoto.length;
    setIteration(newIndex);
    setSelectedValue(arrayFoto[newIndex]);
  };

  // Function to update slide index on right click
  const clickMeR = () => {
    const newIndex = (iteration + 1) % arrayFoto.length;
    setIteration(newIndex);
    setSelectedValue(arrayFoto[newIndex]);
  };

  const resultPict = images[selectedValue] || images.man1;

  return (
    <main className="thin">
      <div className="slides">
        <img src={resultPict} />
      </div>
      <div className="buttonLR">
        <button id="left" type="button" onClick={clickMeL}>
          <img src={left} />
        </button>
        <button id="right" type="button" onClick={clickMeR}>
          {' '}
          <img src={right} />
        </button>
      </div>

      <div className="wrapperSlide">
        <input
          type="radio"
          id="slide1"
          name="bar"
          value="man1" /*is not shown to the user to determine exactly which button was selected*/
          onChange={() => handleChange('man1')}
          checked={selectedValue === 'man1'}
        />
        <label htmlFor="slide1"></label>
        <input
          type="radio"
          id="slide2"
          name="bar"
          value="work1"
          onChange={() => handleChange('work1')}
          checked={selectedValue === 'work1'}
        />
        <label htmlFor="slide2"></label>
        <input
          type="radio"
          id="slide3"
          name="bar"
          value="nature1"
          onChange={() => handleChange('nature1')}
          checked={selectedValue === 'nature1'}
        />
        <label htmlFor="slide3"></label>
      </div>
      <div>
        <article className="articleHome fat">
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Fames cras
            fusce duis inceptos faucibus amet nulla. Taciti aenean nam feugiat;
            eros convallis metus. Parturient hac imperdiet taciti praesent dis
            eu dictum euismod vitae. Duis taciti elementum sodales eleifend
            tellus urna. Sem ultricies at a orci lacus. Consequat aliquet mauris
            nostra eget facilisis maximus. Ornare quis ante duis laoreet morbi
            potenti. Senectus sollicitudin nec cras enim erat nisi velit litora.
          </p>
          <p>
            Pharetra nostra bibendum ante at tellus. Lobortis condimentum augue
            metus purus nisi ligula. Euismod mollis ac in blandit dolor risus
            commodo cubilia. Convallis dictum ullamcorper bibendum tempor
            dapibus tellus consequat imperdiet. Lobortis pretium sed natoque
            magnis leo sapien posuere vitae. Volutpat ridiculus hendrerit augue
            magnis placerat volutpat. Atincidunt ultrices leo malesuada eleifend
            ad. Et dictum libero fermentum maecenas faucibus quam magnis risus.
          </p>
        </article>
      </div>
      <div id="news" className="thin">
        <h2 className="nameNews fat">Actualités</h2>
        <div id="newsLine">
          <div id="pic1">
            <a href="" title="There is no link yet!">
              Gfdfghjklj
            </a>
          </div>
          <div id="pic2">
            <a href="" title="There is no link yet!">
              Gfdfghjklj
            </a>
          </div>
          <div id="pic3">
            <a href="" title="There is no link yet!">
              Gfdfghjklj
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
export default HomePage;
