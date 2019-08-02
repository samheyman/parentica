import { CLASSES } from '../shared/classes';
import { PROVIDERS } from '../shared/providers';

export const initialState = {
    classes: CLASSES,
    providers: PROVIDERS
};

export const Reducer = (state=initialState, action) => {
    return state;
};