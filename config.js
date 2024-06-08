require('dotenv').config();

const env = process.env;
const baseUrl = 'https://api-clicker.pixelverse.xyz/api';

const urls = {
    users: `${baseUrl}/users`,
    claim: `${baseUrl}/mining/claim`,
    dailyRewards: `${baseUrl}/daily-rewards`,
    claimDailyRewards: `${baseUrl}/daily-rewards/claim`
}

function getHeaders() {

    return {
        'Accept': 'application/json, text/plain, */*',
        'tg-id': `${env.TELEGRAM_USER_ID}`,
        'Sec-Fetch-Site': 'cross-site',
        'If-None-Match': 'W/"699-OeZsvMxde/N235QUHzT4UJI0GN0"',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Sec-Fetch-Mode': 'cors',
        'Accept-Encoding': 'gzip, deflate, br',
        'Origin': 'https://sexyzbot.pxlvrs.io',
        'username': 'ennyolajide',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Referer': 'https://sexyzbot.pxlvrs.io/',
        'initData': `${env.AUTH_QUERY}`,
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'secret': `${env.SECRET_KEY}`
    };

}

module.exports = { urls, getHeaders }
