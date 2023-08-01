list = ["100", "100", 1, 2, 3, "xiumin", "sum", 100, 200, 100, 200]
answer = []
print(list)

for i in list:
    if i not in answer:
        answer.append(i)

print(answer)
