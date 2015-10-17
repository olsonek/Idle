/**
 * Created by Eddie on 10/14/2015.
 */
import {List, Map, Set, fromJS} from 'immutable';

// TODO: Define metrics for valid usernames
export function setPlayer(state, player, update = false) {
    if (player.get('playerId')) {// update existing player
        if (state.hasIn(['playerData', player.get('playerId').toString()])) {
            if (player.get('username')) {//if specified, ensure it matches original to prevent change
                player = player.set('username', state.getIn(['playerData',
                    player.get('playerId').toString(), 'username']));
            }
            if (update) {
                return state.mergeDeepIn(['playerData', player.get('playerId').toString()],
                    player.remove('playerId'));
            } else {
                return state.setIn(['playerData', player.get('playerId').toString()],
                    player.remove('playerId'));
            }
        }
    }
    else if (player.get('username')) {// create a new player
        player = player.set('username', player.get('username').toString());//ensure the username is a string
        if (!state.hasIn(['players', player.get('username')])) {
            var newId = Number(state.get('latestPlayerId', 0)) + 1;
            return state.set('latestPlayerId', newId)//store the latestPlayerId as a number
                .setIn(['players', player.get('username')], newId.toString())//store the playerId as a string
                .setIn(['playerData', newId.toString()], player);
        }
    }
    return state;
}

export function getPlayer(state, playerId) {
    return state.getIn(['playerData', playerId.toString()], undefined);
}

export function updatePlayer(state, player) {
    return setPlayer(state, player, true);
}

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

// TODO: removeWorkerAction() upon changing jobs
export function setWorkerJob(state, playerId, workerId, job) {
    var player = getPlayer(state, playerId);
    if (player) {
        var worker = getWorker(player, workerId);
        if (worker) {
            worker = worker.set('job', job);
            player = setWorker(player, worker);
            return setPlayer(state, player);
        }
    }
    return state;
}


// TODO: setWorkerTask, add to an action map
//function setWorkerTask(state, playerId, workerId, task)

// TODO: removeWorkerAction, remove from action map

// TODO: addResource

// TODO: procAction, add resource to player based on action map