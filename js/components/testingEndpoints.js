// React js component
var React = require('react');
var reactBootstrap = require('react-bootstrap');
var Button = reactBootstrap.Button;
var $ = require('jquery');

console.log("si llega");

var testingEndpoints = React.createClass({

    getDefaultProps: function() {
        return {
            logger: null
        };
    },

    getInitialState: function () {
        return {
            activeTenant: this.props.sourceData.activeTenant
        };
        console.log("Active tenant", activeTenant);
    },

    createPool: function (data) {
        var ips =[{"ip":"192.168.0.50"}, {"ip":"192.168.0.51"}];
        var body = {
            "name": "first pool veersion cincuentas",
            "Subnet": "192.168.0.0/24",
            "ips": JSON.stringify(ips),
            "ip":"192.168.0.52"
        };

        console.log("The body is:",body);

        $.post({
            url:"/data/pools",
            data:body
        })
        .done(function (success) {
            console.log('success', success);
            //datamanager.trigger('add-instances')
        })
        .fail(function (err) {
            console.log('err', err);
        });
    },
    deletePool: function (data) {
        var pool_id = "e83eb9b7-26a1-4af1-bd69-4d24efdb347b";
        $.ajax({
            type: 'DELETE',
            url: '/data/pools/' + pool_id
        }).done(function (data) {
            console.log(data);
        });
    },
    getAPool: function (data) {
        var pool_id = "bfa826d9-df6a-4b0d-a12c-2ba0c7d35e92";
        $.get({
            url:"/data/pools/"+pool_id,
        })
        .done(function (success) {
            console.log('success', success);
        })
        .fail(function (err) {
            console.log('err', err);
        });
    },
    addExternalIPs: function (data) {
        var pool_id = "bfa826d9-df6a-4b0d-a12c-2ba0c7d35e92";
        var body = {
            "pool_id": pool_id,
            "Subnet":"",
            "ips": [{"ip":"192.168.0.23"}, {"ip":"192.168.0.24"}],
            "ip": "192.168.0.25"
        };
        $.post({
            url:"/data/pools/"+pool_id,
            data:body
        })
        .done(function (success) {
            console.log('success', success);
        })
        .fail(function (err) {
            console.log('err', err);
        });
    },
    getSubnetById: function (data) {
        var pool_id = "aa42f648-3caf-4aae-97f9-77899ac34809";
        var subnet_id = "d921dde3-4e5c-4084-bcc3-7f1f846b9623";
        $.get({
            url:"/data/pools/"+pool_id+"/subnets/"+subnet_id,
        })
        .done(function (success) {
            console.log('success', success);
        })
        .fail(function (err) {
            console.log('err', err);
        });
    },

    render: function () {
        return (<div className="pull-right">
                <h4>
                    <Button bsStyle={null} className="btn frm-btn-primary"
                        onClick={this.createPool}>
                        Create Pool
                    </Button>
                    <Button bsStyle={null} className="btn frm-btn-primary"
                        onClick={this.deletePool}>
                        Delete Pool
                    </Button>
                    <Button bsStyle={null} className="btn frm-btn-primary"
                        onClick={this.getAPool}>
                        Get a Pool
                    </Button>
                    <Button bsStyle={null} className="btn frm-btn-primary"
                        onClick={this.addExternalIPs}>
                        Add External IPs
                    </Button>
                    <Button bsStyle={null} className="btn frm-btn-primary"
                        onClick={this.getSubnetById}>
                        Get Subnet
                    </Button>
                 </h4>
                </div>
        );
    }
});

module.exports = testingEndpoints;
