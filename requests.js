const axios = require('axios');
const chalk = require('chalk');
const { urls, getHeaders } = require('./config');


async function handleDailyRewardsClaim() {
    return await axios.get(urls.dailyRewards, { headers: getHeaders() }).then((res) => {
        const { todaysRewardAvailable } = res.data;
        todaysRewardAvailable ? claimDailyRewards() : false;
    }).catch((error) => {
        logError(error);
    });
}

async function claimDailyRewards() {
    return await axios.post(urls.claimDailyRewards, {}, { headers: getHeaders() }).then((res) => {
        const { amount } = res.data;
        amount ? logDailyRewardsClaim(res.data) : exitProcess();
    }).catch((error) => {
        logError(error);
    });
}

async function claim() {
    return await axios.post(urls.claim, {}, { headers: getHeaders() }).then((res) => {
        const { claimedAmount } = res.data;
        claimedAmount ? logClaim(res.data) : exitProcess();
    }).catch((error) => {
        logError(error);
    });
}

function logInfo(obj) {
    console.log(
        'Username:', chalk.blue(obj?.username),
        '| Balance:', chalk.yellow(Number(obj?.clicksCount.toFixed(0)).toLocaleString()),
    );
}

function logClaim(obj) {
    console.log(
        'Claiming ...', chalk.blue('->'),
        chalk.cyan((obj?.claimedAmount.toFixed().toLocaleString())), chalk.green('\u2714'),
        '| Restoration Period:', chalk.magenta((obj?.restorationPeriodMs)/1000), chalk.blue('secs'),
        '| Max Available:', chalk.magenta(obj?.maxAvailable)
    );
}

function logDailyRewardsClaim(obj) {
    console.log(
        `Claiming Day ${obj?.day} Rewards ...`, chalk.blue('->'), chalk.cyan(obj?.amount), chalk.green('\u2714'),
    );
}


function logError(error) {
    console.log(error.response ? error.response.data : error.request ? error.request : 'Error', error.message);
    process.exit();
}

function exitProcess() {
    console.log(chalk.red('Error collecting coin - Exiting...'));
    process.exit(); //end the process
}

module.exports = { claim, handleDailyRewardsClaim, logInfo, logError, exitProcess }
