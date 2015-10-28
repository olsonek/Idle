/**
 * Created by Eddie on 10/18/2015.
 */
import {List, Map} from 'immutable';

export function addResources(state, playerId, resources) {
    var items = Map(resources);
    items.some(function (amount, resource) {
        state = addResource(state, playerId, resource, amount);
        return false;
    });
    return state;
}

export function getResources(state, playerId) {
    return state.getIn(['resources', playerId.toString()], Map());
}

export function hasResources(state, playerId, resources) {
    var output = true;
    var items = Map(resources);
    items.some(function (amount, resource) {
        output = output && hasResource(state, playerId, resource, amount);
        return !output;
    });
    return output;
}

export function removeResources(state, playerId, resources) {
    var items = Map(resources);
    items.some(function (amount, resource) {
        state = removeResource(state, playerId, resource, amount);
        return false;
    });
    return state;
}

export function setResources(state, playerId, resources) {
    state = state.removeIn(['resources', playerId.toString()]);
    var items = Map(resources);
    items.some(function (amount, resource) {
        state = setResource(state, playerId, resource, amount);
        return false;
    });
    if (state.get('resources', Map()).count() === 0) {
        state = state.remove('resources');
    }
    return state;
}

export function addResource(state, playerId, resource, amount) {
    if (resource !== undefined && amount !== undefined) {
        if (amount >= 0) {
            state = state.setIn(['resources', playerId.toString(), resource],
                getResource(state, playerId, resource) + amount);
        } else {
            state = removeResource(state, playerId, resource, Math.abs(amount));
        }
    }
    return state;
}

export function getResource(state, playerId, resource) {
    return state.getIn(['resources', playerId.toString(), resource], 0);
}

export function hasResource(state, playerId, resource, amount) {
    if (resource !== undefined && amount !== undefined && amount >= 0) {
        return state.getIn(['resources', playerId.toString(), resource], 0) >= amount;
    } else {
        return false;
    }
}

export function setResource(state, playerId, resource, amount) {
    if (resource !== undefined) {
        if (amount !== undefined && amount > 0) {
            state = state.setIn(['resources', playerId.toString(), resource], amount);
        } else {
            state = removeResource(state, playerId, resource);
        }
    }
    return state;
}

export function removeResource(state, playerId, resource, amount) {
    if (resource !== undefined && !(amount !== undefined && amount < 0)) {
        if (amount === undefined || getResource(state, playerId, resource) <= amount) {
            state = state.removeIn(['resources', playerId.toString(), resource]);
            if (state.getIn(['resources', playerId.toString()], Map()).count() === 0) {
                state = state.removeIn(['resources', playerId.toString()]);
                if (state.get('resources', Map()).count() === 0) {
                    state = state.remove('resources');
                }
            }
        } else {
            state = state.setIn(['resources', playerId.toString(), resource],
                getResource(state, playerId, resource) - amount);
        }
    }
    return state;
}