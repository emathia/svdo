const express = require('express');

const app = express();
app.listen(3000);

app.use(express.static("public"))  // This allows us to server static html files.
app.use(express.urlencoded({ extended: true })) //This allos us to decode the request body.
app.use(express.json()) //This allows us to parse json data.

// Make a call to chatGPT to get information
app.post('/api', async (req, res) => {
    const gpt = await gptRequest(req.body.inputQuery)
    res.send({
        original: gpt.original,
        corrected: gpt.corrected,
        instructions: gpt.instructions
    })
})



const gptRequest = async (inputQuery) => {
    var gpt_request = {
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content:
                    "A chat between a helpful AI interface API and a website that helps a student learn the English language.  Please take the student sentence and provide a JSON formated answer that contains: 1.  An html snippet that has the sentence from the student with the subject, verb, direct object and any prepositional phrases in different spans with subject, verb, direct_object, prep_phrases class tags. 2.  A corrected sentence with the same types of span tags. 3.  Instructions that tells the student what to change to go from student sentence to corrected sentence and why.  Do not provide any other information - just the correct json.  Try to always suggest that the student use the simple form of the verbs to stay away form perfect or continuous verb tenses for simplicity and clarity. Only provide one complete json object.  The JSON return should be an object like this {html_snippets: [{student:student_snippet}, {corected:corrected_snippet}], instructions:instruction_block}",
            },
            {
                role: "user",
                content: inputQuery,
            },
        ],
        tools: [
            {
                type: "function",
                function: {
                    name: "display_data",
                    description:
                        "Take in a sentence and provide the original sentence as an HTML snippet with part of speech tagging, a corrected sentence with tagging and instructions to fix the original sentence",
                    parameters: {
                        type: "object",
                        properties: {
                            student_snippet: { type: "string" },
                            corrected_snippet: { type: "string" },
                            instructions: { type: "string" },
                        },
                        required: [
                            "student_snippet",
                            "corrected_snippet",
                            "instructions",
                        ],
                    },
                },
            },
        ],
        tool_choice: {
            type: "function",
            function: { name: "display_data" },
        },
    };


    let res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(gpt_request),
    });

    let returned_data = await res.json();
    let string_data = await returned_data.choices[0].message.tool_calls[0].function.arguments;
    let gptanswer = await JSON.parse(string_data);


    return {
        original: gptanswer.student_snippet,
        corrected: gptanswer.corrected_snippet,
        instruction: gptanswer.instructions
    }




}









