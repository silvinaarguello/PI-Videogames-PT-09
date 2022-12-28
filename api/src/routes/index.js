// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const {Videogame, Genre} = require('../db');




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () =>{
    
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`,{headers: {
        "accept-encoding": null,
    }})
    const apiInfo = await apiUrl.data.results.map( e => {
        return {
            id: e.id,
            name: e.name,
            description: e.description,
            image: e.background_image,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms,
            genres: e.genres,
        };
        
    });
    return apiInfo;
    };

    const getDbInfo = async () =>{
        return await Videogame.findAll({
            include: Genre,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        })
    }

    const getAllVideoGames = async () =>{
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const allVideoGames = apiInfo.concat(dbInfo);
        return allVideoGames;
    }

 
    router.get('/videogames', async (req , res) =>{
        const {name} = req.query;
        let VideogamesTotal = await getAllVideoGames();
        if(name){
            let gameName =  VideogamesTotal.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()))
            gameName.length ?
            res.status(200).send(gameName):
            res.status(404).send('Juego no encontrado');
        }else{
            res.status(200).send(VideogamesTotal)
        }
    
    })



    router.get('/videogames/:id', async (req, res) =>{
        const id = req.params.id;
        const allVideogames = await getAllVideoGames()

        if(id){
            let gameId = await allVideogames.filter((e) => e.id == id)
            gameId.length?
            res.status(200).json(gameId):
            res.status(404).send('Juego no Encontrado por Id')
        }
    })



    

router.get('/genres', async (req, res) =>{
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = await genresApi.data.results.map(e => e.name)
 
    

    genres.forEach(e => Genre.findOrCreate({ //lo uso para guardar los generos que me traje de la API en la base de datos
        where: {name: e} //
    }))

    const allGenres = await Genre.findAll() //me traigo todos los generos que guarde en mi db
    res.json(allGenres)
})


  
//   router.post('/videogame', async (req, res) => {
//     let {
//       name,
//       released,
//       rating,
//       image,
//       genres,
//       platforms,
//       description,
//       createdInDb
//     } = req.body
  
//     let gameCreated = await Videogame.create({
//       name,
//       released,
//       rating,
//       image,
//       platforms,
//       description,
//       createdInDb
//     })
  
//     let genreDb = await Genres.findAll({
//       where: { name: genres }
//     })
//     gameCreated.addGenre(genreDb)
//     res.send("Videogame creado con exito!")
//   })
  

  
module.exports = router;
