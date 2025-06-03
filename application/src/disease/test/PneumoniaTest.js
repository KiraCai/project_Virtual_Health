import React, { useEffect, useState } from 'react';

const PneumoniaTest = () => {
    const [formData, setFormData] = useState({
        age: 0,
        confusion: false,
        bloodUreaNitrogen: 0,
        respiratoryRate: 0,
        systolicBloodPressure: 0,
        temperature: 0,
        comorbidities: {
            cancer: false,
            liverDisease: false,
            heartFailure: false,
            cerebrovascularDisease: false,
            renalDisease: false
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/v0.1/users/test/pneumonia", {
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
            alert(`Votre risque de pneumonie : ${data.risk}`);
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
            alert("Une erreur s'est produite lors du traitement. Veuillez vérifier vos données et réessayer.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="testForm">
            <div className="input-box-test">
                <label>Âge : <input className="inputTest" type="number" value={formData.age} onChange={e =>
                    setFormData({...formData, age: +e.target.value})}/>
                </label>
            </div>
            <div className="input-box-test">
                <label> Confusion
                    <label>
                        <input type="checkbox" className="checkbox-test" checked={formData.confusion} onChange={e =>
                            setFormData({...formData, confusion: e.target.checked})}/>
                        (désorientation ou altération de la conscience)
                    </label>
                </label>
            </div>
            <div className="input-box-test">
                <label>
                    Urée sanguine (BUN) : <input className="inputTest" type="number" value={formData.bloodUreaNitrogen}
                                                 onChange={e => setFormData({
                                                     ...formData,
                                                     bloodUreaNitrogen: +e.target.value
                                                 })}/>
                </label>
            </div>
            <div className="input-box-test">
                <label>
                    Fréquence respiratoire : <input className="inputTest" className="inputTest" type="number" value={formData.respiratoryRate}
                                                    onChange={e => setFormData({
                                                        ...formData,
                                                        respiratoryRate: +e.target.value
                                                    })}/>
                </label>
            </div>
            <div className="input-box-test">
                <label>
                    Pression artérielle systolique : <input className="inputTest" type="number" value={formData.systolicBloodPressure}
                                                            onChange={e => setFormData({
                                                                ...formData,
                                                                systolicBloodPressure: +e.target.value
                                                            })}/>
                </label></div>
            <div className="input-box-test">
                <label>
                    Température corporelle : <input className="inputTest" type="number" value={formData.temperature}
                                                    onChange={e => setFormData({
                                                        ...formData,
                                                        temperature: +e.target.value
                                                    })}/>
                </label></div>
            <div className="input-box-test">
                <label>
                    Antécédents médicaux :
                    <label>
                        <input type="checkbox" className="checkbox-test" checked={formData.comorbidities.cancer} onChange={e => setFormData({
                            ...formData,
                            comorbidities: {...formData.comorbidities, cancer: e.target.checked}
                        })}/>
                        Cancer
                    </label>
                    <label>
                        <input type="checkbox" className="checkbox-test" checked={formData.comorbidities.liverDisease}
                               onChange={e => setFormData({
                                   ...formData,
                                   comorbidities: {...formData.comorbidities, liverDisease: e.target.checked}
                               })}/>
                        Maladie du foie
                    </label>
                    <label>
                        <input type="checkbox" className="checkbox-test" checked={formData.comorbidities.heartFailure}
                               onChange={e => setFormData({
                                   ...formData,
                                   comorbidities: {...formData.comorbidities, heartFailure: e.target.checked}
                               })}/>
                        Insuffisance cardiaque
                    </label>
                    <label>
                        <input type="checkbox" className="checkbox-test" checked={formData.comorbidities.cerebrovascularDisease}
                               onChange={e => setFormData({
                                   ...formData,
                                   comorbidities: {...formData.comorbidities, cerebrovascularDisease: e.target.checked}
                               })}/>
                        Maladie cérébrovasculaire
                    </label>
                    <label>
                        <input type="checkbox" className="checkbox-test" checked={formData.comorbidities.renalDisease}
                               onChange={e => setFormData({
                                   ...formData,
                                   comorbidities: {...formData.comorbidities, renalDisease: e.target.checked}
                               })}/>
                        Maladie rénale
                    </label>
                </label></div>
            <button type="submit" className="btn buttonStyleDark fat btnTest">Évaluer le risque</button>
            <p><em>⚠ Ceci n'est pas un diagnostic médical. Pour une évaluation précise, consultez un professionnel de
                santé.</em></p>
        </form>
    );
};

export default PneumoniaTest;
