import { writeFileSync, readFileSync } from 'fs';

/**
 * Writes a string to a text file at the specified filepath synchronously.
 * @param {string} filepath - The path where the file should be written.
 * @param {string} content - The string content to write to the file.
 * @throws {Error} If the file cannot be written.
 */
export function writeFile(filepath, content) {
  try {
    writeFileSync(filepath, content, 'utf8');
    console.log(`Successfully wrote to file: ${filepath}`);
  } catch (error) {
    console.error(`Error writing to file: ${error}`);
    throw error;
  }
}

/**
 * Reads a file synchronously and returns its content as a base64 encoded string.
 * 
 * @param {string} filePath - The path to the file to be read (relative to the current working directory).
 * @returns {string} The base64 encoded content of the file.
 * @throws {Error} If there's an issue reading the file.
 */
export function readFile(filePath, encoding='utf8') {
    try {
      const data = readFileSync(filePath);
      return data.toString(encoding);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`File not found: ${filePath}`);
      } else {
        throw new Error(`Error reading file: ${error.message}`);
      }
    }
  }


export const imageBufferToBase64Encoded = (buffer) => {
    // return `data:image/png;base64,${buffer.toString('base64')}`;
    return buffer.toString('base64');
}


/**
 * Cuts off the outro that the LLM may try to output (takes json prefix)
 * @param {string} json - The JSON string to process
 * @returns {string} The processed JSON string
 */
export function jsonCut(json) {
    let curlCnt = 1;
    let result = "{";
    for (let i = 1; i < json.length; i++) {
        if (json[i] === '{') {
            curlCnt++;
        } else if (json[i] === '}') {
            curlCnt--;
        }
        
        result += json[i];
        if (curlCnt == 0) {
            return result;
        }
    }
    return result;
}

/**
 * Fixes newline characters in JSON strings
 * @param {string} json - The JSON string to process
 * @returns {string} The processed JSON string with fixed newlines
 */
export function newLineInStrFix(json) {
    let newJson = '';
    let inStr = false;
    for (let i = 0; i < json.length; i++) {
        if (json[i] === '\"') {
            newJson += json[i];
            inStr = !inStr;
        }
        else {
            if (inStr && json[i] === '\n') {
                newJson += "\\n";
            } else {
                newJson += json[i];
            }
        }
    }
    return newJson;
}