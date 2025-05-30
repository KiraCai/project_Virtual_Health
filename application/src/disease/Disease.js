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
        <article className="articleHome fat">
            <p>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Fames cras
                fusce duis inceptos faucibus amet nulla. Taciti aenean nam feugiat;
                eros convallis metus. Parturient hac imperdiet taciti praesent dis
                eu dictum euismod vitae. Duis taciti elementum sodales eleifend
                tellus urna. Sem ultricies at a orci lacus. Consequat aliquet mauris
                nostra eget facilisis maximus. Ornare quis ante duis laoreet morbi
                potenti. Senectus sollicitudin nec cras enim erat nisi velit litora.
            </p>
            <p>
                Pharetra nostra bibendum ante at tellus. Lobortis condimentum augue
                metus purus nisi ligula. Euismod mollis ac in blandit dolor risus
                commodo cubilia. Convallis dictum ullamcorper bibendum tempor
                dapibus tellus consequat imperdiet. Lobortis pretium sed natoque
                magnis leo sapien posuere vitae. Volutpat ridiculus hendrerit augue
                magnis placerat volutpat. Atincidunt ultrices leo malesuada eleifend
                ad. Et dictum libero fermentum maecenas faucibus quam magnis risus.
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

