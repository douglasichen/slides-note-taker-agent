import { pdf } from "pdf-to-img";
import { imageBufferToBase64Encoded } from "./util.js";
import { askClaude } from './claude.js';

async function imageToNotes(base64Image) {
  try {
    const response = await askClaude(base64Image);
    return response.notes;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function pdfToNotes(filePath, pageLimit=100) {
  const document = await pdf(filePath, { scale: 3 });
  const allNotes = [];
  let pageNum = 1;
  
  for await (const imageBuffer of document) {
    if (pageNum > pageLimit) {
      console.log(`Page Limit of ${pageLimit} was exceeded, stopping...`);
      break;
    }

    const base64Image = imageBufferToBase64Encoded(imageBuffer);
    const notes = await imageToNotes(base64Image);
    allNotes.push(notes);

    pageNum++;
  }

  return allNotes;
}
