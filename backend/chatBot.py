import os
import sys
import json
import openai
from dotenv import load_dotenv

load_dotenv()

client = openai.OpenAI(
    api_key = os.environ.get("SAMBANOVA_API_KEY"),
    base_url = "https://api.sambanova.ai/v1",
)

# Define the filename to store conversation history
history_filename = "conversation_history.json"

# Function to load conversation history from file
def load_conversation_history():
    if os.path.exists(history_filename):
        with open(history_filename, "r") as f:
            return json.load(f)
    else:
        # If no history exists, initialize with a system message
        return [{"role": "system", "content": "You are a helpful assistant."}]

# Function to save conversation history to file
def save_conversation_history(history):
    with open(history_filename, "w") as f:
        json.dump(history, f)


# Load conversation history (or start new if none exists)
conversation_history = load_conversation_history()

# Check if a command-line argument was passed, if not, prompt the user
if len(sys.argv) > 1:
    user_message = sys.argv[1]
else:
    user_message = input("You: ")

# Append the new user message to the conversation history
conversation_history.append({"role": "user", "content": user_message})

# Call the API to get the response, passing the conversation history
response = client.chat.completions.create(
    model="Meta-Llama-3.1-8B-Instruct",
    messages=conversation_history,  # Send the entire conversation history
    temperature=0.1,
    top_p=0.1
)

# Get the assistant's response from the API response
assistant_response = response.choices[0].message.content

# Print the assistant's response
print(f"Assistant: {assistant_response}")

# Append the assistant's response to the conversation history for future context
conversation_history.append({"role": "assistant", "content": assistant_response})

# Save the updated conversation history to the file
save_conversation_history(conversation_history)

