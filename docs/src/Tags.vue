<script setup>
import { ref, computed, onMounted } from 'vue';
import { useData } from 'vitepress';
import PageListItem from '../components/PageListItem.vue';
import Tag from '../components/Tag.vue';

const { theme } = useData();

const tags = {}
const currentTag = ref('');

let firstTag = '';

theme.value.pages.forEach((item) => {
  item.tags.forEach((tag) => {
    if (!firstTag) {
      firstTag = tag
    }
    if (tags[tag]) {
      tags[tag]++;
    } else {
      tags[tag] = 1;
    }
  })
})


onMounted(() => {
  const url = new URL(location.href);
  const tag = url.searchParams.get('tag');

  if (tag && Object.keys(tags).includes(tag)) {
    currentTag.value = tag
  } else {
    currentTag.value = firstTag
  }
})


const pageInfo = computed(() => {
  return theme.value.pages.filter((item) => {
    return item.tags.includes(currentTag.value)
  })
});

const handleTagClick = (tag) => {
  currentTag.value = tag
}

</script>
<template>
  <div class="tags-container">
    <div class="tags-list-content">
      <template v-for="(value, key) in tags">
        <Tag 
          v-if="key"
          class="tag-item"
          :full="key === currentTag"
          @click="handleTagClick(key)">
          {{ key }} {{value}}
        </Tag>
      </template>
    </div>
    <div>
      <PageListItem v-for="page in pageInfo" :key="page.url" :item="page" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.tags-container {
  width: 800px;
  margin: auto;
  @media (min-width: 390px) {
    width: 390px;
  }
  @media (min-width: 768px) {
    width: 700px;
  }
}
.tags-list-content {
  margin: 16px 0;
}
.tag-item {
  cursor: pointer;
  margin: 4px 4px;
}
</style>