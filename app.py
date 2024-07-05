from flask import Flask, render_template,request,redirect,jsonify
from flask_cors import CORS
import pyodbc
import logging
import datetime
from flask import request
from flask_session import Session
import jwt
from functools import wraps
from datetime import date


app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'  # You can choose other session interfaces like 'redis', 'memcached', etc.
Session(app)

# conn = pyodbc.connect('DRIVER={SQL SERVER}; SERVER=YORUSORA-0_0;DATABASE=[ProjectMahoraga];UID=sa;PWD=12345678;')
# cursor = conn.cursor

# conn = pyodbc.connect('DRIVER={SQL SERVER}; SERVER=YORUSORA-0_0; DATABASE=ProjectMahoraga; Trusted_Connection=yes;')
# cursor = conn.cursor()

# Configure logging
logging.basicConfig(level=logging.INFO)  # Set logging level to INFO


try:
    # Attempt to establish a connection
    conn = pyodbc.connect('DRIVER={SQL SERVER}; SERVER=YORUSORA-0_0; DATABASE=ProjectMahoraga; Trusted_Connection=yes;')
    print("Database connection established successfully")
    cursor = conn.cursor()
except Exception as e:
    print("Error establishing database connection:", e)

@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/genre.html')
def genreRender():
    return render_template('genre.html')

@app.route('/profile.html')
def profileRender():
    return render_template('profile.html')

@app.route('/watched.html')
def watchedRender():
    return render_template('watched.html')

@app.route('/favourite.html')
def favouriteRender():
    return render_template('favourite.html')

@app.route('/adminLogin.html')
def adminLoginRender():
    return render_template('adminLogin.html')

@app.route('/discussions.html')
def discussionsRender():
    return render_template('discussions.html')

@app.route('/upcoming.html')
def upComingRender():
    return render_template('upcoming.html')

@app.route('/mostWatched.html')
def mostWatchedRender():
    return render_template('mostWatched.html')

@app.route('/about.html')
def testRender():
    return render_template('about.html') 

@app.route('/animeTable.html')
def uListRender():
    return render_template('animeTable.html')

@app.route('/animePage.html')
def apRender():
    return render_template('animePage.html')

@app.route('/discussionPage.html')
def dpRender():
    return render_template('discussionPage.html')

@app.route('/usersTable.html')
def uTableRender():
    return render_template('usersTable.html')

@app.route('/index.html')
def indexRender():
    return render_template('index.html')

@app.route('/home.html')
def homeRender():
    return render_template('home.html')

@app.route('/signup.html')
def signupRender():
    return render_template('signup.html')

@app.route('/adminPage.html')
def adminPageRender():
    return render_template('adminPage.html')

@app.route('/usersDelTable.html')
def usersDelTableRender():
    return render_template('usersDelTable.html')

@app.route('/animeDelTable.html')
def animeDelTableRender():
    return render_template('animeDelTable.html')


@app.route('/insertAnime.html')
def insertAnimeRender():
    return render_template('insertAnime.html')







# # Define the API endpoint for inserting data into the users table
# @app.route('/api/pusers', methods=['PUT'])
# def insert_user():
#     try:
#         # Get the data from the request body
#         data = request.json
        
#         # Extract the user information from the request data
#         username = data.get('username')
#         name = data.get('name')
#         bdate = data.get('bdate')
#         joining_date = data.get('joiningDate')
#         gender = data.get('gender')
#         email = data.get('email')
#         passkey = data.get('passkey')
#         badges = data.get('badges')
        
#         # Execute the SQL query to insert a new user into the users table
#         cursor.execute("INSERT INTO users (username, name, bdate, joiningDate, gender, email, passkey, badges) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
#                        (username, name, bdate, joining_date, gender, email, passkey, badges))
        
#         # Commit the transaction
#         conn.commit()
        
#         # Return a success response
#         return jsonify({"message": "User inserted successfully"}), 201
#     except Exception as e:
#         # Return a detailed error response with the specific error message
#         return jsonify({"error": "Internal Server Error", "message": str(e)}), 500



# # Define an API endpoint to fetch all users
# @app.route('/api/users', methods=['GET'])
# def get_users():
#     try:
#         # Execute the SQL query to select all users
#         cursor.execute("SELECT * FROM users")
#         # Fetch all rows from the result set
#         rows = cursor.fetchall()
        
#         # Convert the rows to a list of dictionaries
#         users = []
#         for row in rows:
#             user = {
#                 'username': row.username,
#                 'name': row.name,
#                 'bdate': row.bdate.strftime('%Y-%m-%d') if isinstance(row.bdate, datetime.datetime) else row.bdate,
#                 'joiningDate': row.joiningDate.strftime('%Y-%m-%d') if isinstance(row.joiningDate, datetime.datetime) else row.joiningDate,
#                 'gender': row.gender,
#                 'email': row.email,
#                 'passkey': row.passkey,
#                 'badges': row.badges
#             }
#             users.append(user)
        
