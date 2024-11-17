const { spawn } = require('child_process'); 

const chatWithBot = async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage || userMessage == "")
        return res.status(400).send({ error: "Message is required" });

    const python = spawn('python', ['chatBot.py', userMessage]); // spawn a child process to run the Python script
    
    let output = "";

    python.stdout.on('data', (data) => { // capture data from the Python script's stdout (standard output)
        output += data.toString();  // append each chunk of data to the output variable
    });

    python.stderr.on('data', (data) => { // capture any errors
        console.error(`stderr: ${data.toString()}`);
    });

    python.on('close', (code) => { // when Python script finishes, process will close
        if (code === 0) {
            console.log("Chatbot Response:", output);
            res.status(200).send(output);
        } else {
            res.status(500).send("Error has occurred with the Python script");
        }
    });
}

module.exports = {
    chatWithBot
}