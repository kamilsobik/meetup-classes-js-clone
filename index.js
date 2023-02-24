let sequence = 0;

function generateId() {
  return (sequence += 1);
}

class Place {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
}

let selleosOffice = new Place(49.8180631, 19.0419015);

class Meetup {
  #attendees = [];
  constructor(creator, title, date, description, place) {
    this.id = generateId();
    this.creator = creator;
    this.title = title;
    this.date = date;
    this.description = description;
    this.place = place;
  }

  show() {
    console.table(this);
  }

  addAttendee(user) {
    if (this.isPast) {
      console.warn("You not can past to meetup");
      return;
    }
    this.#attendees.push(user);
  }

  get isPast() {
    const now = new Date().getTime();
    return this.date.getTime() < now;
  }

  isGoing(user) {
    return this.#attendees.find((attendee) => user === attendee);
  }
}

class Group {
  #events = [];
  #members = [];
  constructor(name, discord) {
    this.name = name;
    this.discord = discord;
  }

  get pastEvents() {
    return this.#events.filter((event) => event.isPast);
  }

  get futureEvents() {
    return this.#events.filter((event) => !event.isPast);
  }

  addEvent(event) {
    this.#events.push(event);
  }
  addMember(user) {
    this.#members.push(user);
  }
}

class User {
  constructor(nickname, avatar) {
    this.nickname = nickname;
    this.avatar = avatar;
    this.role = "user";
  }

  grantAdmin() {
    this.role = "admin";
  }
}

class App {
  #users = [];
  #events = [];
  #groups = [];

  createMeetup(creator, title, date, description, place) {
    if (creator.role === "admin") {
      const newMeetup = new Meetup(creator, title, date, description, place);
      this.#events.push(newMeetup);
      return newMeetup;
    }
    console.warn("Only admin can create meetup");
  }

  createGroup(name, discord) {
    const newGroup = new Group(name, discord);
    this.#groups.push(newGroup);
    return newGroup;
  }

  addUser(nickname, avatar) {
    const user = new User(nickname, avatar);
    this.#users.push(user);
    return user;
  }

  getAllFutureEventsForUser(user) {
    return this.#events
      .filter((event) => event.isGoing(user))
      .filter((event) => !event.isPast);
  }
}

let app = new App();
const jan = app.addUser("Jan", "123");
const marysia = app.addUser("marysia", "123");
const tomek = app.addUser("tomek", "123");
const ben = app.addUser("ben", "123");
ben.grantAdmin();

const cd = app.createMeetup(
  ben,
  "CoderDojo",
  new Date("2023-03-01"),
  "awesome event",
  selleosOffice
);
const group = app.createGroup("Coder Dojo", "discord.com/xxx");
group.addEvent(cd);
group.addMember(marysia);
cd.addAttendee(jan);
cd.addAttendee(tomek);
