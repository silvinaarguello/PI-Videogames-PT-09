require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { KEY_API } = process.env;
const { Videogame, Genero } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const allInfo = async () => {
  try {
    var total = [];
    for (let i = 1; i <= 5; i++) {
      const urlApi = await axios.get(
        `https://api.rawg.io/api/games?key=${KEY_API}&page=${i}`
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

const getInfoDB = async () => {
  return await Videogame.findAll({
    incluide: {
      model: Genero,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const mergeInfo = async () => {
  const infoApi = await allInfo();
  const infoDB = await getInfoDB();
  const infoMerge = infoApi.concat(infoDB);
  return infoMerge;
};

router.get("/videogames", async (req, res, next) => {
  try {
    const name = req.query.name;
    let totalGames = await mergeInfo();
    if (name) {
      nameGames = totalGames.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      if (nameGames.length > 0) {
        const sliceVideo = nameGames.slice(0, 15);
        res.status(200).json(sliceVideo);
      } else {
        res.status(404).json({ message: "No results found" });
      }
    } else {
      res.json(totalGames);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;
  let videoId;
  if (id.includes("-")) {
    try {
      videoId = await Videogame.findOne({
        where: {
          id: id,
        },
        includes: { model: Genero, attributes: ["name"] },
      });
    } catch (error) {
      console.log("Game ID not found", error);
    }
  } else {
    try {
      const apiId = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${KEY_API}`
      );
      const apiDetail = await apiId.data;
      videoId = {
        id: apiDetail.id,
        name: apiDetail.name,
        description: apiDetail.description_raw,
        release_date: apiDetail.released,
        rating: apiDetail.rating,
        plataform: apiDetail.platforms,
        genre: apiDetail.genres,
        image: apiDetail.background_image,
      };
    } catch (error) {
      console.log("Game ID not found", error);
    }
  }
  if (videoId) {
    res.send(videoId);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/genres", async (req, res) => {
  try {
    const genreVideo = await axios.get(
      `https://api.rawg.io/api/genres?key=${KEY_API}`
    );
    const apiGenre = genreVideo.data.results.map((e) => e.name);
    apiGenre.forEach((e) => {
      Genero.findOrCreate({
        where: { name: e },
      });
    });
    const totalGenre = await Genero.findAll();
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
    let gByGame = await Genero.findAll({
      where: { name: genre },
    });
    CreatteGame.addGenero(gByGame);
    res.status(200).json({ message: "Video game created!" });
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
