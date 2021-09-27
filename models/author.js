const connection = require('./connection');


const formatData =  ({ id, first_name, middle_name, last_name }) => {
    const fullname = [first_name, middle_name, last_name].filter((name) => name).join(' ');
    return {
        id: id,
        firstName: first_name,
        middleName: middle_name,
        lastName: last_name,
        fullName: fullname,
    }
}

const getAll = async () => {
    const [authors] = await connection.execute('SELECT id, first_name, middle_name, last_name FROM authors');
    return authors.map(formatData);
};

const getByID = async (id) => {
    const [authors] = await connection.execute('SELECT id, first_name, middle_name, last_name FROM authors WHERE id=?',[id]);
    if (authors.length === 0) {
      return null;
    } else {
    return authors.map(formatData);
    }
}

const insertNewAuthor = async ({ firstName, middleName, lastName, birthday, nationality }) => {
    const [operation] = await connection.execute(`INSERT INTO model_example.authors (first_name,middle_name,last_name,birthday,nationality) VALUES (?,?,?,?,?)`,
    [firstName, middleName, lastName, birthday, nationality]);
    return operation;
}

module.exports = {
    getAll,
    getByID,
    insertNewAuthor,
};