#         # Return the users data as JSON response
#         return jsonify(users), 200
#     except Exception as e:
#         # Return a detailed error response with the specific error message
#         return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


def decode_jwt(token):
    try:
        # Decode the JWT token
        decoded_token = jwt.decode(token, 'your_secret_key', algorithms=['HS256'])
        return decoded_token
    except jwt.ExpiredSignatureError:
        # Handle expired tokens
        return {'error': 'Token has expired'}
    except jwt.InvalidTokenError:
        # Handle invalid tokens
        return {'error': 'Invalid token'}


@app.route('/api/decode_token', methods=['POST'])
def decode_token():
    # Get the JWT token from the request
    token = request.json.get('token')

    # Decode the JWT token
    decoded_token = decode_jwt(token)

    # Return the decoded token as JSON response
    return jsonify(decoded_token)


# Define the API endpoint to fetch all users
@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        # Execute the SQL query to select all users
        cursor.execute("SELECT * FROM users")
        # Fetch all rows from the result set
        rows = cursor.fetchall()
        
        # Convert the rows to a list of dictionaries
        users = []
        for row in rows:
            user = {
                'username': row.username,
                'name': row.name,
                'bdate': row.bdate.strftime('%Y-%m-%d') if isinstance(row.bdate, datetime.datetime) else row.bdate,
                'joiningDate': row.joiningDate.strftime('%Y-%m-%d') if isinstance(row.joiningDate, datetime.datetime) else row.joiningDate,
                'gender': row.gender,
                'email': row.email,
                'passkey': row.passkey,
                'badges': row.badges
            }
            users.append(user)
        
        # Return the users data as JSON response
        return jsonify(users), 200
    except Exception as e:
        # Return a detailed error response with the specific error message
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500



# Define the API endpoint to insert a new comment
@app.route('/api/add_comment', methods=['POST'])
def add_comment():
    try:
        # Get data from request body
        data = request.json

        # Extract comment information
        username = data.get('username')
        aniid = data.get('aniid')
        comment = data.get('comment')
        reply_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Count total entries in the comment table
        count_query = "SELECT COUNT(*) FROM discussion"
        cursor.execute(count_query)
        count = cursor.fetchone()[0]

        # Assign count + 1 as the comment ID
        comment_id = count + 1

        # Execute SQL query to insert comment
        query = "INSERT INTO discussion (commentid, aniId, uname, comment, replytime) VALUES ({}, {}, '{}', '{}', '{}')".format(comment_id, aniid, username, comment, reply_time)
        cursor.execute(query)

        # Commit transaction
        conn.commit()

        # Return success response
        return jsonify({"message": "Comment added successfully"}), 201
    except Exception as e:
        # Return error response
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

# # Define the API endpoint to insert a new comment
# @app.route('/api/add_comment', methods=['POST'])
# def add_comment():
#     try:
#         # Get data from request body
#         data = request.json

#         # Extract comment information
#         username = data.get('username')
#         aniid = data.get('aniid')
#         comment = data.get('comment')
#         reply_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

#         # Execute SQL query to insert comment
#         query = "INSERT INTO discussion (aniId, uname, comment, replytime) VALUES ({}, '{}', '{}', '{}')".format(aniid, username, comment, reply_time)
#         print("\n Query: ",query)
#         cursor.execute(query)

#         # Commit transaction
#         conn.commit()

#         # Return success response
#         return jsonify({"message": "Comment added successfully"}), 201
#     except Exception as e:
#         # Return error response
#         return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


# Define the API endpoint to insert a new user
@app.route('/api/usersPOST', methods=['POST'])
def insert_user():
    try:
        # Get data from request body
        data = request.json

        # Extract user information
        username = data.get('username')
        name = data.get('name')
        bdate = data.get('bdate')
        joining_date = datetime.date.today()
        gender = int(data.get('gender'))
        email = data.get('email')
        passkey = data.get('passkey')  # Corrected from 'data.get('password')'
        badges = data.get('badges', 0)  # Assign default value if not provided
        query = "INSERT INTO users (username, name, bdate, joiningDate, gender, email, passkey, badges) VALUES ('{}', '{}', '{}', '{}', {}, '{}', '{}', {})".format(username, name, bdate, joining_date, gender, email, passkey, badges)
        # Execute SQL query to insert user
        print(query)
        cursor.execute(query)

        # Commit transaction
        conn.commit()

        # Return success response
        return jsonify({"message": "User inserted successfully"}), 201
    except Exception as e:
        # Return error response
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

