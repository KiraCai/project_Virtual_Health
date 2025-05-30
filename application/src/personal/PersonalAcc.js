import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import {MenuItem} from '@mui/material';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import searchW from '../../pictures/searchW.png';
import edit from '../../pictures/edit.png';
import plus from '../../pictures/plus.png';
import searchLogo from '../../pictures/search.png';
import upArrow from '../../pictures/up_arrow.png'

const PersonalAcc = () => {
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null); //todo all data
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(null); // "tests" | "vaccinations" | null
    const handleOpenModal = (section) => setOpenModal(section);
    const handleCloseModal = () => setOpenModal(null);

    const handleSubmit = async (e, section) => { //for add test/vaccinations
        e.preventDefault();
        const formData = new FormData(e.target);
        const dataToSend = Object.fromEntries(formData.entries());
        const token = sessionStorage.getItem("token");

        try {
            const url =
                section === "tests"
                    ? "/api/v0.1/users/profile/full/add_test"
                    : "/api/v0.1/users/profile/full/add_vaccination";

            await axios.post(url, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            alert("Добавлено успешно!");
            handleCloseModal();
            window.location.reload();
        } catch (err) {
            console.error("Ошибка при добавлении:", err);
            alert("Ошибка при добавлении данных");
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            console.log("Токен перед отправкой запроса:", token);

            axios.get('/api/v0.1/users/profile/full', {
                headers: {Authorization: `Bearer ${token}`}
            })
                .then(res => {
                    const fullProfile = res.data;
                    setUser(fullProfile.client);
                    setData(fullProfile);
                })
                .catch(() => {
                    sessionStorage.removeItem("token");
                    navigate("/login");
                });
        } else {
            navigate("/login");
        }
    }, []);

    if (!user) return null;

    return (
        <main className="thin">
            <div>
                <Panel/>
            </div>
            <div className="boxInfo">
                <Info user={user}/>
            </div>
            <div id="boxBooking" className="boxGeneral">
                <FillInformation title="Réservations" items={data?.reservations}/>
            </div>
            <div id="boxConsult" className="boxGeneral">
                <FillInformation title="Consultations" items={data?.consultations}/>
            </div>
            <div id="boxPrescrip" className="boxGeneral">
                <FillInformation title="Prescription" items={data?.prescriptions}/>
            </div>
            <div id="boxVaccin" className="boxGeneral">
                <div className="btnCenter">
                    <div className="titleWithPlus btnSize buttonStyleDark2 fat">
                        <img src={plus}
                             alt="add vaccination"
                             onClick={() => handleOpenModal("vaccinations")}
                             className="iconPlus"/>
                        <span className="textPlus">add vaccination</span>
                    </div>
                </div>
                <FillInformation title="Vaccinations" items={data?.vaccinations}/>
            </div>
            <div id="boxTests" className="boxGeneral">
                <div className="btnCenter">
                    <div className="titleWithPlus btnSize buttonStyleDark2 fat">
                        <img src={plus}
                             alt="add test"
                             onClick={() => handleOpenModal("tests")}
                             className="iconPlus"/>
                        <span className="textPlus">add test</span>
                    </div>
                </div>
                <FillInformation title="Tests" items={data?.tests}/>
            </div>

            <a className="back-to-top" href="#top">
                <img src={upArrow} alt="Up Arrow" className="up-arrow-image"/>
                <span>Retour en haut</span>
            </a>

            <Modal open={!!openModal} onClose={handleCloseModal}>
                <Box className="modalBox">
                    <h2>Add {openModal === 'tests' ? 'Test' : 'Vaccination'}</h2>
                    <form onSubmit={(e) => handleSubmit(e, openModal)}>

                        <input type="date" name="date" required placeholder="Select date"/>
                        <input type="time" name="time" required placeholder="Select time"/>
                        <input name="place" required placeholder="Enter location"/>
                        <input name="reason" required placeholder="Enter reason"/>
                        <input type="file" name="document" required placeholder="Attach document"/>

                        {openModal === 'tests' && (
                            <>
                                <input name="result" required placeholder="Enter result"/>
                                <input name="nameTest" required placeholder="Enter test name"/>
                            </>
                        )}
                        {openModal === 'vaccinations' && (
                            <>
                                <input name="name" required placeholder="Enter vaccination name"/>
                                <input name="nameVac" required placeholder="Enter additional name"/>
                            </>
                        )}
                        <button type="submit">Save</button>
                    </form>
                </Box>
            </Modal>

        </main>
    );
};

