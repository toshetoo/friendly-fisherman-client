const appUrlBase = 'http://localhost:3000'
module.exports.routes = {
    public: {
        register: `${appUrlBase}/register`,
        login: `${appUrlBase}/login`,
        forgottenPassword: `${appUrlBase}/forgotten-password`
    },
    private: {
        home: `${appUrlBase}/home`,
        profile: `${appUrlBase}/profile`,
    },
};

module.exports.appUrlBase = appUrlBase;