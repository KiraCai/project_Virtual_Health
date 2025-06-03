import React, { useEffect, useState } from 'react';


const SickleTest = () => {
    const [formData, setFormData] = useState({
        age: 0,
        gender: 'female',
        familyHistory: false,
        fatigue: false,
        painEpisodes: false,
        jaundice: false,
        legUlcers: false,
        frequentInfections: false,
        delayedGrowth: false,
        familyOrigin: '',
        partnerOrigin: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/v0.1/users/test/sickle", {
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
            alert(`Votre risque de drépanocytose : ${data.risk}`);
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
            alert("Une erreur s'est produite lors du traitement. Veuillez vérifier vos données et réessayer.");
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
            <label>
                <input type="checkbox" checked={formData.familyHistory} onChange={e => setFormData({...formData, familyHistory: e.target.checked})}/>
                Antécédents familiaux de drépanocytose ou de thalassémie ?
            </label><br/>
            <label>
                <input type="checkbox" checked={formData.fatigue} onChange={e => setFormData({...formData, fatigue: e.target.checked})}/>
                Fatigue excessive ?
            </label><br/>
            <label>
                <input type="checkbox" checked={formData.painEpisodes} onChange={e => setFormData({...formData, painEpisodes: e.target.checked})}/>
                Épisodes de douleur intense (crises vaso-occlusives) ?
            </label><br/>
            <label>
                <input type="checkbox" checked={formData.jaundice} onChange={e => setFormData({...formData, jaundice: e.target.checked})}/>
                Jaunisse (coloration jaune de la peau ou des yeux) ?
            </label><br/>
            <label>
                <input type="checkbox" checked={formData.legUlcers} onChange={e => setFormData({...formData, legUlcers: e.target.checked})}/>
                Ulcères aux jambes ?
            </label><br/>
            <label>
                <input type="checkbox" checked={formData.frequentInfections} onChange={e => setFormData({...formData, frequentInfections: e.target.checked})}/>
                Infections fréquentes ?
            </label><br/>
            <label>
                <input type="checkbox" checked={formData.delayedGrowth} onChange={e => setFormData({...formData, delayedGrowth: e.target.checked})}/>
                Retard de croissance ?
            </label><br/>
            <label>
                Origine familiale (pays d'origine) : <input type="text" value={formData.familyOrigin} onChange={e => setFormData({...formData, familyOrigin: e.target.value})} />
            </label><br/>
            <label>
                Origine du partenaire (pays d'origine) : <input type="text" value={formData.partnerOrigin} onChange={e => setFormData({...formData, partnerOrigin: e.target.value})} />
            </label><br/>
            <button type="submit">Évaluer le risque</button>
            <p><em>⚠ Ceci n'est pas un diagnostic médical. Pour une évaluation précise, consultez un professionnel de santé.</em></p>
        </form>
    );
};

export default SickleTest;
