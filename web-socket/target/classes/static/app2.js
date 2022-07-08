var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        console.log(" ssssssssssssssssssssssssssss")
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/stomp-endpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected STOMP clients can communicate with any STOMP message broker: ' + frame);

        stompClient.subscribe('/topic'
            , function (greeting) {
            alert((JSON.parse(greeting.body)).name)
            showGreeting(JSON.parse(greeting.body));
        }
        );
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
   // stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
    stompClient.send("/app/hello2", {}, JSON.stringify({'name': $("#name").val()}));
}

function showGreeting(message) {
    alert(message.message)
    $("#greetings").append("<tr><td>" + message.message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

