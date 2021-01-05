module.exports = class Users {
  users = {}

  constructor() {
    // Prune users who haven't checked in every 2 minutes
    setInterval(() => {
      this.prune()
    }, 2 * 60 * 1000)
  }

  getUser(id) {
    if (!this.users.hasOwnProperty('id')) {
      this.users[id] = new User(id);
    }
    return this.users[id];
  }

  // keep a user active during the next prune
  check_in(id) {
    this.users[id].checked_in = true;
    this.users[id].active = true;
  }

  // mark all users who haven't checked in since the last prune as inactive
  prune() {
    for (let id in this.users) {
      this.users[id].prune()
    }
  }

  // Return an array of all active users
  getActiveUsers() {
    var ret = []; // Array to be eventually returned
    for(let id in this.users) {
      if (this.users[id].active) {
        ret.push(this.users[id]);
      }
    }

    return ret;
  }
}

class User {
  active = true;
  checked_in = true;

  constructor(id) {
    this.id = id;
  }

  prune() {
    if (this.active && !this.checked_in) {
      this.active = false;
      console.log(`User ${this.id} has been marked inactive`)
    }
    this.checked_in = false;
  }
}