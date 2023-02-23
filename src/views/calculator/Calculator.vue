<script setup lang="ts">
import ButtonsLayout from '~/views/calculator/components/ButtonsLayout.vue';
import { calculatorOptions, title } from '~/constant/constants';
import { useCalculatorStore } from '~/store/calculator';
import History from '~/views/calculator/components/History.vue';
import { storeToRefs } from 'pinia';

const { getCalculation } = storeToRefs(useCalculatorStore())
const calculatorStore = useCalculatorStore();
</script>

<template>
  <div class="flex flex-1 flex-col space-y-4 p-8 text-white ">
    <h1 id="title" class="text-slate-400">{{ title }}</h1>

    <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-y-0 gap-y-5 sm:space-x-4">
      <div class="flex flex-col space-y-2">
        <div id="shown-calculation" class="flex flex-none h-4  p-4 justify-end bg-slate-500 rounded-md shadow-2xl select-none">
          {{ getCalculation }}
        </div>
        <div class="grid grid-cols-4 gap-4" >
          <ButtonsLayout @click="calculatorStore.addChar(option)" class="justify-center" v-for="option in calculatorOptions">
                {{ option }}
          </ButtonsLayout>
        </div>
      </div>
      <History/>
    </div>
  </div>
</template>

