var DeclinedTripPasses = React.createClass({
  getInitialState: function(){
    return {data: [], btn: 'Accept'};
  },
  getDefaultProps: function(){
    return {data:[], btn: 'Accept'};
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
  onHandleAccept: function(id){
    this.setState({btn: 'Accepting...'});
    $.ajax({
      url: Routes.trip_pass_accept_path(id),
      type: 'post',
      success: function(data){
        this.loadTripsFromServer();
        this.setState({btn: 'Accept'});
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
  onHandleDecline: function(id){
    this.setState({btn: 'Declining...'});
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
    return(
      <Trip_Pass_List_One btn = {this.state.btn} data={this.state.data} handleAccept = {this.onHandleAccept} handleDecline = {this.onHandleDecline}/>
    );
  }
});

var Trip_Pass_List_One = React.createClass({
  accept_pass: function(id){
    this.props.handleAccept(id);
  },
  decline_pass: function(id){
    this.props.handleDecline(id);
  },
  render: function(){
    var tripNodes = this.props.data.map(function(trip){
      return (
          <Trip_Pass_One_Button btn = {this.props.btn} onPassAccept = {this.accept_pass} onPassDecline = {this.decline_pass}  data = {trip} key = {trip.id} />
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

var Trip_Pass_One_Button = React.createClass({
  handleClick: function (){
    if (this.props.btn === 'Accept'){
        this.props.onPassAccept(this.props.data.id);
    }
    else if (this.props.btn === 'Decline'){
      this.props.onPassDecline(this.props.data.id);
    }
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
              <button type = "button" onClick = {this.handleClick} className = "btn btn-info">{this.props.btn}</button>
            </div>
          </td>
        </tr>
      );
    }
  });

ReactDOM.render(
  <DeclinedTripPasses />,
  document.getElementById('declined')
);
