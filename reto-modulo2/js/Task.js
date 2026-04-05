export class Task {
  static #nextId = 1;

  constructor(name) {
    this.id = Task.#nextId++;
    this.name = name;
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}
