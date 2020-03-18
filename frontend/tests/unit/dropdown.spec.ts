import { shallowMount } from "@vue/test-utils";
import Dropdown from "@/components/Dropdown.vue";

describe("Dropdown.vue", () => {
  it("renders options to dropdown when passed", () => {
    const label = "Dropdown test";
    const id = "dropdown-id";
    const options = [{ key: "USD", value: "USD" }];
    const wrapper = shallowMount(Dropdown, {
      propsData: { id, label, options }
    });

    const labelElement = wrapper.element.querySelector("label");
    const selectElement = wrapper.element.querySelector("select");
    const optionList = wrapper.element.querySelectorAll("select option");

    expect(labelElement?.textContent).toMatch(label);
    expect(selectElement?.id).toMatch(id);
    expect(optionList.length).toBe(options.length);
    expect(optionList[0].textContent).toBe(options[0].value);
  });
});
