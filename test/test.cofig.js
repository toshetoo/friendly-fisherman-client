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
        admin: {
            categories: {
                add: `${appUrlBase}/admin/add-category`,
                list: `${appUrlBase}/admin/categories-list`
            },
            polls: {
                add: `${appUrlBase}/admin/add-poll`,
                list: `${appUrlBase}/admin/polls-list`
            }
        }
    },
};

module.exports.appUrlBase = appUrlBase;