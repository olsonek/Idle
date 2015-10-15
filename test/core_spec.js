/**
 * Created by Eddie on 10/14/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {addPlayer, addWorker, setWorkers} from '../src/core'

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
    // TODO: Update test names to include attaching playerId
    describe('setWorkers', () => {
        it('assigns a set of workers to a player without workers', () => {
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

        it('assigns a set of workers to a player with workers', () => {
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
    // TODO: Update test names to include attaching playerId
    describe('addWorker', () => {
        it('adds a worker with the smallest unique id >zero to a player without workers', () => {
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

        it('adds a worker with the smallest unique id >zero to a player with workers', () => {
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
});