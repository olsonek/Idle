/**
 * Created by Eddie on 10/15/2015.
 */

import {List, Map} from 'immutable';

export function getPlayer(state, playerId) {
    var player = undefined;
    state.get('players', List()).some(function (p) {
        if (p.get('id') === playerId) {
            player = p;
            return true;
        } else {
            return false;
        }
    });
    return player;
}

export function setPlayer(state, player) {
    let players = state.get('players', List());
    let index = undefined;
    players.some(function (p, i) {
        if (p.get('id') === player.get('id')) {
            index = i;
            return true;
        } else {
            return false;
        }
    });
    if (index !== undefined) {
        return state.set('players', players.set(index, player));
    } else {
        return state;
    }
}

export function getWorker(player, workerId) {
    var worker = undefined;
    player.get('workers', List()).some(function (w) {
        if (w.get('id') === workerId) {
            worker = w;
            return true;
        } else {
            return false;
        }
    });
    return worker;
}

export function setWorker(player, worker) {
    let workers = player.get('workers', List());
    let index = undefined;
    workers.some(function (w, i) {
        if (w.get('id') === worker.get('id')) {
            index = i;
            return true;
        } else {
            return false;
        }
    });
    if (index !== undefined) {
        return player.set('workers', workers.set(index, worker));
    } else {
        return player;
    }
}