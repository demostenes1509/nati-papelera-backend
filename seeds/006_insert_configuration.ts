import { v4 as uuidv4 } from 'uuid';

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('configuration')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('configuration').insert([
        { id: uuidv4(), ml_commission_percentage: 10.5, ml_gain_percentage: 25 },
      ]);
    });
};
