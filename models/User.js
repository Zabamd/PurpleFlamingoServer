export default class User {
    constructor(userId, email, login, name, surname, age, password) {
        this.userId = userId;
        this.email = email;
        this.login = login || null;
        this.name = name || null;
        this.surname = surname || null;
        this.age = age || null;
        this.password = password;
    }
    
    authenticate = (email, password) => {
        return (email === this.email && password === this.password);
    }

    
}