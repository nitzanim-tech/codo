const examplecode = `A_location = int(input("Enter A floor:"))
B_location = int(input("Enter B floor:"))
people_position = int(input("Enter people floor:"))

dist_from_A = A_location - people_position
if dist_from_A < 0:
    dist_from_A *= -1
dist_from_B = B_location - people_position
if dist_from_B < 0:
    dist_from_A *= -1

if dist_from_A < dist_from_B:
    print('A')
else:
    print('B')`;

export { examplecode };
