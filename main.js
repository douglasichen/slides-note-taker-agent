import { pdfToNotes } from './agent.js'
import { writeFile } from './util.js';

const notes = await pdfToNotes("Module 1.1_Resume_Canvas_FA2024-1.pdf");

let fullNotes = '';
notes.forEach(note => {
    fullNotes += `${note}\n`;
});

writeFile("./outputs/output0.txt", fullNotes);
