<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      transitionName:""
    }
  },
  watch: {
    '$route' (to, from) {
      this.$store.state.iframeIf = false;
      this.transitionName = this.$store.state.isBack ? 'go' : 'back';
      this.$store.state.isBack = false;
    }
  }
}
</script>

<style scoped>
  .go{
    position: absolute;
    left:0;
    right: 0;
  }
  .go-enter-active {
    transition: all .5s ease;
  }
  .go-leave-active {

    transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
  }
  .go-enter, .go-leave-to
  {
    left:0;
    right: 0;
    transform: translateX(-100%);
    opacity: 0;
  }
  /*回滚*/
  .back{
    position: absolute;
    left:0;
    right: 0;
  }
  .back-enter-active{
    transition: all .5s ease;

  }
  .back-leave-active {

    transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
  }
  .back-enter, .back-leave-to
  {
    left:0;
    right: 0;
    transform: translateX(100%);
    opacity: 0;
  }
</style>
