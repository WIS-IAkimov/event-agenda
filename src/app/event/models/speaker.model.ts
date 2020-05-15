export class Speaker {
  public id: string;
  public firstName: string;
  public lastName: string;
  public photo: string;
  public company: string;
  public title: string;
  public country: string;
  public city: string;
  public email: string;
  public phone: string;
  public bio: string;
  public linkedin: string;
  public twitter: string;

  constructor(data: any) {
    this._fromJson(data);
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  private _fromJson(data: any): void {
    this.id = data.hasOwnProperty('id') ? data.id.toString() : this.id;
    this.firstName = data.hasOwnProperty('first_name') ? data['first_name'] : this.firstName;
    this.lastName = data.hasOwnProperty('last_name') ? data['last_name'] : this.lastName;
    this.photo = data.hasOwnProperty('photo') ? data.photo : this.photo;
    this.company = data.hasOwnProperty('company') ? data.company : this.company;
    this.title = data.hasOwnProperty('title') ? data.title : this.title;
    this.country = data.hasOwnProperty('country') ? data.country : this.country;
    this.city = data.hasOwnProperty('city') ? data.city : this.city;
    this.email = data.hasOwnProperty('email') ? data.email : this.email;
    this.phone = data.hasOwnProperty('phone') ? data.phone : this.phone;
    this.bio = data.hasOwnProperty('bio') ? data.bio : this.bio;
    this.linkedin = data.hasOwnProperty('linkedin') ? data.linkedin : this.linkedin;
    this.twitter = data.hasOwnProperty('twitter') ? data.twitter : this.twitter;
  }
}
