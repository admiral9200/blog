<template>
    <article class="card" v-if="post">
        <img v-if="post.imageurl" :src="post.imageurl" class="card_img" alt="Post Image" />
        <div class="c">
            <h3>{{ post.title }}, <span class="washed">{{ readableDate }} by {{ post.user.username }}</span></h3>
            <p>{{ post.summary }}</p>
            <slot></slot>
        </div>
    </article>
</template>

<script>
const marked = require("marked");

export default {
    name: "PostSummary",
    props: ["post"],
    computed: {
        readableDate: function() {
            return this.post.created.toLocaleDateString('de-DE')
        }
    },
};
</script>

<style>
</style>