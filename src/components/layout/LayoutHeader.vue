<template>
  <a-layout-header class="header">
    <a-menu
      v-model:selectedKeys="activePage"
      theme="dark"
      mode="horizontal"
      @click="changePage"
    >
      <router-link :to="{ name: 'HomePage' }" class="header__link">
        <a-menu-item key="HomePage">
          Главная
        </a-menu-item>
      </router-link>
      <router-link :to="{ name: 'ConvertPage' }" class="header__link">
        <a-menu-item key="ConvertPage">
          Конвертация
        </a-menu-item>
      </router-link>
    </a-menu>
    <div>
      <span style="color: #fff; font-size: 16px; margin-right: 10px;">Выбрать валюту:</span>
      <a-select
        :value="getCurrency"
        style="width: 80px"
        @change="changeCurrency"
      >
        <a-select-option value="RUB">RUB</a-select-option>
        <a-select-option value="EUR">EUR</a-select-option>
        <a-select-option value="USD">USD</a-select-option>
      </a-select>
    </div>
  </a-layout-header>
</template>

<script>
import { LayoutHeader, Menu, MenuItem, Select, SelectOption } from 'ant-design-vue';
import { mapGetters } from 'vuex';

export default {
  name: 'LayoutHeader',

  components: {
    ALayoutHeader: LayoutHeader,
    AMenu: Menu,
    AMenuItem: MenuItem,
    ASelect: Select,
    ASelectOption: SelectOption,
  },

  data() {
    return {
      activePage: null,
    }
  },

  methods: {
    changePage(evt) {
      this.activePage = [evt.key]
    },
    changeCurrency(evt) {
      this.$store.dispatch('changeCurrency', evt)
    }
  },

  computed: {
    ...mapGetters(['getCurrency']),
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__link {
  width: 100%;
  height: 100%;
  color: #ffffff;
  transition: 0.3s ease background-color;
}
.header__link.router-link-exact-active {
  background-color: #1677ff;
}
.header__link .ant-menu-item {
  border-radius: 0;
  background-color: none;
}
</style>