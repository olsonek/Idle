/**
 * Created by Eddie on 10/14/2015.
 */
import {List, Map, Set, fromJS} from 'immutable';

// TODO: Merge "internal" method dependencies into core methods via the new spec
// TODO: Define metrics for valid usernames
export function setPlayer(state, player) {
    let players = state.get('players', List());
    if (player.get('id')) {// update existing player
        var index = undefined;
        var oldPlayer = undefined;
        players.some(function (p, i) {
            if (p.get('id') === player.get('id')) {
                oldPlayer = p;
                index = i;
                return true;
            }
            return false;
        });
        if (index !== undefined) {
            player = player.remove('username');
            return state.set('players', players.set(index, oldPlayer.merge(player)));
        }
    }
    else if (player.get('username')) {// create a new player
        let exists = players.some(function(p){return p.get('username') === player.get('username')});
        if (!exists) {
            var newId = state.get('latestPlayerId', 0) + 1;
            return state.set('latestPlayerId', newId)
                .set('players', players.push(player.set('id', newId)));
        }
    }
    return state;
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