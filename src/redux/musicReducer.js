const initialState = {
    music: localStorage.getItem('musicConfig') || '0', 
};
  
function musicReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            const music = state.music === '0' ? '1' : '0';
            localStorage.setItem('musicConfig', music);
            return {
                ...state,
                music: state.music === '0' ? '1' : '0', 
            };
        default:
            return state;
    }
}
  
export default musicReducer;
