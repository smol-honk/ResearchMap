// trip_passes.js

$(function() {
  var start, end;
  var s, e;
  var sYear, sMonth;
  var sDay, eYear;
  var eDay, eMonth;
  var r = document.getElementById('research');
  var rSelect = document.getElementById('researchSelect');
  dateChange(r.value);

  rSelect.onchange = function(){
    dateChange(r.value);
  }

  function dPicker(sDate, eDate){
    var $input = $('#dateStart').pickadate();
    var $input2 = $('#dateEnd').pickadate();
    var picker = $input.pickadate('picker');
    var picker2 = $input2.pickadate('picker');

    picker.set('min', sDate);
    picker.set('max', eDate);
    picker2.set('min', sDate);
    picker2.set('max', eDate);


    $("#dateStart").attr("readonly", false);
    $("#dateEnd").attr("readonly", false);
    $('#dateStart').tooltip();
    $('#dateEnd').tooltip();
  }

  function dateChange(val){
    $.ajax({
      url: Routes.research_path(val),
      type: 'get',
      dataType: 'json',
      success: function(data){
        start = data.weekStart;
        end = data.weekEnd;
        s = new Date(start);
        e = new Date(end);
        sYear = s.getFullYear();
        sMonth = s.getMonth();
        sDay = s.getDate() +1;
        eYear = e.getFullYear();
        eMonth = e.getMonth();
        eDay = e.getDate()+1;
        var sDate = [sYear,sMonth,sDay];
        var eDate = [eYear,eMonth,eDay];
        if (start === null){
          sDate = false;
        }
        if (end === null){
          eDate = false;
        }
        dPicker(sDate, eDate);
      }.bind(this),
      error: function(xhr, status, err){
        alert(err.toString());
      }.bind(this)
    });
  }
});

$(function() {
    $("#geocomplete").geocomplete()
        .bind("geocode:result", function(event, result) {
          $.log("Result: " + result.formatted_address);
        })
        .bind("geocode:error", function(event, status) {
          $.log("ERROR: " + status);
        })
        .bind("geocode:multiple", function(event, results) {
          $.log("Multiple: " + results.length + " results found");
    });

    $("#find").click(function() {
        $("#geocomplete").trigger("geocode");
    });

    $("#examples a").click(function() {
        $("#geocomplete").val($(this).text()).trigger("geocode");
        return false;
    });
});
