/**
 * Created by Eddie on 10/18/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {getWorkers, setWorkers,
    getWorker, setWorker, updateWorker} from '../src/worker';

describe('Worker Operations', () => {
    // TODO: add removeWorker() spec
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

    describe('setWorker', () => {
        describe('creates a worker', () => {
            it('when the workerId is not specified and the player without workers exists', () => {
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
                const worker = fromJS({
                    name: 'Bob',
                    job: 'Builder'
                });
                const nextState = setWorker(initialState, playerId, worker);
                expect(nextState).to.equal(fromJS({
                    latestPlayerId: 3,
                    players: {
                        'Eddie': '1',
                        'Rob': '3'
                    },
                    playerData: {
                        1: {username: 'Eddie', hairColor: 'Black', latestWorkerId: 1},
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 2}
                    },
                    workers: {
                        1: {1: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
            it('when the workerId is not specified and the player with workers exists', () => {
                const initialState = fromJS({
                    latestPlayerId: 3,
                    players: {
                        'Eddie': '1',
                        'Rob': '3'
                    },
                    playerData: {
                        1: {username: 'Eddie', hairColor: 'Black', latestWorkerId: 3},
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 2}
                    },
                    workers: {
                        1: {3: {name: 'Bob'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const worker = fromJS({
                    name: 'Bob',
                    job: 'Builder'
                });
                const nextState = setWorker(initialState, playerId, worker);
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
                        1: {3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
        });
        describe('updates worker data', () => {
            it('if the workerId is specified as a number, the player exists, and update = true', () => {
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
                        1: {3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
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
                        1: {3: {name: 'Bob'}, 4: {name: 'Sal', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
            it('if the workerId is specified as a string, the player exists, and update = true', () => {
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
                        1: {3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
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
                        1: {3: {name: 'Bob'}, 4: {name: 'Sal', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
        });
        describe('replaces worker data', () => {
            it('if the workerId is specified as a number, the player exists, and update = false', () => {
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
                        1: {3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const worker = fromJS({
                    workerId: 4,
                    name: 'Sal'
                });
                const nextState = setWorker(initialState, playerId, worker, false);
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
                        1: {3: {name: 'Bob'}, 4: {name: 'Sal'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
            it('if the workerId is specified as a string, the player exists, and update = false', () => {
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
                        1: {3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const worker = fromJS({
                    workerId: '4',
                    name: 'Sal'
                });
                const nextState = setWorker(initialState, playerId, worker, false);
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
                        1: {3: {name: 'Bob'}, 4: {name: 'Sal'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
        });
        describe('does nothing', () => {
            it('if the player does not exist', () => {
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
                        1: {3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '2';
                const worker = fromJS({
                    workerId: '4',
                    name: 'Sal'
                });
                const nextState = setWorker(initialState, playerId, worker, false);
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
                        1: {3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
            it('if the workerId is specified, but does not exist', () => {
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
                        1: {3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const worker = fromJS({
                    workerId: '2',
                    name: 'Sal'
                });
                const nextState = setWorker(initialState, playerId, worker, false);
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
                        1: {3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
        });
    });
    describe('getWorker', () => {
        it('retrieves an existing worker if the player exists and the workerId is a number', () => {
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
            const workerId = 2;
            const nextState = getWorker(initialState, playerId, workerId);
            expect(nextState).to.equal(fromJS({name: 'Alice'}));
        });
        it('retrieves an existing worker if the player exists and the workerId is a string', () => {
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
            const workerId = '2';
            const nextState = getWorker(initialState, playerId, workerId);
            expect(nextState).to.equal(fromJS({name: 'Alice'}));
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
                    1: {3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '7';
            const workerId = '2';
            const nextState = getWorker(initialState, playerId, workerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
        it('returns undefined if the player exists, but the worker does not', () => {
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
                    1: {3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            });
            const playerId = '1';
            const worker = fromJS({
                workerId: '4',
                name: 'Sal',
                job: 'Programmer',
                likes: 'Tattoos'
            });
            const nextState = updateWorker(initialState, playerId, worker);
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
                    1: {3: {name: 'Bob'}, 4: {name: 'Sal', job: 'Programmer', likes: 'Tattoos'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
        it('merges with pre-existing fields that are not specified', () => {
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
                    1: {3: {name: 'Bob'}, 4: {name: 'Bob', job: 'Builder'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
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
                    1: {3: {name: 'Bob'}, 4: {name: 'Sal', job: 'Builder', likes: 'Tattoos'}},
                    3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                }
            }));
        });
    });
});