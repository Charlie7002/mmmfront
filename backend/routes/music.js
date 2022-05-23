var express = require("express");
var request = require("sync-request");
var router = express.Router();

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    "X-RapidAPI-Key": "4c575d1833msh8d74cb78ecb3c0cp19f8bfjsn2e9f5df45ac9",
  },
};

//tables filtre
var resTop = [];
var resMood = [];
var resAmbiance = [];
var resGenre = [];

//table playlists
var playlists = [];

//table music
var musicDetails = [];

//test route
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//search music top
router.get("/getTop", async function (req, res, next) {
  resTop = [];
  var topRaw = await request(
    "GET",
    "https://spotify23.p.rapidapi.com/charts/?type=regional&country=global&recurrence=daily&date=latest",
    options
  );
  var top = await topRaw.body;
  top = await JSON.parse(top);
  for (let i = 0; i < 10; i++) {
    resTop.push({
      id: top.content[i].track_id,
      track: top.content[i].track_title,
      cover: top.content[i].thumbnail,
    });
  }
  res.json({ result: true, search: resTop });
});

//filter music by mood
router.get("/mood/:mood", async function (req, res, next) {
  resMood = [];
  if (req.params.mood === "happy" || req.params.mood === "love") {
    var moodRaw = await request(
      "GET",
      `https://spotify23.p.rapidapi.com/search/?q=${req.params.mood}&type=tracks&offset=0&limit=10`,
      options
    );
  } else {
    var moodRaw = await request(
      "GET",
      `https://spotify23.p.rapidapi.com/search/?q=genre%3A${req.params.mood}&type=tracks&offset=0&limit=10`,
      options
    );
  }

  var mood = await moodRaw.body;
  mood = await JSON.parse(mood);
  for (let i = 0; i < mood.tracks.items.length; i++) {
    resMood.push({
      id: mood.tracks.items[i].data.id,
      track: mood.tracks.items[i].data.name,
      cover: mood.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url,
    });
  }
  res.json({ result: true, filter: resMood });
});

//filter music by ambiance
router.get("/ambiance/:ambi", async function (req, res, next) {
  resAmbiance = [];
  var ambiRaw = await request(
    "GET",
    `https://spotify23.p.rapidapi.com/search/?q=genre%3A${req.params.ambi}&type=tracks&offset=0&limit=10`,
    options
  );
  var ambi = await ambiRaw.body;
  ambi = await JSON.parse(ambi);
  for (let i = 0; i < ambi.tracks.items.length; i++) {
    resAmbiance.push({
      id: ambi.tracks.items[i].data.id,
      track: ambi.tracks.items[i].data.name,
      cover: ambi.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url,
    });
  }
  res.json({ result: true, filter: resAmbiance });
});

//filter music by genre
router.get("/genre/:genre", async function (req, res, next) {
  resGenre = [];
  var genreRaw = await request(
    "GET",
    `https://spotify23.p.rapidapi.com/search/?q=genre%3A${req.params.genre}&type=tracks&offset=0&limit=10`,
    options
  );
  var genre = await genreRaw.body;
  genre = await JSON.parse(genre);
  for (let i = 0; i < genre.tracks.items.length; i++) {
    resGenre.push({
      id: genre.tracks.items[i].data.id,
      track: genre.tracks.items[i].data.name,
      cover: genre.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url,
    });
  }
  res.json({ result: true, filter: resGenre });
});

//music details
router.get("/getMusic/:id", async function (req, res, next) {
  music = [];
  var musicRaw = await request(
    "GET",
    `https://spotify23.p.rapidapi.com/tracks/?ids=${req.params.id}`,
    options
  );
  var music = await musicRaw.body;
  music = await JSON.parse(music);
  musicDetails.push({
    id: req.params.id,
    title: music.tracks[0].album.name,
    image: music.tracks[0].images[0].url,
    link: music.tracks[0].external_urls.spotify,
    //top titre
    //playlists
  });
  res.json({ result: true, tracks: music.tracks[0] });
});

//playlist search
router.get("/getPlaylist/:filter", async function (req, res, next) {
  playlists = [];
  var playLRaw = await request(
    "GET",
    `https://spotify23.p.rapidapi.com/search/?q=${req.params.filter}&type=playlists&offset=0&limit=10`,
    options
  );
  var playL = await playLRaw.body;
  playL = await JSON.parse(playL);
  for (let i = 0; i < playL.playlists.items.length; i++) {
    if (playL.playlists.items[i].data.images) {
      playlists.push({
        url: playL.playlists.items[i].data.uri, //url menant à l'app spotify
        name: playL.playlists.items[i].data.name,
        image: playL.playlists.items[i].data.images.items[0].sources[0].url,
      });
    }
  }
  res.json({ result: true, playlists });
});
module.exports = router;
