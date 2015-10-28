/**
 * Created by Eddie on 10/18/2015.
 */
import {List, Map, Set, fromJS} from 'immutable';

import {removeTask} from './task';

// TODO: Add methods for operating on specific worker attributes
// TODO: Adjust everything that manipulates worker state to use those methods

export function setWorkers(state, playerId, workers) {
    if (!(workers) || workers === Map()) {
        return removeWorkers(state, playerId);
    }
    var latestWorkerId = 0;
    workers.keySeq().some(function (workerId) {//calculate new latestWorkerId
        if (Number(workerId) > latestWorkerId) {
            latestWorkerId = Number(workerId);
        }
        return false;
    });
    workers = workers.set('latestWorkerId', latestWorkerId);
    return state.setIn(['workers', playerId.toString()], workers);
}

export function removeWorkers(state, playerId) {
    state = state.removeIn(['workers', playerId.toString()]);
    if (state.get('workers', List()).count() === 0) {// if no playerIds are associated with workers
        state = state.remove('workers');
    }
    return state;
}

export function getWorkers(state, playerId) {
    if (state.hasIn(['workers', playerId.toString()])) {
        return state.getIn(['workers', playerId.toString()]).remove('latestWorkerId');
    } else {
        return undefined;
    }
}

export function setWorker(state, playerId, worker, update = false) {
    if (worker.has('workerId')) {//update worker
        if (!update && worker.remove('workerId') === Map()) {
            return removeWorker(state, playerId, worker.get('workerId'));
        }
        if (state.hasIn(['workers', playerId.toString(), worker.get('workerId').toString()])) {//playerId is associated with worker
            if (update) {
                return state.mergeDeepIn(['workers', playerId.toString(),
                    worker.get('workerId').toString()], worker.remove('workerId'));
            } else {
                return state.setIn(['workers', playerId.toString(),
                    worker.get('workerId').toString()], worker.remove('workerId'));
            }
        }
    } else if (worker) {//create a new worker if defined
        var newWorkerId = Number(state.getIn(['workers', playerId.toString(), 'latestWorkerId'], 0)) + 1;
        return state.setIn(['workers', playerId.toString(), 'latestWorkerId'], newWorkerId)
            .setIn(['workers', playerId.toString(), newWorkerId.toString()], worker);
    }
    return state;
}

export function getWorker(state, playerId, workerId) {
    return state.getIn(['workers', playerId.toString(), workerId.toString()], undefined);
}

export function updateWorker(state, playerId, worker) {
    return setWorker(state, playerId, worker, true);
}

export function removeWorker(state, playerId, workerId) {
    if (state.hasIn(['workers', playerId.toString(), workerId.toString()])) {
        state = state.removeIn(['workers', playerId.toString(), workerId.toString()]);
        if (state.hasIn(['workers', playerId.toString()]) &&
            state.getIn(['workers', playerId.toString()]).count() <= 1) {
            // if player has no workers (may have latestWorkerId entry still)
            state = state.removeIn(['workers', playerId.toString()]);
            if (state.get('workers', List()).count() === 0) {// if no playerIds are associated with workers
                state = state.remove('workers');
            }
        }
    }
    return state;
}