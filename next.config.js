const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                mongo_uri: 'mongodb://localhost:27017/my-site'
            }    
        };
    }
    return {
        env: {
            mongo_uri: 'mongodb://localhost:27017/my-site'
        }
    }
};