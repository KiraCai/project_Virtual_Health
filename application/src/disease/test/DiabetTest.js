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
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}` // Добавьте токен
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}`); // Обработка ошибок
            }

            const data = await res.json();
            alert(`Ваш риск диабета: ${data.risk}`);
        } catch (error) {
            console.error("Ошибка отправки данных:", error);
            alert("Ошибка при обработке запроса. Проверьте данные и попробуйте снова.");
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>Возраст: <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: +e.target.value})} /></label><br/>
            <label>Пол:
                <select onChange={e => setFormData({...formData, gender: e.target.value})}>
                    <option value="female">Женщина</option>
                    <option value="male">Мужчина</option>
                </select>
            </label><br/>
            <label><input type="checkbox" checked={formData.familyHistory} onChange={e => setFormData({...formData, familyHistory: e.target.checked})}/> Есть ли в семье диабет?</label><br/>
            <label><input type="checkbox" checked={formData.hypertension} onChange={e => setFormData({...formData, hypertension: e.target.checked})}/> Диагностировали ли у вас гипертонию?</label><br/>
            <label><input type="checkbox" checked={!formData.physicallyActive} onChange={e => setFormData({...formData, physicallyActive: !e.target.checked})}/> Вы не физически активны?</label><br/>
            <label>Рост (см): <input type="number" value={formData.height} onChange={e => setFormData({...formData, height: +e.target.value})} /></label><br/>
            <label>Вес (кг): <input type="number" value={formData.weight} onChange={e => setFormData({...formData, weight: +e.target.value})} /></label><br/>
            <button type="submit">Оценить риск</button>
            <p><em>⚠ Это не медицинский диагноз. Для точной оценки обратитесь к врачу.</em></p>

        </form>
    );
};

export default DiabetesTest;