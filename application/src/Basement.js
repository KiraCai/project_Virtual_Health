import React from 'react';
import ind from '../pictures/linkedin.png';
import inst from '../pictures/inst.png';
import fac from '../pictures/facebook.png';
import twi from '../pictures/twit.png';
import mail from '../pictures/mail.png';
import tel from '../pictures/tel.png';

const Basement = () => {
  return (
    <footer>
      <div className="footwrap">
        <div className="fbox1">
          <div id="logofoot">
            <a href="" title="There is no link yet!">
              {' '}
              <img src={ind} />
            </a>
            <a href="" title="There is no link yet!">
              <img src={inst} />
            </a>
            <a
              href="https://www.facebook.com/AJVDECTOGO"
              title="There is no link yet!"
            >
              <img src={fac} />
            </a>
            <a href="" title="There is no link yet!">
              <img src={twi} />
            </a>
            <a href="" title="There is no link yet!">
              <img src={mail} />
            </a>
            <a href="" title="There is no link yet!">
              <img src={tel} />
            </a>
          </div>
        </div>
        <div className="fbox2">
          <div className="textfoot thin">
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Aliquet
              volutpat ligula urna placerat finibus fermentum. Ipsum vivamus
              fermentum himenaeos sapien leo sem. Blandit curae facilisi
              maecenas luctus ex. Ornare interdum facilisi ridiculus a magnis
              semper. Eros dui adipiscing condimentum viverra auctor habitasse
              tempor aliquet egestas. Integer lectus laoreet aliquet, aliquet
              sociosqu fermentum. Purus posuere a aenean massa sed sollicitudin
              turpis. Elit curae libero dignissim magnis eleifend.
            </p>
          </div>
          <div className="boxli thin">
            <a href="" title="There is no link yet!">
              Psfgfents
            </a>
            <a href="">Mésgfsns</a>
            <a href="">Maefwars</a>
          </div>
        </div>
        <div className="fbox3">
          <div className="textfoot thin">
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Aliquet
              volutpat ligula urna placerat finibus fermentum. Ipsum vivamus
              fermentum himenaeos sapien leo sem. Blandit curae facilisi
              maecenas luctus ex. Ornare interdum facilisi ridiculus a magnis
              semper. Eros dui adipiscing condimentum viverra auctor habitasse
              tempor aliquet egestas. Integer lectus laoreet aliquet, aliquet
              sociosqu fermentum. Purus posuere a aenean massa sed sollicitudin
              turpis. Elit curae libero dignissim magnis eleifend.
            </p>
          </div>
          <div className="boxli thin">
            <a href="" title="There is no link yet!">
              Psfgfents
            </a>
            <a href="">Mésgfsns</a>
            <a href="">Maefwars</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Basement;
