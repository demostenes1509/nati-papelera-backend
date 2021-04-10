import { v4 as uuidv4 } from 'uuid';

exports.seed = async function (knex) {
  // Deletes ALL existing entries

  const bolsaPapelId = (await knex('categories').select('id').where({ url: 'bolsas_papel' }).first()).id;
  return knex('products')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        { category_id: bolsaPapelId, id: uuidv4(), name: 'Bolsas de Papel', url: 'bolsas_papel' },
      ]);
    });
};
