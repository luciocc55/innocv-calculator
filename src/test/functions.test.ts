import { describe, expect, test } from "vitest";
import { filterCalculation } from '~/utility/functions';

describe("functions.vue", () => {

    test("should remove characters that are not wanted", () => {
       const wrongValue = 'javascript 1+2+3';
       const functionValue = filterCalculation(wrongValue);
       expect(functionValue).toEqual('1+2+3');
    });

    test("should allow special characters", () => {
        const wrongValue = 'javascript 1+2*3';
        const functionValue = filterCalculation(wrongValue);
        expect(functionValue).toEqual('1+2*3');
     });
     test("should return empty in case of code injection", () => {
        const wrongValue = `function randomScript(){
            alert("Injected!");
        }`;
        const functionValue = filterCalculation(wrongValue);
        expect(functionValue).toEqual('');
     });
});