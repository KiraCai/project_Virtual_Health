import React, { useEffect, useState } from 'react';

import DiabetesTest from "./test/DiabetTest";
import HIVTest from "./test/HIVTest";
import MalariaTest from "./test/MalariaTest";
import PneumoniaTest from "./test/PneumoniaTest";
import SickleTest from "./test/SickleTest";

const Test = () => {
    const [selected, setSelected] = useState("diabetes");

    const SelectedTestComponent = DISEASE_TESTS[selected]?.component;

    return (
        <main className="thin">
            <div className="testTitle fat">Testez-vous - faites le test</div>
            <div className="fat testPage">
                <div className="titlePersoStyle fat">Faites un test de dépistage de maladie</div>

                <select className="input-box-choise" value={selected} onChange={(e) => setSelected(e.target.value)}>
                    {Object.entries(DISEASE_TESTS).map(([key, {name}]) => (
                        <option key={key} value={key}>{name}</option>
                    ))}
                </select>

                <div id="layoutCart">
                    <SelectedTestComponent/>
                </div>
            </div>
        </main>
    );
};

export default Test;


export const DISEASE_TESTS = {
    diabetes: {
        name: "Diabète sucré",
        component: DiabetesTest
    },
    hiv: {
        name: "VIH",
        component: HIVTest
    },
    malaria: {
        name: "Le paludisme/ la malaria",
        component: MalariaTest
    },
    pneumonia: {
        name: "Pneumonie",
        component: PneumoniaTest
    },
    sickle: {
        name: "Anémie falciforme",
        component: SickleTest
    }
};