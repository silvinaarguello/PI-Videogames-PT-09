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
    
    try {
        var total = [];
        for (let i = 1; i <= 5; i++) {
          const urlApi = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
          );
          let infoApi = urlApi.data.results.map((e) => {
            return {
              id: e.id,
              name: e.name,
              description: e.description_raw,
              release_date: e.release_date,
              rating: e.rating,
              plataform: e.platforms.map((e) => e.platform.name),
              image: e.background_image,
              genre: e.genres?.map((e) => e.name),
            };
          });
          total = total.concat(infoApi);
        }
        return total;
      } catch (error) {
        console.log(error);
      }
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



    

    router.get("/genres", async (req, res) => {
        try {
          const genreVideo = await axios.get(
            `https://api.rawg.io/api/genres?key=${API_KEY}`
          );
          const apiGenre = genreVideo.data.results.map((e) => e.name);
          apiGenre.forEach((e) => {
            Genre.findOrCreate({
              where: { name: e },
            });
          });
          const totalGenre = await Genre.findAll();
          res.status(200).json(totalGenre);
        } catch (error) {
          console.log(error);
        }
      });
      
      router.post("/videogames", async (req, res) => {
        const { name, description, release_date, rating, plataform, genre, image } =
          req.body;
        try {
          let CreatteGame = await Videogame.create({
            name,
            description,
            release_date,
            rating,
            plataform, 
            genre,
            image,
          });
          let gByGame = await Genre.findAll({
            where: { name: genre },
          });
          CreatteGame.addGenre(gByGame);
          res.status(200).json({ message: "Videogame created!" });
        } catch (error) {
          res.status(404).json({ message: "Invalid data" });
        }
      });
      
      
      
      router.delete("/videogames/:id", async(req,res)=>{
        try {
          const {id}=req.params;
          const borrar = await Videogame.findByPk(id);
          if(borrar){
            await borrar.destroy()
            return res.send("game deleted")
          }
          res.status(404).send("cant deleted this game")
        } catch (error) {
            console.log(error)
        }
      })

  
module.exports = router;
