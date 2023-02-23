import { defineStore } from "pinia";
import { filterCalculation } from '~/utility/functions';
import { calculatorOptions } from '~/constant/constants';
import { CalculatorHistory } from '~/utility/calculator.interface';

interface CalculatorStore {
  total: number;
  calculation: string;
  history: CalculatorHistory[];
}
export const useCalculatorStore = defineStore('calculator', {
  state: () => ({
    total: 0,
    calculation: '',
    history: [],
  } as CalculatorStore),
  getters: {
      getCalculation(): string {
        return filterCalculation(this.calculation);
      },
      getHistory(): CalculatorHistory[] {
        return this.history;
      }
  },
  actions: {
      addChar(newChar: string) {
        if (calculatorOptions.includes(newChar)) {
          let result = '';
          switch (newChar) {
            case 'C':
              this.calculation = ''; 
              break;
            case '=':
              if (this.getCalculation.length > 0) {
                result = `${eval(this.getCalculation)}`;
                this.pushToHistory(this.getCalculation, result);
                this.calculation = result;
              }
              break;
            case '%':
              if (this.getCalculation.length > 0) {
                const percentageOperator = '/100';
                const calculationPercentage = `${this.getCalculation + percentageOperator}`;
                result = `${eval(calculationPercentage)}`;
                this.pushToHistory(calculationPercentage, result);
                this.calculation = result;
              }
              break;
            default:
              this.calculation += newChar;
              break;
          }
        }
      },
      pushToHistory(calculation: string, result: string) {
        this.history.push({
          calculation: calculation,
          result
        });
      },
      clearHistory() {
        this.history = [];
      }
  }
})