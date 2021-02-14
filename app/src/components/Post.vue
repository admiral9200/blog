<template>
    <article class="card" v-if="post">
        <div class="darken_img" v-if="post.imageurl">
            <img :src="post.imageurl" class="card_img" alt="Post Image" />
            <div class="text_img">
                <h1 id="title">
                    {{ post.title }}
                </h1>
                <span class="washed"
                    ref="date">{{ readableDate }} by {{ post.user.username }}</span
                >
            </div>
        </div>
        <div v-else>
            <div class="c">
                <h1 id="title">{{ post.title }}</h1>
                <span class="washed"
                    ref="date">{{ readableDate }} by {{ post.user.username }}</span
                >
            </div>
            <hr />
        </div>
        <div id="content" ref="content" class="c" v-html="compiledPost"></div>
    </article>
</template>

<script>
const marked = require("marked");

export default {
    props: ['post'],
    computed: {
        compiledPost: function () {
            return marked(this.post.content);
        },
        readableDate: function() {
            return this.post.created.toLocaleDateString('de-DE')
        }
    },
};
</script>

<style>
</style>