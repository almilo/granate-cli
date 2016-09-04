import { exec } from 'child_process';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);

export function execWithArguments(args: string): Promise<any> {
    return new Promise(resolve => {
        exec(
            `node dist/index.js ${args}`,
            {timeout: 1000},
            (error: any, stdout: string, stderr: string) => resolve({stdout, stderr})
        );
    });
}
