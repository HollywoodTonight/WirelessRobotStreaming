var socket = io();

socket.on('connect', function(){

        $(document).ready(function() {
          $(document).keydown(function(key) {
              switch(parseInt(key.which,10)) {
      			// D key pressed
      			case 68:
      				socket.emit('postKeyPressed',{
                keyPressed: 'D',
              });
      				break;
      			// W Pressed
      			case 87:
      				socket.emit('postKeyPressed',{
                keyPressed: 'W',
              });
      				break;
      			// A Pressed
      			case 65:
      				socket.emit('postKeyPressed',{
                keyPressed: 'A',
              });
      				break;
      			// S Pressed
      			case 83:
      				socket.emit('postKeyPressed',{
                keyPressed: 'S',
              });
      				break;
      		}
      	});


        $('#moveForward').click(function(){
            $(this).css('background-color', '#FF0000');
            socket.emit('forwardButtonPressed',{
              buttonPressed: 'forward',
            });
        });

        $('#moveLeft').click(function(){
            $(this).css('background-color', '#FF0000');
            socket.emit('leftButtonPressed',{
              buttonPressed: 'left',
            });
        });

        $('#moveRight').click(function(){
            $(this).css('background-color', '#FF0000');
            socket.emit('rightButtonPressed',{
              buttonPressed: 'right',
            });
        });

        $('#moveBack').click(function(){
            $(this).css('background-color', '#FF0000');
            socket.emit('backButtonPressed',{
              buttonPressed: 'back',
            });
        });

        $('#tempDetails').click(function(){
            //$(this).css('background-color', '#FF0000');
            socket.emit('tempDetailsPressed',{
              buttonPressed: 'temperatureDetails',
            });
        });

        socket.on('temperaturePostDetails', function(data){
        showSensors(data);
        });

      });//document ready function

});//socket

function showSensors(data){
  var temperature = document.querySelector('#tempValue');
  var status = document.querySelector('#tempStatus');
  var updateTime = document.querySelector('#tempTime');

  temperature.innerHTML = data.temperature;
  status.innerHTML = data.activity;
  updateTime.innerHTML = data.time;
}
