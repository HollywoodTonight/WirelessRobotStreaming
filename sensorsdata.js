$(function() {

  $.getJSON('api', updateSensors);

  function updateSensors(data){
    var output = '';

    $.each(data,function(key,item){

output += '      				<table class="table table-striped table-hover">';
output += '      					<thead>';
output += '      						<tr>';
output += '      							<th>name</th>';
output += '      							<th>value</th>';
output += '      							<th>activity</th>';
output += '      							<th>last update</th>';
output += '      							<th>action</th>';
output += '      						</tr>';
output += '      					</thead>';
output += '      					<tbody>';
output += '      						<tr class="selected">';
output += '      							<td>Temperature Sensor</td>';
output += '      							<td id="tempValue">' + item.Tvalue + '</td>';
output += '      							<td id="tempStatus">' + item.Tstatus + '</td>';
output += '      							<td id="tempTime">' + item.TlastUpdate + '</td>';
output += '      							<td>';
output += '      							<input id="tempDetails" class="btn btn-primary btn-lg" type="button" value="Get details" />';
output += '      							</td>';
output += '      						</tr>';
output += '      						<tr class="selected">';
output += '      							<td>Humidity Sensor</td>';
output += '      							<td>' + item.Hvalue + '</td>';
output += '      							<td>' + item.Hstatus +'</td>';
output += '      							<td>' + item.HlastUpdate + '</td>';
output += '      							<td>';
output += '      							<input id="humidityDetails" class="btn btn-primary btn-lg" type="button" value="Get details" />';
output += '      							</td>';
output += '      						</tr>';
output += '      						<tr class="selected">';
output += '      							<td>Whatever Sensor</td>';
output += '      							<td>' + item.Wvalue +'</td>';
output += '      							<td>' + item.Wstatus +'</td>';
output += '      							<td>' + item.WlastUpdate + '</td>';
output += '      							<td>';
output += '      							<input id="otherDetails" class="btn btn-primary btn-lg" type="button" value="Get details" />';
output += '      							</td>';
output += '      						</tr>';
output += '      					</tbody>';
output += '      				</table>';

    });

    $('.alexTable').html(output);
  }

});
