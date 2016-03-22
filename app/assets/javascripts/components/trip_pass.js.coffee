@Trip_Pass = React.createClass
  render: ->
    React.DOM.tr null,
      React.DOM.td null,
      React.DOM.td null, @props.trip_pass.location
      React.DOM.td null, @props.trip_pass.dateStart
      React.DOM.td null, @props.trip_pass.dateEnd
      React.DOM.td null, booleanFormat(@props.trip_pass.researcher_accept)
