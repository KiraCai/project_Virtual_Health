import React, { useEffect, useState } from 'react';
import {fetchDiseases} from "../api/apiDisease";
import {Link} from "react-router-dom";
import playArrow from "../../pictures/play_arrow_filled.png";
import upArrow from "../../pictures/up_arrow.png";


const Disease = () => {
    const [diseaseData, setDiseaseData] = useState(null);

    const diseaseList = [
        { key: "Pneumonia", label: "Pneumonie" },
        { key: "Malaria", label: "Malaria" },
        { key: "HIV/AIDS", label: "VIH/SIDA" },
        { key: "Sickle Cell Disease", label: "Anémie falciforme" },
        { key: "Diabetes", label: "Diabète sucré" }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {

                const diseases = await fetchDiseases(); // Получаем список болезней
                console.log("Fetched Diseases:", diseases);
                if (!Array.isArray(diseases)) {
                    console.error("Diseases is not an array:", diseases);
                    return;
                }
                const groupedData = diseases.reduce((acc, disease) => {
                    acc[disease.name] = disease;
                    return acc;
                }, {});
                setDiseaseData(groupedData); // Сохраняем данные в состоянии
            } catch (error) {
                console.error("Error fetching diseases:", error);
            }
        };

        fetchData();
    }, []);

    return <main className="thin">
        <div>
            <Headline diseaseList={diseaseList}/>
        </div>
        <div className="boxInfo">
            <General/>
        </div>
        {!diseaseData && <div>Загрузка данных...</div>}

        {diseaseList.map((d) => (
            <div key={d.key} id={`box${d.key}`} className="boxGeneral">
                <FillDisease
                    title={diseaseData?.[d.key]?.name || "Unknown Disease"}
                    items={diseaseData?.[d.key]}
                />
            </div>
        ))}
        <a className="back-to-top" href="#top">
            <img src={upArrow} alt="Up Arrow" className="up-arrow-image"/>
            <span>Retour en haut</span>
        </a>
    </main>
};

export default Disease;

const Headline = ({ diseaseList }) => {
    return (<>
        <div id="headLineTop" className="lineStyle">
            <div className="titleStyle fat">Pertinence</div>
            <div className="arrow">
            <img src={playArrow} height="21px" />
            <img src={playArrow} height="21px" />
            <img src={playArrow} height="21px" />
            <img src={playArrow} height="21px" />
            <img src={playArrow} height="21px" />
            <img src={playArrow} height="21px" />
            </div>
            <Link className="searchLink fat testLink" to="/test">
                VÉRIFIEZ-VOUS
            </Link>
        </div>
        <div id="linkNavig">
            <nav id="navigAncor" className="fat">
                {diseaseList.map(d => (
                    <a key={d.key} href={`#box${d.key}`} className="ancorLink">{d.label}</a>
                ))}
            </nav>
        </div>
    </>);
}

const General = () => {

    return (<>
        <div className="titlePersoStyle fat">Soyez attentif à votre santé</div>
        <article className="articleHome thin">
            <p>
                Vivre au Togo, c’est faire face à des défis de santé spécifiques auxquels
                il est essentiel de prêter une attention particulière. Cinq maladies majeures
                – le paludisme (malaria), la pneumonie, la drépanocytose, le VIH/SIDA et le diabète
                – représentent des menaces sérieuses pour la population, tant en milieu rural qu’urbain.
            </p>
            <p>
                Le paludisme reste la première cause de morbidité au Togo. Selon le Programme National
                de Lutte contre le Paludisme, plus de 40 % des consultations dans les centres de santé
                sont liées à cette maladie. La transmission est continue tout au long de l’année,
                avec des pics pendant la saison des pluies. Une fièvre non traitée peut rapidement évoluer
                vers des formes graves, surtout chez les enfants et les femmes enceintes.
            </p>
             <p>
                 La pneumonie, quant à elle, est responsable de nombreuses hospitalisations infantiles.
                 L’UNICEF rapporte qu'elle figure parmi les trois principales causes de mortalité chez les enfants
                 de moins de 5 ans. La prévention passe par la vaccination, l’hygiène de l’air et une détection
                 précoce des symptômes.
             </p>
            <p>
                La drépanocytose (anémie falciforme) touche environ 15 à 20 % de la population togolaise
                en tant que porteurs du gène (hétérozygotes), et environ 2 % sont atteints de la forme sévère.
                C’est une maladie génétique incurable, mais un suivi régulier permet de réduire significativement
                les crises et d’améliorer la qualité de vie.
            </p>
            <p>
                Le VIH/SIDA reste une réalité préoccupante. Bien que le taux de prévalence ait diminué au fil des ans,
                il est estimé à environ 2,1 % chez les adultes selon les dernières données du PNLS (Programme National
                de Lutte contre le SIDA). Les jeunes, les femmes et les populations clés sont particulièrement vulnérables.
            </p>
            <p>
                Le diabète, souvent silencieux, gagne du terrain au Togo, en lien avec l’urbanisation,
                les changements alimentaires et le manque d’activité physique. Beaucoup de personnes ignorent
                qu’elles en sont atteintes jusqu’à l’apparition de complications graves.
            </p>
            <p>
                Pour protéger votre santé et celle de vos proches, il est crucial de faire un suivi régulier,
                de comprendre les risques et d’agir rapidement face aux symptômes.

                Sur cette page, vous pouvez :

                consulter des données statistiques actualisées sur la prévalence de ces maladies au Togo ;

                et réaliser des tests d’évaluation en ligne, basés sur vos symptômes et vos facteurs de risque,
                pour mieux comprendre votre exposition potentielle à ces maladies.

                Votre santé commence par la connaissance. Informez-vous, testez-vous, protégez-vous.
            </p>
        </article>
        </>);

}

const FillDisease = ({ title, items }) => {
    if (!items) return null;

    return (
        <>
            <div className="titleStyle lineStyle fat">{title}</div>
            <div className="blocNote">
                <div className="linesNote">
                    <div className="dataNote buttonStyleDark2 fat">
                        {items?.description || "No description available"}
                    </div>
                    <div className="infoNote fat">
                        <div><strong>Mortality Rate:</strong> {items?.mortalityRate || "N/A"}</div>
                        <div><strong>World Rank:</strong> {items?.worldRank || "N/A"}</div>
                        <div><strong>Deaths:</strong> {items?.death || "N/A"}</div>
                        <div><strong>Percentage:</strong> {items?.percentage || "N/A"}%</div>
                    </div>
                </div>
            </div>
        </>
    );
};

