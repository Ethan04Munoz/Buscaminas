const initialState = {
    soundEffect: localStorage.getItem('soundEffectConfig') || '1', //Predeterminado si
};
  
function soundEffectReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_CONFIG_SOUNDEFFECTS':
            const soundEffect = state.soundEffect === '1' ? '0' : '1';
            localStorage.setItem('soundEffectConfig', soundEffect);
            return {
                ...state,
                soundEffect: state.soundEffect === '1' ? '0' : '1', 
            };
        default:
            return state;
    }
}
  
export default soundEffectReducer;