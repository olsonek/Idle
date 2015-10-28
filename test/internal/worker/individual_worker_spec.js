/**
 * Created by Eddie on 10/19/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {getWorker, setWorker, updateWorker, removeWorker} from '../../../src/internal/worker';

describe('Individual Worker Operations', () => {
    describe('setWorker', () => {
        describe('creates a worker', () => {
            // TODO: Add spec to require worker name to be specified to create a worker
            it('when the workerId is not specified', () => {
                const initialState = fromJS({
                    workers: {
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const worker = fromJS({
                    name: 'Bob',
                    job: 'Builder'
                });
                const nextState = setWorker(initialState, playerId, worker);
                expect(nextState).to.equal(fromJS({
                    workers: {
                        1: {latestWorkerId: 1, 1: {name: 'Bob', job: 'Builder'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
            it('when the workerId is not specified and there are workers associated with the playerId', () => {
                const initialState = fromJS({
                    workers: {
                        1: {latestWorkerId: 3, 3: {name: 'Bob'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const worker = fromJS({
                    name: 'Bob',
                    job: 'Builder'
                });
                const nextState = setWorker(initialState, playerId, worker);
                expect(nextState).to.equal(fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
        });
        describe('updates worker data', () => {
            it('if the workerId is specified as a number, the worker exists, and update = true', () => {
                const initialState = fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const worker = fromJS({
                    workerId: 4,
                    name: 'Sal',
                    job: 'Builder'
                });
                const nextState = setWorker(initialState, playerId, worker, true);
                expect(nextState).to.equal(fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Sal', job: 'Builder'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
            it('if the workerId is specified as a string, the worker exists, and update = true', () => {
                const initialState = fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const worker = fromJS({
                    workerId: '4',
                    name: 'Sal',
                    job: 'Builder'
                });
                const nextState = setWorker(initialState, playerId, worker, true);
                expect(nextState).to.equal(fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Sal', job: 'Builder'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
        });
        describe('replaces worker data', () => {
            it('if the workerId is specified as a number, the worker exists, and update = false', () => {
                const initialState = fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const worker = fromJS({
                    workerId: 4,
                    name: 'Sal'
                });
                const nextState = setWorker(initialState, playerId, worker, false);
                expect(nextState).to.equal(fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Sal'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
            it('if the workerId is specified as a string, the worker exists, and update = false', () => {
                const initialState = fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const worker = fromJS({
                    workerId: '4',
                    name: 'Sal'
                });
                const nextState = setWorker(initialState, playerId, worker, false);
                expect(nextState).to.equal(fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Sal'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
        });
        describe('removes the worker', () => {
            it('if the workerId is specified, the worker has no other information, and update = false', () => {
                const initialState = fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const worker = fromJS({
                    workerId: '4'
                });
                const nextState = setWorker(initialState, playerId, worker, false);
                expect(nextState).to.equal(fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
        });
        describe('does nothing', () => {
            it('if the workerId is specified, but the playerId does not have associated workers', () => {
                const initialState = fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '2';
                const worker = fromJS({
                    workerId: '4',
                    name: 'Sal'
                });
                const nextState = setWorker(initialState, playerId, worker, false);
                expect(nextState).to.equal(fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
            it('if the workerId is specified, but the playerId is not associated with that workerId', () => {
                const initialState = fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const worker = fromJS({
                    workerId: '2',
                    name: 'Sal'
                });
                const nextState = setWorker(initialState, playerId, worker, false);
                expect(nextState).to.equal(fromJS({
                    workers: {
                        1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
        });
    });
    describe('getWorker', () => {
        it('retrieves an existing worker if the playerId has the associated workerId and the workerId is a number', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '3';
            const workerId = 2;
            const nextState = getWorker(initialState, playerId, workerId);
            expect(nextState).to.equal(fromJS({name: 'Alice'}));
        });
        it('retrieves an existing worker if the playerId has the associated workerId and the workerId is a string', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '3';
            const workerId = '2';
            const nextState = getWorker(initialState, playerId, workerId);
            expect(nextState).to.equal(fromJS({name: 'Alice'}));
        });
        it('returns undefined if the playerId is not associated with any workers', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '7';
            const workerId = '2';
            const nextState = getWorker(initialState, playerId, workerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
        it('returns undefined if the playerId is not associated with the specified workerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '6';
            const nextState = getWorker(initialState, playerId, workerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
    });
    describe('updateWorker (alias for setWorker(*, *, *, true))', () => {
        it('replaces overlapping specified fields and adds new data', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Billy'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const worker = fromJS({
                workerId: '4',
                name: 'Sal',
                job: 'Programmer'
            });
            const nextState = updateWorker(initialState, playerId, worker);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Sal', job: 'Programmer'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('merges with pre-existing fields that are not specified', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const worker = fromJS({
                workerId: '4',
                name: 'Sal',
                likes: 'Tattoos'
            });
            const nextState = updateWorker(initialState, playerId, worker);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Sal', job: 'Builder', likes: 'Tattoos'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
    });
    describe('removeWorker', () => {
        it('removes a worker associated with a playerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            });
            const playerId = '1';
            const workerId = '4';
            const nextState = removeWorker(initialState, playerId, workerId);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}}
                }
            }));
        });
        it('if the last worker associated with the specified playerId is removed, remove the worker list for that playerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {latestWorkerId: 6, 6: {name: 'James'}}
                }
            });
            const playerId = '3';
            const workerId = '6';
            const nextState = removeWorker(initialState, playerId, workerId);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            }));
        });
        it('if the last worker associated with any playerId is removed, remove the entire worker state', () => {
            const initialState = fromJS({
                workers: {
                    3: {latestWorkerId: 6, 6: {name: 'James'}}
                }
            });
            const playerId = '3';
            const workerId = '6';
            const nextState = removeWorker(initialState, playerId, workerId);
            expect(nextState).to.equal(Map());
        });
        it('does nothing if the worker is not associated with the specified playerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {latestWorkerId: 6, 6: {name: 'James'}}
                }
            });
            const playerId = '3';
            const workerId = '7';
            const nextState = removeWorker(initialState, playerId, workerId);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {latestWorkerId: 6, 6: {name: 'James'}}
                }
            }));
        });
        it('does nothing if the specified playerId is not associated with any workers', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            });
            const playerId = '3';
            const workerId = '1';
            const nextState = removeWorker(initialState, playerId, workerId);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            }));
        });
    });
});