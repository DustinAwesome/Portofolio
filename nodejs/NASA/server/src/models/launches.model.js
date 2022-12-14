const axios = require('axios');

const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100, // flight_number
    mission: 'Kepler Exploration X', // name
    rocket: 'Explorer IS1', // rocket.name
    launchDate: new Date('December 27, 2030'), // date_local
    target: 'Kepler-442 b', // not available
    customers: ['ZTM', 'NASA'],  // payloads.customers
    upcoming: true, // upcoming
    success: true, // success
}

saveLaunch(launch);

const SPACE_X_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function loadLaunchData() {

    console.log('Downloading launch data...');

    const response = await axios.post(SPACE_X_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }
            ]
        },
    });

    const launchDocs = response.data.docs;

    console.log(response);

    for (const launchDoc of launchDocs) {

        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        };

        console.log(`${launch.flightNumber} ${launch.mission}`);
        //await saveLaunch(launch);
    }
}

async function existsLaunchWithId(launchId) {
    return await launches.findOne({
        flightNumber: launchId
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne().sort('-flightNumber');
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    return await launches.find({}, {
        '_id': 0, '__v': 0
    });
}

async function saveLaunch(launch) {

    const plant = await planets.findOne({
        keplerName: launch.target
    });

    if (!plant) {
        throw new Error('No matching planet found');
    }

    await launches.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = (await getLatestFlightNumber()) + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to mastery', 'NASA'],
        flightNumber: newFlightNumber,
    });
    await saveLaunch(newLaunch);
}


async function abortLaunchById(launchId) {
    const aborted = await launches.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    });

    return aborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    loadLaunchData,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById
};