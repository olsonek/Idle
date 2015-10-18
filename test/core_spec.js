/**
 * Created by Eddie on 10/14/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {getPlayer, setPlayer, updatePlayer,
    getWorkers, setWorkers,
    getWorker, setWorker, updateWorker,
    getWorkerJob, setWorkerJob, removeWorkerJob} from '../src/core'

describe('application logic', () => {
    describe('Player Operations', () => {
        describe('setPlayer', () => {
            describe('adds a player with a unique playerId and sets latestPlayerId', () => {
                it('when no playerId is provided, the username is unique, and there is no player list', () => {
                    const initialState = Map();
                    const player = Map({
                        username: 'Eddie'
                    });
                    const nextState = setPlayer(initialState, player);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 1,
                        players: {
                            'Eddie': '1'
                        },
                        playerData: {
                            1: {username: 'Eddie'}
                        }
                    }));
                });
                it('when no playerId is provided, the username is unique, and there is a player list', () => {
                    const initialState = fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            3: {username: 'Rob'}
                        }
                    });
                    const player = Map({
                        username: 'Logan'
                    });
                    const nextState = setPlayer(initialState, player);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 4,
                        players: {
                            'Eddie': '1',
                            'Rob': '3',
                            'Logan': '4'
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            3: {username: 'Rob'},
                            4: {username: 'Logan'}
                        }
                    }));
                });
                it('when no playerId is provided, the username is unique, and there is additional player data', () => {
                    const initialState = fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
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
                    const nextState = setPlayer(initialState, player);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 4,
                        players: {
                            'Eddie': '1',
                            'Rob': '3',
                            'Logan': '4'
                        },
                        playerData: {
                            1: {username: 'Eddie', hairColor: 'Black'},
                            3: {username: 'Rob'},

                            4: {username: 'Logan', hairColor: 'Brown'}
                        }
                    }));
                });
                it('when no playerId is provided, the username is unique, and the update bool is set to true', () => {
                    const initialState = fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
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
                    const nextState = setPlayer(initialState, player, true);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 4,
                        players: {
                            'Eddie': '1',
                            'Rob': '3',
                            'Logan': '4'
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
                it('when the playerId is specified (and exists) without a provided username and update is true', () => {
                    const initialState = fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
                        },
                        playerData: {
                            1: {username: 'Eddie', hairColor: 'Black'},
                            3: {username: 'Rob', hairColor: 'Brown', much: 'Wow'}
                        }
                    });
                    const player = Map({
                        playerId: '3',
                        hairColor: 'Black',
                        powerLevel: 'Over 9000'
                    });
                    const nextState = setPlayer(initialState, player, true);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
                        },
                        playerData: {
                            1: {username: 'Eddie', hairColor: 'Black'},
                            3: {username: 'Rob', hairColor: 'Black', much: 'Wow', powerLevel: 'Over 9000'}
                        }
                    }));
                });
                it('when the playerId is specified (and exists) with any provided username and update is true', () => {
                    const initialState = fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            3: {username: 'Rob', much: 'Wow'}
                        }
                    });
                    const player = Map({
                        playerId: '3',
                        username: 'Bobby',
                        hairColor: 'Black'
                    });
                    const nextState = setPlayer(initialState, player, true);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            3: {username: 'Rob', much: 'Wow', hairColor: 'Black'}
                        }
                    }));
                });
                it('when the playerId is specified as a number (and exists) and update is true', () => {
                    const initialState = fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
                        },
                        playerData: {
                            1: {username: 'Eddie', hairColor: 'Black'},
                            3: {username: 'Rob', much: 'Wow', hairColor: 'Brown'}
                        }
                    });
                    const player = Map({
                        playerId: 3,
                        hairColor: 'Black',
                        powerLevel: 'Over 9000'
                    });
                    const nextState = setPlayer(initialState, player, true);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
                        },
                        playerData: {
                            1: {username: 'Eddie', hairColor: 'Black'},
                            3: {username: 'Rob', much: 'Wow', hairColor: 'Black', powerLevel: 'Over 9000'}
                        }
                    }));
                });
            });
            describe('replaces player data other than the username', () => {
                it('when the playerId is specified (and exists) without a provided username and update is false', () => {
                    const initialState = fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
                        },
                        playerData: {
                            1: {username: 'Eddie', hairColor: 'Black'},
                            3: {username: 'Rob', hairColor: 'Brown', much: 'Wow'}
                        }
                    });
                    const player = Map({
                        playerId: '3',
                        hairColor: 'Black',
                        powerLevel: 'Over 9000'
                    });
                    const nextState = setPlayer(initialState, player, false);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
                        },
                        playerData: {
                            1: {username: 'Eddie', hairColor: 'Black'},
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                        }
                    }));
                });
                it('when the playerId is specified (and exists) with any provided username and update is false', () => {
                    const initialState = fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            3: {username: 'Rob', much: 'Wow'}
                        }
                    });
                    const player = Map({
                        playerId: '3',
                        username: 'Bobby',
                        hairColor: 'Black'
                    });
                    const nextState = setPlayer(initialState, player, false);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            3: {username: 'Rob', hairColor: 'Black'}
                        }
                    }));
                });
                it('when the playerId is specified (and exists) as a number instead of a string and update is false', () => {
                    const initialState = fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
                        },
                        playerData: {
                            1: {username: 'Eddie', hairColor: 'Black'},
                            3: {username: 'Rob', hairColor: 'Brown', much: 'Wow'}
                        }
                    });
                    const player = Map({
                        playerId: 3,
                        hairColor: 'Black',
                        powerLevel: 'Over 9000'
                    });
                    const nextState = setPlayer(initialState, player, false);
                    expect(nextState).to.equal(fromJS({
                        latestPlayerId: 3,
                        players: {
                            'Eddie': '1',
                            'Rob': '3'
                        },
                        playerData: {
                            1: {username: 'Eddie', hairColor: 'Black'},
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                        }
                    }));
                });
            });
            describe('does nothing', () => {
                it('if the playerId is specified, but does not exist', () => {
                    const initialState = fromJS({
                        players: {
                            'Eddie': '1',
                            'Rob': '2'
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
                    const nextState = setPlayer(initialState, player);
                    expect(nextState).to.equal(fromJS({
                        players: {
                            'Eddie': '1',
                            'Rob': '2'
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            2: {username: 'Rob', powerLevel: 'Over 9000'}
                        }
                    }));
                });
                it('if the playerId is not specified and the username exists', () => {
                    const initialState = fromJS({
                        players: {
                            'Eddie': '1',
                            'Rob': '2'
                        },
                        playerData: {
                            1: {username: 'Eddie'},
                            2: {username: 'Rob', powerLevel: 'Over 9000'}
                        }
                    });
                    const player = Map({
                        username: 'Eddie'
                    });
                    const nextState = setPlayer(initialState, player);
                    expect(nextState).to.equal(fromJS({
                        players: {
                            'Eddie': '1',
                            'Rob': '2'
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
                const initialState = fromJS({
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
                const nextState = getPlayer(initialState, playerId);
                expect(nextState).to.equal(fromJS({
                    username: 'Rob',
                    hairColor: 'Black'
                }));
            });
            it('returns undefined when the playerId does not exist', () => {
                const initialState = fromJS({
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
                const nextState = getPlayer(initialState, playerId);
                //noinspection BadExpressionStatementJS
                expect(nextState).to.be.undefined;
            });
        });
        describe('updatePlayer (alias for setPlayer(*, *, true))', () => {
            it('replaces overlapping specified fields and adds new data', () => {
                const initialState = fromJS({
                    latestPlayerId: 3,
                    players: {
                        'Eddie': '1',
                        'Rob': '3'
                    },
                    playerData: {
                        1: {username: 'Eddie', hairColor: 'Black'},
                        3: {username: 'Rob', hairColor: 'Brown'}
                    }
                });
                const player = Map({
                    playerId: '3',
                    hairColor: 'Black',
                    powerLevel: 'Over 9000'
                });
                const nextState = updatePlayer(initialState, player);
                expect(nextState).to.equal(fromJS({
                    latestPlayerId: 3,
                    players: {
                        'Eddie': '1',
                        'Rob': '3'
                    },
                    playerData: {
                        1: {username: 'Eddie', hairColor: 'Black'},
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                        1: {username: 'Eddie', hairColor: 'Black'},
                        3: {username: 'Rob', hairColor: 'Brown', much: 'Wow'}
                    }
                });
                const player = Map({
                    playerId: '3',
                    hairColor: 'Black',
                    powerLevel: 'Over 9000'
                });
                const nextState = updatePlayer(initialState, player);
                expect(nextState).to.equal(fromJS({
                    latestPlayerId: 3,
                    players: {
                        'Eddie': '1',
                        'Rob': '3'
                    },
                    playerData: {
                        1: {username: 'Eddie', hairColor: 'Black'},
                        3: {username: 'Rob', hairColor: 'Black', much: 'Wow', powerLevel: 'Over 9000'}
                    }
                }));
            });
        });
    });
    describe('Worker Operations', () => {
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                            3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                    },
                    workers: {
                        1: {3: {name: 'Bob'}, 4: {name: 'Sal', job: 'Builder', likes: 'Tattoos'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
        });
    });
    describe('Job Operations', () => {
        describe('setWorkerJob', () => {
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                    },
                    workers: {
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const workerId = '4';
                const job = 'Builder';
                const nextState = setWorkerJob(initialState, playerId, workerId, job);
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                    },
                    workers: {
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Bodybuilder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const workerId = '4';
                const job = 'Builder';
                const nextState = setWorkerJob(initialState, playerId, workerId, job);
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                    },
                    workers: {
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const workerId = '3';
                const job = undefined;
                const nextState = setWorkerJob(initialState, playerId, workerId, job);
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                    },
                    workers: {
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const workerId = '3';
                const job = '';
                const nextState = setWorkerJob(initialState, playerId, workerId, job);
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                    },
                    workers: {
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const workerId = '5';
                const job = 'Miner';
                const nextState = setWorkerJob(initialState, playerId, workerId, job);
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                    },
                    workers: {
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '4';
                const workerId = '4';
                const job = 'Miner';
                const nextState = setWorkerJob(initialState, playerId, workerId, job);
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
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
        });
        describe('getWorkerJob', () => {
            it('retrieves worker data if both the worker and player exist', () => {
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
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const workerId = '4';
                const nextState = getWorkerJob(initialState, playerId, workerId);
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                    },
                    workers: {
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '2';
                const workerId = '4';
                const nextState = getWorkerJob(initialState, playerId, workerId);
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                    },
                    workers: {
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const workerId = '8';
                const nextState = getWorkerJob(initialState, playerId, workerId);
                //noinspection BadExpressionStatementJS
                expect(nextState).to.be.undefined;
            });
        });
        describe('removeWorkerJob', () => {
            it('removes the job of a worker if both the worker and player exist', () => {
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
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const workerId = '4';
                const nextState = removeWorkerJob(initialState, playerId, workerId);
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                    },
                    workers: {
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '3';
                const workerId = '2';
                const nextState = removeWorkerJob(initialState, playerId, workerId);
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                    },
                    workers: {
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '5';
                const workerId = '1';
                const nextState = removeWorkerJob(initialState, playerId, workerId);
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
                        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
                    },
                    workers: {
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                });
                const playerId = '1';
                const workerId = '1';
                const nextState = removeWorkerJob(initialState, playerId, workerId);
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
                        1: {3: {name: 'Bobby'}, 4: {name: 'Bob', job: 'Builder'}},
                        3: {1: {name: 'Tonk'}, 2: {name: 'Alice'}}
                    }
                }));
            });
        });
    });
    describe('Task Operations', () => {
        // TODO: Add logic to validate tasks based on job
        describe('setWorkerTask', () => {
        });
        describe('getWorkerTask', () => {
        });
        describe('removeWorkerTask', () => {
        });

        describe('addWorkerToTasks', () => {
        });
        describe('removeWorkerFromTasks', () => {
        });
    });
    describe('Resource Operations', () => {
        describe('setResources', () => {
        });
        describe('getResources', () => {
        });
        describe('updateResources', () => {
        });

        describe('addResource', () => {
        });
        describe('setResource', () => {
        });
        describe('getResource', () => {
        });
        describe('removeResource', () => {
        });
    });
    describe('Event Operations', () => {
        describe('triggerTask', () => {
        });
    });
});