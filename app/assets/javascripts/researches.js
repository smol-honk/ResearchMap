$(function() {
    $('#researchStart').pickadate({
      selectYears: 150,
      selectMonths: true
    });
    $('#researchEnd').pickadate({
      selectYears: 150,
      selectMonths: true
    });
    $("#dateStart").attr("readonly", false);
    $("#dateEnd").attr("readonly", false);
    $('#dateStart').tooltip();
    $('#dateEnd').tooltip();
  });

  $(function() {
      $('#weekStart').pickadate({
        selectYears: 150,
        selectMonths: true
      });
      $('#weekEnd').pickadate({
        selectYears: 150,
        selectMonths: true
      });
      $('#day_date').pickadate({
        selectYears: 150,
        selectMonths: true
      });
      $("#dateStart").attr("readonly", false);
      $("#dateEnd").attr("readonly", false);
    });

$(function() {
    $('#fieldStart').pickadate({
      selectYears: 150,
      selectMonths: true});
    $('#fieldEnd').pickadate({
      selectYears: 150,
      selectMonths: true
    });
    $("#fieldStart").attr("readonly", false);
    $("#fieldEnd").attr("readonly", false);
    $('#fieldStart').tooltip();
    $('#fieldEnd').tooltip();
  });
