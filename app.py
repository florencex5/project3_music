# DEPENDENCIES
from flask import Flask,render_template,jsonify
import os
import json
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# IMPORT KEYS
# create python file for saving your spotify client id and client secret
from spotify_keys import CLIENT_ID,CLIENT_SECRET

#Query from SPOTIFY API
sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET))

# Set up function for searching ten tracks in the specified category
def search_10_songs_by_category(category):

    results = sp.search(q=f'genre:"{category}"', type='track', limit=10)

    # Extract track information from the results
    ten_tracks = results['tracks']['items']
    result = []
    for index, track in enumerate(ten_tracks, start=1):
        result.append({
            'Name of Track':track['name'],
            'Artist':', '.join(artist['name'] for artist in track['artists'])
        })
    return result


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('main_html.html')

# SET UP DIFFERENT ROUTES TO GET THE DATA BASED ON DIFFERENT GENERS
@app.route('/desi')
def desi ():
    return search_10_songs_by_category("desi")

@app.route('/bangla')
def bangla ():
    return search_10_songs_by_category("bangla")

@app.route('/minimal')
def minimal ():
    return search_10_songs_by_category("minimal")

@app.route('/groove')
def groove ():
    return search_10_songs_by_category("groove")

@app.route('/garage')
def garage ():
    return search_10_songs_by_category("garage")

@app.route('/acoustic')
def acoustic ():
    return search_10_songs_by_category("acoustic")


# SET UP SEPARATE ROUTES TO GET THE JSON DATA FILE
# Route 1: To get the new releases song data
@app.route('/new_releases', methods=['GET'])
def new_releases():
    
    # Send request to the Spotify API
    new_releases = sp.new_releases(limit=50, offset=0)

    # Save the JSON data to resources folder
    file_path = os.path.join("resources", "new_releases.json")

# Write the JSON data to the file
    with open(file_path, "w") as json_file:
        json.dump(new_releases, json_file)

    # Return the list of new releases
    return jsonify(new_releases)

# Route 2: To get fifty track lists in 2022
@app.route('/songTwentyTwo', methods=['GET'])
def topTwentytwo():

    # Send request to the Spotify API
    topTwentytwo = sp.search(q='year:2022', limit=50, offset=0)

    # Save the JSON data to resources folder
    file_path = os.path.join("resources", "songTwentyTwo.json")

# Write the JSON data to the file
    with open(file_path, "w") as json_file:
        json.dump(topTwentytwo, json_file)
    
    return jsonify(topTwentytwo)

# Route 3: To get fifty track lists in 2021
@app.route('/songTwentyOne', methods=['GET'])
def topTwentyOne():
    topTwentyOne = sp.search(q='year:2021', limit=50, offset=0)

    # Save the JSON data to resources folder
    file_path = os.path.join("resources", "songTwentyOne.json")
    
# Write the JSON data to the file
    with open(file_path, "w") as json_file:
        json.dump(topTwentyOne, json_file)
    
    return jsonify(topTwentyOne)

# SET UP SEPARATE ROUTES TO GET THE JSON DATA FILE
@app.route('/new_release_details')
def new_release_details():
    return render_template('New_Release_index.html')

@app.route('/FiftyforTwentyTwo')
def TopFiftyforTwentyTwo():
    return render_template('TwentyTwo_index.html')

@app.route('/FiftyforTwentyOne')
def TopFiftyforTwentyOne():
    return render_template('TwentyOne_index.html')

if __name__ == "__main__":
    app.run(debug=True)

