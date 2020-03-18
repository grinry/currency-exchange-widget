import { shallowMount } from "@vue/test-utils";
import ResultsComponent from "@/components/ResultsComponent.vue";

describe("ResultsComponent.vue", () => {
  it("renders results when data passed", () => {
    const results = { exchange_rate: 1, quote_amount: 2 };
    const wrapper = shallowMount(ResultsComponent, {
      propsData: { results }
    });

    expect(wrapper.text()).toMatch(`Conversion rate: ${results.exchange_rate}`);
    expect(wrapper.text()).toMatch(`Expected Amount: ${results.quote_amount}`);
  });

  it("renders 'No results yet.' when data is not passed", () => {
    const results = null;
    const wrapper = shallowMount(ResultsComponent, {
      propsData: { results }
    });

    expect(wrapper.text()).toMatch("No results yet.");
  });
});
