import React, { useEffect, useState } from 'react';

const HIVTest = () => {
    const [formData, setFormData] = useState({
        age: 0,
        gender: 'female',
        multiplePartners: false,
        stiHistory: false,
        drugUse: false,
        hivPositivePartner: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/v0.1/users/test/hiv", {
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
            alert(`Votre risque de VIH : ${data.risk}`);
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
                <input type="checkbox" checked={formData.multiplePartners} onChange={e => setFormData({...formData, multiplePartners: e.target.checked})}/>
                Avez-vous plusieurs partenaires sexuels ?
            </label><br/>
            <label>
                <input type="checkbox" checked={formData.stiHistory} onChange={e => setFormData({...formData, stiHistory: e.target.checked})}/>
                Avez-vous des antécédents d'IST (infections sexuellement transmissibles) ?
            </label><br/>
            <label>
                <input type="checkbox" checked={formData.drugUse} onChange={e => setFormData({...formData, drugUse: e.target.checked})}/>
                Utilisez-vous des drogues injectables ?
            </label><br/>
            <label>
                <input type="checkbox" checked={formData.hivPositivePartner} onChange={e => setFormData({...formData, hivPositivePartner: e.target.checked})}/>
                Avez-vous un partenaire séropositif ?
            </label><br/>
            <button type="submit">Évaluer le risque</button>
            <p><em>⚠ Ceci n'est pas un diagnostic médical. Pour une évaluation précise, consultez un professionnel de santé.</em></p>
        </form>
    );
};

export default HIVTest;
