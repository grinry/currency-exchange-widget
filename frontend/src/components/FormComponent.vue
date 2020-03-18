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
          <label for="base-amount">Base amount</label>
          <input v-model="baseAmount" class="form-control" id="base-amount" />
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
import { IConverterContext, IDropdownItem } from "@/interfaces";
import { Nullable } from "@/custom-types";

@Component({
  components: {
    Dropdown
  }
})
export default class FormComponent extends Vue {
  public currencies: IDropdownItem[] = [
    { key: "USD", value: "USD" },
    { key: "EUR", value: "EUR" },
    { key: "ISL", value: "ISL" }
  ];

  public baseCurrency: Nullable<string> = null;
  public quoteCurrency: Nullable<string> = null;
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
        // eslint-disable-next-line @typescript-eslint/camelcase
        base_currency: this.baseCurrency,
        // eslint-disable-next-line @typescript-eslint/camelcase
        quote_currency: this.quoteCurrency,
        // eslint-disable-next-line @typescript-eslint/camelcase
        base_amount: this.baseAmount
      });
    }
  }
}
</script>
