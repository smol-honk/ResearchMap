var DeclinedTripPasses = React.createClass({
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function(){
    this.loadTripsFromServer();
  },
  loadTripsFromServer: function(){
    $.ajax({
      url: Routes.declined_passes_path(),
      type: 'get',
      dataType: 'json',
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(err.toString());
        console.error(xhr.status);
        console.error(xhr.responseText);
      }.bind(this)
    });
  },
  render: function(){
    return(
      <div>
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
              <Trip_Pass_List data={this.state.data} />
            </tbody>
          </table>
      </div>
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
      <tr>
        {tripNodes}
      </tr>
    );
  }
});

var Trip_Pass_No_Button = React.createClass({
  handleAcceptSubmit: function (){
    console.log(this.props.data.id);
    console.log(this.props);
    this.props.onPassAccept(this.props.data.id);
  },
  handleDeclineSubmit: function (){
    this.props.onPassDecline(this.props.data.id);
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
            <button type = "button" onClick = {this.handleAcceptSubmit} className = "btn btn-info">{this.props.button}</button>
          </div>
        </td>
       </tr>
    )
  }
});

ReactDOM.render(
  <AcceptedTripPasses />,
  document.getElementById('declined')
);
