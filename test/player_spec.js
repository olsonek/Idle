/**
 * Created by Eddie on 10/18/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {getPlayer, setPlayer, updatePlayer} from '../src/internal/player';

describe('Player Operations', () => {
    // TODO: Write tests to validate latestPlayerId
    // TODO: Add method playerExists(state, playerId): boolean and adjust core methods to use it
    describe('setPlayer', () => {
        describe('adds a player with a unique playerId and sets latestPlayerId', () => {
            it('when no playerId is provided, the username is unique, and there is no player list', () => {
                const initialState = Map();
                const player = Map({
                    username: 'Eddie'
                });
                const nextState = setPlayer(initialState, player);
                expect(nextState).to.equal(fromJS({
                    players: {
                        latestPlayerId: 1,
                        'Eddie': '1'
                    },
                    playerData: {
                        1: {username: 'Eddie'}
                    }
                }));
            });
            it('when no playerId is provided, the username is unique, and there is a player list', () => {
                const initialState = fromJS({
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 4,
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
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 4,
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
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 4,
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
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 3,
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
                    players: {
                        latestPlayerId: 3,
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
                        latestPlayerId: 2,
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
                        latestPlayerId: 2,
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
                        latestPlayerId: 2,
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
                        latestPlayerId: 2,
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
                players: {
                    latestPlayerId: 3,
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
                players: {
                    latestPlayerId: 3,
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
                players: {
                    latestPlayerId: 3,
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
                players: {
                    latestPlayerId: 3,
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
                players: {
                    latestPlayerId: 3,
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
                players: {
                    latestPlayerId: 3,
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