import { pdfToNotes } from './agent.js'
import { writeFile } from './util.js';

const notes = await pdfToNotes("1b-staticscalars-arrays-102-1247.pdf");

let fullNotes = '';
notes.forEach(note => {
    fullNotes += `${note}\n`;
});

writeFile("./outputs/$1b-staticscalars-arrays-102-1247_output.txt", fullNotes);
