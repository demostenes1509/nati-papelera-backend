import { v4 as uuidv4 } from 'uuid';

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('providers')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('providers').insert([
        { id: uuidv4(), name: 'Casa', url: 'casa' },
        { id: uuidv4(), name: 'Papelera Manapel', url: 'manapel' },
        { id: uuidv4(), name: 'Mapsa', url: 'mapsa' },
      ]);
    });
};
