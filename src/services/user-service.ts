import User from "@model/user";

let users: User[] = [];

export function getUsers(): User[] {
    return users;
}

export function saveUser(user: User): void {
    users.push(user);
}