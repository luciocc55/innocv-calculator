import { describe, expect } from "vitest";
import { useCalculatorStore } from "~/store/calculator";
import { setActivePinia, createPinia } from "pinia";

describe("calculatorStore.vue", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })
    it('should clear history', () => {
        const calculatorStore = useCalculatorStore()
        calculatorStore.addChar('1');
        calculatorStore.clearHistory();
        expect(calculatorStore.history).toEqual([]);
    })
    it('should clear calculation', () => {
        const calculatorStore = useCalculatorStore()
        calculatorStore.addChar('C');
        expect(calculatorStore.calculation).toEqual('');
    })
    it('should push element to history', () => {
        const calculatorStore = useCalculatorStore()
        calculatorStore.pushToHistory('1+2', '3');
        const findHistory = calculatorStore.history.find((hist) => hist.result === '3' && hist.calculation === '1+2');
        expect(findHistory).toBeTruthy();
    })

    it('should calculate and change history', () => {
        const calculatorStore = useCalculatorStore()
        calculatorStore.calculation = '1+2';
        calculatorStore.addChar('=');
        expect(calculatorStore.history.length).toBeGreaterThan(0);
    })
    it('should not do anything when the added char is not in the consts list', () => {
        const calculatorStore = useCalculatorStore()
        calculatorStore.addChar('t');
        expect(calculatorStore.calculation).toEqual('');
        expect(calculatorStore.history.length).toEqual(0);
    })
    it('should calculate correct value on percentages', () => {
        const calculatorStore = useCalculatorStore()
        calculatorStore.calculation = '100';
        calculatorStore.addChar('%');
        expect(calculatorStore.calculation).toEqual('1');
    })
});