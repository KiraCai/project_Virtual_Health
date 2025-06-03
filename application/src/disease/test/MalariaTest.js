import React, { useEffect, useState } from 'react';

const MalariaTest = () => {
    const [formData, setFormData] = useState({
        age: 0,
        gender: 'female',
        feverLast2Weeks: false,
        mosquitoBites: false,
        bedNetUse: false,
        travelToEndemicArea: false,
        pregnancy: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/v0.1/users/test/malaria", {
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
            alert(`Votre risque de paludisme : ${data.risk}`);
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
                <input type="checkbox" checked={formData.feverLast2Weeks} onChange={e => setFormData({...formData, feverLast2Weeks: e.target.checked})}/>
                Avez-vous eu de la fièvre au cours des 2 dernières semaines ?
            </label><br/>
            <label>
                <input type="checkbox" checked={formData.mosquitoBites} onChange={e => setFormData({...formData, mosquitoBites: e.target.checked})}/>
                Avez-vous été piqué par des moustiques récemment ?
            </label><br/>
            <label>
                <input type="checkbox" checked={formData.bedNetUse} onChange={e => setFormData({...formData, bedNetUse: e.target.checked})}/>
                Utilisez-vous une moustiquaire imprégnée d'insecticide ?
            </label><br/>
            <label>
                <input type="checkbox" checked={formData.travelToEndemicArea} onChange={e => setFormData({...formData, travelToEndemicArea: e.target.checked})}/>
                Avez-vous voyagé récemment dans une zone endémique du paludisme ?
            </label><br/>
            <label>
                <input type="checkbox" checked={formData.pregnancy} onChange={e => setFormData({...formData, pregnancy: e.target.checked})}/>
                Êtes-vous enceinte ?
            </label><br/>
            <button type="submit">Évaluer le risque</button>
            <p><em>⚠ Ceci n'est pas un diagnostic médical. Pour une évaluation précise, consultez un professionnel de santé.</em></p>
        </form>
    );
};

export default MalariaTest;
