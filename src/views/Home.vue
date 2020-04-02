<template>
  <div class="home">
    <div v-for="(item, index) in list" :key="index" class="article-content">
      <h2>{{ item.title }}</h2>
      <p v-html="renderMarkdown(item.body)"></p>
      <p class="labels" :style="{ backgroundColor: '#'+item.labels[0].color }">{{ item.labels[0].name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true
})
@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  list: any[] = []

  mounted() {
    this.getList();
  }
  // methods
  public async getList() {
    const res: any = await this.$http.get('https://api.github.com/repos/Woomay/woomay.github.io/issues');
    this.list = res;
    console.log('this.list', this.list);
  }
  public renderMarkdown(value: any) {
    return marked(value);
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 1040px;
  .article-content {
    background-color: #EEE;
    margin-bottom: 10px;
    // height: 180px;
    // overflow: hidden;
    border-radius: 8px;
    position: relative;
    .labels {
      width: 100px;
      height: 40px;
      color: #fff;
      font-weight: bold;
      text-align: center;
      line-height: 40px;
      position: absolute;
      right: 0;
      top: -20px;
      border-radius: 5px;
    }
  }
}
</style>
