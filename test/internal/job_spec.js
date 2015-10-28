/**
 * Created by Eddie on 10/18/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {getJob, setJob, removeJob, isQualifiedForJob} from '../../src/internal/job';

describe('Job Operations', () => {
    describe('setJob', () => {
        it('assigns a job to an unemployed worker associated with the playerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '4';
            const job = 'Builder';
            const nextState = setJob(initialState, playerId, workerId, job);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('replaces the job of a worker associated with the playerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Bodybuilder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '4';
            const job = 'Builder';
            const nextState = setJob(initialState, playerId, workerId, job);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('removes the job of a worker associated with the playerId if the job is undefined', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '4';
            const job = undefined;
            const nextState = setJob(initialState, playerId, workerId, job);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('does nothing if the workerId is not associated with the playerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '5';
            const job = 'Miner';
            const nextState = setJob(initialState, playerId, workerId, job);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('does nothing if the workerId is undefined', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = undefined;
            const job = 'Miner';
            const nextState = setJob(initialState, playerId, workerId, job);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
    });
    describe('getJob', () => {
        it('retrieves the job of an employed worker associated with the playerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '4';
            const nextState = getJob(initialState, playerId, workerId);
            expect(nextState).to.equal('Builder');
        });
        it('returns undefined if the worker associated with the playerId is unemployed', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '3';
            const nextState = getJob(initialState, playerId, workerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
        it('return undefined if the workerId is not associated with the playerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '8';
            const nextState = getJob(initialState, playerId, workerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
        it('return undefined if the playerId does not have any associated workers', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '2';
            const workerId = '3';
            const nextState = getJob(initialState, playerId, workerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
    });
    describe('removeJob', () => {
        it('removes the job of an employed worker associated with the playerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '4';
            const nextState = removeJob(initialState, playerId, workerId);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('does nothing to an unemployed worker associated with the playerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '3';
            const workerId = '2';
            const nextState = removeJob(initialState, playerId, workerId);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('does nothing if the worker is not associated with the playerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '1';
            const nextState = removeJob(initialState, playerId, workerId);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('does nothing if playerId is not associated with any workers', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '5';
            const workerId = '1';
            const nextState = removeJob(initialState, playerId, workerId);
            expect(nextState).to.equal(fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
    });
    describe('isQualifiedForJob', () => {
        it('returns true if the worker is associated with the playerId and the job is defined', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '3';
            const job = 'Miner';
            const nextState = isQualifiedForJob(initialState, playerId, workerId, job);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns false if the worker is associated with the playerId, but the job is undefined', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '3';
            const job = undefined;
            const nextState = isQualifiedForJob(initialState, playerId, workerId, job);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the worker is not associated with the playerId', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '2';
            const job = 'Miner';
            const nextState = isQualifiedForJob(initialState, playerId, workerId, job);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the workerId is undefined', () => {
            const initialState = fromJS({
                workers: {
                    1: {latestWorkerId: 4, 3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {latestWorkerId: 2, 1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = undefined;
            const job = 'Miner';
            const nextState = isQualifiedForJob(initialState, playerId, workerId, job);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
    });
});