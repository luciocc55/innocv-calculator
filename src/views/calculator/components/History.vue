<script setup lang="ts">
import ButtonsLayout from '~/views/calculator/components/ButtonsLayout.vue';
import { useCalculatorStore } from '~/store/calculator';
import { storeToRefs } from 'pinia';

const {  getHistory } = storeToRefs(useCalculatorStore())
const calculatorStore = useCalculatorStore();
</script>

<template>
    <template v-if="getHistory.length > 0">
        <div class="flex flex-col flex-1 space-y-2">
            <div class="flex flex-1 flex-col max-h-80 overflow-x-hidden items-end overflow-y-auto gap-1 bg-slate-500 rounded-md ">
                <div class="flex flex-none w-full  flex-col  " v-for="result in getHistory">
                    <div class="flex flex-col px-4 py-1 items-end border-solid border-b border-t-0 border-l-0 border-r-0 border-opacity-20">
                        <p class="text-sm">{{ result.calculation }} =</p>
                        <p class="font-semibold">{{ result.result }}</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-none justify-end p-2">
                <ButtonsLayout @click="calculatorStore.clearHistory()">Clear History</ButtonsLayout>
            </div>
        </div>
    </template>
    <span v-else class="text-end">
        There are no calculation in your history.
    </span>
</template>

