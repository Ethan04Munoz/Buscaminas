const initialState = {
    language: localStorage.getItem('language') || 'es', 
};
  
function languageReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            const newLanguage = state.language === 'es' ? 'en' : 'es';
            localStorage.setItem('language', newLanguage);
            return {
                ...state,
                language: state.language === 'es' ? 'en' : 'es', 
            };
        default:
            return state;
    }
}
  
export default languageReducer;
  