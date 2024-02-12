import Navbar from "./Navbar";
import './Home.css';
import Submenu from "./Submenu";

function Home(){
    return (
        <div className="home">
            <Navbar/>
            <Submenu/>
            <div className='centrarHijos'>
                
            </div>
        </div>
    )
}

export default Home;