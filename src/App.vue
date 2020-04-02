<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div id="content">
      <router-view/>
    </div>
    <div id="footer">
      Notes @2019-Present Woomay
    </div>  
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  #content {
    height: calc(~"100vh - 160px");
    overflow: scroll;
    width: 100%;
    display: flex;
    justify-content: center;
    // align-items: center;
  }
  #footer {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    // background-color: #eee;
  }
}
</style>
