import examplePeople from "../json/examplePeople.json";
type examplePeopleI = {
  names: string[];
  surnames: string[];
};

export const getRandomPerson = () => {
  let randoms = {
    name: examplePeople.names[
      Math.floor(Math.random() * examplePeople.names.length)
    ],
    surname:
      examplePeople.surnames[
        Math.floor(Math.random() * examplePeople.surnames.length)
      ],
  };

  return {
    name: randoms.name,
    surname: randoms.surname,
    email: `${randoms.name.toLowerCase()}.${randoms.surname.toLowerCase()}@example.com`,
    username: `${randoms.name
      .toLowerCase()
      .slice(0, randoms.name.length / 2)}${randoms.surname
      .toLowerCase()
      .slice(randoms.name.length / 2, randoms.surname.length)}`,
    password: `${
      randoms.name[Math.floor(Math.random() * randoms.name.length)]
    }${randoms.surname.slice(
      3,
      randoms.surname.length - 1
    )}!${randoms.name[3].toUpperCase()}${Math.floor(Math.random() * 20)}${randoms.name.slice(1,4) + randoms.surname.slice(0,2)}`,
  };
};
