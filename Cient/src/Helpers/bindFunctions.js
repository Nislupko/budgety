import _ from 'lodash';

export default function bindFunctions(thisRef, funcs) {
    return _.mapValues(funcs, f => {
        return f.bind(thisRef);
    });
}
