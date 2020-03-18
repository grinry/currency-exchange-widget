<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col">
        <h1>Exchange</h1>
      </div>
    </div>
    <FormComponent @selected="handleInput" />
    <p v-if="loading" class="text-info">Loading data.</p>
    <p v-else-if="errors.count()" class="text-warning">{{ errors.first() }}</p>
    <ResultsComponent v-else :results="result" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ResultsComponent from "@/components/ResultsComponent.vue";
import FormComponent from "@/components/FormComponent.vue";
import { ConverterContext, ConverterResponse } from "@/interfaces";
import { debounce } from "debounce";
import { repositoryFactory } from "@/repositories/repository-factory";
import { ConverterRepository } from "@/repositories/converter.repository";
import Axios, { CancelTokenSource } from "axios";
import { Nullable } from "@/custom-types";
import { ApiErrorsParser } from "@/helpers/api-errors-parser";

@Component({
  components: {
    FormComponent,
    ResultsComponent
  }
})
export default class App extends Vue {
  public repository: ConverterRepository = repositoryFactory.get("converter");
  public requestSource: Nullable<CancelTokenSource> = null;

  public loading = false;
  public errors = new ApiErrorsParser();
  public result: Nullable<ConverterResponse> = null;

  handleInput = debounce((event: ConverterContext) => {
    this.requestRates(event);
  }, 500);

  requestRates(context: ConverterContext) {
    // Cancel previous request if its still running.
    if (this.requestSource) {
      this.requestSource.cancel();
    }

    this.requestSource = Axios.CancelToken.source();
    this.loading = true;
    this.repository
      .get(context, {
        cancelToken: this.requestSource.token
      })
      .then(response => {
        this.loading = false;
        this.result = response.data;
        this.errors.reset();
      })
      .catch(error => {
        if (!Axios.isCancel(error)) {
          this.errors.update(error.response);
          this.loading = false;
        }
      });
  }

  beforeDestroy() {
    // Cancel running request if client leaves component.
    if (this.requestSource) {
      this.requestSource.cancel("Client left page.");
    }
  }
}
</script>
