<template>
  <div class="form-group">
    <div class="row">
      <div class="col-sm-12 col-md-4">
        <Dropdown
          label="Base currency"
          :options="currencies"
          v-model="baseCurrency"
          id="base-currency"
        />
      </div>
      <div class="col-sm-12 col-md-4">
        <Dropdown
          label="Quote Currency"
          :options="currencies"
          v-model="quoteCurrency"
          id="quote-currency"
        />
      </div>
      <div class="col-sm-12 col-md-4">
        <div class="form-group">
          <label for="base-amount">Base amount ({{ baseCurrency }})</label>
          <input v-model="baseAmount" class="form-control" type="number" step="0.01" min="0.01" id="base-amount" />
        </div>
      </div>
    </div>
    <div class="row" v-if="errors.length">
      <div class="col-sm-12">
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Dropdown from "@/components/Dropdown.vue";
import { DropdownItem } from "@/interfaces";
import { Nullable } from "@/custom-types";

@Component({
  components: {
    Dropdown
  }
})
export default class FormComponent extends Vue {
  public currencies: DropdownItem[] = [
    { key: "USD", value: "USD" },
    { key: "EUR", value: "EUR" },
    { key: "ILS", value: "ILS" }
  ];

  public baseCurrency: Nullable<string> = "USD";
  public quoteCurrency: Nullable<string> = "EUR";
  public baseAmount: Nullable<number> = null;

  public errors: Array<string> = [];

  @Watch("baseCurrency")
  @Watch("quoteCurrency")
  @Watch("baseAmount")
  updateValuesChanged() {
    const errors = [];

    if (!this.baseCurrency) {
      errors.push("Select base currency.");
    }

    if (!this.quoteCurrency) {
      errors.push("Select quote currency.");
    }

    if (!this.baseAmount || this.baseAmount <= 0) {
      errors.push("Base amount is invalid.");
    }

    if (
      this.baseCurrency &&
      this.quoteCurrency &&
      this.baseCurrency == this.quoteCurrency
    ) {
      errors.push("Base and quote currencies can not be same.");
    }

    this.errors = errors;

    if (!this.errors.length) {
      this.$emit("selected", {
        base_currency: this.baseCurrency,
        quote_currency: this.quoteCurrency,
        base_amount: this.baseAmount
      });
    }
  }
}
</script>
