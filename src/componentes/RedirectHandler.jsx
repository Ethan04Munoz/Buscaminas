import {useNavigate} from "react-router-dom";
import { useEffect } from "react";

function RedirectHandler() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const redirectUrl = sessionStorage.redirect;
        delete sessionStorage.redirect;
        if (redirectUrl && redirectUrl !== window.location.href) {
            navigate(redirectUrl);
        }
    }, [navigate]);
  
    return null;
}

export default RedirectHandler;