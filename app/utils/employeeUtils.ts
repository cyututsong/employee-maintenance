const Member = [
  { firstname: "Rodney", Lastname: "Ramos", age: 34 },
  { firstname: "Claire", Lastname: "Crisologo", age: 33 },
  { firstname: "Claire", Lastname: "Ramos", age: 28 },
  { firstname: "Callie", Lastname: "Ramos", age: 5 },
  { firstname: "Raizel", Lastname: "Crisologo", age: 28 },
  { firstname: "Jude", Lastname: "Crisologo", age: 28 }
];

type Employee = {
  firstname: string;
  lastname: string;
  age: number;
};

export function getAge({ typeName }: { typeName: string }): Employee[] {
  const found = Member.filter((member) => member.firstname === typeName);

  // return empty array if none found
  if (found.length === 0) return [];

  return found.map((member) => ({
    firstname: member.firstname,
    lastname: member.Lastname, // fix capitalization mismatch here
    age: member.age
  }));
}
