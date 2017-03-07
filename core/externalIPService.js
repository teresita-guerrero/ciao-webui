/*Pool service component
  This is a client implementation to handle Ciao's  external-ip API.
*/

var externalIPService = function (adapter, tokenManager) {
    this.adapter = adapter;
    this.tokenManager = tokenManager;
};

// Retrieve a list of all public pools
// Method: GET
externalIPService.prototype.listPools = function () {
    var adapter = this.adapter;
    var tokenManager = this.tokenManager;
    return function (req, res, next) {
        var uri = "/pools";
        return adapter.onSuccess((data) => {
            res.set('Content-Type','application/json');
            res.send(data.json);
        }).onError((data) => res.send(data))
            .get(uri,req.session.token);
    };
};

// mapExternalIP
// Method: POST
// Create a new external IP pool -- first approach
externalIPService.prototype.createPool = function () {
    var adapter = this.adapter;
    var tokenManager = this.tokenManager;
    return function (req, res, next) {
        console.log("hola", req.body);
        var uri = "/pools";

        var pool = req.body.pool? req.body :{
            name:req.body.name,
            Subnet: req.body.subnet,
            ips: req.body.ips,
            ip: req.body.ip
        };
        return adapter.onSuccess((data) => res.send(data.json))
            .onError((data) => res.send(data))
            .post(uri,pool,req.session.token);
    };
};

// unmapExternalIP
// Method: DELETE
externalIPService.prototype.unmapExternalIP = function () {
    var adapter = this.adapter;
    var tokenManager = this.tokenManager;
    return function (req, res, next) {
    };
};

module.exports = externalIPService;
