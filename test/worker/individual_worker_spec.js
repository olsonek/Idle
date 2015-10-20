/**
 * Created by Eddie on 10/19/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {getWorker, setWorker, updateWorker, removeWorker} from '../../src/worker';

describe('Individual Worker Operations', () => {


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
    describe('removeWorker', () => {
        it('removes a worker that belongs to a player', () => {
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
            const playerId = '1';
            const workerId = '4';
            const nextState = removeWorker(initialState, playerId, workerId);
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
                    1: {3: {name: 'Bob'}}
                }
            }));
        });
        it('if the last worker a player has is removed, remove the worker list for that player', () => {
            const initialState = fromJS({
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
                    3: {6: {name: 'James'}}
                }
            });
            const playerId = '3';
            const workerId = '6';
            const nextState = removeWorker(initialState, playerId, workerId);
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
                    1: {3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            }));
        });
        it('if the last worker is removed, remove the entire worker state', () => {
            const initialState = fromJS({
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
                    3: {6: {name: 'James'}}
                }
            });
            const playerId = '3';
            const workerId = '6';
            const nextState = removeWorker(initialState, playerId, workerId);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie', hairColor: 'Black', latestWorkerId: 4},
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 7}
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
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 7}
                },
                workers: {
                    1: {3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {6: {name: 'James'}}
                }
            });
            const playerId = '3';
            const workerId = '7';
            const nextState = removeWorker(initialState, playerId, workerId);
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
                    3: {6: {name: 'James'}}
                }
            }));
        });
        it('does nothing if the player does not have any workers', () => {
            const initialState = fromJS({
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
                    1: {3: {name: 'Bob'}, 4: {name: 'Dora'}}
                }
            });
            const playerId = '3';
            const workerId = '1';
            const nextState = removeWorker(initialState, playerId, workerId);
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
                    1: {3: {name: 'Bob'}, 4: {name: 'Dora'}}
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
                    3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000', latestWorkerId: 7}
                },
                workers: {
                    1: {3: {name: 'Bob'}, 4: {name: 'Dora'}},
                    3: {6: {name: 'James'}}
                }
            });
            const playerId = '2';
            const workerId = '1';
            const nextState = removeWorker(initialState, playerId, workerId);
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
                    3: {6: {name: 'James'}}
                }
            }));
        });
        it('removes the task assigned to a worker before removing the worker', () => {

        });
    });
});