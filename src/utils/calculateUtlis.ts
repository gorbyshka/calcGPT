import { useState } from 'react';

import { trigonometricFunctionNames } from "../constants/trigonometricFunctionNames";
import { operations } from "../constants/operations";

export const useCalculateLogic = () => {
    
    const [userInput, setUserInput] = useState<string>('');
    const [botResponse, setBotResponse] = useState<string>('');

    const botResponses: { [key: string]: (expression: string) => string } = {

        'привет': () => 'Здравствуй!',
        'как дела?': () => 'Хорошо, спасибо!',
        'что ты можешь делать?': () => 'Я могу решать примеры.',
        'пока': () => 'До свидания!',

        'реши логарифм': (expression) => {

            const logMatch = expression.match(/реши\s+логарифм\s*\((\d+)\s*,\s*(\d+)\)/i);

            if (logMatch) {

                const base = parseFloat(logMatch[1]);
                const number = parseFloat(logMatch[2]);
                return solveLogarithm(base, number);

            }

            return 'Ошибка: неверный формат запроса для решения логарифма.';
        },

        "реши тригонометрию": (expression) => {

            const trigMatch = expression.match(/реши\s+тригонометрию\s*\((\w+)\s*,\s*(\d+)\)/i);

            if (trigMatch) {

                const functionName = trigMatch[1].toLowerCase();
                const angle = parseFloat(trigMatch[2]);

                if (trigonometricFunctionNames.includes(functionName)) return solveTrigonometric(functionName, angle);
                else return "Ошибка: неверная тригонометрическая функция.";
            }

            return "Ошибка: неверный формат запроса для решения тригонометрической функции.";
        },

    };

    const solveLogarithm = (base: number, number: number): string => {

        if (base > 0 && base !== 1 && number > 0) {

            const result = Math.log(number) / Math.log(base);

            return `Логарифм числа ${number} по основанию ${base} равен ${result.toFixed(2)}.`;

        } else return 'Ошибка: некорректные аргументы для логарифма.';

    };

    const solveTrigonometric = (functionName: string, angle: number) => {

        const radians = (angle * Math.PI) / 180;

        switch (functionName) {

            case "cos": return `cos(${angle}) = ${Math.cos(radians).toFixed(2)}`;
            case "sin": return `sin(${angle}) = ${Math.sin(radians).toFixed(2)}`;
            case "tan": return `tan(${angle}) = ${Math.tan(radians).toFixed(2)}`;
            case "cot": return `cot(${angle}) = ${(1 / Math.tan(radians)).toFixed(2)}`;

            default: return "Ошибка: неверная функция.";
        }

    };

    const handleOperation = (userMessage: string) => {

        const match = userMessage.match(/^(\d+(\s*[-+*/%^**]\s*\d+)+)$/);

        if (match) {

            const expression = match[0].replace(/\s/g, '');
            const numbersAndOperators = expression.split(/([-+*/%^**])/).filter(Boolean);

            const numbers = [];
            const operators = [];

            for (const item of numbersAndOperators) {

                if (item.match(/[-+*/%^**]/)) operators.push(item);
                else numbers.push(parseFloat(item));

            }

            if (numbers.length < 2) return 'Вы должны ввести хотя бы два числа для операции.';

            let result = numbers[0];

            for (let i = 1; i < numbers.length; i++) {

                const operator = operators[i - 1];
                const operationFn = operations[operator];

                if (operationFn) result = operationFn(result, numbers[i]);

            }

            return `Ответ: ${result}.`;
        }

        const logMatch = userMessage.match(/реши\s+логарифм\s*\((\d+)\s*,\s*(\d+)\)/i);

        if (logMatch) {

            const base = parseFloat(logMatch[1]);
            const number = parseFloat(logMatch[2]);

            if (!isNaN(base) && !isNaN(number)) return solveLogarithm(base, number);
            else return 'Ошибка: некорректные аргументы для логарифма.';

        }

        for (const functionName of trigonometricFunctionNames) {

            const trigMatch = userMessage.match(new RegExp(`реши\\s+тригонометрию\\(${functionName}\\s*,\\s*(\\d+)\\)`, "i"));

            if (trigMatch) {

                const angle = parseFloat(trigMatch[1]);

                if (!isNaN(angle)) return solveTrigonometric(functionName, angle);
                else return `Ошибка: некорректный угол для функции ${functionName}.`;

            }

        }

        return null;
    };

    const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => setUserInput(event.target.value);

    const handleSubmit = (event: React.FormEvent) => {

        event.preventDefault();
        const userMessage = userInput.trim().toLowerCase();
        let response = botResponses[userMessage] || handleOperation(userMessage);

        if (!response) response = () => 'Извините, я не понял ваш вопрос.';


        setBotResponse(response);
        setUserInput('');
    };

    return {

        userInput,
        botResponse,
        handleUserInput,
        handleSubmit,

    };

};
