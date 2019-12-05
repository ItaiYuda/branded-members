export class User {
  id: string;
  email: string;
  userName: string;
  password: string;
  age: number;
  token: string;

  constructor(email: string, userName: string, password: string, age: number) {
    this.email = email;
    this.userName = userName;
    this.password = password;
    this.age = age;
  }
}
