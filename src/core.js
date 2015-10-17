/**
 * Created by Eddie on 10/14/2015.
 */
import {List, Map, Set, fromJS} from 'immutable';

// TODO: Merge "internal" method dependencies into core methods via the new spec
// TODO: Define metrics for valid usernames
export function setPlayer(state, player) {
    if (player.get('playerId')) {// update existing player
        if (state.hasIn(['playerData', player.get('playerId').toString()])) {
            if (player.get('username')) {//if specified, ensure it matches original to prevent change
                player = player.set('username', state.getIn(['playerData',
                    player.get('playerId').toString(), 'username']));
            }
            return state.mergeDeepIn(['playerData', player.get('playerId').toString()],
                player.remove('playerId'));
        }
    }
    else if (player.get('username')) {// create a new player
        player = player.set('username', player.get('username').toString());//ensure the username is a string
        if (!state.hasIn(['players', player.get('username')])) {
            var newId = state.get('latestPlayerId', 0) + 1;
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

export function setWorkers(state, playerId, workers) {
    if (state.hasIn(['playerData', playerId.toString()])) {//player exists
        return state.setIn(['workers', playerId.toString()], workers);
    } else {//player does not exist
        return state;
    }
}

export function getWorkers(state, playerId) {
    if (state.hasIn(['playerData', playerId.toString()])) {//player exists
        return state.getIn(['workers', playerId.toString()], Map());
    } else {//player does not exist
        return undefined;
    }
}

export function addWorker(state, playerId, newWorker) {
    var player = getPlayer(state, playerId);
    if (player) {
        var workers = player.get('workers', List());
        var ids = new Set();
        workers.some(function (worker) {
            ids = ids.add(worker.get('id'));
            return false;
        });
        var newId = 1;
        while (ids.has(newId)) {
            newId++;
        }
        var updatedPlayer = player.set('workers', workers.push(newWorker.set('id', newId).set('playerId', playerId)));
        return setPlayer(state, updatedPlayer);
    } else {
        return state;
    }
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