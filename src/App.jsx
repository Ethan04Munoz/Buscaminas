import {Route, Routes, BrowserRouter} from "react-router-dom";
import GameState from "./GameState";
function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/easy" element={<GameState difficulty="facil"/>}/>
        <Route path="/medium" element={<GameState difficulty="medio"/>}/>
        <Route path="/hard" element={<GameState difficulty="dificil"/>}/>
        <Route path="/" element={<GameState difficulty="principal"/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
