import React from 'react';

import { MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import searchW from '../../pictures/searchW.png';

const PersonalAcc = () => {
      const [user, setUser] = useState(null);
      const navigate = useNavigate();

      useEffect(() => {
          const token = sessionStorage.getItem("token");
          if (token) {
              axios.get('/api/v0.1/users/profile', {
                  headers: { Authorization: `Bearer ${token}` }
              })
                  .then(res => {
                    setUser(res.data);
                  })
                  .catch(() => {
                    sessionStorage.removeItem("token");
                    setUser(null);
                    navigate("/api/v0.1/users/login");
                  });
        } else {
            navigate("/api/v0.1/users/login");
        }
    }, []);

    if (!user) return null;

  return (
    <main className="thin">
      <div>
        <Panel />
      </div>
      <div className="boxInfo">
        <Info />
      </div>
      <div id="boxBooking" className="boxGeneral">
        <FillInformation />
      </div>
      <div id="boxHistory" className="boxGeneral">
        <FillInformation />
      </div>
      <div id="boxConsult" className="boxGeneral">
        <FillInformation />
      </div>
      <div id="boxPrescrip" className="boxGeneral">
        <FillInformation />
      </div>
      <div id="boxVaccin" className="boxGeneral">
        <FillInformation />
      </div>
      <div id="boxTests" className="boxGeneral">
        <FillInformation />

      </div>
    </main>
  );
};

const Panel = () => {
  const [unit, setUnit] = React.useState('');

  let optionsUnit = [
    { id: 1, name: 'Réservations' },
    { id: 2, name: 'Antécédents médicaux' },
    { id: 3, name: 'Consultations' },
    { id: 4, name: 'Prescription' },
    { id: 5, name: 'Vaccinations' },
    { id: 6, name: 'Tests' },
  ];
  const handleChangeUnit = (event) => {
    setUnit(event.target.value);
  };

  return (
    <>
      <div id="headLineTop" className="lineStyle">
        <div className="titleStyle fat">Compte personnel</div>
        <div id="searchPanel">
          <div>
            {' '}
            <input
              type="date"
              name="date"
              value="2000-01-31"
              aria-required="true"
              className="choisePanel"
              required
            />
          </div>

          <Select
            labelId="select-label"
            className="fat choisePanel"
            value={unit}
            label="Section"
            onChange={handleChangeUnit}
          >
            {optionsUnit.map((item) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          <img src={searchW} height="41px" />
        </div>
      </div>

      <div id="linkNavig">
        <nav id="navigAncor" className="fat">
          <div className="ancorLink">Réservations</div>
          <div className="ancorLink">Antécédents médicaux</div>
          <div className="ancorLink">Consultations</div>
          <div className="ancorLink">Prescription</div>
          <div className="ancorLink">Vaccinations</div>
          <div className="ancorLink">Tests</div>
        </nav>
      </div>
    </>
  );
};

const Info = () => {
  let infoUnit = [
    {
      id: 1,
      nom: 'Hugo',
      prénom: 'Victor',
      date_de_naissance: '26/01/1802',
      ville: 'Besançon',
      /*adresse: 'Ksfjdl fsljdf 8',
      numéro_assurance: '1284723469',
      sexe: 'sexe masculin',
      groupe_sanguin: 'A+',
      téléphone: '+330932092323',
      mail: 'kdsfdkfj@gmail.com',
      adresse: 'dfdaskfjl fkds',
      numéro_assurance: 'KLDJEds 987',
      sexe: 'dsfkdfk;ewm',
      groupe_sanguin: 'Antsdfwwj 08ux',
      téléphone: 'ad sdf sdf sdf 9887',
      mail: 'sdfksa sdfljsdf sdlfsdjf lsdfsdldf dfsdlflj ',
      adresse: 'sdfsdf sDDF dfsd Fsdfsdfgsdgdsf',
      numéro_assurance: 'Dsdfsdgfglf',*/
    },
  ];
  let optionsType = [
    { id: 1, name: 'passeport' },
    { id: 2, name: 'carte identité' },
    { id: 3, name: 'permis de conduire' },
    { id: 4, name: 'acte de naissance' },
    { id: 5, name: 'test' },
    { id: 6, name: 'certificat' },
    { id: 7, name: 'analyses' },
  ];
  const [type, setType] = React.useState('');
  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  return (
    <>
      <div className="titlePersoStyle fat">Informations personnelles</div>
      <div id="persInfo">
        <div id="textInfo">
          {Object.entries(infoUnit[0]).map(([key, value]) => {
            return (
              <div className="lines">
                <div className="linePers fat">{key}</div>
                <div className="valueInfo">{value}</div>
              </div>
            );
          })}
        </div>
        <div id="fotoInfo">
          <div className="foto shadowFoto"></div>
          <div className="btnSize buttonStyleDark2 fat">modifier</div>
          <div className="lineSize fat">documents justificatifs</div>
          <div className="addFile thin">
            <Select
              labelId="select-label"
              className="simple-select-type"
              value={type}
              label="sélectionner le type"
              onChange={handleChangeType}
              required
            >
              {optionsType.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </div>
          <div className="inputFile">
            <input
              type="file"
              id="textFile"
              name="textFile"
              accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf, image/*"
            />
          </div>
          <div className="btnSize buttonStyleDark2 fat">envoyer</div>
        </div>
      </div>
    </>
  );
};

const FillInformation = () => {
  let titleUnit = [
    {
      1: 'Réservations',
      2: 'Antécédents médicaux',
      3: 'Consultations',
      4: 'Prescription',
      5: 'Vaccinations',
      6: 'Tests',
    },
  ];
  let noteUnit = [
    {
      note1:
        'Lorem ipsum odor amet, consectetuer adipiscing elit Fames cras fusce duis inceptos faucibus amet nulla. Taciti aenean nam feugiat eros convallis metus. Parturient hac imperdiet taciti praesent dis eu dictum  euismod vitae. Duis taciti elementum sodales eleifend tellus urna. Sem ultricies at a orci lacus. Consequat aliquet mauris nostra eget facilisis maximus.  Ornare quis ante duis laoreet morbi potenti. Senectus sollicitudin nec cras enim erat nisi velit litora.',
      note2:
        'Pharetra nostra bibendum ante at tellus. Lobortis condimentum augue metus purus nisi ligula. Euismod mollis ac in blandit dolor risus commodo cubilia. Convallis dictum ullamcorper bibendum tempor dapibus tellus consequat imperdiet. Lobortis pretium sed natoque magnis leo sapien posuere vitae. Volutpat ridiculus hendrerit augue magnis placerat volutpat. Atincidunt ultrices leo malesuada eleifend ad. Et dictum libero fermentum maecenas faucibus quam magnis risus.',
    },
  ];
  return (
    <>
      <div className="titleStyle lineStyle fat">Réservations</div>;
      <div className="blocNote">
        {Object.entries(noteUnit[0]).map(([key, value]) => {
          return (
            <div className="linesNote">
              <div className="dataNote buttonStyleDark2 fat">{key}</div>
              <div className="infoNote fat">{value}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PersonalAcc;