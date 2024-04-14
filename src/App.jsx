import {Route, Routes, BrowserRouter} from "react-router-dom";
import GameState from "./GameState";
import Home from "./Home";
import ComoJugar from "./ComoJugar";
import AboutPage from "./About";
import GameMusic from "./componentes/GameMusic";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/Buscaminas/easy" element={<GameState difficulty="facil"/>}/>
        <Route path="/Buscaminas/medium" element={<GameState difficulty="medio"/>}/>
        <Route path="/Buscaminas/hard" element={<GameState difficulty="dificil"/>}/>
        <Route path="/Buscaminas/help" element={<ComoJugar/>}/>
        <Route path="/Buscaminas/about" element={<AboutPage/>}/>
        <Route path="/Buscaminas" element={<Home/>}/>
        {/*<Route path="/Buscaminas/pruebas" element={<GameMusic/>}/>*/}
      </Routes>
    </BrowserRouter>
  )
}

export default App
