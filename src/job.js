/**
 * Created by Eddie on 10/18/2015.
 */

export function setJob(state, playerId, workerId, job) {
    if (job && state.hasIn(['workers', playerId.toString(), workerId.toString()])) {
        return state.setIn(['workers', playerId.toString(), workerId.toString(), 'job'], job);
    } else {
        return state;
    }
}

export function getJob(state, playerId, workerId) {
    return state.getIn(['workers', playerId.toString(), workerId.toString(), 'job'], undefined);
}

export function removeJob(state, playerId, workerId) {
    if (state.hasIn(['workers', playerId.toString(), workerId.toString()])) {
        return state.removeIn(['workers', playerId.toString(), workerId.toString(), 'job']);
    } else {
        return state;
    }
}