const Panel = () => {
    const [unit, setUnit] = React.useState('');

    let optionsUnit = [
        {id: 1, name: 'Réservations'},
        {id: 2, name: 'Antécédents médicaux'},
        {id: 3, name: 'Consultations'},
        {id: 4, name: 'Prescription'},
        {id: 5, name: 'Vaccinations'},
        {id: 6, name: 'Tests'},
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
                    <img src={searchW} height="41px"/>
                </div>
            </div>

            <div id="linkNavig">
                <nav id="navigAncor" className="fat">
                    <a href="#boxBooking" className="ancorLink">Réservations</a>
                    <a href="#boxConsult" className="ancorLink">Consultations</a>
                    <a href="#boxPrescrip" className="ancorLink">Prescription</a>
                    <a href="#boxVaccin" className="ancorLink">Vaccinations</a>
                    <a href="#boxTests" className="ancorLink">Tests</a>
                </nav>
            </div>
        </>
    );
};

const Info = ({user}) => {
    const [type, setType] = useState('');
    const [editedUser, setEditedUser] = useState({...user});
    const [editMode, setEditMode] = useState(false); //todo add for mode change


    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedUser(prev => ({...prev, [name]: value}));
    };

    const handleSave = async () => {
        const token = sessionStorage.getItem("token");
        //DTO object
        const dtoData = {
            firstName: editedUser.firstName,
            lastName: editedUser.lastName,
            email: editedUser.email,
            tel: editedUser.tel,
            ...(editedUser.address ? {address: editedUser.address} : {}),
            ...(editedUser.sex ? {sex: editedUser.sex} : {}),
            ...(editedUser.dateBirth ? {dateBirth: editedUser.dateBirth} : {})
        };
        console.log("send DTO:", dtoData);
        try {
            await axios.put('/api/v0.1/users/profile/update', dtoData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            alert("Data updated!");
        } catch (err) {
            console.error("Error during update:", err);
            console.log("Server response:", err.response?.data);
            alert("Error saving data");
        }
    };

    const handleChangeType = (event) => {
        setType(event.target.value);
    };


    const optionsType = [
        {id: 1, name: 'passeport'},
        {id: 2, name: 'carte identité'},
        {id: 3, name: 'permis de conduire'},
        {id: 4, name: 'acte de naissance'},
        {id: 5, name: 'test'},
        {id: 6, name: 'certificat'},
        {id: 7, name: 'analyses'},
    ];

    return (
        <>
            <div className="titlePersoStyle fat">Informations personnelles</div>
            <div className="btnSize buttonStyleDark2 fat editStyle" onClick={() => setEditMode(!editMode)}>
                <img src={edit} alt="modifier" style={{height: '36px'}}/>
                {editMode ? 'annuler' : 'modifier'}
            </div>
            <div id="persInfo">

                <div id="textInfo">
                    <div className="lines">
                        <div className="linePers fat">Nom</div>
                        {editMode ? (
                            <input
                                type="text"
                                name="lastName"
                                value={editedUser.lastName || ''}
                                onChange={handleChange}
                                className="valueInfo"
                            />
                        ) : (
                            <div className="linePers valueInfo">{user.lastName}</div>
                        )}
                    </div>
                    <div className="lines">
                        <div className="linePers fat">Prénom</div>
                        {editMode ? (
                            <input
                                type="text"
                                name="firstName"
                                value={editedUser.firstName || ''}
                                onChange={handleChange}
                                className="valueInfo"
                            />
                        ) : (
                            <div className="linePers valueInfo">{user.firstName}</div>
                        )}
                    </div>
                    <div className="lines">
                        <div className="linePers fat">Date de naissance</div>
                        {editMode ? (
                            <>
                                <input
                                    type="text"
                                    name="dateBirth"
                                    value={editedUser.dateBirth || ''}
                                    onChange={handleChange}
                                    className="valueInfo"
                                    placeholder="AAAA-MM-JJ"
                                />
                                <div className="infoText linePers warning">Format: AAAA-MM-JJ</div>
                            </>

                        ) : (
                            <div className="linePers valueInfo">{user.dateBirth}</div>
                        )}
                    </div>
                    <div className="lines">
                        <div className="linePers fat">Adresse</div>
                        {editMode ? (
                            <input
                                type="text"
                                name="address"
                                value={editedUser.address || ''}
                                onChange={handleChange}
                                className="valueInfo"
                            />
                        ) : (
                            <div className="linePers valueInfo">{user.address}</div>
                        )}
                    </div>
                    <div className="lines">
                        <div className="linePers fat">Téléphone</div>
                        {editMode ? (
                            <input
                                type="text"
                                name="tel"
                                value={editedUser.tel || ''}
                                onChange={handleChange}
                                className="valueInfo"
                            />
                        ) : (
                            <div className="linePers valueInfo">{user.tel}</div>
                        )}
                    </div>
                    <div className="lines">
                        <div className="linePers fat">E-mail</div>
                        {editMode ? (
                            <>
                                <input
                                    type="text"
                                    name="email"
                                    value={editedUser.email || ''}
                                    onChange={handleChange}
                                    className="valueInfo"
                                />
                                <div className="infoText warning linePers">
                                    Après sa modification, vous devrez vous reconnecter en utilisant votre ancien mot de
                                    passe.
                                </div>
                            </>
                        ) : (
                            <div className="linePers valueInfo">{user.email}</div>
                        )}
                    </div>
                    <div className="lines">
                        <div className="linePers fat">Sexe</div>
                        {editMode ? (
                            <input
                                type="text"
                                name="sex"
                                value={editedUser.sex || ''}
                                onChange={handleChange}
                                className="valueInfo"
                            />
                        ) : (
                            <div className="linePers valueInfo">{user.sex}</div>
                        )}
                    </div>
                </div>
                <div id="fotoInfo">
                    <div class="fotoWrapper">
                        <div class="shadowFoto"></div>
                        <div class="foto"></div>
                    </div>
                    <div class="btnSize buttonStyleDark2 fat">modifier</div>
                    <div class="lineSize fat">documents justificatifs</div>
                    <div class="addFile thin">
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
                    <div class="inputFile">
                        <input
                            type="file"
                            id="textFile"
                            name="textFile"
                            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf, image/*"
                        />
                    </div>
                    <div class="btnSize buttonStyleDark2 fat">envoyer</div>
                </div>
            </div>

            {editMode && (
                <button id="sendMode" className="btnSize buttonStyleDark2 fat editStyle1" onClick={handleSave}>
                    enregistrer
                </button>
            )}
        </>
    );
};

const FillInformation = ({title, items}) => {
    if (!items || items.length === 0) return null;

    return (
        <>
            <div className="titleStyle lineStyle fat">{title}</div>
            <div className="blocNote">
                {items.map((item, index) => (
                    <div key={index} className="linesNote">
                        <div className="dataNote buttonStyleDark2 fat">
                            {item.date || item.dateStart || item.createdAt || '??'}
                        </div>
                        <div className="infoNote fat">
                            {Object.entries(item).map(([key, value]) => (
                                key !== 'date' && key !== 'dateStart' && key !== 'createdAt' ? (
                                    <div key={key}><strong>{key}:</strong> {String(value)}</div>
                                ) : null
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};


export default PersonalAcc;