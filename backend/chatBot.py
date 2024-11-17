import os
import sys
import openai
from dotenv import load_dotenv

load_dotenv()

client = openai.OpenAI(
    api_key = os.environ.get("SAMBANOVA_API_KEY"),
    base_url = "https://api.sambanova.ai/v1",
)

# checks if command-line argument was prompted; if not, prompt user to input message
if len(sys.argv) > 1:
    user_message = sys.argv[1]
else:
    user_message = ""



response = client.chat.completions.create(
    model = 'Meta-Llama-3.1-8B-Instruct',
    messages=[{"role": "system", "content": "You are a helpful assistant"},
              {"role": "user", "content": user_message}
              ],
    temperature =  0.1,
    top_p = 0.1
)
