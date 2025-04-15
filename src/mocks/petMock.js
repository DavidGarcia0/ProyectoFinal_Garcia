import { faker } from '@faker-js/faker';

export function generateMockPets(quantity) {
  const pets = [];
  for (let i = 0; i < quantity; i++) {
    pets.push({
      name: faker.animal.dog(),
      species: faker.animal.type(),
      age: faker.number.int({ min: 1, max: 15 }),
      adopted: false,
      owner: null,
    });
  }
  return pets;
}
