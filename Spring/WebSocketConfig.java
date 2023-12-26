package com.example.pj2be.config.websocket;


import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // 웹소켓 통신경로를 설정
    // enableSimpleBroker: 발행자(요청자)가 해당경로로 메시지를 주면 가공없이 바로 구독자(다른 클라이언트)들에게 전달
    // setApplicationDestinationPrefixes: 발행자(요청자)가 해당 경로로 메시지를 주면 구독자(다른 클라이언트)들에게 전달
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue"); // /topic/... 모든 클라이언트, /queue/... 특정 클라이언트
        registry.setApplicationDestinationPrefixes("/app"); // /app/.. 경로로 메시지를 보내면 이 메시지는 @MessageMapping 어노테이션이 붙은 곳으로 향한다.

    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")  // 커넥션을 맺는 경로 설정.
                .withSockJS(); // 프론트에서 SockJS 같이 사용하는 경우


    }
}
