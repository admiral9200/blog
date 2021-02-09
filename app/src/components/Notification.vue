<template>
  <div class="notification" :class="type">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'notification',
    props: ['type'],
    data() {
        return {
            visible: true
        }
    }
}
</script>

<style>
.notification {
    padding: 1.25rem 2.5rem 1.25rem 1.5rem;
    border-radius: 3px;
    position: relative;
}
.notification:not(:last-child) {
    margin-bottom: 1.5rem;
}
.notification.error {
    background: #BF616A;
    color: #fff;
}
.notification.success {
    background: #A3BE8C;
    color: #fff;
}
</style>