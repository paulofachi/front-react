
let Api = {

    baseUrl: 'http://localhost:8080/api',

    call: async (uri, method, body, fn) => {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Path': window.location.pathname
        };
        fetch(uri, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : null
        }).then((res) => {
            res.json().then((data) => {
                fn(data);
            }).catch(function (res) {
                fn(res);
            });
        }).catch(function (res) {
            console.log(res)
        });
    }
};

export default Api;