/**
 * Created by Eddie on 10/19/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {getWorkers, removeWorkers, setWorkers} from '../../src/worker';

describe('Batch Worker Operations', () => {
    // TODO: Write tests for validating latestWorkerId
    describe('setWorkers', () => {
        it('associates a set of workers with a playerId without associated workers', () => {
            const initialState = Map();
            const playerId = '1';
            const workers = fromJS({
                3: {name: 'Bob'},
                4: {name: 'Dora'}
            });
            const nextState = setWorkers(initialState, playerId, workers);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            }));
        });
        it('associates a set of workers with a playerId that has associated workers', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {latestWorkerId: 3, 3: {name: 'Jimmy'}, 1: {name: 'Phillip'}}
                }
            });
            const playerId = '3';
            const workers = fromJS({
                1: {name: 'Tonk'},
                7: {name: 'Alice'}
            });
            const nextState = setWorkers(initialState, playerId, workers);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {latestWorkerId: 7, 1: {name: 'Tonk'}, 7: {name: 'Alice'}}
                }
            }));
        });
        it('removes all workers associated with a playerId if the specified set of workers is undefined', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {latestWorkerId: 3, 3: {name: 'Jimmy'}, 1: {name: 'Phillip'}}
                }
            });
            const playerId = '3';
            const workers = undefined;
            const nextState = setWorkers(initialState, playerId, workers);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            }));
        });
        it('removes all workers associated with a playerId if the specified set of workers is empty', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {latestWorkerId: 3, 3: {name: 'Jimmy'}, 1: {name: 'Phillip'}}
                }
            });
            const playerId = '3';
            const workers = Map();
            const nextState = setWorkers(initialState, playerId, workers);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            }));
        });
    });
    describe('getWorkers', () => {
        it('retrieves a set of workers from a playerId with associated workers', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '3';
            const nextState = getWorkers(initialState, playerId);
            expect(nextState).to.equal(fromJS({
                1: {name: 'Tonk'},
                2: {name: 'Alice'}
            }));
        });
        it('returns undefined if the playerId is not associated with workers', () => {
            const initialState = fromJS({
                workers: {
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '5';
            const nextState = getWorkers(initialState, playerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
    });
    describe('removeWorkers', () => {
        it('removes all workers and the worker list associated with a playerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {latestWorkerId: 3, 3: {name: 'Jimmy'}, 1: {name: 'Phillip'}}
                }
            });
            const playerId = '1';
            const nextState = removeWorkers(initialState, playerId);
            expect(nextState).to.equal(fromJS({
                workers: {
                    3: {latestWorkerId: 3, 3: {name: 'Jimmy'}, 1: {name: 'Phillip'}}
                }
            }));
        });
        it('if the last playerId associated with workers is removed, remove the entire worker state', () => {
            const initialState = fromJS({
                workers: {
                    3: {latestWorkerId: 6, 6: {name: 'James'}}
                }
            });
            const playerId = '3';
            const nextState = removeWorkers(initialState, playerId);
            expect(nextState).to.equal(Map());
        });
        it('does nothing if the specified playerId is not associated with any workers', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            });
            const playerId = '3';
            const nextState = removeWorkers(initialState, playerId);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            }));
        });
    });
});