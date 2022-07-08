/**
 * @author - Chamath_Wijayarathna
 * Date :7/8/2022
 */


package com.cog.websocket.service;


import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stomp-endpoint").withSockJS();// Endpoint to client connect Backend server and Connecting with SockJS

    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");// Prefix for application
        registry.setApplicationDestinationPrefixes("/app");
        System.out.println(registry+"ssssssssssssssssssssssssssssssssssssssssssssssssssssss");
    }
}
