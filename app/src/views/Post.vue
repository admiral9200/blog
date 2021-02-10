<template>
    <div class="post">
        <post class="gimme_space" :post="post" />
        <br>
        <button class="b primary" @click.prevent="goBack">Go back</button>
    </div>
</template>

<script>
import Post from "@/components/Post.vue";
import router from "../router";

export default {
    data() {
        return {
            post: {},
        };
    },
    components: {
        Post,
    },
    props: ["id"],
    created() {
        this.$http
            .get(`/api/post/${this.id}`, { withCredentials: true })
            .then((res) => {
                this.post = res.data.data;
                this.post.created = new Date(this.post.created);
                this.post.lastUpdated = new Date(this.post.lastUpdated);
            })
            .catch((err) => {
                this.$globals.addNotification(
                    `There was an error retrieving this post! Error: ${err.response.data.message}`,
                    "error",
                    5000
                );
            });
    },
    methods: {
        goBack: function() {
            router.back();
        }
    },
};
</script>

<style>
</style>