```
var person = {
  name: '홍길동', // 이름 프로퍼티를 정의함.
  birthday: '030219', // 생년월일 프로퍼티를 정의함.
  age: 30,
  pId: '1234567',
  fullId: function () {
    // 생년월일과 개인 id를 합쳐서 주민등록번호를 반환함.
    return birthday + pId;
  },
};
console.log(person.fullId());

```

![image](https://github.com/leesuuuuumm/Seoul-ICT-AI-Web-Dev-Camp/assets/58407737/96a3ae86-fade-47e7-a56a-9be0037a4e4a) 
</br> 

에러가난다.

### 이유?
1. 객체의 프로포티에 접근하려고 할 때, 참조 하려면 this라는 것을 붙여줘서 써야한다.
2. this는 현재 속한 객체를 가르키는 변수를 호출할 때 사용하는 것이다.


</br>

```
var person = {
  name: '홍길동', // 이름 프로퍼티를 정의함.
  birthday: '030219', // 생년월일 프로퍼티를 정의함.
  age: 30,
  pId: '1234567',
  fullId: function () {
    // 생년월일과 개인 id를 합쳐서 주민등록번호를 반환함.
    return this.birthday + this.pId;
  },
};
console.log(person.fullId());

```

![image](https://github.com/leesuuuuumm/Seoul-ICT-AI-Web-Dev-Camp/assets/58407737/c7d77642-1e26-47f4-a5ba-6d111d17cc6f) </br>

결과가 잘 출력된다.
