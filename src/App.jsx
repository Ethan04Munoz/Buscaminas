import {Route, Routes, BrowserRouter} from "react-router-dom";
import GameState from "./GameState";
import Home from "./Home";
import ComoJugar from "./ComoJugar";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/easy" element={<GameState difficulty="facil"/>}/>
        <Route path="/medium" element={<GameState difficulty="medio"/>}/>
        <Route path="/hard" element={<GameState difficulty="dificil"/>}/>
        <Route path="/help" element={<ComoJugar/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
