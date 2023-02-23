import { useCalculatorStore } from "./calculator";

const appStore: any = {};


export const registerStore = () => {
  appStore.calculator = useCalculatorStore();
};

export default appStore;
