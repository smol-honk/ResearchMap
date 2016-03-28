var AcceptedTripPasses = React.createClass({
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function(){
    this.loadTripsFromServer();
  },
  loadTripsFromServer: function(){
    $.ajax({
      url: Routes.accepted_passes_path(),
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

ReactDOM.render(
  <AcceptedTripPasses />,
  document.getElementById('accepted')
);
