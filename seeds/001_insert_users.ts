import { v4 as uuidv4 } from 'uuid';

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: uuidv4(),
          email_address: 'admin@natipapelera.com',
          password: 'test',
          provider: 'local',
          role: 'admin',
          full_name: 'Naty Gor',
        },
        {
          id: uuidv4(),
          email_address: 'user@natipapelera.com',
          password: 'test',
          provider: 'local',
          role: 'user',
          full_name: 'User',
        },
        {
          id: uuidv4(),
          email_address: 'test_user_40015932@testuser.com',
          provider: 'mercadolibre',
          role: 'admin',
          full_name: 'Meli Test',
        },
      ]);
    });
};
