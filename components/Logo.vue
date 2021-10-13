<template>
  <div class="CanopyToNuxtLogo">
    <div class="tree">
      <div class="tree__top"></div>
      <div class="tree__middle"></div>
      <div class="tree__bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  data() {
    return {
      colors: {
        temp1: '#3f933f',
        temp2: '#2e762e',
        temp3: '#215e21'
      },
      iteration: 1
    };
  },
  created() {
    if (process.client) {
      this.animateLogoColors();
    }
  },
  methods: {
    animateLogoColors() {
      setTimeout(this.changeColors, 10000);
    },
    changeColors() {
      this.iteration++;
      const el = window.document.querySelector('.tree');
      if (this.iteration % 2) {
        el.style.setProperty('--tree-light1', this.colors.temp2);
        el.style.setProperty('--tree-light2', this.colors.temp3);
        el.style.setProperty('--tree-light3', this.colors.temp1);
      } else if (this.iteration % 2) {
        el.style.setProperty('--tree-light1', this.colors.temp3);
        el.style.setProperty('--tree-light2', this.colors.temp1);
        el.style.setProperty('--tree-light3', this.colors.temp2);
      } else {
        el.style.setProperty('--tree-light1', this.colors.temp1);
        el.style.setProperty('--tree-light2', this.colors.temp2);
        el.style.setProperty('--tree-light3', this.colors.temp3);
      }
      this.animateLogoColors();
    }
  }
};
</script>

<style scoped lang="scss">
.VueToNuxtLogo {
  display: inline-block;
  transform: rotateX(180deg);
  position: relative;
  overflow: hidden;
  height: 180px;
  width: 245px;
}

.tree {
  --tree-light1: #3f933f;
  --tree-light2: #2e762e;
  --tree-light3: #215e21;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;

  > div {
    margin-bottom: -10px;
    transition: 5s ease-in background-color;
  }
}

.tree__top {
  background: var(--tree-light1);
  height: 30px;
  width: 30px;
  border-radius: 20px;
}

.tree__middle {
  background: var(--tree-light2);
  height: 35px;
  width: 80px;
  border-radius: 40px;
}

.tree__bottom {
  background: var(--tree-light3);
  height: 40px;
  width: 110px;
  border-radius: 50px;
}
</style>
