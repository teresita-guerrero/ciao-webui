var React = require('react');
var InstancesGroup = require('./instancesGroup.js');

var groupOverview = React.createClass({
    getInitialState: function() {
        return {updates:0};
    },

    instancesWereAdded: function(){
        console.log('Instances were added - groupOverview');
    },

    flavorsDesc: [],

    loadFlavors: function () {
        var load = function () {
            if(this.flavorsDesc.length == 0)
                this.props.flavors.forEach(function (flavor) {
                    $.get({
                        url:this.props.detailUrl + "/flavors/" + flavor.id,
                        timeout:5000})
                        .done(function (data) {
                            if (data) {
                                this.flavorsDesc.push({
                                    id:data.flavor.id,
                                    name:data.flavor.name,
                                    disk:data.flavor.disk});
                                datamanager.data.flavors = this.flavorsDesc;
                                console.log("Retrieved flavor information:");
                                console.log(data);
                            }
                        }.bind(this));
                }.bind(this));
        }.bind(this);
        load();
        window.setInterval(load, this.props.refresh);
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        if (!nextProps.flavors || nextProps.flavors.length == 0)
            return false;
        else
            return true;
    },

    componentDidMount: function() {
        this.loadFlavors();
        datamanager.addEvent('add-instances', function(){
            this.instancesWereAdded();
        }.bind(this));

        var update = function () {
            $.get({
                url: this.props.detailUrl + "/flavors/detail"
                ,timeout:5000
            }).done(function (data) {
                // this.setState({
                //     updates:this.state.updates+1});
                datamanager.setDataSource('group-overview',
                                          {
                                              dataKey: 'group-overview',
                                              detailUrl: this.props.detailUrl,
                                              flavors:data.flavors});
                // Fallback, fix empty workloads
                if (data.flavors.length == 0) {
                    $.get({url: this.props.detailUrl + "/flavors"})
                    .done(function (data) {
                        datamanager
                            .setDataSource('group-overview',
                                           {
                                               dataKey: 'group-overview',
                                               detailUrl: this.props.detailUrl,
                                               flavors:data.flavors});
                    }.bind(this));
                }
            }.bind(this))
                .fail(function (err) {
                    console.log("Group overview update failed: "+err);
                });
        }.bind(this);

        update();
        window.groupInterval = setInterval(update, 5000);
    },

    componentWillUnmount: function() {
        datamanager.clearEvent('add-instances');
    },

    render: function() {
        var groups = this.props.flavors
            .map((props, i) => (
                <div className="col-md-4" key={i}>
                    <InstancesGroup {...props}/>
                </div>));

        return (<div className="row">
                    {groups}
                </div>);
    }


});

module.exports = groupOverview;
