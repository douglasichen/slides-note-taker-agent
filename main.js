import { promises as fs } from "node:fs";
import { pdf } from "pdf-to-img";

const bufferToBase64EncodedPng = (buffer) => {
    return `data:image/png;base64,${buffer.toString('base64')}`;
}

async function main() {
  let counter = 1;
  const document = await pdf("example.pdf", { scale: 3 });
  
  for await (const image of document) {
    // Convert the image buffer to a Base64 string
    // const base64Image = image.buffer.toString('base64');
    const base64Image = image.toString('base64');
    
    // Optionally, write the Base64 string to a text file
    await fs.writeFile(`page${counter}.txt`, base64Image);
    
    break;
    counter++;
  }
}

main();
