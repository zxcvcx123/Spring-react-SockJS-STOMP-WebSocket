package com.example.pj2be.config.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketHandler webSocketHandler;


    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/main")
                .setAllowedOrigins("*");
    }
}
    /*

        기본적인 웹소켓 흐름: 사용자가 로그인 하면 세션정보를 받고 웹소켓을 연결만 시켜두고,
        실시간 통신(웹소켓 통신)이 필요한 시점에 이벤트를 발생시켜 서버가 일하게 하고,
        사용자가 로그아웃하면 세션도 끊고 웹소켓 연결도 끊으면 된다.

        registry.addHandler(webSocketHandler, "/"): 두번째 인자 값으로는 엔드포인트 주소가 들어간다.
                                                    엔드포인트주소를 "/socket" 로 설정하면 프론트 쪽에서도 똑같이
                                                    웹 서버랑 통신할 소켓 주소를 "/socket" 로 맞춰 줘야 통신이 된다.
                                                    보통 첫 로그인하고 사용자의 세션 정보가 확보가 될 때 웹 소켓을 서로 연결 시켜주고
                                                    만약 로그인에 성공해 세션정보가 있고 메인홈페이지 ("/")로 이동되면 웹소켓 연결을 할 수 있게 설정 가능하다.

        setAllowedOrigins(): origin의 형태는 프로토콜, 호스트, 포트로 이루어져 있다.
                            현재는 테스트 중이기 때문에 ("*") 으로 모든 origin을 허용 시켜두지만
                            나중에 실제 서비스 할 단계에서는 우리의 홈페이지 주소 https://홈페이지주소.com 으로 입력해야한다.
                            https (프로토콜), 홈페이지주소(호스트), com(포트)

     */

