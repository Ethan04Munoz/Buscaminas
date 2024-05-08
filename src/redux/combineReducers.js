import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import musicReducer from './musicReducer';
import soundEffectReducer from './soundEffectsReducer';

const rootReducer = combineReducers({
  language: languageReducer,
  music: musicReducer,
  soundEffect: soundEffectReducer
});

export default rootReducer;
