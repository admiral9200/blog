<template>
    <div class="home">
        <div class="r gimme_space">
            <div class="i 8">
                <p v-if="!posts.length">It's looking empty in here.. 💨</p>
                <transition-group name="list-complete">
                
                
                <post-summary
                    v-for="post in posts"
                    v-bind:key="post._id"
                    :post="post"
                    class="post list-complete-item"
                >
                    <router-link
                        class="btn primary"
                        :to="{ name: 'Post', params: { id: post._id } }"
                        >Read More =></router-link
                    >
                </post-summary>
                </transition-group>
                <button
                    @click.prevent="loadMore"
                    v-if="moreAvailable"
                    class="b primary full"
                >
                    Load older posts
                </button>
                <p v-else-if="posts.length">You've reached the end! 🎉</p>
            </div>
            <div class="i 4">
                <div class="card">
                    <div class="c">
                        <h3>Welcome to this blog!</h3>
                        <p>
                            This is a blog built using Express.js, Vue.js and
                            MongoDB.
                        </p>
                        <router-link class="b full" v-if="loggedIn" to="Compose"
                            >Compose Post</router-link
                        >
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
            page: 1,
            noMorePosts: false,
        };
    },
    components: {
        PostSummary,
    },
    computed: {
        loggedIn() {
            return this.$globals.loggedIn;
        },
        moreAvailable() {
            return (
                this.posts.length &&
                this.posts.length % 10 == 0 &&
                !this.noMorePosts
            );
        },
    },
    methods: {
        loadPage(page) {
            this.$http
                .get(`/api/post`, {
                    params: { page: page },
                    withCredentials: true,
                })
                .then((res) => {
                    let postsData = res.data.data;
                    postsData = postsData.map((post) => {
                        post.created = new Date(post.created);
                        post.lastUpdated = new Date(post.lastUpdated);
                        return post;
                    });
                    if (!postsData.length) {
                        this.noMorePosts = true;
                    } else {
                        this.posts = this.posts.concat(postsData);
                    }
                })
                .catch((err) => {
                    this.$globals.addNotification(
                        `There was an error retrieving this post! Error: ${err.response.data.message}`,
                        "error",
                        5000
                    );
                });
        },
        loadMore() {
            this.page++;
            this.loadPage(this.page);
        },
    },
    created() {
        this.loadPage(this.page);
    },
};
</script>

<style>
.post {
    margin-bottom: 2rem;
}


.list-complete-item {
  transition: transform 1s, opacity 1s;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
