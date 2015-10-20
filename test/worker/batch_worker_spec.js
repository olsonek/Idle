/**
 * Created by Eddie on 10/19/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {getWorkers, setWorkers} from '../../src/worker';

describe('Batch Worker Operations', () => {
    // TODO: Write tests for validating latestWorkerId
    describe('setWorkers', () => {
        it('associates a set of workers with a player without workers', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie', hairColor: 'Black'},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                }
            });
            const playerId = '1';
            const workers = fromJS({
                3: {name: 'Bob'},
                4: {name: 'Dora'}
            });
            const nextState = setWorkers(initialState, playerId, workers);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie', hairColor: 'Black', latestWorkerId: 4},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                },
                workers: {
                    1: {3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            }));
        });
        it('associates a set of workers with a player with workers', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie', hairColor: 'Black', latestWorkerId: 4},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 3}
                },
                workers: {
                    1: {3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {3: {name: 'Jimmy'}, 1: {name: 'Phillip'}}
                }
            });
            const playerId = '3';
            const workers = fromJS({
                1: {name: 'Tonk'},
                7: {name: 'Alice'}
            });
            const nextState = setWorkers(initialState, playerId, workers);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie', hairColor: 'Black', latestWorkerId: 4},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 7}
                },
                workers: {
                    1: {3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {1: {name: 'Tonk'}, 7: {name: 'Alice'}}
                }
            }));
        });
        it('does nothing if the player does not exist', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie', hairColor: 'Black', latestWorkerId: 4},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                },
                workers: {
                    1: {3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            });
            const playerId = '2';
            const workers = fromJS({
                1: {name: 'Tonk'},
                2: {name: 'Alice'}
            });
            const nextState = setWorkers(initialState, playerId, workers);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie', hairColor: 'Black', latestWorkerId: 4},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                },
                workers: {
                    1: {3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            }));
        });
    });
    describe('getWorkers', () => {
        it('retrieves a set of workers from an existing player with workers', () => {
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
                    1: {3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '3';
            const nextState = getWorkers(initialState, playerId);
            expect(nextState).to.equal(fromJS({
                1: {name: 'Tonk'},
                2: {name: 'Alice'}
            }));
        });
        it('returns undefined if an existing player does not have workers', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie', hairColor: 'Black'},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 2}
                },
                workers: {
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const nextState = getWorkers(initialState, playerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
        it('returns undefined if the player does not exist', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie', hairColor: 'Black'},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 2}
                },
                workers: {
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '5';
            const nextState = getWorkers(initialState, playerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
    });
});