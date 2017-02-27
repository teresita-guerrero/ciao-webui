/*Pool service component
  This is a client implementation to handle Ciao's  external-ip API.
*/

var externalIPService = function (adapter, tokenManager) {
};

// listMappedIPs
// Method: GET
externalIPService.prototype.listPools = function () {
    var adapter = this.adapter;
    var tokenManager = this.tokenManager;
    return function (req, res, next) {
        var uri = "v2/pools";
        return adapter.onSuccess((data) => res.send(data.json))
            .onError((data) => res.send(data))
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
        console.log("hola", req);
        var uri = "/v2/"+req.params.tenant+"/pools";

        var pool = req.body.pool? req.body :{
            name:req.body.name,
            subnet: req.body.subnet,
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
