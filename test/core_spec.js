/**
 * Created by Eddie on 10/14/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {addPlayer, addWorker, addWorkerToEventList, removeWorkerFromEventList, setWorkerJob, setWorkers, setWorkerTask} from '../src/core'

describe('application logic', () => {
    describe('addPlayer', () => {
        it('adds a player to the state with the smallest unique id >zero', () => {
            const state = Map();
            const player = Map({
                username: 'Eddie'
            });
            const nextState = addPlayer(state, player);
            expect(nextState).to.equal(fromJS({
                players: [{
                    username: 'Eddie',
                    id: 1
                }]
            }));
        });

        it('adds a player to a list of existing players with the smallest unique id >zero', () => {
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
            const nextState = addPlayer(state, player);
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

        it('does not add a player with an existing username', () => {
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
            const nextState = addPlayer(state, player);
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
    });

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

    describe('addWorker', () => {
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

    describe('eventList', () => {
        describe('addWorkerToEventList', () => {
            it('creates an eventList and taskList for a new task', () => {
                const initialState = Map();
                const worker = fromJS({
                    id: 1,
                    playerId: 1,
                    name: 'Bob',
                    job: 'Miner',
                    task: 'Mine Ore'
                });
                const nextState = addWorkerToEventList(initialState, worker);
                expect(nextState).to.equal(fromJS({
                    eventList: [{
                        task: 'Mine Ore',
                        workers: [{
                            playerId: 1,
                            workerId: 1
                        }]
                    }]
                }));
            });

            it('adds a new taskList to an existing eventList for a new task', () => {
                const initialState = fromJS({
                    eventList: [{
                        task: 'Break Rocks',
                        workers: [{
                            playerId: 3,
                            workerId: 2
                        }]
                    }]
                });
                const worker = fromJS({
                    id: 1,
                    playerId: 1,
                    name: 'Bob',
                    job: 'Miner',
                    task: 'Mine Ore'
                });
                const nextState = addWorkerToEventList(initialState, worker);
                expect(nextState).to.equal(fromJS({
                    eventList: [
                        {
                            task: 'Break Rocks',
                            workers: [{
                                playerId: 3,
                                workerId: 2
                            }]
                        },
                        {
                            task: 'Mine Ore',
                            workers: [{
                                playerId: 1,
                                workerId: 1
                            }]
                        }
                    ]
                }));
            });

            it('adds a worker to an existing taskList and eventList', () => {
                const initialState = fromJS({
                    eventList: [
                        {
                            task: 'Break Rocks',
                            workers: [{
                                playerId: 3,
                                workerId: 2
                            }]
                        },
                        {
                            task: 'Mine Ore',
                            workers: [{
                                playerId: 7,
                                workerId: 8
                            }]
                        }
                    ]
                });
                const worker = fromJS({
                    id: 1,
                    playerId: 1,
                    name: 'Bob',
                    job: 'Miner',
                    task: 'Mine Ore'
                });
                const nextState = addWorkerToEventList(initialState, worker);
                expect(nextState).to.equal(fromJS({
                    eventList: [
                        {
                            task: 'Break Rocks',
                            workers: [{
                                playerId: 3,
                                workerId: 2
                            }]
                        },
                        {
                            task: 'Mine Ore',
                            workers: [
                                {
                                    playerId: 7,
                                    workerId: 8
                                },
                                {
                                    playerId: 1,
                                    workerId: 1
                                }
                            ]
                        }
                    ]
                }));
            });
        });

        describe('removeWorkerFromEventList', () => {
            it('removes a worker from a taskList in the eventList', () => {
                const initialState = fromJS({
                    eventList: [
                        {
                            task: 'Break Rocks',
                            workers: [{
                                playerId: 3,
                                workerId: 2
                            }]
                        },
                        {
                            task: 'Mine Ore',
                            workers: [
                                {
                                    playerId: 7,
                                    workerId: 8
                                },
                                {
                                    playerId: 1,
                                    workerId: 1
                                }
                            ]
                        }
                    ]
                });
                const worker = fromJS({
                    id: 1,
                    playerId: 1,
                    name: 'Bob',
                    job: 'Miner',
                    task: 'Mine Ore'
                });
                const nextState = removeWorkerFromEventList(initialState, worker);
                expect(nextState).to.equal(fromJS({
                    eventList: [
                        {
                            task: 'Break Rocks',
                            workers: [{
                                playerId: 3,
                                workerId: 2
                            }]
                        },
                        {
                            task: 'Mine Ore',
                            workers: [
                                {
                                    playerId: 7,
                                    workerId: 8
                                }
                            ]
                        }
                    ]
                }));
            });

            it('removes the taskList from the eventList if the last worker is removed', () => {
                const initialState = fromJS({
                    eventList: [
                        {
                            task: 'Break Rocks',
                            workers: [{
                                playerId: 3,
                                workerId: 2
                            }]
                        },
                        {
                            task: 'Mine Ore',
                            workers: [{
                                playerId: 1,
                                workerId: 1
                            }]
                        }
                    ]
                });
                const worker = fromJS({
                    id: 1,
                    playerId: 1,
                    name: 'Bob',
                    job: 'Miner',
                    task: 'Mine Ore'
                });
                const nextState = removeWorkerFromEventList(initialState, worker);
                expect(nextState).to.equal(fromJS({
                    eventList: [{
                        task: 'Break Rocks',
                        workers: [{
                            playerId: 3,
                            workerId: 2
                        }]
                    }]
                }));
            });

            it('does nothing if the taskList does not exist', () => {
                const initialState = fromJS({
                    eventList: [
                        {
                            task: 'Break Rocks',
                            workers: [{
                                playerId: 3,
                                workerId: 2
                            }]
                        },
                        {
                            task: 'Mine Ore',
                            workers: [{
                                playerId: 7,
                                workerId: 8
                            }]
                        }
                    ]
                });
                const worker = fromJS({
                    id: 1,
                    playerId: 1,
                    name: 'Bob',
                    job: 'Miner',
                    task: 'Drill for Oil'
                });
                const nextState = removeWorkerFromEventList(initialState, worker);
                expect(nextState).to.equal(fromJS({
                    eventList: [
                        {
                            task: 'Break Rocks',
                            workers: [{
                                playerId: 3,
                                workerId: 2
                            }]
                        },
                        {
                            task: 'Mine Ore',
                            workers: [
                                {
                                    playerId: 7,
                                    workerId: 8
                                }
                            ]
                        }
                    ]
                }));
            });

            it('does nothing if the eventList does not exist', () => {
                const initialState = Map();
                const worker = fromJS({
                    id: 1,
                    playerId: 1,
                    name: 'Bob',
                    job: 'Miner',
                    task: 'Mine Ore'
                });
                const nextState = removeWorkerFromEventList(initialState, worker);
                expect(nextState).to.equal(Map());
            });
        });
    });
/*
    describe('setWorkerTask', () => {

        it('maps the worker to a new eventList', () => {
            const initialState = fromJS({
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
            });
            const playerId = 1;
            const workerId = 1;
            const task = 'Mine Ore';
            const nextState = setWorkerTask(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                players: [{
                    id: 1,
                    username: 'Eddie',
                    workers: [{
                        id: 1,
                        playerId: 1,
                        name: 'Bob',
                        job: 'Miner',
                        task: 'Mine Ore'
                    }]
                }],
                eventList: [{
                    tasks: [{
                        'Mine Ore': [{
                            playerId: 1,
                            workerId: 1
                        }]
                    }]
                }]
            }));
        });

        it('maps the worker to a pre-existing eventList', () => {
            const initialState = fromJS({
                players: [{
                    id: 1,
                    username: 'Eddie',
                    workers: [{
                        id: 1,
                        playerId: 1,
                        name: 'Bob',
                        job: 'Miner',
                        task: 'Mine Ore'
                    }]
                }],
                eventList: [{
                    tasks: [{
                        'Mine Ore': [{
                            playerId: 1,
                            workerId: 1
                        }]
                    }]
                }]
            });
            const playerId = 1;
            const workerId = 1;
            const task = 'Break Rocks';
            const nextState = setWorkerTask(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                players: [{
                    id: 1,
                    username: 'Eddie',
                    workers: [{
                        id: 1,
                        playerId: 1,
                        name: 'Bob',
                        job: 'Miner',
                        task: 'Break Rocks'
                    }]
                }],
                eventList: [{
                    tasks: [{
                        'Break Rocks': [{
                            playerId: 1,
                            workerId: 1
                        }]
                    }]
                }]
            }));
        });

        it('maps the worker to a pre-existing task in the eventList', () => {
            const initialState = fromJS({
                players: [{
                    id: 1,
                    username: 'Eddie',
                    workers: [{
                        id: 1,
                        playerId: 1,
                        name: 'Bob',
                        job: 'Miner',
                        task: 'Mine Ore'
                    }]
                }]
            });
            const playerId = 1;
            const workerId = 1;
            const task = 'Break Rocks';
            const nextState = setWorkerTask(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                players: [{
                    id: 1,
                    username: 'Eddie',
                    workers: [{
                        id: 1,
                        playerId: 1,
                        name: 'Bob',
                        job: 'Miner',
                        task: 'Break Rocks'
                    }]
                }]
            }));
        });

        it('maps the worker to a new task in the eventList', () => {
            const initialState = fromJS({
                players: [{
                    id: 1,
                    username: 'Eddie',
                    workers: [{
                        id: 1,
                        playerId: 1,
                        name: 'Bob',
                        job: 'Miner',
                        task: 'Mine Ore'
                    }]
                }]
            });
            const playerId = 1;
            const workerId = 1;
            const task = 'Break Rocks';
            const nextState = setWorkerTask(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                players: [{
                    id: 1,
                    username: 'Eddie',
                    workers: [{
                        id: 1,
                        playerId: 1,
                        name: 'Bob',
                        job: 'Miner',
                        task: 'Break Rocks'
                    }]
                }]
            }));
        });

        it('assigns a task to an employed worker without a task and maps that worker in the eventList', () => {
            const initialState = fromJS({
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
            });
            const playerId = 1;
            const workerId = 1;
            const task = 'Mine Ore';
            const nextState = setWorkerTask(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                players: [{
                    id: 1,
                    username: 'Eddie',
                    workers: [{
                        id: 1,
                        playerId: 1,
                        name: 'Bob',
                        job: 'Miner',
                        task: 'Mine Ore'
                    }]
                }]
            }));
        });

        it('replaces the task assigned to an employed worker and maps that worker in the eventList', () => {
            const initialState = fromJS({
                players: [{
                    id: 1,
                    username: 'Eddie',
                    workers: [{
                        id: 1,
                        playerId: 1,
                        name: 'Bob',
                        job: 'Miner',
                        task: 'Mine Ore'
                    }]
                }]
            });
            const playerId = 1;
            const workerId = 1;
            const task = 'Break Rocks';
            const nextState = setWorkerTask(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                players: [{
                    id: 1,
                    username: 'Eddie',
                    workers: [{
                        id: 1,
                        playerId: 1,
                        name: 'Bob',
                        job: 'Miner',
                        task: 'Break Rocks'
                    }]
                }]
            }));
        });

        it('does nothing if the worker is unemployed', () => {
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
            const task = 'Mine Ore';
            const nextState = setWorkerTask(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                players: [{
                    id: 1,
                    username: 'Eddie',
                    workers: [{
                        id: 1,
                        playerId: 1,
                        name: 'Bob'
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
                        job: 'Miner'
                    }]
                }]
            });
            const playerId = 1;
            const workerId = 2;
            const task = 'Mine Ore';
            const nextState = setWorkerTask(initialState, playerId, workerId, task);
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

        it('does nothing if the player does not exist', () => {
            const initialState = fromJS({
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
            });
            const playerId = 2;
            const workerId = 1;
            const task = 'Mine Ore';
            const nextState = setWorkerTask(initialState, playerId, workerId, task);
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
    });

    describe('removeWorkerTask', () => {
        it('removes a task from an employed worker with a task', () => {

        });

        it('does nothing if the worker does not have a task', () => {

        });

        it('does nothing if the worker does not exist', () => {

        });

        it('does nothing if the player does not exist', () => {

        });
    });*/
});