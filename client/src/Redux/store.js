import { createStore, applyMiddleware } from "redux";
import rootReducer from '../Redux/reducer';
import { composeWithDevTools} from "redux-devtools-extension"
import thunk from 'redux-thunk';
//Cuando usamos un Redux Store básico, lo único que puedes hacer son actualizaciones síncronas sencillas 
//por medio de una acción. Pero si quieres trabajar con lógica asíncrona para interactuar con el Store, 
//necesitarás algo más. Aquí es donde entra redux-thunk.
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); 