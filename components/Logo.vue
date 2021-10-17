<template>
  <div class="CanopyToNuxtLogo">
    <div class="tree">
      <div class="tree__middle-left"></div>
      <div class="tree__left"></div>
      <div class="tree__middle"></div>
      <div class="tree__right"></div>
      <div class="tree__middle-right"></div>
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
  --base-height: 85px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto 40px;
  position: relative;
  width: calc(var(--base-height) * 2);
  height: 100px;

  > div {
    margin-bottom: -10px;
    transition: 5s ease-in background-color;
    position: absolute;
    border-radius: 50%;
  }
}

.tree__left {
  background: var(--tree-light1);
  height: calc(var(--base-height) + 10%);
  width: calc(var(--base-height) + 10%);
  transform: translate(calc(var(--base-height) / 1.8 * -1), 30px);
  z-index: 1;
}

.tree__middle {
  left: 50%;
  background: var(--tree-light2);
  height: var(--base-height);
  width: var(--base-height);
  transform: translateX(-50%);
  z-index: 4;
}

.tree__right {
  background: var(--tree-light3);
  height: calc(var(--base-height) + 2%);
  width: calc(var(--base-height) + 2%);
  transform: translate(calc(var(--base-height) / 1.8), 30px);
  z-index: 3;
}

.tree__middle-left {
  transform: translate(calc(var(--base-height) / 1.8 * -1), 10px);
  height: calc(var(--base-height) - 50px);
  width: calc(var(--base-height) - 50px);
  border-radius: 50%;
  background: var(--tree-light3);
  z-index: 3;
}
.tree__middle-right {
  transform: translate(calc(var(--base-height) / 1.8), 10px);
  height: calc(var(--base-height) - 50px);
  width: calc(var(--base-height) - 50px);
  border-radius: 50%;
  background: var(--tree-light1);
  z-index: 2;
}
</style>
