/**
 * Created by Eddie on 10/19/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {addResources, getResources, hasResources, removeResources, setResources} from '../../src/internal/resource';

describe('Batch Resource Operations', () => {
    // TODO: Add a map between a resource type and its unit of measurement
    // TODO: Add more thorough validation of parameters (more undefined or empty string checks)
    // TODO: add validation checks for non-number amounts
    describe('addResources', () => {
        it('adds resources to a player when no player has any resources', () => {
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
            const playerId = '1';
            const resources = {
                gold: 20,
                ore: 15
            };
            const nextState = addResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15}
                }
            }));
        });
        it('adds resources to a player without resources', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15}
                }
            });
            const playerId = '3';
            const resources = {
                gold: 6,
                ore: 7
            };
            const nextState = addResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {gold: 6, ore: 7}
                }
            }));
        });
        it('adds resources to a player with resources', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 5,
                ore: 100,
                coal: 7
            };
            const nextState = addResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 25, ore: 115, coal: 7},
                    3: {money: 3.50, 'iron bars': 10}
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
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '2';
            const resources = {
                gold: 5,
                ore: 100,
                coal: 7
            };
            const nextState = addResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
    });
    describe('removeResources', () => {
        it('removes resources from a player with resources', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 5,
                ore: 1
            };
            const nextState = removeResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 15, ore: 14},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes only as many resources as a player has', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 25,
                ore: 6
            };
            const nextState = removeResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {ore: 9},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes the resource list of a player if that player no longer has any resources', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 100,
                ore: 100
            };
            const nextState = removeResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes the resources list if no players have any resources', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 100,
                ore: 100
            };
            const nextState = removeResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                }
            }));
        });
        it('does nothing with resources specified with a negative amount', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: -5,
                ore: 1
            };
            const nextState = removeResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 14},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('does nothing if the player has no resources', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 100,
                ore: 100
            };
            const nextState = removeResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
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
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '2';
            const resources = {
                gold: 100,
                ore: 100
            };
            const nextState = removeResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
    });
    describe('setResources', () => {
        it('sets the resources of a player when no player has any resources', () => {
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
            const playerId = '1';
            const resources = {
                gold: 100,
                ore: 100
            };
            const nextState = setResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 100, ore: 100}
                }
            }));
        });
        it('sets the resources of a player without resources', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 100,
                ore: 100
            };
            const nextState = setResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 100, ore: 100},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('replaces the resources of a player with resources', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 100, ore: 100},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 777,
                ore: 10
            };
            const nextState = setResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 777, ore: 10},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes resources specified with a negative amount', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 6, ore: 50, 'iron bars': 60},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: -5,
                'iron bars': -10,
                ore: 25
            };
            const nextState = setResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {ore: 25},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes a resource if it is set to zero', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 8, ore: 12},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 6,
                ore: 0
            };
            const nextState = setResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 6},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes the resource list of a player if that player no longer has any resources', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {};
            const nextState = setResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes the resources list if no players have any resources', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 0,
                ore: 0
            };
            const nextState = setResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
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
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 6},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '2';
            const resources = {
                gold: 60,
                ore: 25
            };
            const nextState = setResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 6},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
    });
    describe('getResources', () => {
        it('gets the resources of a player with resources', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '3';
            const nextState = getResources(initialState, playerId);
            expect(nextState).to.equal(fromJS({
                money: 3.50,
                'iron bars': 10
            }));
        });
        it('gets an empty map if the player does not have resources', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15}
                }
            });
            const playerId = '3';
            const nextState = getResources(initialState, playerId);
            expect(nextState).to.equal(Map());
        });
        it('returns undefined if the player does not exist', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '2';
            const nextState = getResources(initialState, playerId);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
    });
    describe('hasResources', () => {
        it('returns true if the player has more resources then specified', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 10
            };
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns true if the player has exactly as many resources as specified', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 20,
                ore: 15
            };
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns true if the player does not have any resources, but no resources are specified', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {};
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns true if the player does not have any resources, but no resources are specified with an amount greater than one', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 0,
                cow: 0
            };
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns true if no players have any resources, but no resources are specified ', () => {
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
            const playerId = '1';
            const resources = {};
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns true if no players have any resources, but no resources are specified with an amount greater than one', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 0,
                cow: 0
            };
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns false if the player does not have as many resources as specified', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 21
            };
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the player does not have any of a resource specified', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 20,
                lumber: '5'
            };
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the player does not have any resources and more than one of any resource is specified', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 1
            };
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the amount specified for any resource is negative', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '3';
            const resources = {
                money: 3.50,
                'iron bars': -1
            };
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the player does not exist', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '2';
            const resources = {
                gold: 20,
                ore: 15
            };
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if any resource is undefined', () => {
            const initialState = fromJS({
                latestPlayerId: 3,
                players: {
                    'Eddie': '1',
                    'Rob': '3'
                },
                playerData: {
                    1: {username: 'Eddie'},
                    3: {username: 'Rob'}
                },
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                undefined: 10,
                elephant: 5
            };
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
    });
});