<script setup lang="ts">
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

const props = withDefaults(defineProps<{
  variant: string;
  label: string;
  type: string;
  placeholder: string;
  modelValue: string;
  required: boolean;
  readonly: boolean;
  arrowIcon: boolean;
  class: string;
  device: string;
}>(), {
  variant: 'common',
  type: 'text',
  label: 'Label',
  placeholder: 'Enter text',
  modelValue: '',
  required: false,
  readonly: false,
  arrowIcon: false,
  class: 'w-full px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#333333] text-[#50B9E0] text-sm placeholder-[#666666] focus:border-[#50B9E0] focus:outline-none',
  device: 'desktop',
});

// const emit = defineEmits<{

// }>();
const emit = defineEmits(['update:modelValue']);
const model = defineModel();

const localValue = ref(props.modelValue)

</script>
<template>
  <div class="mb-4">
    <label class="block mb-1.5 text-sm text-[#cccccc]">{{ props.label ?? 'Full Name'}} <span class="text-[#50B9E0]">*</span></label>
    <div class="relative">
      <input
        v-if="props.variant == 'common'"
        :class="props.class"
        :type="props.type"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        :required="props.required"
        :readonly="props.readonly"
      />
      <vue-tel-input
        v-else-if="props.variant == 'tel'"
        v-model="localValue"
        :inputOptions="{
          placeholder: props.placeholder,
          classes: props.class
        }"
        :dropdownOptions="{
          showDialCodeInSelection: true,
          showFlags: true,
          showDialCodeInList: true,
          dropdownClass: 'bg-[#1a1a1a] border border-[#333333] text-white'
        }"
        mode="international"
        @input="emit('update:modelValue', $event.target.value)"
        required
      />
        <svg v-if="props.arrowIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><path d="m6 9 6 6 6-6"></path></svg>
    </div>
  </div>
</template>
<style>
.vti__selection {
  /* background-color: blueviolet; */
}
</style>