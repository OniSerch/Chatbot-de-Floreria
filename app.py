from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
from google import genai
import os
load_dotenv()

app = Flask(__name__)
print(os.getenv("API_IA"))
client = genai.Client(api_key=os.getenv("API_IA"))

@app.route("/")
def home():
    return render_template("main.html")

@app.route("/api/chat", methods=["POST"])
def api_chat():
    data = request.get_json()
    user_message = data["message"]

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=user_message
    )

    return jsonify({
        "reply": response.text
    })

if __name__ == "__main__":
    app.run(debug=True)