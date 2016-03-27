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
    return {data: []};
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
          this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  onHandleAccept: function(id){
    $.ajax({
      url: Routes.trip_pass_accept_path(this.props.data.id),
      type: 'post',
      success: function(data){
        this.loadTripsFromServer();
      }.bind(this),
      error: function(xhr, status, err){
        alert("An Error Occured!");
        console.error(err.toString());
        console.error(xhr.status);
        console.error(xhr.responseText);
      }.bind(this)
    });
  },
  onHandleDecline: function(id){
    $.ajax({
      url: Routes.trip_pass_decline_path(this.props.data.id),
      type: 'post',
      success: function(data){
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
            <Trip_Pass_List data={this.state.data} handleAccept = {this.onHandleAccept} handleDecline = {this.onHandleDecline}/>
          </tbody>
        </table>
    )
  }
});

var Trip_Pass_List = React.createClass({
  onAccept: function(id){
    this.props.handleAccept(id);
  },
  onDecline: function(id){
    this.props.handleDecline(id);
  },
  render: function(){
    var tripNodes = this.props.data.map(function(trip){
      return (
          <Trip_Pass data = {trip} key = {trip.id} decline = {this.onDecline} accept = {this.onAccept}/>
      );
    });
    return (
      <tr>
        {tripNodes}
      </tr>
    );
  }
});

var Trip_Pass = React.createClass({
  handleAcceptSubmit: function (e){
    this.props.accept(this.props.id);
  },
  handleDeclineSubmit: function (e){
    this.props.decline(this.props.id);
  },
  render: function(){
    return (
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
            <button type = "button" onClick = {this.handleAcceptSubmit} className = "btn btn-info">Accept</button>
            <button type = "button" onClick = {this.handleDeclineSubmit} classId = {this.props.id} data-target = {this.props.id} data-toggle = "modal" className = "btn btn-default">Decline</button>
          </div>
        </td>
       </tr>
    )
  }
});

ReactDOM.render(
  <NewTripPasses />,
  document.body
);
