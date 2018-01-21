# The Shortest Edition

Task description: https://wunder.dog/the-shortest-edition

Basically the code is given a text file which separates words from each other with a space or line break and then produces compressed output file from these words. In the output file, words are written into lines that can fit a maximum of 80 characters, including spaces but excluding line breaks. Original order of the words doesn't matter.

## Install Node.js

If necessary, download and install Node.js first: https://nodejs.org/en/
Install npm package `line-by-line` with `npm install line-by-line`.

## Running the code

Run code with `node shortest.js`.
Output file is written to `alastalon_shortest.txt`.

## Checking the output

Extract a validator binary for your platform from the `validators/` -subdirectory and run it
with `./alastalo_validator alastalon_shortest.txt`.