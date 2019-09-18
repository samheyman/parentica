import { CLASSES } from '../shared/classesJSON';
import { PROVIDERS } from '../shared/providersJSON';

export const initialState = {
    classes: CLASSES,
    providers: PROVIDERS,
    tab: 1,
};

export const Reducer = (state=initialState, action) => {
    return state;
};