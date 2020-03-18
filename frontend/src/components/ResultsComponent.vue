<template>
  <div v-if="results">
    Conversion rate: {{ results.exchange_rate }}
    <br />
    Expected Amount: {{ results.quote_amount }}
  </div>
  <div v-else>
    No results yet.
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IConverterResponse } from "@/interfaces";

@Component
export default class ResultsComponent extends Vue {
  @Prop({ required: true }) results!: IConverterResponse;
}
</script>
