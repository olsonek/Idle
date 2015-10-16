/**
 * Created by Eddie on 10/14/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {setPlayer, addWorker, getTask, setWorkerJob, setWorkers, setWorkerTask} from '../src/core'

describe('application logic', () => {
    describe('Player Operations', () => {
        describe('setPlayer', () => {
            it('selects the lowest unique id > zero when creating a player', () => {
                const state = fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        },
                        {
                            id: 3,
                            username: 'Rob'
                        }
                    ]
                });
                const player = Map({
                    username: 'Logan'
                });
                const nextState = setPlayer(state, player);
                expect(nextState).to.equal(fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        },
                        {
                            id: 3,
                            username: 'Rob'
                        },
                        {
                            id: 2,
                            username: 'Logan'
                        }
                    ]
                }));
            });

            it('creates a player if the playerId is not specified and username does not exist', () => {
                const state = Map();
                const player = Map({
                    username: 'Eddie'
                });
                const nextState = setPlayer(state, player);
                expect(nextState).to.equal(fromJS({
                    players: [{
                        username: 'Eddie',
                        id: 1
                    }]
                }));
            });

            it('updates a player if the playerId is specified, the record exists, and the username is unique', () => {
                const state = fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        },
                        {
                            id: 3,
                            username: 'Rob'
                        }
                    ]
                });
                const player = Map({
                    id: 3,
                    username: 'Bobby'
                });
                const nextState = setPlayer(state, player);
                expect(nextState).to.equal(fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        },
                        {
                            id: 3,
                            username: 'Bobby'
                        }
                    ]
                }));
            });

            it('updates other player data if the playerId exists and the username is unique', () => {
                const state = fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        },
                        {
                            id: 3,
                            username: 'Rob'
                        }
                    ]
                });
                const player = Map({
                    id: 1,
                    username: 'Eddie',
                    hairColor: 'Black'
                });
                const nextState = setPlayer(state, player);
                expect(nextState).to.equal(fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie',
                            hairColor: 'Black'
                        },
                        {
                            id: 3,
                            username: 'Rob'
                        }
                    ]
                }));
            });

            it('updates other player data if the playerId exists and the username is not specified', () => {
                const state = fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        },
                        {
                            id: 3,
                            username: 'Rob'
                        }
                    ]
                });
                const player = Map({
                    id: 1,
                    hairColor: 'Black'
                });
                const nextState = setPlayer(state, player);
                expect(nextState).to.equal(fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie',
                            hairColor: 'Black'
                        },
                        {
                            id: 3,
                            username: 'Rob'
                        }
                    ]
                }));
            });

            it('does nothing if the playerId is specified and does not exist', () => {
                const state = fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        },
                        {
                            id: 2,
                            username: 'Rob'
                        }
                    ]
                });
                const player = Map({
                    id: 3,
                    username: 'Allan',
                    why: 'not'
                });
                const nextState = setPlayer(state, player);
                expect(nextState).to.equal(fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        },
                        {
                            id: 2,
                            username: 'Rob'
                        }
                    ]
                }));
            });

            it('does nothing if the playerId is not specified and the username exists', () => {
                const state = fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        },
                        {
                            id: 2,
                            username: 'Rob'
                        }
                    ]
                });
                const player = Map({
                    username: 'Eddie'
                });
                const nextState = setPlayer(state, player);
                expect(nextState).to.equal(fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        },
                        {
                            id: 2,
                            username: 'Rob'
                        }
                    ]
                }));
            });

            it('does nothing if the playerId is specified, but a different, existing username is provided', () => {
                const state = fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        },
                        {
                            id: 3,
                            username: 'Rob'
                        }
                    ]
                });
                const player = Map({
                    id: 3,
                    username: 'Eddie',
                    hairColor: 'Brown'
                });
                const nextState = setPlayer(state, player);
                expect(nextState).to.equal(fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        },
                        {
                            id: 3,
                            username: 'Rob'
                        }
                    ]
                }));
            })
        });

        describe('getPlayer', () => {/* TODO: define getPlayer spec */});
    });

    describe('Worker Operations', () => {
        describe('setWorkers', () => {
            it('associates a set of workers with a player without workers', () => {
                const state = fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        }
                    ]
                });
                const playerId = 1;
                const workers = fromJS(
                    [
                        {
                            id: 1,
                            name: 'Bob'
                        },
                        {
                            id: 2,
                            name: 'Dora'
                        }
                    ]
                );
                const newState = setWorkers(state, playerId, workers);
                expect(newState).to.equal(fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie',
                            workers: [
                                {
                                    id: 1,
                                    playerId: 1,
                                    name: 'Bob'
                                },
                                {
                                    id: 2,
                                    playerId: 1,
                                    name: 'Dora'
                                }
                            ]
                        }
                    ]
                }));
            });

            it('associates a set of workers with a player with workers', () => {
                const state = fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie',
                            workers: [
                                {
                                    id: 1,
                                    playerId: 1,
                                    name: 'Tonk'
                                },
                                {
                                    id: 2,
                                    playerId: 1,
                                    name: 'Alice'
                                }
                            ]
                        }
                    ]
                });
                const playerId = 1;
                const workers = fromJS(
                    [
                        {
                            id: 3,
                            name: 'Bob'
                        },
                        {
                            id: 4,
                            name: 'Dora'
                        }
                    ]
                );
                const newState = setWorkers(state, playerId, workers);
                expect(newState).to.equal(fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie',
                            workers: [
                                {
                                    id: 3,
                                    playerId: 1,
                                    name: 'Bob'
                                },
                                {
                                    id: 4,
                                    playerId: 1,
                                    name: 'Dora'
                                }
                            ]
                        }
                    ]
                }));
            });

            it('does nothing if the player does not exist', () => {
                const state = fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie',
                            workers: [
                                {
                                    id: 1,
                                    playerId: 1,
                                    name: 'Tonk'
                                },
                                {
                                    id: 2,
                                    playerId: 1,
                                    name: 'Alice'
                                }
                            ]
                        }
                    ]
                });
                const playerId = 3;
                const workers = fromJS({
                    workers: [
                        {
                            id: 3,
                            name: 'Bob'
                        },
                        {
                            id: 4,
                            name: 'Dora'
                        }
                    ]
                });
                const newState = setWorkers(state, playerId, workers);
                expect(newState).to.equal(fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie',
                            workers: [
                                {
                                    id: 1,
                                    playerId: 1,
                                    name: 'Tonk'
                                },
                                {
                                    id: 2,
                                    playerId: 1,
                                    name: 'Alice'
                                }
                            ]
                        }
                    ]
                }));
            });
        });

        describe('getWorkers', () => {/* TODO: define getWorkers spec */});

        describe('setWorker', () => {// TODO: modify the addWorker spec to fit a setWorker spec
            it('associates a worker with the smallest unique id >zero to a player without workers', () => {
                const state = fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie'
                        }
                    ]
                });
                const playerId = 1;
                const worker = fromJS({
                    name: 'Bob'
                });
                const nextState = addWorker(state, playerId, worker);
                expect(nextState).to.equal(fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie',
                            workers: [
                                {
                                    id: 1,
                                    playerId: 1,
                                    name: 'Bob'
                                }
                            ]
                        }
                    ]
                }));
            });

            it('associates a worker with the smallest unique id >zero to a player with workers', () => {
                const state = fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie',
                            workers: [
                                {
                                    id: 1,
                                    playerId: 1,
                                    name: 'Bob'
                                },
                                {
                                    id: 3,
                                    playerId: 1,
                                    name: 'Bobby'
                                }
                            ]
                        }
                    ]
                });
                const playerId = 1;
                const worker = fromJS({
                    name: 'Bob'
                });
                const nextState = addWorker(state, playerId, worker);
                expect(nextState).to.equal(fromJS({
                    players: [
                        {
                            id: 1,
                            username: 'Eddie',
                            workers: [
                                {
                                    id: 1,
                                    playerId: 1,
                                    name: 'Bob'
                                },
                                {
                                    id: 3,
                                    playerId: 1,
                                    name: 'Bobby'
                                },
                                {
                                    id: 2,
                                    playerId: 1,
                                    name: 'Bob'
                                }
                            ]
                        }
                    ]
                }));
            });
        });

        describe('getWorker', () => {/* TODO: define getWorker spec */});

        describe('setWorkerJob', () => {
            it('assigns a job to a jobless worker that belongs to the player', () => {
                const initialState = fromJS({
                    players: [{
                        id: 1,
                        username: 'Eddie',
                        workers: [{
                            id: 1,
                            playerId: 1,
                            name: 'Bob'
                        }]
                    }]
                });
                const playerId = 1;
                const workerId = 1;
                const job = 'Builder';
                const nextState = setWorkerJob(initialState, playerId, workerId, job);
                expect(nextState).to.equal(fromJS({
                    players: [{
                        id: 1,
                        username: 'Eddie',
                        workers: [{
                            id: 1,
                            playerId: 1,
                            name: 'Bob',
                            job: 'Builder'
                        }]
                    }]
                }));
            });

            it('replaces the job of an employed worker that belongs to the player', () => {
                const initialState = fromJS({
                    players: [{
                        id: 1,
                        username: 'Eddie',
                        workers: [{
                            id: 1,
                            playerId: 1,
                            name: 'Bob',
                            job: 'Builder'
                        }]
                    }]
                });
                const playerId = 1;
                const workerId = 1;
                const job = 'Miner';
                const nextState = setWorkerJob(initialState, playerId, workerId, job);
                expect(nextState).to.equal(fromJS({
                    players: [{
                        id: 1,
                        username: 'Eddie',
                        workers: [{
                            id: 1,
                            playerId: 1,
                            name: 'Bob',
                            job: 'Miner'
                        }]
                    }]
                }));
            });

            it('does nothing if the worker does not exist', () => {
                const initialState = fromJS({
                    players: [{
                        id: 1,
                        username: 'Eddie',
                        workers: [{
                            id: 1,
                            playerId: 1,
                            name: 'Bob',
                            job: 'Builder'
                        }]
                    }]
                });
                const playerId = 1;
                const workerId = 2;
                const job = 'Miner';
                const nextState = setWorkerJob(initialState, playerId, workerId, job);
                expect(nextState).to.equal(fromJS({
                    players: [{
                        id: 1,
                        username: 'Eddie',
                        workers: [{
                            id: 1,
                            playerId: 1,
                            name: 'Bob',
                            job: 'Builder'
                        }]
                    }]
                }));
            });

            it('does nothing if the player does not exist', () => {
                const initialState = fromJS({
                    players: [{
                        id: 1,
                        username: 'Eddie',
                        workers: [{
                            id: 1,
                            playerId: 1,
                            name: 'Bob',
                            job: 'Builder'
                        }]
                    }]
                });
                const playerId = 2;
                const workerId = 1;
                const job = 'Miner';
                const nextState = setWorkerJob(initialState, playerId, workerId, job);
                expect(nextState).to.equal(fromJS({
                    players: [{
                        id: 1,
                        username: 'Eddie',
                        workers: [{
                            id: 1,
                            playerId: 1,
                            name: 'Bob',
                            job: 'Builder'
                        }]
                    }]
                }));
            });
        });

        describe('getWorkerJob', () => {/* TODO: define getWorkerJob spec */});
    });


    describe('taskList', () => {
        describe('getTask', () => {
            it('gets an existing task from the taskList', () => {
                const initialState = fromJS({
                    taskList: [
                        {
                            task: 'Mine Ore',
                            workers: [
                                {
                                    playerId: 123,
                                    workerId: 17
                                },
                                {
                                    playerId: 3,
                                    workerId: 7
                                }
                            ]
                        },
                        {
                            task: 'Be Awesome',
                            workers: [{
                                playerId: 1,
                                workerId: 1
                            }]
                        }
                    ]
                });
                const task = 'Mine Ore';
                const nextState = getTask(initialState, task);
                expect(nextState).to.equal(fromJS({
                    task: 'Mine Ore',
                    workers: [
                        {
                            playerId: 123,
                            workerId: 17
                        },
                        {
                            playerId: 3,
                            workerId: 7
                        }
                    ]
                }));
            });

            it('creates a new task if either the task or taskList do not exist', () => {
                const initialState = Map();
                const task = 'Catch Bugs';
                const nextState = getTask(initialState, task);
                expect(nextState).to.equal(fromJS({
                    task: 'Catch Bugs',
                    workers: []
                }));
            });
        });
    });
});