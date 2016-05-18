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
  onHandleAccept: function(id){
    this.setState({btnAccept: 'Accepting..'});
    $.ajax({
      url: Routes.trip_pass_accept_path(id),
      type: 'post',
      success: function(data){
        this.props.updateAll();
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
    this.setState({btnDecline: 'Declining'});
    $.ajax({
      url: Routes.trip_pass_decline_path(id),
      type: 'post',
      success: function(data){
        alert("Please message the user about why you declined.");
        this.props.updateAll();
      }.bind(this),
      error: function(xhr, status, err){
        alert("An Error Occured!");
        console.error(err.toString());
        console.error(xhr.status);
        console.error(xhr.responseText);
      }.bind(this)
    });
  },
  render: function(){
    return (
          <Trip_Pass_List btnDecline = {this.state.btnDecline} btnAccept = {this.state.btnAccept} data={this.props.data} handleAccept = {this.onHandleAccept} handleDecline = {this.onHandleDecline}/>
    )
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
    var tripNodes = this.props.data.map(function(trip){
      return (
          <Trip_Pass btnDecline = {this.props.btnDecline} btnAccept = {this.props.btnAccept} onPassAccept = {this.accept_pass} onPassDecline = {this.decline_pass}  data = {trip} key = {trip.id} />
      );
    }, this);
    return (
      <div className = "table-reponsive">
          <table className = 'tripPassTable table-striped table-hover'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Accepted?</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tripNodes}
            </tbody>
          </table>
      </div>
    );
  }
});

var Trip_Pass = React.createClass({
  getInitialState: function(){
    return {btnAccept: 'Accept', btnDecline: 'Decline'};
  },
  handleAcceptSubmit: function (){
    this.props.onPassAccept(this.props.data.id);
    this.setState({btnAccept: 'Accepting...'});
  },
  handleDeclineSubmit: function (){
    this.props.onPassDecline(this.props.data.id);
    this.setState({btnDecline: 'Declining...'});
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
              <button type = "button" onClick = {this.handleAcceptSubmit} className = "btn btn-info">{this.state.btnAccept}</button>
              <button type = "button" onClick = {this.handleDeclineSubmit} classId = {this.props.id} data-target = {this.props.id} data-toggle = "modal" className = "btn btn-default">{this.state.btnDecline}</button>
            </div>
          </td>
      </tr>
      );
    }
  });