# @app.route('/api/users', methods=['GET', 'PUT'])
# def users():
#     if request.method == 'GET':
#         try:
#             # Execute the SQL query to select all users
#             cursor.execute("SELECT * FROM users")
#             # Fetch all rows from the result set
#             rows = cursor.fetchall()
            
#             # Convert the rows to a list of dictionaries
#             users = []
#             for row in rows:
#                 user = {
#                     'username': row.username,
#                     'name': row.name,
#                     'bdate': row.bdate.strftime('%Y-%m-%d') if isinstance(row.bdate, datetime.datetime) else row.bdate,
#                     'joiningDate': row.joiningDate.strftime('%Y-%m-%d') if isinstance(row.joiningDate, datetime.datetime) else row.joiningDate,
#                     'gender': row.gender,
#                     'email': row.email,
#                     'passkey': row.passkey,
#                     'badges': row.badges
#                 }
#                 users.append(user)
            
#             # Return the users data as JSON response
#             return jsonify(users), 200
#         except Exception as e:
#             # Return a detailed error response with the specific error message
#             return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

#     elif request.method == 'PUT':
#         try:
#             # Get the data from the request body
#             data = request.json
            
#             # Extract the user information from the request data
#             username = data.get('username')
#             name = data.get('name')
#             bdate = data.get('bdate')
#             joining_date = datetime.date.today()#data.get('joiningDate')
#             print("/nGet date",datetime.date.today(),"    ",joining_date)
#             gender = int(data.get('gender'))

#             email = data.get('email')
#             passkey = data.get('passkey')
#             badges = int(data.get('badges'))

            
#             print("/n---------",username, name, bdate, joining_date, gender, email, passkey, badges,"------------")
#             # Execute the SQL query to insert a new user into the users table
#             cursor.execute("INSERT INTO users (username, name, bdate, joiningDate, gender, email, passkey, badges) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
#                         (username, name, bdate, joining_date, gender, email, passkey, badges))
            
#             # Commit the transaction
#             conn.commit()
            
#             # Return a success response
#             return jsonify({"message": "User inserted successfully"}), 201
#         except Exception as e:
#             # Return a detailed error response with the specific error message
#             return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


@app.route('/api/users/<username>', methods=['DELETE'])
def delete_user(username):
    try:
        # Execute the SQL query to delete the user with the given username
        cursor.execute("DELETE FROM users WHERE username = ?", (username,))
        
        # Commit the transaction
        conn.commit()
        
        # Check if any rows were affected (if no user with the given username exists)
        if cursor.rowcount == 0:
            return jsonify({"error": "User Not Found", "message": f"User with username '{username}' not found"}), 404
        
        # Return a success response
        return jsonify({"message": f"User '{username}' deleted successfully"}), 200
    except Exception as e:
        # Return a detailed error response with the specific error message
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


@app.route('/api/login', methods=['POST'])
def login():
    try:
        # Get data from request body
        data = request.json
        
        # Extract username and password
        username = data.get('username')
        password = data.get('password')
        
        # Execute SQL query to fetch user by username and password
        query = "SELECT * FROM users WHERE username = '{}' AND passkey = '{}'".format(username, password)
        print("\n-----",query)
        cursor.execute(query)
        
        # Fetch the row from the result set
        row = cursor.fetchone()
        
        # Check if user exists
        if row:
            # Assuming username and password validation is successful, generate JWT token
            payload = {'username': username, 'admin' : False}  # Add other necessary data to the payload
            token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
            print("\n--------",token)
            return jsonify({"token": token}), 200
            # # User found, return success response
            # return jsonify({"message": "Login successful"}), 200
        else:
            # User not found, return error response
            return jsonify({"error": "Unauthorized", "message": "Invalid username or password"}), 401
    except Exception as e:
        # Return a detailed error response with the specific error message
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500



@app.route('/api/adminLogin', methods=['POST'])
def adminLogin():
    try:
        # Get data from request body
        data = request.json
        
        # Extract username and password
        username = data.get('username')
        password = data.get('password')
        
        # Execute SQL query to fetch user by username and password
        query = "SELECT * FROM users join [dbo].[Admin] on username = [admin_uName]   WHERE username = '{}' AND passkey = '{}'".format(username, password)
        print("\n-----",query)
        cursor.execute(query)
        
        # Fetch the row from the result set
        row = cursor.fetchone()
        
        # Check if user exists
        if row:
            # Assuming username and password validation is successful, generate JWT token
            payload = {'username': username, 'admin' : True}  # Add other necessary data to the payload
            token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
            print("\n--------",token)
            return jsonify({"token": token}), 200
            # # User found, return success response
            # return jsonify({"message": "Login successful"}), 200
        else:
            # User not found, return error response
            return jsonify({"error": "Unauthorized", "message": "Invalid username or password"}), 401
    except Exception as e:
        # Return a detailed error response with the specific error message
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Unauthorized", "message": "Token is missing"}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            # You can access user data from 'data' dictionary
            current_user = data['username']
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Unauthorized", "message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Unauthorized", "message": "Invalid token"}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated

