<template>
  <a-skeleton :loading="isLoading" active />
  <a-space v-if="!isLoading" direction="vertical" size="middle">
    <h2>Конвертер валют</h2>
    <a-space size="middle">
      <a-select v-model:value="firstCurrency" style="width: 200px" @change="() => changeCurrency('first')">
        <a-select-option value="RUB">RUB</a-select-option>
        <a-select-option value="EUR">EUR</a-select-option>
        <a-select-option value="USD">USD</a-select-option>
      </a-select>
  
      <a-input
        v-model:value="firstCurrencyValue"
        placeholder="Введите число"
        :status="errors.firstCurrency"
        style="width: 120px"
        @focus="onFocus"
        @input="inputFirstCurrencyValue"
      />
    </a-space>
    <a-space size="middle">
      <a-select v-model:value="secondCurrency" style="width: 200px" @change="() => changeCurrency('second')">
        <a-select-option value="RUB">RUB</a-select-option>
        <a-select-option value="EUR">EUR</a-select-option>
        <a-select-option value="USD">USD</a-select-option>
      </a-select>
  
      <a-input
        v-model:value="secondCurrencyValue"
        placeholder="Введите число"
        :status="errors.secondCurrency"
        style="width: 120px"
        @focus="onFocus"
        @input="inputSecondCurrencyValue"
      />
    </a-space>
  </a-space>
</template>

<script>
import { Select, SelectOption, Input, Space, Skeleton } from 'ant-design-vue';

export default {
  name: 'ConvertPage',

  components: {
    ASelect: Select,
    ASelectOption: SelectOption,
    AInput: Input,
    ASpace: Space,
    ASkeleton: Skeleton,
  },

  data() {
    return {
      firstCurrency: 'RUB',
      firstCurrencyValue: 0,
      secondCurrency: 'USD',
      secondCurrencyValue: 0,
      isLoading: false,
      currencies: null,
      errors: {
        firstCurrency: '',
        secondCurrency: '',
      }
    }
  },

  created() {
    this.getCurrencies()
  },

  computed: {
    calcFirstCurrencyRate() {
      return this.currencies[`${this.firstCurrency.toLowerCase() + '-' + this.secondCurrency.toLowerCase()}`]
    },

    calcSecondCurrencyRate() {
      return this.currencies[`${this.secondCurrency.toLowerCase() + '-' + this.firstCurrency.toLowerCase()}`]
    },
  },

  methods: {
    changeCurrency(select) {
      if (this.firstCurrency !== this.secondCurrency) {
        switch (select) {
          case 'first':
            this.inputSecondCurrencyValue()
            break
          case 'second':
            this.inputFirstCurrencyValue()
            break
        }
      }
    },

    inputFirstCurrencyValue() {
      const reg = /^\d*\.?\d*$/;
      if (!reg.test(this.firstCurrencyValue)) {
        this.$warning({ title: 'Поле должно содержать только цифры' })
        this.errors.firstCurrency = 'error'
      } else {
        this.errors.firstCurrency = ''
        this.secondCurrencyValue = (this.calcFirstCurrencyRate * this.firstCurrencyValue).toFixed(2)
      }
    },

    inputSecondCurrencyValue() {
      const reg = /^\d*\.?\d*$/;
      if (!reg.test(this.secondCurrencyValue)) {
        this.$warning({ title: 'Поле должно содержать только цифры' })
        this.errors.secondCurrency = 'error'
      } else {
        this.errors.secondCurrency = ''
        this.firstCurrencyValue = (this.calcSecondCurrencyRate * this.secondCurrencyValue).toFixed(2)
      }
    },

    onFocus(evt) {
      evt.currentTarget.select()
    },

    async getCurrencies() {
      try {
        this.isLoading = true;

        await fetch('https://status.neuralgeneration.com/api/currency')
          .then(async (response) => {
            if (response.status === 200) {
              const data = await response.json();

              this.currencies = data
            } else {
              this.$message.error('Что-то пошло не так :)')
            }
          })
      } catch (error) {
        this.$message.error(error)
      } finally {
        this.isLoading = false;
      }
    },
  }
}
</script>

<style scoped></style>