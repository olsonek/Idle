/**
 * Created by Eddie on 10/18/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {getTask, removeTask, setTask} from '../src/task';

describe('Task Operations', () => {
    // TODO: Add logic to validate tasks based on job
    describe('setTask', () => {
        it('assigns a task to an employed worker without a task', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie', hairColor: 'Black', latestWorkerId: 4},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 2}
                },
                workers: {
                    1: {3: {name: 'Bobby'}, 4: {name: 'Frank', job: 'Miner'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '4';
            const task = 'Mine Ore';
            const nextState = setTask(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie', hairColor: 'Black', latestWorkerId: 4},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 2}
                },
                workers: {
                    1: {3: {name: 'Bobby'}, 4: {name: 'Frank', job: 'Miner', task: 'Mine Ore'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                },
                tasks: {
                    'Mine Ore': {
                        1: [4]
                    }
                }
            }));
        });
        it('assigns a task to an employed worker with a task', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie', hairColor: 'Black', latestWorkerId: 4},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 2}
                },
                workers: {
                    1: {3: {name: 'Bobby'}, 4: {name: 'Frank', job: 'Miner', task: 'Mine Ore'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                },
                tasks: {
                    'Mine Ore': {
                        1: [4]
                    }
                }
            });
            const playerId = '1';
            const workerId = '4';
            const task = 'Break Rocks';
            const nextState = setTask(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie', hairColor: 'Black', latestWorkerId: 4},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 2}
                },
                workers: {
                    1: {3: {name: 'Bobby'}, 4: {name: 'Frank', job: 'Miner', task: 'Break Rocks'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                },
                tasks: {
                    'Break Rocks': {
                        1: [4]
                    }
                }
            }));
        });
    });
    describe('getTask', () => {
    });
    describe('removeTask', () => {
    });
});