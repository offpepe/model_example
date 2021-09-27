const connection = require('./connection');
const { ObjectId } = require('mongodb');

const formatData =  ({ id, firstName, middleName, lastName }) => {
    const fullName = [firstName, middleName, lastName].filter((name) => name).join(' ');
    return {
        id,
        firstName,
        middleName,
        lastName,
        fullName,
    }
}

const getAll = async () => {
    return connection().then((db) => db.collection('authors').find().toArray())
    .then((authors) => {
        return authors
        .map(({ _id, firstName, middleName, lastName }) => formatData({
            id: _id,
            firstName,
            middleName,
            lastName,
          }))
    })
};

const getByID = async (id) => {
  return connection().then((db) => db.collection('authors').findOne(ObjectId(id)))
  .then((authors) => {
      const { _id, firstName, middleName, lastName } = authors;
      return formatData({
          id: _id,
          firstName,
          middleName,
          lastName,
        });
  })
}

const insertNewAuthor = async ({ firstName, middleName, lastName, birthday, nationality }) => {
    try {
      await connection().then((db) => db.collection('authors')
      .insertOne({ firstName, middleName, lastName, birthday, nationality }));
      return "Autor adicionado com Sucesso!";
    } catch (error) {
      return error.message;
    }
}

module.exports = {
    getAll,
    getByID,
    insertNewAuthor,
};