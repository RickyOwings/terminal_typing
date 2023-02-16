﻿# terminal_typing
A NodeJS typing test application

In order to run, download the repo to a local folder and run "node terminal_typing.js"

The app will not work if you do not have node js installed on your system https://nodejs.org/en/
   The app was built on node version 18.14.0 if it does not work for whatever reason

Modules used
  keypress for weblike onkeypress events
  cli-color for text coloring
  fs for reading files (duh)
  hide-terminal-cursor for... hmm... hiding the terminal cursor...  I would have not guessed that one

The program was originally coded in typscript, so look at that file if you want to better understand what
is happening (I probably could have commented on my code a little better to explain how it works)

If you want to change the amount of words used for the test:
  in the javascript file, in the section labeled "constants", change WORD_COUNT
  to whatever you want. CHAR_WIDTH is the max width in characters that the text
  can occupy

If you want to change the words used:
   Change the 1-1000.txt file contents to be whatever list of files you
   would like to use. I got the 1-1000.txt from https://gist.github.com/deekayen/4148741

Notes:
   I should eventually add the functionality to take an argument to specify the word count
   
   I should eventually stop using keypress because it does not support characters and number keys
   to be inputed for whatever reason (they get passed as undefined)
