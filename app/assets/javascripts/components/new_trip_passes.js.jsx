function translateBoolean(bool){
  if (bool.toString() === 'true'){
    return 'Yes';
  }
  else {
    return 'No';
  }
};

var NewTripPasses = React.createClass({
  getInitialState: function(){
    return {data: [], btnAccept: 'Accept', btnDecline: 'Decline'};
  },
  getDefaultProps: function(){
    return {data: [], btnAccept: 'Accept', btnDecline: 'Decline'};
  },
  componentDidMount: function(){
    this.loadTripsFromServer();
  },
  loadTripsFromServer: function(){
    $.ajax({
      url: Routes.trip_requests_path(),
      type: 'get',
      dataType: 'json',
      success: function(data){
          this.setState({data: data.newPasses});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  onHandleAccept: function(id){
    this.setState({btnAccept: 'Accepting..'});
    $.ajax({
      url: Routes.trip_pass_accept_path(id),
      type: 'post',
      success: function(data){
        this.props.updateAll();
        this.loadTripsFromServer();
      }.bind(this),
      error: function(xhr, status, err){
        alert("An Error Occured!");
        console.error(err.toString());
        console.error(xhr.status);
        console.error(xhr.responseText);
        this.loadTripsFromServer();
      }.bind(this)
    });
  },
  onHandleDecline: function(id){
    this.setState({btnDecline: 'Declining'});
    $.ajax({
      url: Routes.trip_pass_decline_path(id),
      type: 'post',
      success: function(data){
        this.loadTripsFromServer();
        this.props.updateAll();
      }.bind(this),
      error: function(xhr, status, err){
        alert("An Error Occured!");
        console.error(err.toString());
        console.error(xhr.status);
        console.error(xhr.responseText);
        this.loadTripsFromServer();
      }.bind(this)
    });
  },
  render: function(){
    return (
      <Trip_Pass_List btnDecline = {this.state.btnDecline} btnAccept = {this.state.btnAccept} data={this.state.data} handleAccept = {this.onHandleAccept} handleDecline = {this.onHandleDecline}/>
    );
  }
});

var Trip_Pass_List = React.createClass({
  accept_pass: function(id){
    this.props.handleAccept(id);
  },
  decline_pass: function(id){
    this.props.handleDecline(id);
  },
  render: function(){
    console.log(this.props.data);
    var tripNodes = this.props.data.map(function(trip){
      return (
          <Trip_Pass btnDecline = {this.props.btnDecline} btnAccept = {this.props.btnAccept} onPassAccept = {this.accept_pass} onPassDecline = {this.decline_pass}  data = {trip} key = {trip.id} />
      );
    }, this);
    return (
      <table className = 'tripPassTable table table-striped table-reponsive table-hover'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Arrival</th>
            <th>Departure</th>
            <th>Accepted?</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tripNodes}
        </tbody>
      </table>
    );
  }
});

var Trip_Pass = React.createClass({
  handleAcceptSubmit: function (){
    this.props.onPassAccept(this.props.data.id);
  },
  handleDeclineSubmit: function (){
    this.props.onPassDecline(this.props.data.id);
  },
  render: function(){
    return(
      <tr>
          <td>
            {this.props.data.user.name}
          </td>
          <td>
            {this.props.data.location}
          </td>
          <td>
            {this.props.data.dateStart}
          </td>
          <td>
            {this.props.data.dateEnd}
          </td>
          <td>
            {translateBoolean(this.props.data.researcher_accept)}
          </td>
          <td>
            <div className = "btn-group" role="group">
              <button type = "button" onClick = {this.handleAcceptSubmit} className = "btn btn-info">{this.props.btnAccept}</button>
              <button type = "button" onClick = {this.handleDeclineSubmit} classId = {this.props.id} data-target = {this.props.id} data-toggle = "modal" className = "btn btn-default">{this.props.btnDecline}</button>
            </div>
          </td>
      </tr>
      );
    }
  });

ReactDOM.render(
  <NewTripPasses />,
  document.getElementById("new")
);
