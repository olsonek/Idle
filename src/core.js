/**
 * Created by Eddie on 10/14/2015.
 */
import {List, Map, Set, fromJS} from 'immutable';
import {getPlayer, setPlayer, getWorker, setWorker} from './internal';

// TODO: Define metrics for valid usernames
export function addPlayer(state, newPlayer) {
    let players = state.get('players', List());
    var ids = Set();
    var exists = players.some(function (player) {
        ids = ids.add(player.get('id'));
        return player.get('username') === newPlayer.get('username');
    });
    if (!exists) {
        var newId = 1;
        while (ids.has(newId)) {
            newId++;
        }
        var addPlayer = newPlayer.set('id', newId);
        return state.set('players', players.push(addPlayer));
    } else {
        return state;
    }
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
    if(player) {
        var worker = getWorker(player, workerId);
        if(worker){
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