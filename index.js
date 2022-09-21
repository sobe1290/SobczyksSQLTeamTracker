import inquirer from 'inquirer';
import * as mysql from 'mysql2';
import {nextQuestion, mainMenu} from './js/prompts.js';
import {schema} from './js/schema.js';
import {seeds} from './js/seeds.js';


export const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'LMHEm6ND6aLA#B6X',
    database: 'team_db',
  },
  console.log(`Connected to the team_db database.`)
);

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
    startQuestions();
  });

export function startQuestions() {
inquirer
  .prompt(mainMenu)
  .then(answers =>
    nextQuestion(answers)
        
    );
  };