import React, { createContext, useEffect, useRef, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { Spinner } from "@chakra-ui/react";

function Socket({ children }) {
  // 소켓 연결
  const stompClient = useRef(); // useRef로 connect()가 안끊기게하기

  // 소켓연결상태 관리
  const [IsConnected, setIsConnected] = useState(false);

  // 채팅
  const [chatId, setChatId] = useState("");
  const [chat, setChat] = useState([]);

  // 좋아요
  const [countLike, setCountLike] = useState(null);
  const [like, setLike] = useState(null);

  // 알람
  const [, set] = useState();

  useEffect(() => {
    connect();
  }, []);

  // 유효성검사 보내는쪽에서 이거 넣으면 됨
  // IsConnected false = 미연결;
  // IsConnected true = 연결;

  function connect() {
    console.log(stompClient.current);

    if (
      stompClient.current === undefined ||
      stompClient.current.connected === false
    ) {
      // 추천 연결방식
      stompClient.current = Stomp.over(function () {
        return new SockJS("http://localhost:3000/ws", "ws", {
          transports: ["websocket", "xhr-streaming", "xhr-polling"],
        });
      });

      // 연결
      if (stompClient.current.connected === false) {
        
        // 서버가 재시작 되도 자동 재연결 시간 설정
        stompClient.current.configure({
          reconnectDelay: 2000, // 2초
        });
        
        stompClient.current.connect({}, () => {
          chatSocket(); // 채팅
          boardLikeSocket(); // 좋아요
          setIsConnected(true);
        });
      }
    }
  }
  // 채팅
  const chatSocket = () => {
    console.log("채팅연결 성공");
    stompClient.current.subscribe("/topic/greetings", (res) => {
      const json = JSON.parse(res.body);
      setChatId(json.id);
      const newChat = [...chat];
      newChat.push(json.chat);
      setChat(newChat);
    });
  };

  // 게시판 좋아요 실시간
  const boardLikeSocket = () => {
    console.log("BoardLike에서 소켓연결");

    // 좋아요 실시간 최신화
    stompClient.current.subscribe("/topic/like", (res) => {
      console.log(res.body);
      const data = JSON.parse(res.body);
      setCountLike(data.countlike);
    });

    // 개인이 좋아요 했는지 안했는지 검증
    stompClient.current.subscribe(
      "/queue/like/" + localStorage.getItem("memberInfo"),
      (res) => {
        console.log(res.body);
        const data = JSON.parse(res.body);
        setLike(data.like);
      },
    );
  };

  // 댓글 알람
  const boardCommentAlramSocket = () => {
    console.log("댓글 알람 소켓연결");

    stompClient.current.subscribe(
      "/queue/comment/alarm/" + "테스트계정1",
      (res1) => {
        console.log(res1.body);
        const data1 = JSON.parse(res1.body);
        setLike(data1.like);
      },
    );
  };

  return (
    <SocketContext.Provider
      value={{
        stompClient,
        IsConnected,
        chat,
        chatId,
        countLike,
        setCountLike,
        like,
        setLike,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const SocketContext = createContext(null);
export default Socket;
