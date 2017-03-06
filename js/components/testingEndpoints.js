// React js component
var React = require('react');
var reactBootstrap = require('react-bootstrap');
var Button = reactBootstrap.Button;
var $ = require('jquery');

console.log("si llega");

var testingEndpoints = React.createClass({

    getDefaultProps: function() {
    },

    getInitialState: function () {
        return {
            activeTenant: this.props.sourceData.activeTenant
        };
    },

    createPool: function (data) {
        var tenantId = datamanager.data.activeTenant.id;
        var body = {
            "name": "first pool",
            "subnet": "",
            "ips": [{}],
            "ip":"192.168.0.1"
        };

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

    render: function () {
        console.log("mas lejos");
        return (<div className="pull-right">
                <h4>
                    <Button bsStyle={null} className="btn frm-btn-primary"
                        onClick={this.createPool}>
                        Create Pool
                    </Button>
                 </h4>
                {this.createPool()}
                </div>);
    },
    componentDidMount: function () {
    },
    componentWillUnmount: function () {
    },
});

module.exports = testingEndpoints;
