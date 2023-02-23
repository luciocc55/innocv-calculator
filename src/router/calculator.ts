const calculator = {
  path: "/",
  name: "Calculator",
  component: () => import("~/views/calculator/Calculator.vue"),
  meta: {
    title: "Calculator",
  },
};

export default calculator;
