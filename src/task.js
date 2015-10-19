/**
 * Created by Eddie on 10/18/2015.
 */
import {List, Map, Set, fromJS} from 'immutable';

export function getTask(state, playerId, workerId) {
    return state.getIn(['workers', playerId.toString(), workerId.toString(), 'task']);
}

export function removeTask(state, playerId, workerId) {
    var oldTask = getTask(state, playerId, workerId);
    if (oldTask) {
        state = removeFromTasks(state, playerId, workerId, oldTask);
    }
    return state.removeIn(['workers', playerId.toString(), workerId.toString(), 'task']);
}

export function setTask(state, playerId, workerId, task) {
    if (isQualifiedForTask(state.getIn(['workers', playerId.toString(), workerId.toString(), 'job']), task)) {
        var oldTask = getTask(state, playerId, workerId);
        if (oldTask) {
            state = removeFromTasks(state, playerId, workerId, oldTask);
        }
        state = addToTasks(state, playerId, workerId, task);
        state = state.setIn(['workers', playerId.toString(), workerId.toString(), 'task'], task);
    }
    return state;
}

export function addToTasks(state, playerId, workerId, task) {
    return state.setIn(['tasks', task, playerId.toString()], List(workerId.toString()));
}

export function removeFromTasks(state, playerId, workerId, task) {
    if (state.getIn(['tasks', task, playerId.toString()], List()).includes(workerId.toString())) {
        state = state.removeIn(['tasks', task, playerId.toString()], workerId.toString());
        if (state.hasIn(['tasks', task]) &&
            state.getIn(['tasks', task]).count() === 0) {// if no workers on a particular task
            state = state.removeIn(['tasks', task]);
            if (state.get('tasks', List()).count() === 0) {// if no workers on any task
                state = state.remove('tasks');
            }
        }
    }
    return state;
}

export function isQualifiedForTask(job, task) {
    return Boolean(job && job.length > 0
        && task && task.length > 0);
}