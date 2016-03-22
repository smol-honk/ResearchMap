@PassForm = React.createClass
  getInitialState: ->
    location: ''
    dateStart: ''
    dateEnd: ''
  valid: ->
    @state.location && @state.dateStart && @state.dateEnd
  handleChange: (e) ->
    name = e.target.name
    @setState "#{name}": e.target.value

  handleSubmit: (e) ->
    e.preventDefault()
    $.post '', {trip_pass: @state}, (data) =>
      @props.handleNewTripPass data
      @setState @getInitialState()
      , 'JSON'
  render: ->
    React.DOM.form
      className: 'form-inline'
      onSubmit: @handleSubmit
      React.DOM.div
        className: 'form-group'
        React.DOM.input
          type: 'text'
          className: 'form-control'
          placeholder: 'Location'
          name: 'location'
          value: @state.location
          onChange: @handleChange
      React.DOM.div
        className: 'form-group'
        React.DOM.input
          type: 'date'
          className: 'form-control'
          placeholder: 'Arrival'
          name: 'arrival'
          value: @state.dateStart
          onChange: @handleChange
      React.DOM.div
        className: 'form-group'
        React.DOM.input
          type: 'date'
          className: 'form-control'
          placeholder: 'Departure'
          name: 'departure'
          value: @state.dateEnd
          onChange: @handleChange
      React.DOM.button
        type: 'submit'
        className: 'btn btn-primary'
        disabled: !@valid()
        'Create TripPass'
