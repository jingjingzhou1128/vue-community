<template>
  <nav id="header">
    <div class="container">
      <div class="header-logo">
        <img src="../assets/logo.png" alt="VueJs">
        <span>VueJs</span>
      </div>
      <ul class="header-menus">
        <li>关于</li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<style>
  #header {
    height: 60px;
    line-height: 60px;
    background: #1c6132;
    color: #fff;
    font-size: 15px;
  }
  .container {
    min-width: 960px;
    max-width: 1400px;
    width: 100%;
    display: flex;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  }
  .header-logo img {
    height: 50px;
    width: auto;
    vertical-align: middle;
  }
  .header-logo span {
    font-size: 18px;
    font-weight: 600;
  }
  .header-menus {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  .header-menus > li {
    display: inline-block;
    font-weight: 600;
    letter-spacing: 2px;
  }
</style>