const axios = require('axios');
const { urls, getHeaders } = require('./config');
const { claim, handleDailyRewardsClaim, logInfo, logError, exitProcess } = require('./requests');


axios.get(urls.users, { headers: getHeaders() })
    .then((res) => {
        const { username } = res.data;
        username ? logInfo(res.data) : exitProcess();
        username ? handleDailyRewardsClaim() : exitProcess();
        username ? claim() : exitProcess();
    })
    .catch(error => {
        logError(error)
    });
