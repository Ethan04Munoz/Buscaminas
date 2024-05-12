import {Route, Routes, BrowserRouter, useNavigate} from "react-router-dom";
import GameState from "./Paginas/GameState";
import Home from "./Paginas/Home";
import ComoJugar from "./Paginas/ComoJugar";
import AboutPage from "./Paginas/About";
import GameMusic from "./componentes/GameMusic";
import RedirectHandler from "./componentes/RedirectHandler";

function App() {
  return(
    <BrowserRouter>
      <RedirectHandler/>
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
