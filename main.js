import { pdfToNotes } from './agent.js'
import { writeFile } from './util.js';

const notes = await pdfToNotes("Module 1.2_Cover Letter_Canvas_FA2024-1.pdf");

let fullNotes = '';
notes.forEach(note => {
    fullNotes += `${note}\n`;
});

writeFile("./outputs/output1.txt", fullNotes);