@app.route('/api/protected', methods=['GET'])
@token_required
def protected_route(current_user):
    # Your protected route logic here
    return jsonify({"message": f"Welcome, {current_user}"}), 200




# Define the API endpoint to fetch all anime
@app.route('/api/animeUC', methods=['GET'])
def get_animeUC():
    try:
        # Execute the SQL query to select all anime
        query = "select top 10 a.[AID],a.[name],a.[Descript],a.[releasedate],ai.[img] from [dbo].[Anime] as a join [dbo].[animeImg] as ai on a.aid = ai.aniid where a.[released] = 0 order by a.[releasedate] asc"
        print("\n----",query)
        cursor.execute(query)
        # Fetch all rows from the result set
        rows = cursor.fetchall()
        print("\n-----",rows)
        # Convert the rows to a list of dictionaries
        anime_list = []
        i = 0
        print("--------------------------------------------\n")
        for row in rows:
            print(i, "----", row[0], row[1], row[2], row[3], row[4], "\n")
            i = i + 1
            anime = {
                'AID': row[0],
                'name': row[1],
                'description': row[2],
                'releaseDate': row[3],
                'img': row[4]
            }
            anime_list.append(anime)
        print("\nhere\n")
        # Return the anime data as JSON response
        return jsonify(anime_list), 200
    except Exception as e:
        # Return a detailed error response with the specific error message
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500



# Define the API endpoint to fetch all anime
@app.route('/api/animeMW', methods=['GET'])
def get_animeMW():
    try:
        # Execute the SQL query to select all anime
        query = "select top 10 a.aid,a.[name],a.[Descript],count(*) as viewss,ai.img from ([dbo].[Anime] as a join [dbo].[watch] as w on a.[AID] = w.[aniid]) join animeimg as ai on a.aid = ai.aniid group by a.[AID],a.[name],a.[Descript],a.[releasedate],ai.img order by count(*) desc"
        print("\n----",query)
        cursor.execute(query)
        # Fetch all rows from the result set
        rows = cursor.fetchall()
        print("\n-----",rows)
        # Convert the rows to a list of dictionaries
        anime_list = []
        i = 0
        print("--------------------------------------------\n")
        for row in rows:
            print(i, "----", row[0], row[1], row[2], row[3], row[4], "\n")
            i = i + 1
            anime = {
                'AID': row[0],
                'name': row[1],
                'description': row[2],
                'views': row[3],
                'img': row[4]
            }
            anime_list.append(anime)
        print("\nhere\n")
        # Return the anime data as JSON response
        return jsonify(anime_list), 200
    except Exception as e:
        # Return a detailed error response with the specific error message
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500




# Define the API endpoint to fetch all anime
@app.route('/api/anime', methods=['GET'])
def get_anime():
    try:
        # Execute the SQL query to select all anime
        cursor.execute("SELECT * FROM Anime join animeImg on aid = aniid")
        
        # Fetch all rows from the result set
        rows = cursor.fetchall()
        
        # Convert the rows to a list of dictionaries
        anime_list = []
        for row in rows:
            anime = {
                'AID': row.AID,
                'name': row.name,
                'description': row.Descript,
                'age_restriction': row.age_restriction,
                'release_date': row.releasedate.strftime('%Y-%m-%d') if isinstance(row.releasedate, datetime.datetime) else row.releasedate,
                'released': bool(row.released),
                'img': row.img
            }
            anime_list.append(anime)
        
        # Return the anime data as JSON response
        return jsonify(anime_list), 200
    except Exception as e:
        # Return a detailed error response with the specific error message
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


# Define the API endpoint to fetch all anime
@app.route('/api/animeD', methods=['GET'])
def get_animeD():
    try:
        # Execute the SQL query to select all anime
        cursor.execute("SELECT * FROM Anime as a join animeImg as ai on a.aid = ai.aniid where exists (select* from discussion as d where a.aid = d.aniid)")
        
        # Fetch all rows from the result set
        rows = cursor.fetchall()
        
        # Convert the rows to a list of dictionaries
        anime_list = []
        for row in rows:
            anime = {
                'AID': row.AID,
                'name': row.name,
                'description': row.Descript,
                'age_restriction': row.age_restriction,
                'release_date': row.releasedate.strftime('%Y-%m-%d') if isinstance(row.releasedate, datetime.datetime) else row.releasedate,
                'released': bool(row.released),
                'img': row.img
            }
            anime_list.append(anime)
        
        # Return the anime data as JSON response
        return jsonify(anime_list), 200
    except Exception as e:
        # Return a detailed error response with the specific error message
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

