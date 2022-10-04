const mainPage = async (req, res) => {
    res.sendFile('/public/templates/index.html', {
        root: __dirname
    })
};

const loginPage = async (req, res) => {
    res.redirect("https://clients-log.auth.us-east-1.amazoncognito.com/login?client_id=3jkidons84e799v67eckpugqtv&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http://localhost:3000/users")
};

const venuesPage = async (req, res) => {
    res.sendFile('/public/templates/venues.html', {
        root: __dirname
    })
};

const competitorsPage = async (req, res) => {
    res.sendFile('/public/templates/competitors.html', {
        root: __dirname
    })
};

const usersPage = async (req, res) => {
    res.sendFile('/public/templates/users.html', {
        root: __dirname
    })
};

module.exports = {
    mainPage,
    loginPage,
    venuesPage,
    competitorsPage,
    usersPage
};
    