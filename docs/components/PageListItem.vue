<script setup>
import { useRouter, useData } from 'vitepress';

const { localePath } = useData();
const router = useRouter()

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const formatTime = (time) => {
  const timeDate = new Date(time);
  const year = timeDate.getFullYear();
  const month = timeDate.getMonth() + 1;
  const day = timeDate.getDate();
  let house = timeDate.getHours();
  let minutes = timeDate.getMinutes();
  if (house < 10) {
    house = `0${house}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  return `${month}月${day}日 ${house}:${minutes}`;
}

const timeString = formatTime(props.item.create);

const handleOpenPage = () => {
  router.go(localePath.value + props.item.url);
}

</script>
<template>
  <div class="page-item-container">
    <div class="page-item-header">
      <div class="page-item-title" @click="handleOpenPage">{{item.title}}</div>
      <div class="page-item-time">{{timeString}}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-item-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2em;
  padding: 16px 0;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.page-item-title {
  cursor: pointer;
  text-overflow: ellipsis;
  white-space:nowrap;
  overflow: hidden;
  padding-right: 16px;
  &:hover {
    color: var(--vp-c-brand);
  }
}

.page-item-time {
  white-space:nowrap;
  color: var(--vp-c-text-2);
}
.page-item-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.page-item-tags {
  margin-top: 8px;
}
.tag-item {
  margin: 4px 4px;
}
</style>