# Define the API endpoint to fetch anime by AID
@app.route('/api/anime/<int:aid>', methods=['GET'])
def get_anime_by_id(aid):
    try:
        # Execute the SQL query to select anime by AID
        query = "SELECT a.*, ai.img, g.genre FROM Anime a JOIN animeImg ai ON a.AID = ai.aniid LEFT JOIN genre g ON a.AID = g.aniid WHERE a.AID = {}".format(aid)
        print("\n",query)
        cursor.execute(query)
        rows = cursor.fetchall()

        # If no row found, return 404 Not Found
        if not rows:
            return jsonify({"error": "Not Found", "message": "Anime with AID {} not found".format(aid)}), 404

        # Convert the row to a dictionary
        print("\nhere")
        print("\n row: ",rows)
        anime = {
            'AID': rows[0][0],
            'name': rows[0][1],
            'description': rows[0][2],
            'age_restriction': rows[0][3],
            'release_date': rows[0][4],
            'released': bool(rows[0][5]),
            'img': rows[0][6],
            'genres': []
        }
        #print("\nhere------",anime)
        for row in rows:
            if row[7]:  # Check if username exists
                anime['genres'].append(row[7])
        #print("\nhere------",anime)
        # Return the anime data as JSON response
        return jsonify(anime), 200
    except Exception as e:
        # Return a detailed error response with the specific error message
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500
    
@app.route('/api/animeS/<string:name>', methods=['GET'])
def get_anime_by_name(name):
    try:
        # Execute the SQL query to select anime by AID
        query = "SELECT * From Anime WHERE name = '{}'".format(name)
        print("\n",query)
        print("_____________________________________")
        cursor.execute(query)
        print("___________________________")
        rows = cursor.fetchall()

        # If no row found, return 404 Not Found
        if not rows:
            return jsonify({"error": "Not Found", "message": "Anime with AID {} not found".format(name)}), 404

        # Convert the row to a dictionary
        print("\nhere")
        print("\n row: ",rows)
        anime = {
            'AID': rows[0][0],
            'name': rows[0][1],
        }

        #print("\nhere------",anime)
        # Return the anime data as JSON response
        return jsonify(anime), 200
    except Exception as e:
        # Return a detailed error response with the specific error message
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


# # Define the API endpoint to fetch anime by AID
# @app.route('/api/anime/<int:aid>', methods=['GET'])
# def get_anime_by_id(aid):
#     try:
#         print("/n-------------------Aid:",aid)  # Debugging line
#         # Execute the SQL query to select anime by AID
#         cursor.execute("SELECT * FROM Anime a JOIN animeImg ai ON a.AID = ai.aniid WHERE a.AID = ?", (aid))
#         print("/n-------------------No issue")  # Debugging line
#         # Fetch the row from the result set
#         row = cursor.fetchone()
        
#         # If no row found, return 404 Not Found
#         if not row:
#             return jsonify({"error": "Not Found", "message": "Anime with AID {} not found".format(aid)}), 404
        
#         # Convert the row to a dictionary
#         anime = {
#             'AID': row.AID,
#             'name': row.name,
#             'description': row.Descript,
#             'age_restriction': row.age_restriction,
#             'release_date': row.releasedate.strftime('%Y-%m-%d') if isinstance(row.releasedate, datetime.datetime) else row.releasedate,
#             'released': bool(row.released),
#             'img': row.img
#         }
        
#         # Return the anime data as JSON response
#         return jsonify(anime), 200
#     except Exception as e:
#         # Return a detailed error response with the specific error message
#         return jsonify({"error": "Internal Server Error", "message": str(e)}), 500



@app.route('/api/animeD/<int:aid>', methods=['GET'])
def get_animeD_by_id(aid):
    try:
        query = "SELECT a.*, ai.img, d.uname, d.comment, d.replytime FROM Anime AS a JOIN animeImg AS ai ON a.AID = ai.aniId LEFT JOIN discussion AS d ON a.AID = d.aniId WHERE a.AID = {} order by replytime desc".format(aid)
        cursor.execute(query)
        rows = cursor.fetchall()

        if not rows:
            return jsonify({"error": "Not Found", "message": f"Anime with AID {aid} not found"}), 404

        anime_data = {}
        if rows:
            anime_data = {
                'AID': rows[0][0],
                'name': rows[0][1],
                'description': rows[0][2],
                'age_restriction': rows[0][3],
                'release_date': rows[0][4],
                'released': bool(rows[0][5]),
                'img': rows[0][6],
                'discussions': []
            }
            
            for row in rows:
                if row[7]:  # Check if username exists
                    anime_data['discussions'].append({
                        'username': row[7],
                        'comment': row[8],
                        'reply_time': row[9]
                    })

        return jsonify(anime_data), 200

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500




