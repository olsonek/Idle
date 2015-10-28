/**
 * Created by Eddie on 10/19/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {addResources, getResources, hasResources, removeResources, setResources} from '../../../src/internal/resource';

describe('Batch Resource Operations', () => {
    // TODO: Add a map between a resource type and its unit of measurement
    // TODO: Add more thorough validation of parameters (more undefined or empty string checks)
    // TODO: add validation checks for non-number amounts
    describe('addResources', () => {
        it('associates resources with a playerId when no player has any resources', () => {
            const initialState = Map();
            const playerId = '1';
            const resources = {
                gold: 20,
                ore: 15
            };
            const nextState = addResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 20, ore: 15}
                }
            }));
        });
        it('associates resources with a playerId not associated with any resources', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {gold: 6, ore: 7}
                }
            }));
        });
        it('adds the specified amount of each resource already associated with the playerId', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 25, ore: 115, coal: 7},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes resources specified with a negative amount to a playerId associated with those resources', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 25, ore: 115, coal: 7},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: -50,
                ore: -100,
                coal: 7
            };
            const nextState = addResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {ore: 15, coal: 14},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('does nothing with any resources specified with an undefined amount', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 5,
                ore: undefined,
                coal: 7
            };
            const nextState = addResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 25, ore: 15, coal: 7},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
    });
    describe('removeResources', () => {
        it('removes resources from a playerId associated with resources', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 15, ore: 14},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes only as many resources as the playerId is associated with', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {ore: 9},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('disassociates resources specified with an undefined amount', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 5,
                ore: undefined
            };
            const nextState = removeResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes the resource list associated with the playerId if all associated resources are removed', () => {
            const initialState = fromJS({
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
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes the resources list if no playerId is associated with resources', () => {
            const initialState = fromJS({
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
            expect(nextState).to.equal(Map());
        });
        it('does nothing with resources specified with a negative amount', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 20, ore: 14},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('does nothing if the playerId is not associated with resources', () => {
            const initialState = fromJS({
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
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
    });
    describe('setResources', () => {
        it('associates resources with a playerId when no playerId is associated with resources', () => {
            const initialState = Map();
            const playerId = '1';
            const resources = {
                gold: 100,
                ore: 100
            };
            const nextState = setResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 100, ore: 100}
                }
            }));
        });
        it('associates resources with a playerId not associated with resources', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 100, ore: 100},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('replaces the resources of playerId associated with resources', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 777, ore: 10},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('disassociates resources specified with a negative amount', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {ore: 25},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('disassociates resources specified with zero', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 6},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('disassociates resources specified with an undefined amount', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 8, ore: 12},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: 6,
                ore: undefined
            };
            const nextState = setResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 6},
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes the resource list associated with the playerId if the specified resources are undefined', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = undefined;
            const nextState = setResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes the resource list associated with the playerId if the specified resources are empty', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {};
            const nextState = setResources(initialState, playerId, resources);
            expect(nextState).to.equal(fromJS({
                resources: {
                    3: {money: 3.50, 'iron bars': 10}
                }
            }));
        });
        it('removes the resources state if no playerIds are associated with resources', () => {
            const initialState = fromJS({
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
            expect(nextState).to.equal(Map());
        });
    });
    describe('getResources', () => {
        it('gets the resources associated with a playerId associated with resources', () => {
            const initialState = fromJS({
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
        it('gets an empty map if the playerId is not associated with resources', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 20, ore: 15}
                }
            });
            const playerId = '3';
            const nextState = getResources(initialState, playerId);
            expect(nextState).to.equal(Map());
        });
    });
    describe('hasResources', () => {
        it('returns true if the playerId is associated with more resources than specified', () => {
            const initialState = fromJS({
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
        it('returns true if the playerId is associated with exactly as many resources as specified', () => {
            const initialState = fromJS({
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
        it('returns true if the playerId is not associated with resources, but no resources are specified', () => {
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
        it('returns true if the playerId is not associated with resources, but no resources are specified with an amount greater than one', () => {
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
        it('returns true if no playerId is associated with resources, but no resources are specified ', () => {
            const initialState = Map();
            const playerId = '1';
            const resources = {};
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns true if no playerId is associated with resources, but no resources are specified with an amount greater than one', () => {
            const initialState = Map();
            const playerId = '1';
            const resources = {
                gold: 0,
                cow: 0
            };
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns false if the playerId is not associated with as many resources as specified', () => {
            const initialState = fromJS({
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
        it('returns false if the playerId is not associated with any of a resource specified', () => {
            const initialState = fromJS({
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
        it('returns false if the playerId is not associated with resources and more than one of any resource is specified', () => {
            const initialState = fromJS({
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
        it('returns false if any resource is specified with an undefined amount', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 20, ore: 15},
                    3: {money: 3.50, 'iron bars': 10}
                }
            });
            const playerId = '1';
            const resources = {
                gold: undefined,
                ore: 5
            };
            const nextState = hasResources(initialState, playerId, resources);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
    });
});