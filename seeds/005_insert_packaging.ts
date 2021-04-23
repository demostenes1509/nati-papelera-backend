import { v4 as uuidv4 } from 'uuid';

exports.seed = async function (knex) {
  // Deletes ALL existing entries

  const bolsaPapelId = (await knex('products').select('id').where({ url: 'bolsas-papel' }).first()).id;
  const manapelId = (await knex('providers').select('id').where({ url: 'manapel' }).first()).id;
  return knex('packaging')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('packaging').insert([
        {
          id: uuidv4(),
          product_id: bolsaPapelId,
          provider_id: manapelId,
          provider_product_id: '100',
          name: 'x 100',
          price: 200,
        },
      ]);
    });
};
