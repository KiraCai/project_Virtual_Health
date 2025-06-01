import React, { useEffect, useState } from 'react';

import DiabetesTest from "./test/DiabetTest";
import HIVTest from "./test/HIVTest";
import MalariaTest from "./test/MalariaTest";
import PneumoniaTest from "./test/PneumoniaTest";
import SickleTest from "./test/SickleTest";
import {fetchTest} from "../api/apiTest";

const Test = () => {
    const [selected, setSelected] = useState("diabetes");

    const SelectedTestComponent = DISEASE_TESTS[selected]?.component;

    /*const [tests, setTests] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);*/

    /*useEffect(() => {
        const loadTests = async () => {
            try {
                const data = await fetchTest(); // Запрос к API
                const testMapping = {
                    diabetes: { name: "Диабет", component: DiabetesTest },
                    hiv: { name: "ВИЧ", component: HIVTest },
                    malaria: { name: "Малярия", component: MalariaTest },
                    pneumonia: { name: "Пневмония", component: PneumoniaTest },
                    sickle: { name: "Серповидноклеточная анемия", component: SickleTest },
                };
                // Привязываем полученные данные к компонентам
                const fetchedTests = data.reduce((acc, test) => {
                    if (testMapping[test.id]) acc[test.id] = testMapping[test.id];
                    return acc;
                }, {});
                setTests(fetchedTests);
                setLoading(false);
            } catch (err) {
                console.error("Ошибка загрузки тестов:", err);
                setError("Ошибка загрузки тестов. Попробуйте снова.");
                setLoading(false);
            }
        };
        loadTests();
    }, []);*/

    /*if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;*/


    return (
        <div style={{ padding: "20px" }}>
            <h2>Пройдите тест на заболевание</h2>

            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                {Object.entries(DISEASE_TESTS).map(([key, { name }]) => (
                    <option key={key} value={key}>{name}</option>
                ))}
            </select>

            <div style={{ marginTop: "20px" }}>
                <SelectedTestComponent />
            </div>
        </div>
    );
};

export default Test;


export const DISEASE_TESTS = {
    diabetes: {
        name: "Диабет",
        component: DiabetesTest
    },
    hiv: {
        name: "ВИЧ",
        component: HIVTest
    },
    malaria: {
        name: "Малярия",
        component: MalariaTest
    },
    pneumonia: {
        name: "Пневмония",
        component: PneumoniaTest
    },
    sickle: {
        name: "Серповидноклеточная анемия",
        component: SickleTest
    }
};