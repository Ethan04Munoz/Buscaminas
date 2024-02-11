function Navbar(props){

    function encenderModalConfiguracion(){
        
    }

    return(
        <div className="navbar">
            <div className="gridNavBar">
            <div>Buscaminas</div>
            <div><img src="config.png" alt="" onClick={encenderModalConfiguracion}/></div>
            </div>
            <div></div>
        </div>
    )
}

export default Navbar;