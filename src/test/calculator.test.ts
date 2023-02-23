/**
 * @vitest-environment happy-dom
 */
import { mount, VueWrapper } from "@vue/test-utils";
import CalculatorVue from "~/views/calculator/Calculator.vue";
import { describe, expect, test } from "vitest";
import { createTestingPinia } from '@pinia/testing';
import { calculatorOptions, title } from '~/constant/constants';
import ButtonsLayout from "~/views/calculator/components/ButtonsLayout.vue";
import { useCalculatorStore } from "~/store/calculator";

describe("calculator.vue", () => {
    let calculator: VueWrapper<any>;
    beforeAll(() => {
        calculator = mount(CalculatorVue, {
            plugins: [createTestingPinia()]
        });
    })
    test("should display correct title", () => {
       const displayedTitle = calculator.find('#title').text();
       expect(displayedTitle).toEqual(title);
    });
    test("check the buttons options are correctly loaded from consts", () => {
        const optionButtons = calculator.findAllComponents<typeof ButtonsLayout>(ButtonsLayout);
        calculatorOptions.forEach((option, index) => {
            expect(optionButtons[index].text()).toEqual(option);
        });
    });
    test("check the button correctly triggers the store function", async () => {
        const calculatorStore = useCalculatorStore()
        const optionButton = calculator.findComponent<typeof ButtonsLayout>(ButtonsLayout);
        await optionButton.trigger("click");
        expect(calculatorStore.addChar).to.toHaveBeenCalledWith(calculatorOptions[0]);
    });
    test("check the correct value is displayed", async () => {
        const calculatorStore = useCalculatorStore()
        const correctCalculation = '1+2+3';
        calculatorStore.calculation = correctCalculation;
        expect(calculatorStore.getCalculation).toEqual(correctCalculation);
        await calculator.vm.$nextTick()
        const displayedValue = calculator.find('#shown-calculation').text();
        expect(displayedValue).toEqual(correctCalculation);
    });
});