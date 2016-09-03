import { invariant } from './lib';

export default function (value: string): string {
    invariant(value === 'foo', 'Must provide foo.');

    return 'bar';
}
