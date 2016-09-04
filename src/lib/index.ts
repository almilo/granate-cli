import * as fs from 'fs';
import * as path from 'path';

export function readTextFile(absoluteFilePath: string) {
    return fs.readFileSync(absoluteFilePath, 'utf-8');
}

export function requireRelative(filePath: string) {
    return require(path.resolve(filePath));
}
