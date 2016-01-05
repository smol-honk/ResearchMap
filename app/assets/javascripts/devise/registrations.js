$(function () {
  var checkbox = document.getElementById('researcher_available');
  var delivery_div = document.getElementById('dayorweek');
  var showHiddenDiv = function(){
     if(checkbox.checked) {
       delivery_div.style['display'] = 'block';
     } else {
       delivery_div.style['display'] = 'none';
     }
  }

  checkbox.onclick = showHiddenDiv;
  showHiddenDiv();
)};
