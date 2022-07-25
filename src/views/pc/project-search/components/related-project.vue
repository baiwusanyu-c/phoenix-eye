/* * @related-project.vue * @deprecated * @author czh * @update (czh 2022/6/23) */
<template>
  <div class="project-detail-related">
    <div class="project-detail--header">
      <title-cell
        icon="iconRelatedEagle"
        svg
        :name="$t('lang.projectExplorer.detail.titleRelated')">
      </title-cell>
    </div>
    <div class="related-list">
      <relate-project-card
        v-for="item in data"
        :key="item.project_name + item.platform + item.logo_url"
        :name="item.project_name"
        :url="item.logo_url"
        :platform="item.platform"
        @click="openWindow(`/detail?id=${item.project_id}`)">
      </relate-project-card>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { openWindow } from '../../../../utils/common'
  import RelateProjectCard from './relate-project-card.vue'
  import type { IRelateProject } from '../../../../utils/types'
  import type { PropType } from 'vue'
  export default defineComponent({
    name: 'RelatedProject',
    components: { RelateProjectCard },
    props: {
      data: {
        type: Object as PropType<IRelateProject>,
      },
    },
    setup() {
      return {
        openWindow,
      }
    },
  })
</script>

<style lang="scss">
  .project-detail-related {
    .related-list {
      display: flex;
      .relate-project-card:first-child {
        margin-left: 0;
      }
      .relate-project-card:last-child {
        margin-right: 0;
      }
    }
  }
</style>
