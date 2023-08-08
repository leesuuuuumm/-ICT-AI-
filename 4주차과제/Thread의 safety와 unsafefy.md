# 과제 주제 : Thread의 safety와 unsafety에 대해서 공부하고 스터디하여 메모하기

## 1. Thread-safety와 unsafety란 무엇인가?
### Thread Safety
- 멀티 쓰레드로 동작하는 프로그램에서 공유되는 자원이 존재할 때 해당 자원이 개발자의 의도대로 동작할 것임을 보장한다는 의미이다.
- 하나의 함수가 한 스레드로부터 호출되어 실행 중일 때, 다른 스레드가 그 함수를 호출하여 동시에 함께 실행되더라도 각 스레드에서의 함수의 수행 결과가 옳바르게 나오는 것이다.
- 두 개 이상의 스레드가 `race condition`에 들어가거나 같은 객체에 동시에 접근해도 연산 결과는 정합성이 보장될 수 있게 메모리에 가시성이 확보된 상태이다.

* 멀티 스레드는 멀티 프로세스와는 다르게 메모리 영역을 공유해준다.

</br>
</br>

### Tread unsafety Ex
멀티 스레드로 동작하는 방식으로 개발자의 의도대로 공유 자원의 데이터 값이 보장되지 않는 경우를 `Thread Unsafety`라 한다. </br>

아래의 예시는 내부 인스턴스 변수인 amount를 plus 메소드를 통해 값을 변경할 수 있게 한다. </br>

현재 `Python`을 학습하고 있지만, 아직 익숙한 `Java` 코드로 작성하였다.

```
class Dog {
	private int age;

	public Dog() {
		age = 0;
	}

	public void plus(int val) {
		age += val;
	}

	public int getAge() {
		return age;
	}
}

public class ThreadTest {
	public static void main(String[] args) {
		ThreadTest t = new ThreadTest();
		t.runCommonAge();
	}
	public void runCommonAge() {
		Dog d = new Dog();
		Unsafetythread thd1 = new Unsafetythread(d, true);
		Unsafetythread thd2 = new Unsafetythread(d, true);
		
		thd1.start();
		thd2.start();
		
		try {
			thd1.join();
			thd2.join();
			
			System.out.println("Final val is "+d.getAge());
		}catch(InterruptedException ex) {
			ex.printStackTrace();
		}

	}
}

class Unsafetythread extends Thread {
	private Dog d;
	private boolean addFlag;

	public Unsafetythread(Dog d, boolean addFlag) {
		this.d = d;
		this.addFlag = addFlag;
	}

	public void run() {
		for (int loop = 0; loop < 10000; loop++) {
			if (addFlag) {
				d.plus(1);
			}
		}
	}

}


}

```
</br>

실행 결과 </br>
![image](https://github.com/leesuuuuumm/Seoul-ICT-AI-Web-Dev-Camp/assets/58407737/7eab1d26-6b50-4740-8548-cd025e202a7e)
![image](https://github.com/leesuuuuumm/Seoul-ICT-AI-Web-Dev-Camp/assets/58407737/fd980539-8a2c-43ee-b2da-82b9a3fa6f4a) </br>

기대했던 값 `20000` 과는 다르게 돌릴때마다 다른 값이 나온다. </br>

그 이유는 class instance 변수를 공유하며 발생한 `Thread Unsafety` 때문이다. </br>

![image](https://github.com/leesuuuuumm/Seoul-ICT-AI-Web-Dev-Camp/assets/58407737/b32f78b2-3185-4823-ac02-887fff9aeff6) </br>

thd1에서 age를 2로 바꾸기 전 thd2에서 age를 1로 읽어가버리기 때문에 3이 되었어야할 것이 th1과 동일하게 2가 되어버렸다. </br>

`unsafety`한 결과를 `safety`하게 보장하길 원한다면 plus 메소드에 `Synchronized`만 추가해주면 된다. </br>

![image](https://github.com/leesuuuuumm/Seoul-ICT-AI-Web-Dev-Camp/assets/58407737/827a53e2-3fbc-4a6d-a019-31f8c0872b2d) </br>
![image](https://github.com/leesuuuuumm/Seoul-ICT-AI-Web-Dev-Camp/assets/58407737/9673bee9-bdea-4113-9e79-be8c6f5fef9d)


</br>

## Thread Safety Ex
Synchronized 메소드가 되면 하나의 스레드에서 해당 메소드를 호출했을 때 다른 쓰레드에서는 호출할 수 없게 해주는 역할을 한다. </br>
이렇게 되면 각 thread 마다 plus 메소드를 수행한 결과가 모두 인스턴스 변수에 반영할 수 있다.

parameter로 주어지는 지역변수 val은 인스턴스 변수와 달리 각 thread 별로 관리되는 것을 알 수 있다. 지역변수가 thread별로 관리된다는 것은 서로 다른 thread에 영향을 받지 않고 각 thread마다 독립적으로 관리된다. </br>
즉, 지역변수가 thread0safe하다는 것을 의미한다. </br>

![image](https://github.com/leesuuuuumm/Seoul-ICT-AI-Web-Dev-Camp/assets/58407737/ac3ea8b3-b81c-4d2d-9c9c-6baed14eab7a)

Runtime Data Area는 다음과 같이 각 Thread별로 JVM stack을 지닌다. 메소드가 호출되면 해당 메소드 정보와 매개변수 정보는 JVM stack에 저장된다. </br>
이때, JVM stack은 다른 스레드와 공유되지 않고 각 스레드마다 존재하고 있기 때문에 멀티 스레드 환경에서도 다른 스레드에 영향을 받지 않아 Thread-safe 할 수 있다는 것이다.

</br>
</br>

## 2. 이러한 특성이 생기는 이유는 무엇인가?
공유 자원에 대한 동시 접근을 막지 못한다면, N명이 동시에 한 통장에 있는 100만원을 출금한다고 하면 문제가 생길 수 있다. </br>
스레드끼리 공유하는 힙, 데이터, 코드 영역의 자원 접근을 최소화하고 스레드가 독립적으로 가지는 스택 영역의 자원만 사용하도록 하기 위해서 인것 같다. </br> 
공유 자원을 최대한 줄여 각각의 스레드에서만 접근 가능한 저장소들을 사용함으로써 동시 접근을 막기 위해 Thread-safy라는 말이 생긴 것 같다. </br>
