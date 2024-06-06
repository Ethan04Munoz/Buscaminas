import Navbar from "../componentes/Navbar.jsx";
import Submenu from "../componentes/Submenu.jsx";
import { Link } from 'react-router-dom';
import '../App.css'
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import translations from '../redux/translations.js'; 
import GestorAtajos from "../componentes/GestorAtajos.jsx";

function AboutPage(){
    const language = useSelector(state => state.language.language); 

    return(
        <div className="aboutPage">
            <Navbar/>
            <Submenu/>
            <GestorAtajos/>
            <div className="centrar50">
                <h1>{translations[language].aboutTitulo}</h1>
                <p>
                    {translations[language].aboutP1}
                </p>
                <p>
                    {translations[language].aboutP2}
                </p>
                <h2>{translations[language].aboutTituloCreditos}</h2>
                <h3>{translations[language].aboutCreditosMusica}</h3>
                <ul>
                    <li>
                        {translations[language].aboutCreditosMusicaPor} <a href="https://pixabay.com/users/lesfm-22579021/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=110624">Oleksii Kaplunskyi</a> {translations[language].aboutCreditosMusicaDe} <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=110624">Pixabay</a>
                    </li>
                    <li>
                        {translations[language].aboutCreditosMusicaPor} <a href="https://pixabay.com/users/oleksii_kalyna-39191707/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=181090">Oleksii Kalyna</a> {translations[language].aboutCreditosMusicaDe} <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=181090">Pixabay</a>
                    </li>
                    <li>
                        {translations[language].aboutCreditosMusicaPor} <a href="https://pixabay.com/users/rockot-1947599/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=173062">Rockot</a> {translations[language].aboutCreditosMusicaDe} <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=173062">Pixabay</a>
                    </li>
                    <li>
                        {translations[language].aboutCreditosMusicaPor} <a href="https://pixabay.com/users/lemonmusicstudio-14942887/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=108600">Vitaliy Levkin</a> {translations[language].aboutCreditosMusicaDe} <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=108600">Pixabay</a>
                    </li>
                    <li>
                        {translations[language].aboutCreditosMusicaPor} <a href="https://www.youtube.com/@Chillpeach">Chillpeach</a> {translations[language].aboutCreditosMusicaDe} <a href="https://www.youtube.com/watch?v=1t1Rp9Nx--M&list=PLQwRmTwWx0ubcpv0SkHroupj1LqW5_Va5&index=7">Youtube</a>
                    </li>
                    <li>
                        {translations[language].aboutCreditosMusicaPor} <a href="https://www.youtube.com/@BreakingCopyright">BreakingCopyright — Royalty Free Music</a> {translations[language].aboutCreditosMusicaDe} <a href="https://www.youtube.com/watch?v=3TKghKSDnEM&list=PLfP6i5T0-DkIMnLY0r17o_kOOsVtQIJIX&index=2">Youtube</a>
                    </li>
                </ul>
            </div>
            <div className="espacio"></div>
        </div>
    )
}

export default AboutPage;