import { OperationFunction } from "../types/operationsType";

export const operations: { [key: string]: OperationFunction } = {
    
    '+': (...numbers) => numbers.reduce((acc, num) => acc + num, 0),
    '-': (...numbers) => numbers.reduce((acc, num) => acc - num),
    '*': (...numbers) => numbers.reduce((acc, num) => acc * num, 1),
    '/': (...numbers) => numbers.reduce((acc, num) => acc / num),
    '%': (...numbers) => numbers.reduce((acc, num) => acc % num),
    '^': (...numbers) => numbers.reduce((acc, num) => acc ** num),
};
