/**
 * Created by Eddie on 10/18/2015.
 */
import {List, Map, Set, fromJS} from 'immutable';

export function setWorkers(state, playerId, workers) {
    if (state.hasIn(['playerData', playerId.toString()])) {//player exists
        var latestWorkerId = 0;
        workers.keySeq().some(function (workerId) {//calculate new latestWorkerId
            if (Number(workerId) > latestWorkerId) {
                latestWorkerId = Number(workerId);
            }
            return false;
        });
        return state.setIn(['playerData', playerId.toString(), 'latestWorkerId'], latestWorkerId)
            .setIn(['workers', playerId.toString()], workers);
    } else {//player does not exist
        return state;
    }
}

export function getWorkers(state, playerId) {
    return state.getIn(['workers', playerId.toString()], undefined);
}

export function setWorker(state, playerId, worker, update = false) {
    if (state.hasIn(['playerData', playerId.toString()])) {//player exists
        if (worker.has('workerId')) {//update worker
            if (state.hasIn(['workers', playerId.toString(), worker.get('workerId').toString()])) {//worker exists
                if (update) {
                    return state.mergeDeepIn(['workers', playerId.toString(),
                        worker.get('workerId').toString()], worker.remove('workerId'));
                } else {
                    return state.setIn(['workers', playerId.toString(),
                        worker.get('workerId').toString()], worker.remove('workerId'));
                }
            }
        } else if (worker) {//create a new worker if defined
            var newWorkerId = Number(state.getIn(['playerData', playerId.toString(), 'latestWorkerId'], 0)) + 1;
            return state.setIn(['playerData', playerId.toString(), 'latestWorkerId'], newWorkerId)
                .setIn(['workers', playerId.toString(), newWorkerId.toString()], worker);
        }
    }
    return state;
}

export function getWorker(state, playerId, workerId) {
    return state.getIn(['workers', playerId.toString(), workerId.toString()], undefined);
}

export function updateWorker(state, playerId, worker) {
    return setWorker(state, playerId, worker, true);
}

