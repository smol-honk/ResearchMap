@TripPasses = React.createClass
  getInitialState: ->
    trip_passes: @props.data
  getDefaultProps: ->
    trip_passes: []
  acceptPass: (trip_pass) ->

  addPass: (trip_pass) ->
    trip_passes = @state.trip_passes.slice()
    trip_passes.push trip_pass
    @setState trip_passes: trip_pass
  render: ->
    React.DOM.div
      className: 'trip_passes'
      React.DOM.h2
        className: 'title'
        'Trip Passes'
      React.createElement PassForm, handleNewTripPass: @addPass
      React.DOM.tr null
      React.DOM.table
        className: 'table table-striped'
        React.DOM.thead null,
          React.DOM.tr null,
            React.DOM.th null, 'Name'
            React.DOM.th null, 'Location'
            React.DOM.th null, 'Arrival'
            React.DOM.th null, 'Departure'
            React.DOM.th null, 'Accepted'
        React.DOM.tbody null,
          for trip_pass in @state.trip_passes
            React.createElement Trip_Pass, key: trip_pass.id, trip_pass: trip_pass
