import { v4 as uuidv4 } from 'uuid';

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { id: uuidv4(), name: 'Bolsas', url: 'bolsas' },
        { id: uuidv4(), name: 'Vasos', url: 'vasos' },
      ]);
    });
};
