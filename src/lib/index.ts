import * as fs from 'fs';

export function readTextFile(absoluteFilePath: string) {
    return fs.readFileSync(absoluteFilePath, 'utf-8');
}
