import { memo, ComponentType } from "react";
import _ from 'lodash'
export const isEqual = _.isEqual;

export const componentMemo = <T extends ComponentType<any>>(component: T) => {
    return memo(component, isEqual);
}