<template>
    <div class="home">
        <div class="r gimme_space">
            <div class="i 8">
                <p v-if="!posts.length">It's looking empty in here.. 💨</p>
                <post-summary
                    v-for="post in posts"
                    v-bind:key="post._id"
                    :post="post"
                    v-else
                    class="post"
                >
                    <router-link
                        class="btn primary"
                        :to="{ name: 'Post', params: { id: post._id } }"
                        >Read More =></router-link
                    >
                </post-summary>
            </div>
            <div class="i 4">
                <div class="card">
                    <div class="c">
                        <h3>Welcome to this blog!</h3>
                        <p>This is a blog built using Express.js, Vue.js and MongoDB.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PostSummary from "@/components/PostSummary.vue";

export default {
    name: "Home",
    data() {
        return {
            posts: [],
        };
    },
    components: {
        PostSummary,
    },
    created() {
        this.$http
            .get(`/api/post`, { withCredentials: true })
            .then(res => {
                let postsData = res.data.data;
                postsData = postsData.map(post => {
                    post.created = new Date(post.created);
                    post.lastUpdated = new Date(post.lastUpdated);
                    return post;
                })
                console.log(postsData)
                this.posts = this.posts.concat(postsData);
            })
            .catch((err) => {
                this.$globals.addNotification(
                    `There was an error retrieving this post! Error: ${err.response.data.message}`,
                    "error",
                    5000
                );
            });
    },
};
</script>

<style>
.post {
    margin-bottom: 2rem;
}
</style>
