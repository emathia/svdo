# Sentence Helper Powered by chatGPT

This is a sentence grammer helper for English-as-a-Second-Language learners.  It allows the user to submit a sentence and see what they wrote, a corrected sentence, and instructions to help them understand what needed fixing.

## Features

**Syntax highlighting** for subject-verb-direct object and prepositional phrases.
**Simple verb tense** suggestions - tries to suggest simple verb tenses.

## Installation

1. Clone the git repo.
2. Build the Dockerfile with `docker build -t svdo .`
3. Create an OPENAI API key.
4. Run ``export OPENAI_API_KEY='API key from OPENAI'``
5. Run Docker image `docker run -d -p 3000:3000 -e OPEN_API_KEY svdo`


## Use
Type in a suggested sentence and the information will come back.