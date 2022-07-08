/**
 * @author - Chamath_Wijayarathna
 * Date :7/8/2022
 */


package com.cog.websocket.controller;


import com.cog.websocket.entity.User;
import com.cog.websocket.entity.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

@Controller
public class SocketController {
    @MessageMapping("/hello")// End point
    @SendTo("/topic")// Destination
    public void greet(@Payload User message) throws InterruptedException {
        Thread.sleep(2000);
        System.out.println( message.getName());
         new Message("Hello, " +
                HtmlUtils.htmlEscape(message.getName()));
    }
    @MessageMapping("/hello2")// End point
    @SendTo("/topic")// Destination
    public Message greet2(@Payload User message) throws InterruptedException {
        Thread.sleep(2000);
        System.out.println( message.getName()+" cccccccccccccccc");
       return new Message("Hello, " +
                HtmlUtils.htmlEscape(message.getName() + "ddddddddddddddddddddddd"));
    }

}
