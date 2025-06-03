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
        <form onSubmit={handleSubmit}>
            <label>Âge : <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: +e.target.value})} /></label><br/>
            <label>Sexe :
                <select onChange={e => setFormData({...formData, gender: e.target.value})}>
                    <option value="female">Femme</option>
                    <option value="male">Homme</option>
                </select>
            </label><br/>
            <label><input type="checkbox" checked={formData.familyHistory} onChange={e => setFormData({...formData, familyHistory: e.target.checked})}/> Avez-vous des antécédents familiaux de diabète ?</label><br/>
            <label><input type="checkbox" checked={formData.hypertension} onChange={e => setFormData({...formData, hypertension: e.target.checked})}/> Avez-vous été diagnostiqué(e) avec de l'hypertension ?</label><br/>
            <label><input type="checkbox" checked={!formData.physicallyActive} onChange={e => setFormData({...formData, physicallyActive: !e.target.checked})}/> Êtes-vous physiquement inactif/inactive ?</label><br/>
            <label>Taille (cm) : <input type="number" value={formData.height} onChange={e => setFormData({...formData, height: +e.target.value})} /></label><br/>
            <label>Poids (kg) : <input type="number" value={formData.weight} onChange={e => setFormData({...formData, weight: +e.target.value})} /></label><br/>
            <button type="submit">Évaluer le risque</button>
            <p><em>⚠ Ceci n'est pas un diagnostic médical. Consultez un médecin pour une évaluation précise.</em></p>
        </form>
    );
};

export default DiabetesTest;