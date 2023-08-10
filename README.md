# Music Galaxy

## Theme
Music, a versatile language, has the power to evoke emotions and bring people together. Spotify is a music platform that is able to categorize different genres to fit every music taste, which is why they have over 25 genres to listen to. Our flask API was able to unlock the hits for different genres, what countries listen to them, and view how popular they are. And... Welcome to our little music galaxy!

## Quick Setup
Create a Spotify’s developer account to get the `CLIENT ID` and `CLIENT SECRETE`([Spotify Developer](https://developer.spotify.com/))

## Introduction of Spotipy Library
- Our project is based on Spotipy Library (a lightweight Python library for the Spotify Web API / [Spotipy Documentation](https://spotipy.readthedocs.io/en/2.22.1/))
- With Spotipy you get full access to all of the music data provided by the Spotify platform.
- Example:`sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET))`

## Introduction of Different Routes to get the JSON file data
1. `http://YOUR_LOCAL_HOST/new_releases`: To get the new releases data
2. `http://YOUR_LOCAL_HOST/songTwentyTwo`: To get fifty songs from 2022
3. `http://YOUR_LOCAL_HOST/songTwentyOne`: To get fifty songs from 2021

## Introduction of Routes to switch to your own preferred genre
- Step 1: Input your preferred genre in "app.py" file `@app.route('/YOUR_PREFERRED_GENRES')`
- Step 2: Change your preferred genre and rename the variable of your genre in "app.js" file `d3.json("http://YOUR_LOCAL_HOST/YOUR_PREFERRED_GENRES").then(function(data){YOUR_GENRE_VARIABLE = data;}); `
- Step 3: Update the variable of your genre in "main_html.html" `onclick="openTableModal(YOUR_GENRE_VARIABLE)`
- Dashboard will display your preferred genre now!
  

## Resources
1. Website Main Template -- Bootstrap ([Jumbotron Template](https://getbootstrap.com/docs/4.0/examples/jumbotron/#))
2. Website Background -- ([Javascript Granim.js](https://sarcadass.github.io/granim.js/examples.html))

## Main Dashboard Quickview
<img width="1474" alt="Screenshot 2023-08-09 at 21 28 39" src="https://github.com/florencex5/project3_music/assets/129706051/45da1b65-efd4-4f49-8931-8a10ad386a29">
