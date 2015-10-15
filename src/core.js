/**
 * Created by Eddie on 10/14/2015.
 */
import {List, Map, Set, fromJS} from 'immutable';

// TODO: Define metrics for valid usernames
export function addPlayer(state, newPlayer) {
    let players = state.get('players') || List();
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
    var players = state.get('players') || List();
    var newPlayer = undefined;
    var playerIndex = undefined;
    players.some(function (player, index) {
        if (player.get('id') === playerId) {
            newPlayer = player;
            playerIndex = index;
            return true;
        } else {
            return false;
        }
    });
    if (newPlayer) {
        newPlayer = newPlayer.set('workers', workers);
        players = players.set(playerIndex, newPlayer);
        return state.set('players', players);
    } else {
        return state;
    }
}

export function addWorker(state, playerId, newWorker) {
    var players = state.get('players') || List();
    var selectedPlayer = undefined;
    var playerIndex = undefined;
    players.some(function (player, index) {
        if (player.get('id') === playerId) {
            selectedPlayer = player;
            playerIndex = index;
            return true;
        } else {
            return false;
        }
    });
    if (selectedPlayer) {
        var selectedWorkers = selectedPlayer.get('workers') || List();
        var ids = new Set();
        selectedWorkers.some(function (worker) {
            ids = ids.add(worker.get('id'));
            return false;
        });
        var newId = 1;
        while (ids.has(newId)) {
            newId++;
        }
        var updated = selectedPlayer.set('workers', selectedWorkers.push(newWorker.set('id', newId)));
        players = players.set(playerIndex, updated);
        return state.set('players', players);
    } else {
        return state;
    }
}

// TODO: add playerId reference to worker

// TODO: setWorkerJob

// TODO: setWorkerAction, add to an action map

// TODO: addResource

// TODO: procAction, add resource to player based on action map

// TODO: levelUpWorker, add to levels list that maps to job