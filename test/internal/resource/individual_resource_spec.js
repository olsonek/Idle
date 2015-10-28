/**
 * Created by Eddie on 10/19/2015.
 */
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {addResource, getResource, hasResource, setResource, removeResource} from '../../../src/internal/resource';

describe('Individual Resource Operations', () => {
    // TODO: add validation checks for non-number amounts
    describe('addResource', () => {
        it('associates a resource with a playerId when no playerId is associated with resources', () => {
            const initialState = Map();
            const playerId = '1';
            const resource = 'gold';
            const amount = 10;
            const nextState = addResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 10}
                }
            }));
        });
        it('associates a resource with a playerId not associated with resources', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10}
                }
            });
            const playerId = '3';
            const resource = 'iron bars';
            const amount = 6;
            const nextState = addResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 10},
                    3: {'iron bars': 6}
                }
            }));
        });
        it('associates a resource with a playerId not associated with the specified resource', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10}
                }
            });
            const playerId = '1';
            const resource = 'iron bars';
            const amount = 7;
            const nextState = addResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 10, 'iron bars': 7}
                }
            }));
        });
        it('adds the specified amount to the resource already associated with the playerId', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = 7;
            const nextState = addResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 17}
                }
            }));
        });
        it('removes the specified amount of the resource if a negative amount is specified', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = -7;
            const nextState = addResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 3}
                }
            }));
        });
        it('does nothing if the resource is specified with an undefined amount', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = undefined;
            const nextState = addResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 10}
                }
            }));
        });
        it('does nothing if the resource is undefined', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10}
                }
            });
            const playerId = '1';
            const resource = undefined;
            const amount = 5;
            const nextState = addResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 10}
                }
            }));
        });
    });
    describe('setResource', () => {
        it('associates a resource with a playerId when no playerId is associated with resources', () => {
            const initialState = Map();
            const playerId = '1';
            const resource = 'gold';
            const amount = 7;
            const nextState = setResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 7}
                }
            }));
        });
        it('associates a resource with a playerId not associated with resources', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10}
                }
            });
            const playerId = '3';
            const resource = 'diamond';
            const amount = 8;
            const nextState = setResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 10},
                    3: {diamond: 8}
                }
            }));
        });
        it('associates a resource with a playerId not associated with that resource', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 10, diamond: 3},
                    3: {diamond: 8}
                }
            }));
        });
        it('replaces the amount of a resource associated with a playerId already associated with that resource', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 35},
                    3: {diamond: 8}
                }
            }));
        });
        it('removes the resource if the specified amount is zero', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 10},
                    3: {diamond: 8}
                }
            }));
        });
        it('removes the resource if the specified amount is negative', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 10},
                    3: {diamond: 8}
                }
            }));
        });
        it('removes the resource if the specified amount is undefined', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'pet';
            const amount = undefined;
            const nextState = setResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 10},
                    3: {diamond: 8}
                }
            }));
        });
        it('removes the resource list associated with a playerId that no longer has any resources', () => {
            const initialState = fromJS({
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
                resources: {
                    3: {diamond: 8}
                }
            }));
        });
        it('removes the resources list if no playerId is associated with any resources', () => {
            const initialState = fromJS({
                resources: {
                    3: {diamond: 8}
                }
            });
            const playerId = '3';
            const resource = 'diamond';
            const amount = 0;
            const nextState = setResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(Map());
        });
    });
    describe('getResource', () => {
        it('returns the amount of the specified resource already associated with a playerId', () => {
            const initialState = fromJS({
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
        it('returns 0 if the playerId is not associated with the specified resource', () => {
            const initialState = fromJS({
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
        it('returns 0 if the playerId is not associated with any resources', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10, pet: 3}
                }
            });
            const playerId = '3';
            const resource = 'toy';
            const nextState = getResource(initialState, playerId, resource);
            expect(nextState).to.equal(0);
        });
        it('returns 0 if the resource is undefined', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = undefined;
            const nextState = getResource(initialState, playerId, resource);
            expect(nextState).to.equal(0);
        });
    });
    describe('removeResource', () => {
        it('subtracts the specified amount of a resource less than what is associated with a playerId', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 7, pet: 3},
                    3: {diamond: 8}
                }
            }));
        });
        it('disassociates a resource with the playerId if the specified amount is equal to the amount already associated', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {pet: 3},
                    3: {diamond: 8}
                }
            }));
        });
        it('disassociates a resource with the playerId if the specified amount is more than the amount already associated', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = 777;
            const nextState = removeResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {pet: 3},
                    3: {diamond: 8}
                }
            }));
        });
        it('disassociates a resource with the playerId if the amount is undefined', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = undefined;
            const nextState = removeResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {pet: 3},
                    3: {diamond: 8}
                }
            }));
        });
        it('removes the resource list associated with a playerId that no longer has any resources', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 10, pet: 3}
                }
            }));
        });
        it('removes the resources list if no playerId has any associated resources', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = 10;
            const nextState = removeResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(Map());
        });
        it('does nothing if the amount specified is negative', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            }));
        });
        it('does nothing if the resource specified is undefined', () => {
            const initialState = fromJS({
                resources: {
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = undefined;
            const amount = 2;
            const nextState = removeResource(initialState, playerId, resource, amount);
            expect(nextState).to.equal(fromJS({
                resources: {
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            }));
        });
    });
    describe('hasResource', () => {
        it('returns true if the playerId is associated with more of the resource than the amount specified', () => {
            const initialState = fromJS({
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
        it('returns true if the playerId is associated with exactly the amount specified of the resource', () => {
            const initialState = fromJS({
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
        it('returns true if the playerId is not associated with the specified resource, but zero is the specified amount', () => {
            const initialState = fromJS({
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
        it('returns true if the playerId is not associated with any resources, but zero is the specified amount', () => {
            const initialState = fromJS({
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
        it('returns true if no playerId is associated with any resources, but the specified amount is zero', () => {
            const initialState = Map();
            const playerId = '1';
            const resource = 'gold';
            const amount = 0;
            const nextState = hasResource(initialState, playerId, resource, amount);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.true;
        });
        it('returns false if the playerId is associated with less than the specified amount of the resource', () => {
            const initialState = fromJS({
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
        it('returns false if the playerId is not associated with the specified resource, and the specified amount is at least one', () => {
            const initialState = fromJS({
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
        it('returns false if the playerId is not associated with any resources, and the specified amount is at least one', () => {
            const initialState = fromJS({
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
        it('returns false if the specified amount is negative', () => {
            const initialState = fromJS({
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
        it('returns false if the specified resource is undefined', () => {
            const initialState = fromJS({
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
                resources: {
                    1: {gold: 10, pet: 3},
                    3: {diamond: 8}
                }
            });
            const playerId = '1';
            const resource = 'gold';
            const amount = undefined;
            const nextState = hasResource(initialState, playerId, resource, amount);
            //noinspection BadExpressionStatementJS
            expect(nextState).to.be.false;
        });
    });
});