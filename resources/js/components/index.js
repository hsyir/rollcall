import Vue from 'vue'
import Card from './Card.vue'
import Child from './Child.vue'
import Button from './Button.vue'
import Checkbox from './Checkbox.vue'
import { HasError, AlertError } from 'vform/components/bootstrap5'
import AlertSuccess from './AlertSuccess'
import CallerId from './CallerId/CallerId'
// Components that are registered globaly.
[
  CallerId,
  Card,
  Child,
  Button,
  Checkbox,
  HasError,
  AlertError,
  AlertSuccess
].forEach(Component => {
  Vue.component(Component.name, Component)
})
