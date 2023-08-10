# 1. HTTP 헤더에 부분에 Connection 키라는 값 중 Keep-alive라는 옵션이 있음. 이것이 무엇인지 http를 사용하는데 대한 역할과 어떤 상황에서 사용되는지 알아보기

### Persistent Connection
HTTP에서 persistent connection을 사용하는 이유는 `site locality` 때문이다. </br>

site locality란? </br>
웹에서 특정 페이지를 보여주기 위해 서버에 연속적으로 이미지 request를 보내는 것처럼, 서버에 연속적으로 동일한 클라이언트가 여러 요청을 보낼 가능성이 높은 경우를 의미한다. </br>

</br>

이러한 경우가 많아져서 HTTP/1.1부터는 HTTP 어플리케이션이 TCP connection을 요청 마다 close하지 않고, 재사용할 수 있는 방법을 제공한다. </br>
이러한 요청이 처리된 후에서 connection을 유지하는 경우 `persistent connection` 이라고 표현한다. </br>

</br>

즉, 통신의 주체인 서버와 클라이언트 중 하나가 명시적으로 connection을 close하거나 정책적으로 close될 때까지 계속 연결을 유지하는 경우를 의미한다. </br> </br>

요청할 때마다 3-way handshake를 매번 할 필요가 없어 </br>

1. 네트워크 혼잡 감소: TCP, SSL.TCP connection request 수가 줄면서
2. 네트워크 비용 감소: 여러 개의 connection으로 하나의 client 요청을 serving하는 것보다 한 개의 connection으로 client 요청을 serving하는게 더 효율적이다.
3. latency 감소: 3-way handshake을 맺으면서 필요한 round-trip이 줄어들기 때문에 그만큼 latency가 감소한다. `(latecy: 지연시간)`

</br>
</br>


###  HTTP Keep alive란?
HTTP Keep alive는 `persistent connection`을 맺는 기법 중 하나로, 하나의 TCP connection을 활용해서 여러개의 HTTP request/response를 주고받을 수 있도록 해준다. </br>

Keep alive 옵션은 설계상 여러 문제점(e.g proxy 문제)가 생기면서 HTTP/1.1 부터는 사용되고 있지는 않지만 아직도 많은 웹 어플리케이션에서 사용하고 있기 때문에 이해해둘 필요가 있다. </br>

keep alive가 있기 전, HTTP/1.0 connetion은 하나의 request에 응답할 때마다 connection을 close하도록 설정되어있다. 이 말은 연속적으로 여러 request를 보낼 때마다 계속해서 connection을 맺었다 끊었다 해야하는 부하가 생긴다. </br>

### 하지만 keep alive 옵션을 활용하게 되면 persistent하게 connection을 유지할 수 있도록하여 불필요한 연결의 맺고 끊음을 최소화시켜 네트워크 부하를 줄여준다. 

![image](https://github.com/leesuuuuumm/Seoul-ICT-AI-Web-Dev-Camp/assets/58407737/a2c1349a-0c7b-435f-9b98-1d55eb23b00b)

</br>

#### 사용 방법

keep-alive를 사용하는 경우 HTTP 요청 헤더에 Connection: Keep-Alive라는 값을 포합 시킨다. </br>

```
HTTP/1.1 200 OK
Connection: Keep-Alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Thu, 11 Aug 2016 15:23:13 GMT
Keep-Alive: timeout=5, max=1000
Last-Modified: Mon, 25 Jul 2016 04:32:39 GMT
Server: Apache

(body)
```

</br></br>

### (번외) Keep-alive와 proxy 문제
일반적으로 HTTP는 클라이언트와 서버 사이에 프록시 서버, 캐시 서버 등과 같은 중개 서버가 놓이는 것을 허락한다. </br>

![image](https://github.com/leesuuuuumm/Seoul-ICT-AI-Web-Dev-Camp/assets/58407737/8ccfd51a-5bd2-4124-b318-dd9891d9060e) </br>

1. 웹 클라이언트는 프록시에 connetion을 한다: keep-alive 헤더와 함께 메시지를 전송한다.
2. 클라이언트는 커넥션을 유지하자는 요청에 대한 응답을 확인하기 위해 기다린다.
3. 멍청한 proxy는 요청받은 HTTP의 Connection 헤더를 이해하지 못한다.
4. proxy는 keep-alive를 모르기 때문에 다음 서버에 메시지를 그대로 전달한다.
5. Connection 헤더는 홉별 헤더였다. (특정 두 서버에만 영향을 끼치는 경우)
6. 문제가 발생 -> 서로 소통 되지 않아, 브라우저는 무한정 대기 하다 TimeOut이 나서 Connection이 끊기게 된다.

