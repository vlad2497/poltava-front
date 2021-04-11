<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        class="custom-date-picker__textfield"
        v-model="date"
        :label="label"
        readonly
        v-bind="attrs"
        v-on="on"
      >
      </v-text-field>
    </template>
    <v-date-picker v-model="date" :first-day-of-week="1" locale="ru" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false">
        Закрыть
      </v-btn>
      <v-btn text color="primary" @click="handleOkClick">
        Выбрать
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "DatePicker",
  props: {
    setDate: Function,
    label: String,
  },
  data: () => ({
    date: "",
    modal: false,
  }),
  methods: {
    handleOkClick() {
      this.setDate(this.date);
      this.$refs.dialog.save(this.date);
    },
  },
};
</script>

<style lang="scss">
.custom-date-picker {
  &__textfield {
    .custom-input {
      padding: 0 !important;
      margin: 0 !important;
    }

    & .v-input__slot {
      margin: 0;
      background-color: #b9d7ea;
      border-radius: 8px !important;
    }

    & .v-input__append-inner {
      display: flex;
      align-items: center;
      height: 33px;
      width: 30px;
    }

    & .v-input__slot::before,
    & .v-input__slot::after {
      border: none !important;
    }

    & input {
      padding: 16px !important;
      padding-top: 25px !important;

      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      max-height: 40px !important;
      color: #465474;
    }

    & label.v-label {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0em;
      color: #04153e !important;
      opacity: 0.48;

      top: 9px !important;
      left: 16px !important;
    }

    & label.v-label--active {
      top: 20px !important;
    }

    & .v-text-field__details,
    & .v-messages {
      min-height: initial !important;
    }
  }
}

.v-picker {
  &.v-card {
    & .v-picker__title {
      &.primary {
        background-color: #61c0bf !important;
        color: #465474 !important;
      }
    }
  }

  &__title__btn {
    display: none;
  }
}

.v-overlay {
  z-index: 1200 !important;
}

.v-dialog__content {
  z-index: 1201 !important;
}
</style>