# @app.route('/api/animeD/<int:aid>', methods=['GET'])
# def get_animeD_by_id(aid):
#     try:
#         query = "SELECT a.*, ai.img, d.uname, d.comment, d.replytime FROM Anime AS a JOIN animeImg AS ai ON a.AID = ai.aniId LEFT JOIN discussion AS d ON a.AID = d.aniId WHERE a.AID = {}".format(aid)
#         print("\n---",query)
#         cursor.execute(query)
#         rows = cursor.fetchall()

#         if not rows:
#             return jsonify({"error": "Not Found", "message": f"Anime with AID {aid} not found"}), 404

#         anime_data = {}
#         if rows:
#             print("\n here \n",rows)
#             print(rows[0][0])  # AID of the first row
#             print(rows[0][1])  # name of the first row
#             print(rows[0][2])  # Descript of the first row
#             print(rows[0][3])  # age_restriction of the first row
#             print(rows[0][4])  # releasedate of the first row
#             print(rows[0][5])  # released of the first row
#             print(rows[0][6])  # img of the first row
#             anime_data = {
#                 'AID': rows[0][0],
#                 'name': rows[0][1],
#                 'description': rows[0][2],
#                 'age_restriction': rows[0][3],
#                 'release_date': rows[0][4],
#                 'released': bool(rows[0][5]),
#                 'img': rows[0][6],
#                 'discussions': []
#             }
#             print("\n Anime Data:-------",anime_data)
#             print(rows[0][7])  # username of the first row
#             print(rows[0][8])  # comment of the first row
#             print(rows[0][9])  # reply time of the first row
#             for row in rows:
#                 if row['uname']:
#                     anime_data['discussions'].append({
#                         'username': row[7],
#                         'comment': row[8],
#                         'reply_time': row[9]
#                     })

#         return jsonify(anime_data), 200

#     except Exception as e:
#         return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

    # try:
    #     print("/n-------------------Aid:",aid)  # Debugging line
    #     # Execute the SQL query to select anime by AID
    #     cursor.execute("SELECT * FROM Anime a JOIN animeImg ai ON a.AID = ai.aniid WHERE a.AID = %s", (aid,))
    #     print("/n-------------------No issue")  # Debugging line
    #     # Fetch the row from the result set
    #     row = cursor.fetchone()
        
    #     # If no row found, return 404 Not Found
    #     if not row:
    #         return jsonify({"error": "Not Found", "message": "Anime with AID {} not found".format(aid)}), 404
        
    #     # Convert the row to a dictionary
    #     anime = {
    #         'AID': row.AID,
    #         'name': row.name,
    #         'description': row.Descript,
    #         'age_restriction': row.age_restriction,
    #         'release_date': row.releasedate.strftime('%Y-%m-%d') if isinstance(row.releasedate, datetime.datetime) else row.releasedate,
    #         'released': bool(row.released),
    #         'img': row.img
    #     }
        
    #     # Return the anime data as JSON response
    #     return jsonify(anime), 200
    # except Exception as e:
    #     # Return a detailed error response with the specific error message
    #     return jsonify({"error": "Internal Server Error", "message": str(e)}), 500



@app.route('/api/watched_anime/<username>', methods=['GET'])
def get_watched_anime(username):
    try:
        # Execute SQL query to fetch watched anime for the given user
        query = "SELECT a.*, ai.img FROM Anime AS a JOIN watch AS w ON a.AID = w.aniid JOIN animeImg AS ai ON a.AID = ai.aniId WHERE w.uname = '{}'".format(username)
        cursor.execute(query)
        rows = cursor.fetchall()

        watched_anime = []
        for row in rows:
            anime_data = {
                'AID': row[0],
                'name': row[1],
                'description': row[2],
                'age_restriction': row[3],
                'release_date': row[4],  # Format the date as string
                'released': bool(row[5]),
                'img': row[6]
            }
            watched_anime.append(anime_data)
        print("\nAnime:  ",watched_anime)
        return jsonify(watched_anime), 200

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500
    



@app.route('/api/favourite_anime/<username>', methods=['GET'])
def get_favourite_anime(username):
    try:
        # Execute SQL query to fetch watched anime for the given user
        query = "SELECT a.*, ai.img FROM Anime AS a JOIN favourite AS w ON a.AID = w.aniid JOIN animeImg AS ai ON a.AID = ai.aniId WHERE w.uname = '{}'".format(username)
        cursor.execute(query)
        rows = cursor.fetchall()

        watched_anime = []
        for row in rows:
            anime_data = {
                'AID': row[0],
                'name': row[1],
                'description': row[2],
                'age_restriction': row[3],
                'release_date': row[4],  # Format the date as string
                'released': bool(row[5]),
                'img': row[6]
            }
            watched_anime.append(anime_data)
        print("\nAnime:  ",watched_anime)
        return jsonify(watched_anime), 200

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500




