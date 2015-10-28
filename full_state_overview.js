/**
 * Created by Eddie on 10/28/2015.
 */

/**
 * Notes:
 * -The key for each collection except for players and tasks is a playerId
 */

// TODO: Add state that maps jobs to industry
// TODO: Add state that manages industry bonuses
// TODO: Add state that maps tasks to jobs
// TODO: Add state that maps players to settings

const serverState =
{
    players: {
        latestPlayerId: 3,
        'Eddie': '1',
        'Rob': '3'
    },

    playerData: {
        1: {username: 'Eddie', hairColor: 'Black'},
        3: {username: 'Rob', hairColor: 'Black', powerLevel: 'Over 9000'}
    },

    resources: {
        1: {gold: 100, ore: 100},
        3: {money: 3.50, 'iron bars': 10}
    },

    workers: {
        // This state records primary information about the worker (name, job, and task).
        1: {
            latestWorkerId: 4,
            2: {name: 'Lucian', job: 'Miner', task: 'Break Rocks'},
            3: {name: 'Bobby'},
            4: {name: 'Frank', job: 'Miner', task: 'Mine Ore'}
        },
        3: {
            latestWorkerId: 7,
            1: {name: 'Tonk'},
            2: {name: 'Alice'},
            3: {name: 'Jim', job: 'Miner', task: 'Break Rocks'},
            7: {name: 'Logan', job: 'Tour Guide', task: 'Lead Tour'}
        }
    },

    workerExperience: {
        // This state records any job advancement details for each worker
        // TODO: implement workerExperience state and operations
    },

    workerStats: {
        // This state records any worker specific effectiveness modifiers besides workerExperience
        // TODO: implement workerState and operations
    },

    tasks: {
        'Mine Ore': {
            1: ['4']
        },
        'Break Rocks': {
            3: ['3'],
            1: ['2']
        },
        'Lead Tour': {
            3: ['7']
        }
    }
};

const clientState =
{
    playerId: '3',
    playerData: {
        username: 'Rob',
        hairColor: 'Black',
        powerLevel: 'Over 9000'
    },
    resources: {
        money: 3.50,
        'iron bars': 10
    },
    workers: {
        1: {name: 'Tonk'},
        2: {name: 'Alice'},
        3: {name: 'Jim', job: 'Miner', task: 'Break Rocks'},
        7: {name: 'Logan', job: 'Tour Guide', task: 'Lead Tour'}
    }
};