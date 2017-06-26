export class User {
  id: number;
  name: string;
  email: string;
  initials: string;
  username: string;

  constructor(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.email = attributes.email;
    this.initials = attributes.initials;
    this.username = attributes.username;
  }
}
