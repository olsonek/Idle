/**
 * Created by Eddie on 10/18/2015.
 */

import {getWorker} from './worker';

export function setJob(state, playerId, workerId, job) {
    if (workerId !== undefined && getWorker(state, playerId, workerId)) {
        if (job === undefined) {
            state = state.removeIn(['workers', playerId.toString(), workerId.toString(), 'job']);
        } else {
            state = state.setIn(['workers', playerId.toString(), workerId.toString(), 'job'], job);
        }
    }
    return state;
}

export function getJob(state, playerId, workerId) {
    return state.getIn(['workers', playerId.toString(), workerId.toString(), 'job'], undefined);
}

export function removeJob(state, playerId, workerId) {
    if (getWorker(state, playerId, workerId)) {
        return state.removeIn(['workers', playerId.toString(), workerId.toString(), 'job']);
    } else {
        return state;
    }
}

export function isQualifiedForJob(state, playerId, workerId, job) {
    if (workerId !== undefined && getWorker(state, playerId, workerId) && job !== undefined) {
        return state.hasIn(['workers', playerId.toString(), workerId.toString()]);
    }
    return false;
}