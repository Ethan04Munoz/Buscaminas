const initialState = {
    language: 'es', // Idioma inicial
  };
  
  function languageReducer(state = initialState, action) {
    switch (action.type) {
      case 'CHANGE_LANGUAGE':
        return {
          ...state,
          language: state.language === 'es' ? 'en' : 'es', // Cambia el idioma
        };
      default:
        return state;
    }
  }
  
  export default languageReducer;
  