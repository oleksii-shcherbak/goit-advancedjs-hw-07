class Key {
  constructor(private signature: number = Math.random()) {}

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean;
  protected tenants: Person[];

  constructor(protected key: Key) {
    this.door = false;
    this.tenants = [];
  }

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      this.door = false;
      console.log('The person is in the house. They closed the door behind them.');
    } else {
      console.log('The door is locked! This person is not able to come in.');
    }
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log('The door is opened with the key.');
    } else {
      console.log('You have got the wrong key! The door is locked.');
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

// Another person with wrong key
const key1 = new Key();
const person1 = new Person(key1);
house.openDoor(person1.getKey());
house.comeIn(person1);


export {};