# Define the API endpoint to get user information by username
@app.route('/api/user_info', methods=['GET'])
def get_user_info():
    try:
        # Get username from query parameters
        username = request.args.get('username')

        # Execute SQL query to retrieve user information
        query = "SELECT * FROM users WHERE username = ?"
        cursor.execute(query, (username,))
        user_info = cursor.fetchone()

        if user_info:
            # Construct a dictionary with user information
            user_data = {
                "username": user_info[0],
                "name": user_info[1],
                "bdate": user_info[2],
                "joiningDate": user_info[3],
                "gender": "Male" if user_info[4] == 1 else "Female",
                "email": user_info[5],
                "badges": user_info[7]
            }
            return jsonify(user_data), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500



@app.route('/api/animeR/<int:aid>', methods=['GET'])
def get_anime_reviews_by_id(aid):
    try:
        query = "SELECT a.*, ai.img, r.uname, r.review, r.reviewDate FROM Anime AS a JOIN animeImg AS ai ON a.AID = ai.aniId LEFT JOIN reviews AS r ON a.AID = r.aniId WHERE a.AID = {} order by reviewDate desc".format(aid)
        cursor.execute(query)
        rows = cursor.fetchall()

        if not rows:
            return jsonify({"error": "Not Found", "message": f"Anime with AID {aid} not found"}), 404

        anime_data = {}
        if rows:
            anime_data = {
                'AID': rows[0][0],
                'name': rows[0][1],
                'description': rows[0][2],
                'age_restriction': rows[0][3],
                'release_date': rows[0][4],
                'released': bool(rows[0][5]),
                'img': rows[0][6],
                'reviews': []
            }
            
            for row in rows:
                if row[7]:  # Check if username exists
                    anime_data['reviews'].append({
                        'username': row[7],
                        'review': row[8],
                        'reviewDate': row[9]
                    })

        return jsonify(anime_data), 200

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500
    




@app.route('/api/add_review', methods=['POST'])
def add_review():
    try:
        data = request.json

        # Extract review information
        username = data.get('username')
        aniid = data.get('aniid')
        review = data.get('review')
        reviewDate = datetime.datetime.now().strftime('%Y-%m-%d')

        # Execute SQL query to insert review
        query = "INSERT INTO reviews (uname, aniId, review, reviewDate) VALUES ('{}', {}, '{}', '{}')".format(username, aniid, review, reviewDate)
        print("\n Queery: ",query)
        cursor.execute(query)
        conn.commit()

        return jsonify({"message": "Review added successfully"}), 201
    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


@app.route('/api/animeGenre/<AnimeGenre>', methods=['GET'])
def get_animeGenre(AnimeGenre):
    try:
        # Execute SQL query to fetch watched anime for the given user
        query = "SELECT a.*, ai.img,g.genre FROM Anime AS a JOIN genre AS g ON a.AID = g.aniid JOIN animeImg AS ai ON a.AID = ai.aniId WHERE g.genre = '{}'".format(AnimeGenre)
        print("\n Query:",query)
        cursor.execute(query)
        print("\n--------------------------")
        rows = cursor.fetchall()

        genre_anime = []
        print("\n-----------------------------",rows[0][7])
        for row in rows:
            anime_data = {
                'AID': row[0],
                'name': row[1],
                'description': row[2],
                'age_restriction': row[3],
                'release_date': row[4],  # Format the date as string
                'released': bool(row[5]),
                'img': row[6],
                'genre' : row[7]
            }
            print("\n\nAnimes :",genre_anime)
            print("\nAnime data: ",anime_data)
            genre_anime.append(anime_data)


        #print("\nAnime Genre:  ",anime[0].genre)
        return jsonify(genre_anime), 200

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500
    


@app.route('/api/rating/<int:AID>', methods=['GET'])
def get_anime_Rating(AID):
    try:
        # Execute SQL query to fetch watched anime for the given user
        query = "select sum(ra.[Rating])/count(*) as Rate from [dbo].[rating] as ra where ra.[aniid] = {}".format(AID)
        print("\nbefore:")
        print("\n Query:",query)
        print("\nAfter")
        cursor.execute(query)
        print("\n--------------------------")
        row = cursor.fetchone()
        print("\n rows: ",row)
        rating = ""
        if(row[0] == None):
            rating = "NA"
        else:    
            rating = row[0]



        #print("\nAnime Genre:  ",anime[0].genre)
        return jsonify(rating), 200

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500




