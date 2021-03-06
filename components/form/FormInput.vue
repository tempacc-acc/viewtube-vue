<template>
  <div class="form-input">
    <input
      :id="id"
      class="input"
      :class="{ 'focus-content': hasText }"
      :autocomplete="autocompleteTag"
      :type="type"
      :name="autocompleteTag"
      required
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <AccountIcon v-if="type == 'username'" />
    <KeyIcon v-if="type == 'password'" />
    <MailIcon v-if="type == 'email'" />
    <label :for="id" class="input-label">{{ label }}</label>
  </div>
</template>

<script>
import AccountIcon from 'vue-material-design-icons/AccountOutline'
import KeyIcon from 'vue-material-design-icons/KeyOutline'
import MailIcon from 'vue-material-design-icons/At'

export default {
  name: 'form-input',
  components: {
    AccountIcon,
    KeyIcon,
    MailIcon
  },
  props: {
    type: String,
    value: null,
    label: String,
    id: String
  },
  data: () => ({
    autocompleteTags: {
      email: 'email',
      username: 'username',
      password: 'current-password',
      all: 'on'
    }
  }),
  computed: {
    hasText() {
      return this.value && this.value.length > 0
    },
    autocompleteTag() {
      const tagId = Object.keys(this.autocompleteTags).find(type => type === this.type)
      const tag = tagId !== undefined ? tagId : 'all'

      return this.autocompleteTags[tag]
    }
  }
}
</script>

<style lang="scss" scoped>
.form-input {
  position: relative;
  $input-line-height: 50px;

  .material-design-icon {
    position: absolute;
    right: 40px;
    top: 30px;
    color: var(--title-color);
  }

  .input:not(:valid) + .material-design-icon {
    color: var(--error-color-red);
  }

  .input {
    margin: 15px 20px;
    padding: 12px 12px;
    line-height: 30px;
    border-radius: 4px;
    width: calc(100% - 40px);
    height: $input-line-height;

    font-size: 1rem;
    border-style: none;
    color: var(--title-color);
    box-sizing: border-box;
    font-family: $default-font;
    background-color: transparent;
    border: 2px solid var(--bgcolor-alt-light);
    transition: border 300ms $intro-easing;

    &:focus {
      outline: none;
      border-color: var(--theme-color);
    }

    &:focus,
    &.focus-content {
      padding: 20px 12px 4px 12px;
    }

    &:not(:valid) {
      box-shadow: none;
      // border-color: var(--error-color-red)
    }
  }

  .input-label {
    position: absolute;
    left: 34px;
    top: 15px;
    height: $input-line-height;
    line-height: $input-line-height;
    text-align: center;
    margin: auto;
    pointer-events: none;
    transition: transform 300ms $intro-easing, color 300ms $intro-easing;
    transform-origin: left top;
    color: var(--subtitle-color-light);
  }

  .focus-content ~ .input-label,
  .input:focus ~ .input-label {
    transform: scale(0.8) translateY(-10px);
  }

  .input:focus ~ .input-label {
    color: var(--theme-color);
  }
}
</style>
