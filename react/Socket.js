// 컴포넌트 안에 복붙 

let stompClient;

  // http://localhost:3000/gs-guide-websocket 소켓 주소
  function connect() {
    let socket = new SockJS("http://localhost:3000/gs-guide-websocket");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log("소켓연결 성공: " + frame);
      stompClient.subscribe("/topic/greetings");
    });
  }

  function sendMsg() {
    stompClient.publish({
      destination: "/app/hello",
      body: JSON.stringify({ name: "바디테스트" }),
    });
    //send("/app/hello", {}, JSON.stringify({ name: "테스트" }));
  }

  useEffect(() => {
    connect();
  }, []);