# Define the API endpoint to insert a new user
@app.route('/api/ratingPOST', methods=['POST'])
def add_rating():
    try:
        # Get data from request body
        data = request.json
        # Extract comment information
        username = data.get('username')
        aniid = data.get('aniid')
        rating = data.get('ratings')

        # Execute SQL query to insert comment
        query = "INSERT INTO rating (uname, aniId, rating) VALUES ('{}', {}, {})".format(username, aniid, rating)
        print("\n Query: ")
        cursor.execute(query)

        # Commit transaction
        conn.commit()


        # Return success response
        return jsonify({"message": "User inserted successfully"}), 201
    except Exception as e:
        # Return error response
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500
    

# Define the API endpoint to insert a new user
@app.route('/api/watchedPOST', methods=['POST'])
def add_watched():
    try:
        # Get data from request body
        data = request.json
        # Extract comment information
        username = data.get('username')
        aniid = data.get('aniid')
        print("\n---",data)
        # Execute SQL query to insert comment
        query = "INSERT INTO watch (uname, aniId, viewDate) VALUES ('{}', {}, '{}')".format(username, aniid,date.today())
        print("\n ---Query: ",query)
        cursor.execute(query)

        # Commit transaction
        conn.commit()
        # Return success response
        return jsonify({"message": "watched inserted successfully"}), 201
    except Exception as e:
        # Return error response
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500



# Define the API endpoint to insert a new user
@app.route('/api/favouritePOST', methods=['POST'])
def add_favourite():
    try:
        # Get data from request body
        data = request.json
        # Extract comment information
        username = data.get('username')
        aniid = data.get('aniid')
        print("\n---",data)
        # Execute SQL query to insert comment
        query = "INSERT INTO favourite (uname, aniId) VALUES ('{}', {})".format(username, aniid)
        print("\n ---Query: ",query)
        cursor.execute(query)

        # Commit transaction
        conn.commit()
        # Return success response
        return jsonify({"message": "favourite inserted successfully"}), 201
    except Exception as e:
        # Return error response
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500




@app.route('/api/del_user/<username>', methods=['DELETE'])
def del_user(username):
    try:
        # Execute SQL query to fetch watched anime for the given user
        query = "DELETE FROM USERS WHERE USERNAME = '{}'".format(username)
        print("\n Query: ",query)
        cursor.execute(query)
        conn.commit
        return jsonify("DELETED successfully"), 200

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


@app.route('/api/del_anime/<int:aid>', methods=['DELETE'])
def del_anime(aid):
    try:
        # Execute SQL query to fetch watched anime for the given user

        query = "DELETE FROM ANIMEIMG WHERE aniid = {}".format(aid)
        print("\n Query img: ",query)
        cursor.execute(query)

        query = "DELETE FROM ANIME WHERE AID = {}".format(aid)
        print("\n Query anime: ",query)
        cursor.execute(query)
        print("run ho gai---------------------------")
        conn.commit
        return jsonify("Anime DELETED successfully"), 200

    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


    # Define the API endpoint to insert a new comment
# Define the API endpoint to insert a new comment
@app.route('/api/add_anime', methods=['POST'])
def add_anime():
    try:
        # Get data from request body
        data = request.json

        # Extract comment information




        # Count total entries in the comment table
        count_query = "SELECT COUNT(*) FROM Anime"
        cursor.execute(count_query)
        aid = cursor.fetchone()[0]
        aid = aid + 1
        print("\n  AID ",aid)
        print("\nData : ",data)
        name = data["name"]
        print("\n----------------------hhhhhhhhhh-----------")        # Execute SQL query to insert comment

        description = data["description"]
        print("\n---------------------------------")        # Execute SQL query to insert comment
        ageRestriction = data["ageRestriction"]
        releaseDate = data["releaseDate"]
        released =data["released"]
        print("\n---------------------------------hhhhhhhhhhhhhhhhhhhhhh")        # Execute SQL query to insert comment

        query = "INSERT INTO anime (AID, name,Descript, age_restriction,releasedate,released) VALUES ({}, '{}', '{}', {}, '{}',{})".format(aid,name,description,ageRestriction,releaseDate,released)
        print("\n----Query",query)
        cursor.execute(query)
        conn.commit()
        query = "INSERT INTO animeimg (aniId, img) values({}, '{}.jpg')".format(aid,aid)
        print("\n----Query",query)
        cursor.execute(query)

        # Commit transaction
        conn.commit()

        # Return success response
        return jsonify({"message": "Anime added successfully"}), 201
    except Exception as e:
        # Return error response
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

if __name__ == "__main__":
    # Run the Flask application
    app.run(debug=True, port=8000)
