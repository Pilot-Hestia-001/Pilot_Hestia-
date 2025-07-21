/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await knex('rewards').del();


  await knex('rewards').insert([
    {
      id: 1,
      vendor_id: 1, // Uptown Threads
      title: "Free Sticker Pack",
      cost: 250,
      quantity: 50,
      UsdPrice: 25,
      img: "https://static.wixstatic.com/media/25123e_3598fc6f180a4c1cb7aecee89e0630b4~mv2.png/v1/fill/w_648,h_648,al_c,q_90,enc_avif,quality_auto/25123e_3598fc6f180a4c1cb7aecee89e0630b4~mv2.png",
      sizes: {
        xs: true,
        s: false,
        m: true,
        l: true,
        xl: false,
        xxl:false
      }
    },
    {
      id: 2,
      vendor_id: 1,
      title: "$5 Off Any Tee",
      cost: 2000,
      quantity: 50,
      UsdPrice: 50,
      img: "https://static.wixstatic.com/media/25123e_5b3a37dbab0045c492b0f7aa41a2df74~mv2.png/v1/fill/w_918,h_918,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/25123e_5b3a37dbab0045c492b0f7aa41a2df74~mv2.png",
      sizes: {
        xs: true,
        s: false,
        m: true,
        l: true,
        xl: false,
        xxl:false
      }
    },
    {
      id: 3,
      vendor_id: 1,
      title: "Exclusive Bandana",
      cost: 1000,
      quantity: 0,
      UsdPrice: 100,
      img: "https://static.wixstatic.com/media/25123e_f5c233c471534724917c78dba4dc75ac~mv2.png/v1/fill/w_918,h_918,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/25123e_f5c233c471534724917c78dba4dc75ac~mv2.png",
      sizes: {
        xs: true,
        s: false,
        m: true,
        l: true,
        xl: false,
        xxl:false
      }
    }
  ])
};
