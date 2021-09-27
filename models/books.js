const connection = require('./connection');


const formatData =  ({ id, title, author_id }) => {
    return {
        id,
        title,
        authorId: author_id,
    }
}

const getAll = async () => {
    const [books] = await connection.execute('SELECT * FROM books');
    return books.map(formatData);
};

module.exports = {
    getAll,
};