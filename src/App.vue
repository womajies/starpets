<template>
  <a-layout class="layout">
    <layout-header />
    <a-layout-content style="padding: 0 50px">
      <layout-breadcrumbs />
      <div class="content">
        <router-view></router-view>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { Layout, LayoutContent } from 'ant-design-vue';
import LayoutHeader from '@/components/layout/LayoutHeader.vue'
import LayoutBreadcrumbs from '@/components/layout/LayoutBreadcrumbs.vue'

export default {
  name: 'App',

  components: {
    ALayout: Layout,
    ALayoutContent: LayoutContent,
    LayoutHeader,
    LayoutBreadcrumbs,
  },
}
</script>

<style>
body {
  margin: 0;
}
.layout {
  min-height: 100vh;
}
.content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
</style>
