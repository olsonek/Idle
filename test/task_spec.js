/**
 * Created by Eddie on 10/18/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {getTask, removeTask, setTask,
    addToTasks, removeFromTasks,
    isQualifiedForTask} from '../src/task';

describe('Task Operations', () => {
    describe('addToTasks', () => {
        it('adds a worker to a task list that does not exist', () => {
            const initialState = Map();
            const playerId = '1';
            const workerId = '4';
            const task = 'Mine Ore';
            const nextState = addToTasks(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    }
                }
            }));
        });
        it('adds a worker to a task that does not exist in the task list', () => {
            const initialState = fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    }
                }
            });
            const playerId = '3';
            const workerId = '3';
            const task = 'Break Rocks';
            const nextState = addToTasks(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    },
                    'Break Rocks': {
                        3: ['3']
                    }
                }
            }));
        });
        it('adds a worker to an existing task in the task list', () => {
            const initialState = fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    },
                    'Break Rocks': {
                        3: ['3']
                    }
                }
            });
            const playerId = '1';
            const workerId = '2';
            const task = 'Break Rocks';
            const nextState = addToTasks(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    },
                    'Break Rocks': {
                        3: ['3'],
                        1: ['2']
                    }
                }
            }));
        });
    });
    describe('removeFromTasks', () => {
        it('removes a worker from a task in the task list', () => {
            const initialState = fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    },
                    'Break Rocks': {
                        3: ['3'],
                        1: ['2']
                    }
                }
            });
            const playerId = '1';
            const workerId = '2';
            const task = 'Break Rocks';
            const nextState = removeFromTasks(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    },
                    'Break Rocks': {
                        3: ['3']
                    }
                }
            }));
        });
        it('removes the last worker from a task and the task from the task list', () => {
            const initialState = fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    },
                    'Break Rocks': {
                        1: ['2']
                    }
                }
            });
            const playerId = '1';
            const workerId = '2';
            const task = 'Break Rocks';
            const nextState = removeFromTasks(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    }
                }
            }));
        });
        it('removes the task list if it does not have any tasks', () => {
            const initialState = fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    }
                }
            });
            const playerId = '1';
            const workerId = '4';
            const task = 'Mine Ore';
            const nextState = removeFromTasks(initialState, playerId, workerId, task);
            expect(nextState).to.equal(Map());
        });
        it('does nothing if the task does not exist', () => {
            const initialState = fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    },
                    'Break Rocks': {
                        3: ['3'],
                        1: ['2']
                    }
                }
            });
            const playerId = '1';
            const workerId = '2';
            const task = 'Serve Food';
            const nextState = removeFromTasks(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    },
                    'Break Rocks': {
                        3: ['3'],
                        1: ['2']
                    }
                }
            }));
        });
        it('does nothing if the worker does not exist in the task list', () => {
            const initialState = fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    },
                    'Break Rocks': {
                        3: ['3'],
                        1: ['2']
                    }
                }
            });
            const playerId = '1';
            const workerId = '3';
            const task = 'Mine Ore';
            const nextState = removeFromTasks(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    },
                    'Break Rocks': {
                        3: ['3'],
                        1: ['2']
                    }
                }
            }));
        });
        it('does nothing if the player does not exist', () => {
            const initialState = fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    },
                    'Break Rocks': {
                        3: ['3'],
                        1: ['2']
                    }
                }
            });
            const playerId = '2';
            const workerId = '4';
            const task = 'Mine Ore';
            const nextState = removeFromTasks(initialState, playerId, workerId, task);
            expect(nextState).to.equal(fromJS({
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    },
                    'Break Rocks': {
                        3: ['3'],
                        1: ['2']
                    }
                }
            }));
        })
    });
    describe('isQualifiedForTaskForTask', () => {
        // TODO: Create a Job => Task map and qualify from it
        it('returns true if the job and task are defined and not empty', () => {
            const job = 'Miner';
            const task = 'Break Rocks';
            const nextState = isQualifiedForTask(job, task);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns false if the job is undefined', () => {
            const job = undefined;
            const task = 'Break Rocks';
            const nextState = isQualifiedForTask(job, task);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the job is empty', () => {
            const job = '';
            const task = 'Break Rocks';
            const nextState = isQualifiedForTask(job, task);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the task is undefined', () => {
            const job = 'Miner';
            const task = undefined;
            const nextState = isQualifiedForTask(job, task);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the task is empty', () => {
            const job = 'Miner';
            const task = '';
            const nextState = isQualifiedForTask(job, task);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
    });
    describe('setTask', () => {
        it('assigns a task to a worker without a task if qualified', () => {
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
                        1: ['4']
                    }
                }
            }));
        });
        it('assigns a task to worker with a task if qualified', () => {
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
                        1: ['4']
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
                        1: ['4']
                    }
                }
            }));
        });
        it('does nothing if the worker has no job (not qualified)', () => {
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
                        1: ['4']
                    }
                }
            });
            const playerId = '1';
            const workerId = '3';
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Frank', job: 'Miner', task: 'Mine Ore'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                },
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    }
                }
            }));
        });
        it('does nothing if the task is undefined (not qualified)', () => {
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
                        1: ['4']
                    }
                }
            });
            const playerId = '1';
            const workerId = '4';
            const task = undefined;
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
                        1: ['4']
                    }
                }
            }));
        });
    });
    describe('getTask', () => {
        it('returns the task assigned to a worker if that worker has a task', () => {
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
                        1: ['4']
                    }
                }
            });
            const playerId = '1';
            const workerId = '4';
            const nextState = getTask(initialState, playerId, workerId);
            expect(nextState).to.equal('Mine Ore');
        });
        it('returns undefined if the worker has no task', () => {
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
                        1: ['4']
                    }
                }
            });
            const playerId = '1';
            const workerId = '3';
            const nextState = getTask(initialState, playerId, workerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
        it('returns undefined if the worker does not exist', () => {
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
                        1: ['4']
                    }
                }
            });
            const playerId = '1';
            const workerId = '2';
            const nextState = getTask(initialState, playerId, workerId);
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
                    1: {username: 'Eddie', hairColor: 'Black', latestWorkerId: 4},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 2}
                },
                workers: {
                    1: {3: {name: 'Bobby'}, 4: {name: 'Frank', job: 'Miner', task: 'Mine Ore'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                },
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    }
                }
            });
            const playerId = '2';
            const workerId = '1';
            const nextState = getTask(initialState, playerId, workerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
    });
    describe('removeTask', () => {
        it('removes a task assigned to a worker with a task', () => {
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
                    3: {1: {name: 'Tonk', job: 'Miner', task: 'Mine Ore'}, 2: {name: 'Alice'}}
                },
                tasks: {
                    'Mine Ore': {
                        1: ['4'],
                        3: ['1']
                    }
                }
            });
            const playerId = '1';
            const workerId = '4';
            const nextState = removeTask(initialState, playerId, workerId);
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Frank', job: 'Miner'}},
                    3: {1: {name: 'Tonk', job: 'Miner', task: 'Mine Ore'}, 2: {name: 'Alice'}}
                },
                tasks: {
                    'Mine Ore': {
                        3: ['1']
                    }
                }
            }));
        });
        it('removes a task assigned to the last worker doing a particular task', () => {
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
                    1: {3: {name: 'Bobby', job: 'Street Vendor', task: 'Sell Food'}, 4: {name: 'Frank', job: 'Miner', task: 'Mine Ore'}},
                    3: {1: {name: 'Tonk', job: 'Miner', task: 'Mine Ore'}, 2: {name: 'Alice'}}
                },
                tasks: {
                    'Mine Ore': {
                        1: ['4'],
                        3: ['1']
                    },
                    'Sell Food': {
                        1: ['3']
                    }
                }
            });
            const playerId = '1';
            const workerId = '3';
            const nextState = removeTask(initialState, playerId, workerId);
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
                    1: {3: {name: 'Bobby', job: 'Street Vendor'}, 4: {name: 'Frank', job: 'Miner', task: 'Mine Ore'}},
                    3: {1: {name: 'Tonk', job: 'Miner', task: 'Mine Ore'}, 2: {name: 'Alice'}}
                },
                tasks: {
                    'Mine Ore': {
                        1: ['4'],
                        3: ['1']
                    }
                }
            }));
        });
        it('removes a task assigned to the only worker with a task', () => {
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
                        1: ['4']
                    }
                }
            });
            const playerId = '1';
            const workerId = '4';
            const nextState = removeTask(initialState, playerId, workerId);
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Frank', job: 'Miner'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('does nothing if the worker does not have a task', () => {
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
                        1: ['4']
                    }
                }
            });
            const playerId = '1';
            const workerId = '3';
            const nextState = removeTask(initialState, playerId, workerId);
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
                        1: ['4']
                    }
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Frank', job: 'Miner', task: 'Mine Ore'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                },
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    }
                }
            });
            const playerId = '1';
            const workerId = '2';
            const nextState = removeTask(initialState, playerId, workerId);
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
                        1: ['4']
                    }
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
                    1: {3: {name: 'Bobby'}, 4: {name: 'Frank', job: 'Miner', task: 'Mine Ore'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                },
                tasks: {
                    'Mine Ore': {
                        1: ['4']
                    }
                }
            });
            const playerId = '2';
            const workerId = '2';
            const nextState = removeTask(initialState, playerId, workerId);
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
                        1: ['4']
                    }
                }
            }));
        });
    });
});