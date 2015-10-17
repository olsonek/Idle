/**
 * Created by Eddie on 10/14/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {getPlayer, setPlayer, addWorker, getTask, setWorkerJob, setWorkers, setWorkerTask} from '../src/core'

describe('application logic', () => {
    describe('Player Operations', () => {
        describe('setPlayer', () => {
            describe('adds a player with a unique playerId and sets latestPlayerId', () => {
                it('when no playerId is provided, the username is unique, and there is no player list', () => {
                    const state = Map();
                    const player = Map({
                        username: 'Eddie'
                    });
                    const nextState = setPlayer(state, player);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 1,
                        players: {
                            'Eddie': 1
                        },
                        playerData: {
                            1: {username: 'Eddie'}
                        }
                    }));
                });
                it('when no playerId is provided, the username is unique, and there is a player list', () => {
                    const state = fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': 1,
                            'Rob': 3
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            3: {username: 'Rob'}
                        }
                    });
                    const player = Map({
                        username: 'Logan'
                    });
                    const nextState = setPlayer(state, player);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 4,
                        players: {
                            'Eddie': 1,
                            'Rob': 3,
                            'Logan': 4
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            3: {username: 'Rob'},
                            4: {username: 'Logan'}
                        }
                    }));
                });
                it('when no playerId is provided, the username is unique, and there is additional player data', () => {
                    const state = fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': 1,
                            'Rob': 3
                        },
                        playerData: {
                            1: {username: 'Eddie', hairColor: 'Black'},
                            3: {username: 'Rob'}
                        }
                    });
                    const player = Map({
                        username: 'Logan',
                        hairColor: 'Brown'
                    });
                    const nextState = setPlayer(state, player);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 4,
                        players: {
                            'Eddie': 1,
                            'Rob': 3,
                            'Logan': 4
                        },
                        playerData: {
                            1: {username: 'Eddie', hairColor: 'Black'},
                            3: {username: 'Rob'},

                            4: {username: 'Logan', hairColor: 'Brown'}
                        }
                    }));
                });
            });
            describe('updates player data other than the username', () => {
                it('when the playerId is specified (and exists) without a provided username', () => {
                    const state = fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': 1,
                            'Rob': 3
                        },
                        playerData: {
                            1: {username: 'Eddie', hairColor: 'Black'},
                            3: {username: 'Rob', hairColor: 'Brown'}
                        }
                    });
                    const player = Map({
                        playerId: 3,
                        hairColor: 'Black',
                        powerLevel: 'Over 9000'
                    });
                    const nextState = setPlayer(state, player);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': 1,
                            'Rob': 3
                        },
                        playerData: {
                            1: {username: 'Eddie', hairColor: 'Black'},
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                        }
                    }));
                });
                it('when the playerId is specified (and exists) with any provided username', () => {
                    const state = fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': 1,
                            'Rob': 3
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            3: {username: 'Rob'}
                        }
                    });
                    const player = Map({
                        playerId: 3,
                        username: 'Bobby',
                        hairColor: 'Black'
                    });
                    const nextState = setPlayer(state, player);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': 1,
                            'Rob': 3
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            3: {username: 'Rob', hairColor: 'Black'}
                        }
                    }));
                });
            });
            describe('does nothing', () => {
                it('if the playerId is specified, but does not exist', () => {
                    const state = fromJS({
                        players: {
                            'Eddie': 1,
                            'Rob': 2
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            2: {username: 'Rob', powerLevel: 'Over 9000'}
                        }
                    });
                    const player = Map({
                        playerId: 3,
                        username: 'Allan',
                        why: 'not'
                    });
                    const nextState = setPlayer(state, player);
                    expect(nextState).to.equal(fromJS({
                        players: {
                            'Eddie': 1,
                            'Rob': 2
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            2: {username: 'Rob', powerLevel: 'Over 9000'}
                        }
                    }));
                });
                it('if the playerId is not specified and the username exists', () => {
                    const state = fromJS({
                        players: {
                            'Eddie': 1,
                            'Rob': 2
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            2: {username: 'Rob', powerLevel: 'Over 9000'}
                        }
                    });
                    const player = Map({
                        username: 'Eddie'
                    });
                    const nextState = setPlayer(state, player);
                    expect(nextState).to.equal(fromJS({
                        players: {
                            'Eddie': 1,
                            'Rob': 2
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            2: {username: 'Rob', powerLevel: 'Over 9000'}
                        }
                    }));
                });
            });
        });

        describe('getPlayer', () => {
            it('retrieves an existing player that corresponds to the playerId', () => {
                const state = fromJS({
                    latestPlayerId: 3,
                    players: {
                        'Eddie': 1,
                        'Rob': 3
                    },
                    playerData: {
                        1: {username: 'Eddie'},
                        3: {username: 'Rob', hairColor: 'Black'}
                    }
                });
                const playerId = 3;
                const nextState = getPlayer(state, playerId);
                expect(nextState).to.equal(fromJS({
                    username: 'Rob',
                    hairColor: 'Black'
                }));
            });
            it('returns undefined when the playerId does not exist', () => {
                const state = fromJS({
                    latestPlayerId: 3,
                    players: {
                        'Eddie': 1,
                        'Rob': 3
                    },
                    playerData: {
                        1: {username: 'Eddie'},
                        3: {username: 'Rob', hairColor: 'Black'}
                    }
                });
                const playerId = 2;
                const nextState = getPlayer(state, playerId);
                //noinspection BadExpressionStatementJS
                expect(nextState).to.be.undefined;
            });
        });
    });
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

    describe('getWorkers', () => {/* TODO: define getWorkers spec */
    });

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

    describe('getWorker', () => {/* TODO: define getWorker spec */
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

    describe('getWorkerJob', () => {/* TODO: define getWorkerJob spec */
    });
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