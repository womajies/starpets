<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>
      <home-outlined />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-if="$route.name === 'ConvertPage'">Конвертация</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { BreadcrumbItem, Breadcrumb } from 'ant-design-vue';
import { HomeOutlined } from '@ant-design/icons-vue';

export default {
  name: 'LayoutBreadcrumbs',

  components: {
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: BreadcrumbItem,
    HomeOutlined,
  }
}
</script>

<style lang="scss" scoped>

</style>