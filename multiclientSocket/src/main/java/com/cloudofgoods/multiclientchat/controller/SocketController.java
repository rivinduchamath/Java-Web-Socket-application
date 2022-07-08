package com.cloudofgoods.multiclientchat.controller;


import com.cloudofgoods.multiclientchat.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class SocketController {

	@MessageMapping("/hello")
	@SendTo("/topic")
	public Message register(@RequestBody Message chatMessage, SimpMessageHeaderAccessor headerAccessor) {
		headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
		return chatMessage;
	}

	@MessageMapping("/send")
	@SendTo("/topic")
	public Message sendMessage(@Payload Message chatMessage) {
		return chatMessage;
	}

}
