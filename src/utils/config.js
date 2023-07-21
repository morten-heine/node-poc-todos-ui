function getApiBaseUrl() {
    const env = process.env;
    const apienv = env[`REACT_APP_ENV`];
    const apihost = env[`REACT_APP_UI_HOST_${apienv}`]
    const apiport = env[`REACT_APP_API_PORT_${apienv}`]
    const apiprotocol = env[`REACT_APP_API_PROTOCOL_${apienv}`]
    const apiBaseUrl = `${apiprotocol}://${apihost}`+(apiport?`:${apiport}`:"");
    console.log(apienv);
    console.log(apiBaseUrl);
    return apiBaseUrl;
}

function getUiBaseUrl() {
    const env = process.env;
    const uienv = env[`REACT_APP_ENV`];
    const uihost = env[`REACT_APP_UI_HOST_${uienv}`]
    const uiport = env[`REACT_APP_UI_PORT_${uienv}`]
    const uiprotocol = env[`REACT_APP_UI_PROTOCOL_${uienv}`]
    const uiBaseUrl = `${uiprotocol}://${uihost}`+(uiport?`:${uiport}`:"");
    return uiBaseUrl;
}

module.exports = {
    getApiBaseUrl,
    getUiBaseUrl
};

