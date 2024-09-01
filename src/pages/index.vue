<template>
  <a-skeleton :loading="isLoading" active />
  <a-descriptions v-if="!isLoading" title="Курсы валют">
    <a-descriptions-item
      v-for="item in slicedCurrencies"
      :key="item.key + item.value"
      :label="item.key.replace('-' + getCurrency.toLowerCase(), '')"
    >
      {{ item.value.toFixed(2) }}
    </a-descriptions-item>
  </a-descriptions>
</template>

<script>
import { Skeleton, Descriptions, DescriptionsItem, } from 'ant-design-vue';
import { mapGetters } from 'vuex';

const allowedCurrencies = ['rub', 'eur', 'usd']

export default {
  name: 'HomePage',

  components: {
    ASkeleton: Skeleton,
    ADescriptions: Descriptions,
    ADescriptionsItem: DescriptionsItem,
  },

  data() {
    return {
      isLoading: false,
      currencies: null
    }
  },

  created() {
    this.getCurrencies()
  },

  methods: {
    async getCurrencies() {
      try {
        this.isLoading = true;

        await fetch('https://status.neuralgeneration.com/api/currency')
          .then(async (response) => {
            if (response.status === 200) {
              const data = await response.json();

              this.currencies = Object.entries(data).map(el => ({ key: el[0], value: el[1] }))
            } else {
              this.$message.error('Что-то пошло не так :)')
            }
          })
      } catch (error) {
        this.$message.error(error)
      } finally {
        this.isLoading = false;
      }
    }
  },

  computed: {
    ...mapGetters(['getCurrency']),

    slicedCurrencies() {
      return this.currencies.filter(el => {
        if (allowedCurrencies.includes(el.key.replace('-' + this.getCurrency.toLowerCase(), ''))) {
          return el.key.endsWith(this.getCurrency.toLowerCase())
        }
      })
    }
  }
}
</script>

<style scoped>

</style>