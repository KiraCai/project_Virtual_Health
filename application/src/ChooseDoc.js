import React from 'react';
import CalendarDoc from './CalendarDoc';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useForm, useController } from 'react-hook-form';
import chevronLeft from '../pictures/chevron_left.png';

const ChooseDoc = () => {
  var optionsHour = [
    { id: 1, name: '08' },
    { id: 2, name: '09' },
    { id: 3, name: '10' },
    { id: 4, name: '11' },
    { id: 5, name: '12' },
    { id: 6, name: '13' },
    { id: 7, name: '14' },
  ];
  var optionsMinute = [
    { id: 11, name: '00' },
    { id: 21, name: '15' },
    { id: 31, name: '30' },
    { id: 41, name: '45' },
  ];
  const [hour, setHour] = React.useState('');
  const [minute, setMinute] = React.useState('');

  const handleChangeHour = (event) => {
    setHour(event.target.value);
  };
  const handleChangeMinute = (event) => {
    setMinute(event.target.value);
  };
  return (
    <main className="thin">
      <div className="titleStyle lineStyle fat">
        Sélectionnez la date d'enregistrement
      </div>
      <div className="thin">
        <div className="infoBloc">
          <div id="leftBloc">
            <div id="upBloc">
              <div id="upleftBloc">
                <div className="foto"></div>{' '}
                <div className="infoPers">
                  <p>
                    ERlkjhgaslllajk
                    <br></br>
                    Tafdkjjhdf
                    <br></br>
                    Opkmjlkhsf jdsghg
                    <br></br>
                    Wejjhdf
                    <br></br>
                    Dsfdkjjhdf
                    <br></br>
                    Ssfmkjhg dkjjhdf
                  </p>
                </div>
              </div>
              <div className="upRightBloc">
                <div className="namePers fat">Philippus Aureolus Theoph</div>
                <div className="longBloc thin">
                  <p>
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Nullam
                    imperdiet integer fermentum tincidunt amet augue. Massa
                    curae elementum vehicula; vel taciti lacinia feugiat urna.
                    Justo tempus consectetur feugiat vivamus pellentesque
                    phasellus imperdiet. Sit tristique blandit erat maximus
                    praesent volutpat accumsan
                  </p>
                </div>
              </div>
            </div>
            <div id="bottomBloc">
              <div id="mapFoto"></div>
              <div className="thin">
                <p>
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Nullam
                  imperdiet integer fermentum tincidunt amet augue. Massa curae
                  elementum vehicula; vel taciti lacinia feugiat urna. ipsum
                  odor amet, consectetuer adipiscing elit.
                </p>
              </div>
            </div>
          </div>
          <div id="rightBloc" className="thin">
            <form className="formCalendar" method="post">
              <div className="fat">
                <CalendarDoc />
              </div>
              <div className="fat">
                <InputLabel id="select-helper-label">
                  choisir une heure
                </InputLabel>
                <Select
                  labelId="select-label"
                  className="simple-select-doc"
                  value={hour}
                  label="Heure"
                  onChange={handleChangeHour}
                  required
                >
                  {optionsHour.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className="fat">
                <InputLabel id="select-helper-label">
                  choisir les minutes
                </InputLabel>
                <Select
                  labelId="select-label"
                  className="simple-select-doc fat"
                  value={minute}
                  label="Minutes"
                  onChange={handleChangeMinute}
                  required
                >
                  {optionsMinute.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className="inputDoc fat">
                <label>ajouter un fichier</label>
                <input
                  type="file"
                  id="textFile"
                  name="textFile"
                  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf, image/*"
                />
              </div>
              <div className="inputDoc fat">
                <label>ajouter un commentaire</label>
                <textarea
                  id="textComment"
                  name="textComment"
                  rows="3"
                  cols="33"
                  autoCapitalize="on"
                  autoCorrect="on"
                  maxLength="300"
                  defaultValue="Écrivez votre note pour le médecin..."
                ></textarea>
              </div>
              <div className="fat">
                <input
                  type="submit"
                  value="RESERVER"
                  className="btnDoc btn buttonStyleDark fat"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="styleLine fat">
          <Link className="titleRetour" to="/search">
            <img src={chevronLeft} height="41px" />
            retour au choix d'un médecin
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ChooseDoc;
