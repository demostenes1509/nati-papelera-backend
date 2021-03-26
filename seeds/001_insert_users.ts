import { v4 as uuidv4 } from 'uuid';

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: uuidv4(), email_address: 'test@test.com',password: 'test', provider: 'local'},
      ]);
    });
};
