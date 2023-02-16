// --------------- imports --------------- 

const keypress = require('keypress');
const clc = require('cli-color');
const fs = require('fs');
const hide_cursor = require('hide-terminal-cursor');
hide_cursor();

// --------------------------------------- 



// --------------- constants ---------------  

const WORD_COUNT = 15;
const CHAR_WIDTH = 50;

// -----------------------------------------  



// ---------------- loading the 1-1000.txt ----------------

try {
  var data = fs.readFileSync('words/1-1000.txt', 'utf-8');
} catch(err) {
  console.log("could not load words");
  process.stdin.pause();
}

const words = data.split("\n");

// --------------------------------------------------------



// ------------------ handling keypress events ------------------ 

keypress(process.stdin);

process.stdin.on('keypress', (ch, key) => {
  // if the selected key is not supported
  if (key == undefined) return;
  pressedkey(key.sequence);
  // handeling exit case
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();

// -------------------------------------------------------------

const num_words = words.length;

function generate_target_string() {
  let return_string = "";
  let line_size = 0;
  for (let i = 0; i < WORD_COUNT; i++)
  {
    let random_num = Math.floor(num_words * Math.random());
    let word = words[random_num];
    word = word.replace('\'', "").replace("-","");

    if (line_size + word.length > CHAR_WIDTH) {
      if (i != WORD_COUNT - 1) word += " ";
      word += '\n'; 
      line_size = 0;
    } else {
      line_size += word.length + 1;
      if (i != WORD_COUNT - 1) word += " ";
    }
    return_string += word
    
  }
  return return_string;
}



const target_string = generate_target_string();

const target_words = target_string.split(" ");

var user_string = ""

var time = 0;

var timestart: number;
var timeend: number;

var mistakes = 0;
var typos = 0;

function pressedkey(key:string) : void { 
  // handeling time variables
  if (timestart == undefined){
    timestart = Date.now(); 
  }
  time = Date.now() - timestart;  



  
  // handle enter
  if (key == '\r') key = '';
  // handle backspace
  if (key == '\b'){
    user_string = user_string.slice(0, -1);

  }
  else {
    user_string += key;
  }
  drawtext();
}

function drawtext() {
  let caret = clc.bgXterm(8);
  let printString = "";
  let enterOffset = 0;
  let wrong_count = 0;
  for (let i = 0, l = target_string.length; i < l; i++){
    // word wrapping
    let char = target_string[i];
    if (char == '\n') enterOffset++;
    
    // if char is out of range of user's inputs
    if (i > user_string.length - 1 + enterOffset){
      // check if it is out of range by 1
      if (i == user_string.length + enterOffset){
        //add caret styling
        char = caret(char);
      }
	      
      printString += clc.white(char);
      continue;
    }

    // if the char is correct
    let uChar = user_string[i - enterOffset];
    if (uChar == char){
      if (char == " ") char = "_";
      printString += clc.green(char); 
      continue;
    }
    // char must be wrong
    if (char == " ") char = "_";
    printString += clc.red(char);
    if (char != "\n") wrong_count ++;	
  }
  typos += Math.abs(wrong_count - mistakes);
  mistakes = wrong_count;
  console.clear();
  let time_seconds = Math.round(time/10) / 100;
  console.log(`Typing Test | WORDS: ${WORD_COUNT} | MISTAKES: ${mistakes} | TIME :${time_seconds}s\n`);
  console.log(printString);
  checkdone(enterOffset);
}

drawtext();

function checkdone(enterOffset: number) {
  let uL = user_string.length;
  let tL = target_string.length;
  let uLAdjusted = uL + enterOffset;

  // break out of check done if user input is too small
  if (uLAdjusted < tL) return;

  // user has finished
  let time_seconds = Math.round(time/10) / 100;
  let WPM = Math.round(WORD_COUNT / (time / 1000 / 60));
  console.log(`\n\nFinished`);
  console.log(`Time: ${time_seconds}s | WPM: ${WPM} | Words: ${WORD_COUNT} | Mistakes: ${mistakes} | Typos: ${typos}`);
  process.stdin.pause();
}
