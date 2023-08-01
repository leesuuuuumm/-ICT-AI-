### 숫자끼리 비교하는 연산과 문자끼리 비교하는 연산 중 왜 문자끼리 비교하는 연산이 상대적으로 불리한지 이유에 대해서 정리해보고 샘플 코드를 구현해서 제출하기

1. 숫자는 단순한 값이므로 비교 연산이 빠르고 간단하지만, 문자열은 여러 글자로 이루어져 있어 각 글자를 비교하기 위해서는 길이에 따라 연산 비용이 증가한다.

2. 숫자는 컴퓨터 내부적으로 이진 형식으로 표현되어 있기 때문에 정수나 부동소수점의 크기만 비교하면 되기 때문에 어떤 숫자던 O(1)의 시간복잡도를 가진다.
반면에, 문자는 문자열이 길수록 연산 시간이 증가하고 문자열 길이가 n인 경우 O(n)의 시간 복잡도를 가진다.



[샘플 코드] </br>

``` 
import time

start_time = time.time()
for i in range(1000000):
    if i < 100:
        pass

end_time = time.time()

print("숫자 비교 시간: ", end_time - start_time)


start_time = time.time()

for i in range(1000000):
    if str(i) < "100":
        pass

end_time = time.time()

print("문자 ", end_time - start_time)

```
</br>

"100" 과 100의 시간 차이의 결과 </br>

![image](https://github.com/leesuuuuumm/Seoul-ICT-AI-Web-Dev-Camp/assets/58407737/3de4a271-2a1c-4f2c-ab6d-780dd5e2fe50)
