<template>
  <div class="markdown-viewer" :class="contentType === 'reasoning' ? 'viewer-reasoning' : 'viewer-content'">
    <div v-if="contentType === 'reasoning'" class="content-tips" >我的推理：</div>
    <div v-html="renderedMarkdown"></div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { marked } from 'marked'; // 使用命名导入
import hljs from 'highlight.js';
import 'github-markdown-css'; // Markdown 样式
import 'highlight.js/styles/github.css'; // 代码高亮样式

// 配置 marked 支持代码高亮
marked.setOptions({
  highlight: (code, language) => {
    if (language && hljs.getLanguage(language)) {
      // 如果指定了语言且支持，则使用指定语言
      return hljs.highlight(code, { language }).value;
    } else {
      // 否则自动检测语言
      return hljs.highlightAuto(code).value;
    }
  },
});

const props = defineProps({
  content: {
    type: String,
    required: false,
  },
  contentType: {
    type: String,
    required: false,
    default: ''
  },
});

const renderedMarkdown = computed(() => {
  return marked(props.content);
});

</script>

<style scoped lang="less">
.markdown-viewer {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 10px;
}
.viewer-reasoning {
  padding: 5px 10px;
  font-size: 12px;
  text-indent: 18px;
  color: #666;
  background-color: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid #eee;
  border-radius: 10px;
  .content-tips {
    text-indent: 0;
    color: rgb(0, 169, 96);
  }
}
.viewer-content {
  text-indent: 16px;
  padding-top: 10px;
  font-size: 14px;
}
</style>