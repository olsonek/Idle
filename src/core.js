/**
 * Created by Eddie on 10/14/2015.
 */
import {List, Map, Set, fromJS} from 'immutable';

// TODO: Merge "internal" method dependencies into core methods via the new spec
// TODO: Define metrics for valid usernames
export function setPlayer(state, player) {
    var players = state.get('players', Map());
    if (player.get('playerId')) {// update existing player
        if (player.get('username')) {//if specified, ensure it matches original to prevent change
            player = player.set('username', state.getIn(['playerData',
                player.get('playerId').toString(), 'username']));
        }
        return state.mergeDeepIn(['playerData', player.get('playerId').toString()],
            player.remove('playerId'));
    }
    else if (player.get('username')) {// create a new player
        if (!players.has(player.get('username'))) {
            var newId = state.get('latestPlayerId', 0) + 1;
            return state.set('latestPlayerId', newId)
                .setIn(['players', player.get('username')], newId)
                .setIn(['playerData', newId.toString()], player);
        }
    }
    return state;
}

export function getPlayer(state, playerId) {

}

export function setWorkers(state, playerId, workers) {
    var player = getPlayer(state, playerId);
    if (player) {
        var newWorkers = workers;
        workers.some(function (worker, index) {
            newWorkers = newWorkers.set(index, worker.set('playerId', playerId));
            return false;
        });
        player = player.set('workers', newWorkers);
        return setPlayer(state, player);
    } else {
        return state;
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