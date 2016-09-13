import * as fs from 'fs';
import * as path from 'path';

export function readTextFile(absoluteFilePath: string) {
    return fs.readFileSync(absoluteFilePath, 'utf-8');
}

export function requireRelative(filePath: string, defaultValue?: any) {
    const absolutePath = path.resolve(filePath);

    if (defaultValue && !fs.existsSync(absolutePath)) {
        return defaultValue;
    } else {
        return require(absolutePath);
    }
}

export function getPackageConfig(command: string): {} {
    const config = requireRelative('package.json', {}).config;

    return (config && config.granate && config.granate[command]) || {};
}
