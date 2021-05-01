import { v4 as uuidv4 } from 'uuid';

exports.seed = async function (knex) {
  // Deletes ALL existing entries

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
          description: 'Bolsas de Papel',
          url: 'bolsas-papel',
        },
        {
          category_id: vasosId,
          id: uuidv4(),
          name: 'Vasos de Plástico',
          description: 'Vasos de Plástico',
          url: 'vasos-plastico',
        },
        {
          category_id: vasosId,
          id: uuidv4(),
          name: 'Vasos de Tergopor',
          description: 'Vasos de Tergopor',
          url: 'vasos-tergopor',
        },
      ]);
    });
};
