/**
 * Created by Eddie on 10/18/2015.
 */
import {List, Map, Set, fromJS} from 'immutable';

// TODO: Define metrics for valid usernames
export function setPlayer(state, player, update = false) {
    if (player.get('playerId')) {// update existing player
        if (state.hasIn(['playerData', player.get('playerId').toString()])) {
            player = player.set('username', state.getIn(['playerData',//assign original username to new player data
                player.get('playerId').toString(), 'username']));
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
            var newId = Number(state.getIn(['players', 'latestPlayerId'], 0)) + 1;
            return state.setIn(['players', 'latestPlayerId'], newId)//store the latestPlayerId as a number
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