/**
 * @vitest-environment happy-dom
 */
import { mount, VueWrapper } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { createTestingPinia } from '@pinia/testing';
import ButtonsLayout from "~/views/calculator/components/ButtonsLayout.vue";
import { useCalculatorStore } from "~/store/calculator";
import HistoryVue from "~/views/calculator/components/History.vue";

describe("history.vue", () => {
    let history: VueWrapper<any>;
    beforeAll(() => {
        history = mount(HistoryVue, {
            plugins: [createTestingPinia()]
        });
    })
    test("check the button correctly triggers the store function", async () => {
        const calculatorStore = useCalculatorStore()
        calculatorStore.history = [{
            calculation: '1+2',
            result: '3'
        }];
        await history.vm.$nextTick();
        const clearButton = history.findComponent<typeof ButtonsLayout>(ButtonsLayout);
        await clearButton.trigger("click");
        expect(calculatorStore.clearHistory).to.toHaveBeenCalled();
    });
    test("check the correct value is displayed when history is empty", async () => {
        const calculatorStore = useCalculatorStore()
        calculatorStore.history = [];
        await history.vm.$nextTick();
        const text = history.text();
        expect(text).toEqual('There are no calculation in your history.');
    });
});