import _ from "lodash";
import {default as rus} from "./index_rus";
import {default as eng} from "./index_eng";


export default function getText(language,key, placeholder) {
    const src = language === 'rus' ? rus : eng;
    return _.get(src, key, placeholder || key);
}
