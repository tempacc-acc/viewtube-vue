<template>
  <div class="theme-selector">
    <a
      class="theme-preview"
      href="#"
      @click.prevent="onThemeChange(theme)"
      :style="{ 'border-color': getBorderThemeColor(theme) }"
      v-for="(theme, id) in themes"
      :key="id"
      v-ripple
    >
      <div
        class="preview-graphic"
        :style="{ 'background-color': theme['bgcolor-main'] }"
      >
        <span
          class="prev-header"
          :style="{ 'background-color': theme['header-bgcolor'] }"
        >
          <span
            class="prev-logo"
            :style="{ 'background-color': theme['theme-color'] }"
          ></span>
          <span
            class="prev-searchbar"
            :style="{ 'background-color': theme['theme-color'] }"
          ></span>
        </span>
        <div class="prev-thmbs">
          <span
            class="prev-thmb"
            :style="{ 'background-color': theme['theme-color'] }"
            v-for="(i, n) in 6"
            :key="n"
          ></span>
        </div>
        <span
          class="prev-gradient"
          :style="{ 'opacity': theme['gradient-opacity'] }"
        ></span>
      </div>
      <span class="theme-title">{{ theme.name }}</span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      themes: this.$store.getters['settings/defaultThemes']
    }
  },
  methods: {
    onThemeChange(element) {
      document.body.classList.add('transition-all')
      this.$store.commit('settings/setTheme', element.value)
      setTimeout(() => {
        document.body.classList.remove('transition-all')
      }, 300)
    },
    getBorderThemeColor(theme) {
      return theme.value === this.$store.getters['settings/theme'] ? theme['theme-color'] : 'transparent'
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-selector {
  width: calc(100% - 56px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px 0 0 0;
  justify-content: space-evenly;

  .theme-preview {
    width: 200px;
    height: 120px;
    display: flex;
    flex-direction: column;
    border-style: solid;
    border-width: 2px;
    margin: 0 15px 20px 0;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    transition: box-shadow 200ms $intro-easing, border-color 200ms $intro-easing;
    box-sizing: border-box;
    box-shadow: $low-shadow;
    cursor: pointer;

    &:hover {
      box-shadow: $max-shadow;
    }

    .preview-graphic {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      pointer-events: none;
      user-select: none;

      .prev-gradient {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 80%;
        background: linear-gradient(
          165deg,
          rgba(241, 87, 10, 0.705) 0%,
          rgba(116, 21, 10, 0.801) 28%,
          rgba(18, 18, 18, 1) 69%,
          rgba(18, 18, 18, 1) 100%
        );
      }

      .prev-header {
        width: 100%;
        height: 20px;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        z-index: 9;

        .prev-logo {
          width: 12px;
          height: 8px;
          margin: auto 8px;
          box-sizing: border-box;
          clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
        }

        .prev-searchbar {
          width: 80%;
          height: 5px;
          margin: auto calc(20% + 28px) auto 20%;
          box-sizing: border-box;
          border-radius: 1px;
        }
      }

      .prev-thmbs {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 12px 15px 0 15px;
        justify-content: space-around;
        box-sizing: border-box;

        .prev-thmb {
          width: 45px;
          height: 28px;
          z-index: 9;
        }
      }
    }
    .theme-title {
      position: absolute;
      bottom: 0;
      color: #fff;
      background: linear-gradient(to bottom, #00000000 -0%, #000 80%);
      width: 100%;
      padding: 2px 5px;
      z-index: 10;
      box-sizing: border-box;
    }
  }
}
</style>
