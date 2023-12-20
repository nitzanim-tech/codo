const examplecode = `# write your code here`;
const elevatorAns = `A_location = int(input("Enter A floor:"))
B_location = int(input("Enter B floor:"))
people_position = int(input("Enter Alice floor:"))

dist_from_A = A_location - people_position
if dist_from_A < 0:
    dist_from_A *= -1
dist_from_B = B_location - people_position
if dist_from_B < 0:
    dist_from_B *= -1

if dist_from_A < dist_from_B:
    print('A')
else:
    print('B')`;


const triangleAns = `
a = int(input("Please enter A side:"))
b = int(input("Please enter B side:"))
c = int(input("Please enter C side:"))
if (a+b>c and b+c>a and a+c>b):
    print("The triangle can be constructed") 
else: 
    print("The triangle cannot be constructed")`; 

const collatzAns = `
number = int(input('Please enter a number:'))
collatz_sum = number
while number > 1:
    if number % 2 == 0:
        number //= 2
    else:
        number = number * 3 + 1
    collatz_sum += number
    print(number)
print('The Collatz sum is '+ str(collatz_sum))
`;

const recycleAns = `
# RecycleChallange
fresh_bottles = int(input('Enter the fresh bottles number: '))
total = 0
while (fresh_bottles >= 3):
    rest = fresh_bottles % 3
    total += fresh_bottles - rest
    print('fresh = '+str(fresh_bottles)+', lets use ' + str(fresh_bottles - rest))
    fresh_bottles = fresh_bottles // 3 + rest
    print('new fresh = '+str(fresh_bottles))

print('total = ' + str(total + fresh_bottles))
`;
export { examplecode };
