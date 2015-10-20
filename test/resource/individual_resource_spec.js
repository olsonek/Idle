/**
 * Created by Eddie on 10/19/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {addResource, getResource, hasResource, setResource, removeResource} from '../../src/resource';

describe('Individual Resource Operations', () => {
    // TODO: Add a map between a resource type and its unit of measurement
    // TODO: Add more thorough validation of parameters (more undefined or empty string checks)
    // TODO: add validation checks for non-number amounts
    describe('addResource', () => {
        it('adds a resource to a player when no player has any resources', () => {
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
            const resource = 'gold';
            const amount = 10;
            const nextState = addResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10}
                }
            }));
        });
        it('adds a resource to a player without resources', () => {
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
                    1: {gold: 10}
                }
            });
            const playerId = '3';
            const resource = 'iron bars';
            const amount = 6;
            const nextState = addResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10},
                    3: {'iron bars': 6}
                }
            }));
        });
        it('adds a resource to a player without the specified resource', () => {
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
                    1: {gold: 10}
                }
            });
            const playerId = '1';
            const resource = 'iron bars';
            const amount = 7;
            const nextState = addResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10, 'iron bars': 7}
                }
            }));
        });
        it('adds a resource to a player with the specified resource', () => {
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
                    1: {gold: 10}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = 7;
            const nextState = addResource(initialState, playerId, resource, amount);
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
                    1: {gold: 17}
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
                    1: {gold: 10}
                }
            });
            const playerId = '2';
            const resource = 'iron bars';
            const amount = 7;
            const nextState = addResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10}
                }
            }));
        });
        it('does nothing if the resource is specified with a negative amount', () => {
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
                    1: {gold: 10}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = -1;
            const nextState = addResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10}
                }
            }));
        });
    });
    describe('setResource', () => {
        it('sets the resource for a player when no player has any resources', () => {
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
            const resource = 'gold';
            const amount = 7;
            const nextState = setResource(initialState, playerId, resource, amount);
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
                    1: {gold: 7}
                }
            }));
        });
        it('sets the resource for a player without resources', () => {
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
                    1: {gold: 10}
                }
            });
            const playerId = '3';
            const resource = 'diamond';
            const amount = 8;
            const nextState = setResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10},
                    3: {diamond: 8}
                }
            }));
        });
        it('sets the resource for a player without the specified resource', () => {
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
                    1: {gold: 10},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'diamond';
            const amount = 3;
            const nextState = setResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10, diamond: 3},
                    3: {diamond: 8}
                }
            }));
        });
        it('sets the resource for a player with the specified resource', () => {
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
                    1: {gold: 10},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = 35;
            const nextState = setResource(initialState, playerId, resource, amount);
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
                    1: {gold: 35},
                    3: {diamond: 8}
                }
            }));
        });
        it('removes the resource if the specified amount is zero', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'pet';
            const amount = 0;
            const nextState = setResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10},
                    3: {diamond: 8}
                }
            }));
        });
        it('removes the resource if the specified amount is negative', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'pet';
            const amount = -5;
            const nextState = setResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10},
                    3: {diamond: 8}
                }
            }));
        });
        it('removes the resource list if the player no longer has any resources', () => {
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
                    1: {pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'pet';
            const amount = 0;
            const nextState = setResource(initialState, playerId, resource, amount);
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
                    3: {diamond: 8}
                }
            }));
        });
        it('removes the resources list if players no longer have any resources', () => {
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
                    3: {diamond: 8}
                }
            });
            const playerId = '3';
            const resource = 'diamond';
            const amount = 0;
            const nextState = setResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '2';
            const resource = 'pet';
            const amount = 10;
            const nextState = setResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            }));
        });
    });
    describe('getResource', () => {
        it('returns the amount of the specified resource a player with the resource has', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'pet';
            const nextState = getResource(initialState, playerId, resource);
            expect(nextState).to.equal(3);
        });
        it('returns 0 if the player does not have the specified resource', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'toy';
            const nextState = getResource(initialState, playerId, resource);
            expect(nextState).to.equal(0);
        });
        it('returns 0 if the player does not have any resources', () => {
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
                    1: {gold: 10, pet: 3}
                }
            });
            const playerId = '3';
            const resource = 'toy';
            const nextState = getResource(initialState, playerId, resource);
            expect(nextState).to.equal(0);
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '2';
            const resource = 'toy';
            const nextState = getResource(initialState, playerId, resource);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
        it('returns undefined if the resource is undefined', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = undefined;
            const nextState = getResource(initialState, playerId, resource);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
        it('returns undefined if the resource is an empty string', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = '';
            const nextState = getResource(initialState, playerId, resource);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.undefined;
        });
    });
    describe('removeResource', () => {
        it('removes the amount of the resource if the player has more than that amount of the resource', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = 3;
            const nextState = removeResource(initialState, playerId, resource, amount);
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
                    1: {gold: 7, pet: 3},
                    3: {diamond: 8}
                }
            }));
        });
        it('removes the resource if the specified amount is all the player has of that resource', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = 10;
            const nextState = removeResource(initialState, playerId, resource, amount);
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
                    1: {pet: 3},
                    3: {diamond: 8}
                }
            }));
        });
        it('removes the resource list if the specified amount is all the player has of any resource', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '3';
            const resource = 'diamond';
            const amount = 8;
            const nextState = removeResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10, pet: 3}
                }
            }));
        });
        it('removes the resources list if the specified amount accounts for all resources any player has', () => {
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
                    1: {gold: 10}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = 10;
            const nextState = removeResource(initialState, playerId, resource, amount);
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
        it('does nothing if the amount specified is negative', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = -1;
            const nextState = removeResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '2';
            const resource = 'gold';
            const amount = 6;
            const nextState = removeResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            }));
        });
    });
    describe('hasResource', () => {
        it('returns true if the player has more than the amount specified of the resource', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = 6;
            const nextState = hasResource(initialState, playerId, resource, amount);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns true if the player has exactly the amount specified of the resource', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'pet';
            const amount = 3;
            const nextState = hasResource(initialState, playerId, resource, amount);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns true if the player does not have the specified resource, but zero is the specified amount', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'zigzag';
            const amount = 0;
            const nextState = hasResource(initialState, playerId, resource, amount);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns true if the player does not have any resources, but zero is the specified amount', () => {
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
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'zigzag';
            const amount = 0;
            const nextState = hasResource(initialState, playerId, resource, amount);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns true if no players have any resources, but the specified amount is zero', () => {
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
            const resource = 'gold';
            const amount = 0;
            const nextState = hasResource(initialState, playerId, resource, amount);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns false if the player has less than the specified amount of the resource', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = 35;
            const nextState = hasResource(initialState, playerId, resource, amount);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the player does not have the specified resource, and the specified amount is at least one', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'tank';
            const amount = 1;
            const nextState = hasResource(initialState, playerId, resource, amount);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the player does not have any resources, and the specified amount is at least one', () => {
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
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = 6;
            const nextState = hasResource(initialState, playerId, resource, amount);
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '2';
            const resource = 'gold';
            const amount = 6;
            const nextState = hasResource(initialState, playerId, resource, amount);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the amount is negative', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'pet';
            const amount = -1;
            const nextState = hasResource(initialState, playerId, resource, amount);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the resource is undefined', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = undefined;
            const amount = 6;
            const nextState = hasResource(initialState, playerId, resource, amount);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
        it('returns false if the amount is undefined', () => {
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
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'blue';
            const amount = undefined;
            const nextState = hasResource(initialState, playerId, resource, amount);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
    });
});