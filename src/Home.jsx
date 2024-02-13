import Navbar from "./Navbar";
import './Home.css';
import Submenu from "./Submenu";
import { Link } from 'react-router-dom';
import './App.css'
import Flor from "./Flor";

function Home(){
  
    return (
        <div className="home">
            <Navbar/>
            <Submenu/>
            <div className="gridDificultades">
                <Link to="/easy">
                <div className="contenedorNivel" id="parteIzq">
                    <p> Facil </p>
                    <img src="buscaminas(3).png" alt="" />
                    {/*<div className="contenerBuscaminas">
                        <div className="tablero tableroFacil">
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorOscuro"><Flor/></div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">2</div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorOscuro"><Flor/></div>

                            <div className="casilla casillaChica colorOscuro"><Flor/></div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">2</div>
                            <div className="casilla casillaChica colorOscuro"><Flor/></div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">2</div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">2</div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">1</div>

                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">2</div>
                            <div className="casilla casillaChica colorOscuro"><Flor/></div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada"></div>

                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada"></div>

                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">1</div>

                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">2</div>
                            <div className="casilla casillaChica colorClaro"><Flor/></div>

                            <div className="casilla casillaChica colorClaro"><Flor/></div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">2</div>
                            <div className="casilla casillaChica colorClaro"><Flor/></div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">3</div>

                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorClaroRevelada casillaRevelada"></div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">1</div>
                            <div className="casilla casillaChica colorClaro"><Flor/></div>
                            <div className="casilla casillaChica colorOscuroRevelada casillaRevelada">3</div>
                            <div className="casilla casillaChica colorClaro"><Flor/></div>
                        </div> 
                    </div>*/}
                </div>
                </Link>
                <Link to="/medium">
                <div className="contenedorNivel" >
                    <p> Medio </p> 
                    <img src="buscaminas(2).png" alt="" />
                </div>  
                </Link>
                <Link to="/hard">
                <div className="contenedorNivel" id="parteDer">
                    <p> Dificil </p>
                    <img src="buscaminas(1).png" alt="" />
                </div>
                </Link>
            </div>
        </div>
    )
}

export default Home;