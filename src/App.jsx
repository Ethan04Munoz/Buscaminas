import {Route, Routes} from "react-router-dom";
import * as React from "react";
import { HashRouter } from "react-router-dom";
import GameState from "./Paginas/GameState";
import Home from "./Paginas/Home";
import ComoJugar from "./Paginas/ComoJugar";
import AboutPage from "./Paginas/About";

function App() {
  return(
    <HashRouter>
      <Routes>
        <Route exact path="/easy" element={<GameState difficulty="facil"/>}/>
        <Route exact path="/medium" element={<GameState difficulty="medio"/>}/>
        <Route exact path="/hard" element={<GameState difficulty="dificil"/>}/>
        <Route exact path="/help" element={<ComoJugar/>}/>
        <Route exact path="/about" element={<AboutPage/>}/>
        <Route exact path="/" element={<Home/>}/>
        {/*<Route path="/Buscaminas/pruebas" element={<GameMusic/>}/>*/}
      </Routes>
    </HashRouter>
  )
}

export default App
