import { v4 as uuidv4 } from 'uuid';

exports.seed = async function (knex) {
  // Deletes ALL existing entries

  const localProviderId = (await knex('providers').select('id').where({ name: 'local' }).first()).id;
  const bolsaPapelId = (await knex('categories').select('id').where({ url: 'bolsas' }).first()).id;
  const vasosId = (await knex('categories').select('id').where({ url: 'vasos' }).first()).id;
  return knex('products')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          category_id: bolsaPapelId,
          id: uuidv4(),
          name: 'Bolsas de Papel',
          url: 'bolsas-papel',
          provider_id: localProviderId,
        },
        {
          category_id: vasosId,
          id: uuidv4(),
          name: 'Vasos de Plástico',
          url: 'vasos-plastico',
          provider_id: localProviderId,
        },
        {
          category_id: vasosId,
          id: uuidv4(),
          name: 'Vasos de Tergopor',
          url: 'vasos-tergopor',
          provider_id: localProviderId,
        },
      ]);
    });
};
