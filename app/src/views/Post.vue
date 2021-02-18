<template>
    <div class="post">
        <p v-if="loading">Loading the post..</p>
        <post v-if="post" class="gimme_space" :post="post" />
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
            post: undefined,
            loading: false
        };
    },
    components: {
        Post,
    },
    props: ["id"],
    created() {
        this.loading = true
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
                router.back();
            })
            .finally(() => {
                this.loading = false
            })
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