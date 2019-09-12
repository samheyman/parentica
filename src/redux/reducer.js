import { CLASSES } from '../shared/classes';
import { PROVIDERS } from '../shared/providers';
import { RESOURCES } from '../shared/resources';

export const initialState = {
    classes: CLASSES,
    providers: PROVIDERS,
    resources: RESOURCES,
    tab: 1,
};

export const Reducer = (state=initialState, action) => {
    return state;
};