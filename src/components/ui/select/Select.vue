<template>
  <v-select
    :items="items"
    :label="label"
    @change="updateValue"
    solo
    append-icon="mdi-chevron-down"
  ></v-select>
</template>

<script>
export default {
  name: "Select",
  props: {
    label: String,
    items: Array,
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss">
.v-select {
  & .v-input__slot {
    background: #b9d7ea !important;
    box-shadow: none !important;
    margin-bottom: 0;
    min-height: 40px;
    height: 40px;
    border-radius: 8px;

    padding: 10px 16px !important;

    & .v-label {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #04153e;
      opacity: 0.48;
    }
  }

  &__selection {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #04153e;
    opacity: 0.48;
  }
}

.v-menu__content {
  box-shadow: none !important;
  border-radius: 8px;

  & .v-list-item {
    padding: 0 20px !important;

    &--active {
      &::before {
        background-color: white;
      }

      & .v-list-item__title {
        color: #04153e;
      }
    }

    &__title {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #4a5774;
    }
  }
}

.v-messages,
.v-text-field__details {
  min-height: 0 !important;
}
</style>
