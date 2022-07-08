
'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var messageArea = document.querySelector('#messageArea');
var welcomeForm = document.querySelector('#usernameForm');
var dialogueForm = document.querySelector('#messageForm');
var connectingElement = document.querySelector('.connecting');
var messageInput =  document.querySelector('#message');

var stompClient = null;
var name = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];
function connect(event) {
    name = document.querySelector('#name').value.trim();

    if (name) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('/websocketApp');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, connectionSuccess, onError);
    }
    event.preventDefault();
}

function connectionSuccess() {
    stompClient.subscribe('/topic/java', onMessageReceived);

    stompClient.send("/app/chat.newUser",
        {},
        JSON.stringify({sender : name, type : 'newUser'}))

}

function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}

function sendMessage(event) {
    var messageContent = messageInput.value.trim();

    if (messageContent && stompClient) {
        var chatMessage = {
            sender : name,
            content : messageInput.value,
            type : 'CHAT'
        };

        stompClient.send("/app/chat.sendMessage", {}, JSON
            .stringify(chatMessage));
        document.querySelector('#message').value = '';
    }
    event.preventDefault();
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if (message.type === 'newUser') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined the chat';
    } else if (message.type === 'Leave') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left the chat';
    } else {
        messageElement.classList.add('message-data');

        var avatarElement = document.createElement('i');
        var text = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(text);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;

}

function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
}

welcomeForm.addEventListener('submit', connect, true)
dialogueForm.addEventListener('submit', sendMessage, true)