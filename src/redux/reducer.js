import { CLASSES } from '../shared/classesJSON';
import { PROVIDERS } from '../shared/providersJSON';
import { TOPICS } from '../shared/topicsJSON';

export const initialState = {
    classes: CLASSES,
    providers: PROVIDERS,
    topics: TOPICS,
    tab: 1,
    locale: 'es-ES',
    // locale: 'en-GB'
};

export const Reducer = (state=initialState, action) => {
    return state;
};