/**
 * Created by Eddie on 10/18/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {getJob, setJob, removeJob} from '../src/job';

describe('Job Operations', () => {
    describe('setJob', () => {
        // TODO: Create logic for validating jobs (including worker qualification for advanced jobs)
        it('assigns a job to a jobless worker that belongs to the player', () => {
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '4';
            const job = 'Builder';
            const nextState = setJob(initialState, playerId, workerId, job);
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('replaces the job of an employed worker that belongs to the player', () => {
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Bodybuilder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '4';
            const job = 'Builder';
            const nextState = setJob(initialState, playerId, workerId, job);
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('does nothing if the job is undefined', () => {
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '3';
            const job = undefined;
            const nextState = setJob(initialState, playerId, workerId, job);
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('does nothing if the job is an empty string', () => {
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '3';
            const job = '';
            const nextState = setJob(initialState, playerId, workerId, job);
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('does nothing if the worker does not exist', () => {
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '5';
            const job = 'Miner';
            const nextState = setJob(initialState, playerId, workerId, job);
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
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
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 2}
                },
                workers: {
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '4';
            const workerId = '4';
            const job = 'Miner';
            const nextState = setJob(initialState, playerId, workerId, job);
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
    });
    describe('getJob', () => {
        it('retrieves worker data if both the worker and player exist', () => {
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '4';
            const nextState = getJob(initialState, playerId, workerId);
            expect(nextState).to.equal('Builder');
        });
        it('returns undefined if the player does not exist', () => {
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '2';
            const workerId = '4';
            const nextState = getJob(initialState, playerId, workerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
        it('return undefined if the worker does not exist', () => {
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '8';
            const nextState = getJob(initialState, playerId, workerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
    });
    describe('removeJob', () => {
        it('removes the job of a worker if both the worker and player exist', () => {
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '4';
            const nextState = removeJob(initialState, playerId, workerId);
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('does nothing if the worker and player exist, but the worker has no job', () => {
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '3';
            const workerId = '2';
            const nextState = removeJob(initialState, playerId, workerId);
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
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
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 2}
                },
                workers: {
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '5';
            const workerId = '1';
            const nextState = removeJob(initialState, playerId, workerId);
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('does nothing if the worker does not exist', () => {
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const workerId = '1';
            const nextState = removeJob(initialState, playerId, workerId);
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
    });
});