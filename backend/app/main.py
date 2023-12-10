from fastapi.responses import JSONResponse
import requests
import psycopg2
from fastapi import FastAPI, HTTPException, Cookie
from nltk.stem.snowball import SnowballStemmer
from pydantic import BaseModel, EmailStr

USERNAME_INDEX = 0
USERID_INDEX = 1
EMAIL_INDEX = 2
PASSWORD_INDEX = 3

app = FastAPI()

# connect to db

conn = psycopg2.connect(
    database="reword",
    user="postgres",
    host="localhost",
    password="postgresql_tutorial",
    port=5432,
)

stemmer = SnowballStemmer("english")


# Register
class UserIn(BaseModel):
    username: str
    email: EmailStr
    password: str
    password_confirm: str


# Logout
class UserOut(BaseModel):
    username: str
    email: EmailStr


# Raw content
class RawText(BaseModel):
    content: str
    lengthGeq4: bool
    provideAlter: bool
    overlookQuotation: bool


# Cookie
async def set_cookie(value: str, response: JSONResponse):
    response.set_cookie(key="example_cookie", value=value)
    return {"message": "Cookie set successfully"}


@app.get("/get-cookie")
async def get_cookie(example_cookie: str = Cookie(default=None)):
    if example_cookie is None:
        raise HTTPException(status_code=403, detail="Cookie not found!")
    return {"message": "Cookie value", "value": example_cookie}


@app.post("/register")
def save_user(user_in: UserIn):
    if user_in.password != user_in.password_confirm:
        raise HTTPException(status_code=403, detail="Passwords do not match!")
    hashed_password = user_in.password

    cur = conn.cursor()
    cur.execute(
        "INSERT INTO client (username, email, password) VALUES ('"
        + user_in.username
        + "', '"
        + user_in.email
        + "', '"
        + hashed_password
        + "');"
    )
    conn.commit()
    conn.close()
    return {"message": "Successfully Added User"}


@app.post("/user/", response_model=UserOut)
async def create_user(user_in: UserIn):
    user_saved = save_user(user_in)
    return user_saved


@app.get("/login/")
def login(request_data: dict):
    print("This is a test")
    email = request_data.get("email", "")
    password = request_data.get("password", "")

    cur = conn.cursor()
    cur.execute("SELECT * FROM client")
    rows = cur.fetchall()
    conn.commit()
    conn.close()
    for row in rows:
        if row[EMAIL_INDEX] == email and row[PASSWORD_INDEX] == password:
            return {"id": row[USERID_INDEX]}
    raise HTTPException(status_code=403, detail="Wrong Username or Password")


# Paragraph Processing
@app.get("/split/")
def split_paragraph(raw_text: RawText) -> dict:
    content = raw_text.content
    lengthGeq4 = raw_text.lengthGeq4
    # provideAlter = raw_text.provideAlter
    # overlookQuotation = raw_text.overlookQuotation

    no_anno = ""
    for char in content:
        if char not in ",.;:!?'\"()&":
            no_anno += char
    wordList = [word for word in no_anno.split()]
    content = content.lower()

    words = [word for word in no_anno.split()]
    wordHashMap = {}

    for index, value in enumerate(words):
        value = stemmer.stem(value)
        if len(value) > 3 or not (lengthGeq4):
            if value in wordHashMap:
                wordHashMap[value].append(index)
            else:
                wordHashMap[value] = [index]

    wordHashMapNoDupli = {}
    for key in wordHashMap:
        if len(wordHashMap[key]) > 1:
            wordHashMapNoDupli[key] = wordHashMap[key]

    return {"wordList": wordList, "wordHashMap": wordHashMapNoDupli}


@app.get("/relevant/{word}")
def get_relevant_word(word):
    api_url = "https://api.api-ninjas.com/v1/thesaurus?word={}".format(word)
    response = requests.get(
        api_url,
        headers={"X-Api-Key": "sqpitc+bGiqsOCrdDKX3tw==FPXfc3OG5830BtaU"}
        # change if the user Api Key is different.
    )
    if response.status_code == requests.codes.ok:
        data = response.json()
        print(data)
        return {
            "synonyms": data.get("synonyms", [])[:6],
            "full_synonyms": data.get("synonyms", [])[7:],
        }
    else:
        print("Error:", response.status_code, response.text)


# History
# @app.post("/history/")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
