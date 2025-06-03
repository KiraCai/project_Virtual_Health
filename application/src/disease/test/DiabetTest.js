import React, { useEffect, useState } from 'react';


const DiabetesTest = () => {
    const [formData, setFormData] = useState({
        age: 0,
        gender: "female",
        familyHistory: false,
        hypertension: false,
        physicallyActive: true,
        height: 170,
        weight: 65
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/v0.1/users/test/diabetes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                throw new Error(`Erreur : ${res.status}`);
            }

            const data = await res.json();
            alert(`Votre risque de diabète : ${data.risk}`);
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
            alert("Une erreur s'est produite. Veuillez vérifier vos données et réessayer.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="testForm">
            <div className="input-box-test">
                <label>Âge :
                    <input className="inputTest" type="number" value={formData.age}
                           onChange={e => setFormData({ ...formData, age: +e.target.value })} />
                </label>
            </div>
            <div className="input-box-test">
                <label>Sexe :
                    <select className="input-box-choise" value={formData.gender}
                            onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                        <option value="female">Femme</option>
                        <option value="male">Homme</option>
                    </select>
                </label>
            </div>
            <div className="input-box-test">
                <label>
                    <label>
                    <input type="checkbox" className="checkbox-test" checked={formData.familyHistory}
                           onChange={e => setFormData({ ...formData, familyHistory: e.target.checked })} />
                    Avez-vous des antécédents familiaux de diabète ?
                </label>
                </label>
            </div>
            <div className="input-box-test">
                <label>
                    <label>
                    <input type="checkbox" className="checkbox-test" checked={formData.hypertension}
                           onChange={e => setFormData({ ...formData, hypertension: e.target.checked })} />
                    Avez-vous été diagnostiqué(e) avec de l'hypertension ?
                </label>
                </label>
            </div>
            <div className="input-box-test">
                <label>
                    <label>
                    <input type="checkbox" className="checkbox-test" checked={!formData.physicallyActive}
                           onChange={e => setFormData({ ...formData, physicallyActive: !e.target.checked })} />
                    Êtes-vous physiquement inactif/inactive ?
                </label>
                </label>
            </div>
            <div className="input-box-test">
                <label>Taille (cm) :
                    <input className="inputTest" type="number" value={formData.height}
                           onChange={e => setFormData({ ...formData, height: +e.target.value })} />
                </label>
            </div>
            <div className="input-box-test">
                <label>Poids (kg) :
                    <input className="inputTest" type="number" value={formData.weight}
                           onChange={e => setFormData({ ...formData, weight: +e.target.value })} />
                </label>
            </div>
            <button type="submit" className="btn buttonStyleDark fat btnTest">Évaluer le risque</button>
            <p><em>⚠ Ceci n'est pas un diagnostic médical. Consultez un médecin pour une évaluation précise.</em></p>
        </form>
    );
};

export default DiabetesTest;