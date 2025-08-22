exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('activities').del();
  
    // Inserts seed entries
    await knex('activities').insert([
      {
        title: 'Community Clean-Up',
        description: 'Participate in cleaning up local parks and streets.',
        points: 50,
        active: true,
        used_at: null,
        img: "https://vinedisposal.com/AoOJmJbG1m8wSPOR58q4RG7KGRdXBYB81655215859.jpg"
      },
      {
        title: 'Food Drive Volunteer',
        description: 'Help organize and distribute food donations.',
        points: 40,
        active: true,
        used_at: null,
        img: "https://ignatius.nyc/wp-content/uploads/2021/01/011619b-Inline.jpg"

      },
      {
        title: 'Block Party Setup',
        description: 'Assist with setting up booths and decorations.',
        points: 30,
        active: false,
        used_at: null,
        img: "https://st.hzcdn.com/simgs/95a1233b0b180dc8_9-3049/_.jpg",
      },
      {
        title: 'Recycling Workshop',
        description: 'Attend a workshop on recycling and sustainability.',
        points: 20,
        active: true,
        used_at: null,
        img: "https://togetherband.org/cdn/shop/articles/1643988446_plastic_recycling_412f8499-cc6b-4dfe-888d-248257e5f63b_1024x1024.jpg?v=1744819325"
      },
    ]);
  };
  