interface User {
  fisrtName: string,
  lastName: string,
  email?: string,  // optional
  age: number
}

function isLegal(user: User) {
  if (user.age > 18) {
    return true;
  } else {
    return false;
  }
}

const s = isLegal({
  fisrtName: "n",
  lastName: "v",
  email: "nv@g.com",
  age: 24
});
console.log(s);

// interfaces in classes

interface Person {
  name: string,
  age: number,
  greet(phrase: string): void
}

class Employee implements Person {
  name: string;
  age: number;

  constructor (n: string, m: number) {
    this.name = n;
    this.age = m;
  }

  greet(phrase: string): void {
    console.log(`${phrase} - ${this.name}`)
  }
}

const ob = new Employee("nv", 24);
console.log(ob);

// generics

function identity<T>(arg: T) {
  return arg;
}

const out1 = identity<string>("nv");
const out2 = identity<number>(24);
console.log(`generics: ${out1} - ${out2}`);