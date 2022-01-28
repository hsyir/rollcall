<template>
  <div v-if="form.successful">
    <v-alert
      border="left"
      dense
      type="success"
      dismissible
    >
      <slot>
        <div v-html="message" />
      </slot>
    </v-alert>
  </div>
</template>

<script>

export default {
  name: 'AlertSuccess',
  props: {
    message: {
      type: String,
      default: 'There were some problems with your input.'
    },
    form: {
      type: Object,
      required: true
    },
    dismissible: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    dismiss() {
      if (this.dismissible) {
        this.form.clear()
      }
    }
  }
}
</script>
