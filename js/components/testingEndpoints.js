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
        var body = {
            "name": "first pool veersion 2",
            "Subnet": "",
            "ips": [{"ip":"192.168.0.3"}, {"ip":"192.168.0.4"}],
            "ip":"192.168.0.5"
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

    render: function () {
        console.log("mas lejos");
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
                 </h4>
                </div>
        );
    }
});

module.exports = testingEndpoints;
