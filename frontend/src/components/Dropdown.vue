<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <select v-model="selectedOption" class="form-control" :id="id"
            @input="
        event => {
          $emit('input', event.target.value);
        }
      "
    >
      <option v-for="option in options" :value="option.key" :key="option.key">{{
        option.value
        }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IDropdownItem } from "@/interfaces";

@Component
export default class Dropdown extends Vue {
  @Prop({ required: true }) label!: string;
  @Prop({ required: true }) id!: string;
  @Prop() value!: string;
  @Prop({ required: true }) options!: IDropdownItem[];
  selectedOption: string | null = null;

  public mounted() {
    this.selectedOption = this.value;
  }
}
</script>
