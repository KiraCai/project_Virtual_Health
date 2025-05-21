import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Result from './Result';

const Search = () => {
  var optionsCity = [
    { id: 1, name: 'Lyon' },
    { id: 2, name: 'Paris' },
    { id: 3, name: 'Saint' },
  ];
  var optionsHospital = [
    { id: 1, name: 'Mayo' },
    { id: 2, name: 'Cleveland' },
    { id: 3, name: 'Toronto General' },
    { id: 4, name: 'Charité' },
    { id: 5, name: 'AP-HP' },
  ];
  var optionsDomain = [
    { id: 1, name: 'Dermatologist' },
    { id: 2, name: 'Urologist' },
    { id: 3, name: 'Oncologist' },
    { id: 4, name: 'Dermatologue' },
  ];
  var optionsSurname = [
    { id: 1, name: 'Mayron' },
    { id: 2, name: 'Perez' },
    { id: 3, name: 'Johannes' },
    { id: 4, name: 'Perpignan' },
  ];
  const [city, setAge] = React.useState('');
  const [hospital, setHosp] = React.useState('');
  const [domain, setDomain] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handleChangeHosp = (event) => {
    setHosp(event.target.value);
  };
  const handleChangeDomain = (event) => {
    setDomain(event.target.value);
  };
  const handleChangeSurname = (event) => {
    setSurname(event.target.value);
  };

  return (
    <main className="thin">
      <div className="searcheBloc">
        <div className="titleStyle fat">Paramètres de recherche</div>
        <div className="searchFields">
          <form className="searchForm" method="post">
            <div className="searchBox">
              <div className="choiceBox">
                <InputLabel id="select-helper-label">Ville</InputLabel>
                <Select
                  labelId="select-label"
                  className="simple-select"
                  value={city}
                  label="Ville"
                  onChange={handleChangeAge}
                >
                  {optionsCity.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className="choiceBox">
                <InputLabel id="select-helper-label">Hôpital</InputLabel>
                <Select
                  labelId="select-label"
                  className="simple-select"
                  value={hospital}
                  label="Hôpital"
                  onChange={handleChangeHosp}
                >
                  {optionsHospital.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className="choiceBox">
                <InputLabel id="select-helper-label">
                  Doctor's specialization
                </InputLabel>
                <Select
                  labelId="select-label"
                  className="simple-select"
                  value={domain}
                  label="Domain"
                  onChange={handleChangeDomain}
                >
                  {optionsDomain.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className="choiceBox">
                <InputLabel id="select-helper-label">Nom du médecin</InputLabel>
                <Select
                  labelId="select-label"
                  className="simple-select"
                  value={surname}
                  label="Nom"
                  onChange={handleChangeSurname}
                >
                  {optionsSurname.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <p className="fat" id="union">
              OU
            </p>
            <div id="searchBoxAll">
              <input
                type="text"
                name="searchinput"
                placeholder="Entrez le nom, la profession, la ville..."
                pattern="^[a-zA-Z]+$"
              />
            </div>
            <div id="searchBoxBtn">
              <input
                type="submit"
                value="TROUVER UN MEDECIN"
                className="btn buttonStyleDark"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="titleStyle lineStyle fat">Résultats de la recherche</div>
      <Result />
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
    </main>
  );
};

export default Search;
