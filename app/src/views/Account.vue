<template>
    <div class="card gimme_space">
        <div class="c">
            <h1>{{ username }}</h1>
            <h2>Posts</h2>
            <p v-if="!posts.length">It's looking rather empty in here...</p>
            <table v-else class="full">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <transition-group tag="tbody" name="table">
                    <tr v-for="post in posts" :key="post._id">
                        <td>{{ post.title }}</td>
                        <td>{{ post.readableDate }}</td>
                        <td>
                            <router-link
                                :to="{ name: 'Post', params: { id: post._id } }"
                                class="b primary"
                                >View</router-link
                            >
                            <span v-if="isOwnAccount">
                                <router-link
                                    :to="{
                                        name: 'Edit Post',
                                        params: { id: post._id },
                                    }"
                                    class="b"
                                >
                                    Edit</router-link
                                >
                                <transition name="delete-transition" mode="out-in">
                                    <button
                                        v-if="!post.deleteRequested"
                                        class="b"
                                        @click.prevent="requestDelete(post)"
                                        key="delete"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        v-else
                                        class="b primary danger"
                                        @click.prevent="deletePost(post)"
                                        key="confirm"
                                    >
                                        Confirm
                                    </button>
                                </transition>
                            </span>
                        </td>
                    </tr>
                </transition-group>
            </table>
        </div>
    </div>
</template>

<script>
import Vue from "vue";

export default {
    computed: {
        isOwnAccount() {
            return !this.username;
        },
    },
    data() {
        return {
            posts: [],
        };
    },
    props: ["username"],
    created() {
        let username = this.isOwnAccount
            ? this.$globals.username
            : this.username;
        this.$http
            .get(`/api/account/${username}/posts`, {
                withCredentials: true,
            })
            .then((res) => {
                let postsData = res.data.data;
                postsData = postsData.map((post) => {
                    post.created = new Date(post.created);
                    post.lastUpdated = new Date(post.lastUpdated);
                    post.readableDate = post.created.toLocaleDateString(
                        "de-DE"
                    );
                    post.deleteRequested = false;
                    return post;
                });
                this.posts = postsData;
            });
    },
    methods: {
        requestDelete(post) {
            post.deleteRequested = true;
            setTimeout(() => {
                post.deleteRequested = false;
            }, 4000);
        },
        deletePost(post) {
            this.$http
                .delete(`/api/post/${post._id}`, { withCredentials: true })
                .then((res) => {
                    this.$globals.addNotification(
                        "Post deleted!",
                        "success",
                        5000
                    );
                    this.posts = this.posts.filter(
                        (postItem) => postItem != post
                    );
                })
                .catch((err) => {
                    this.$globals.addNotification(
                        `There was an error deleting this post! Error: ${err.response.data.message}`,
                        "error",
                        5000
                    );
                });
        },
    },
};
</script>

<style>
.b {
    margin-right: 0.5em;
}
.danger {
    background: #bf616a !important;
}

.delete-transition-enter-active, .delete-transition-leave-active {
  transition: all .5s;
}
.delete-transition-enter, .delete-transition-leave-active {
  opacity: 0;
}
.delete-transition-enter {
  transform: translateX(31px);
}
/*.delete-transition-leave-active {
  transform: translateX(-31px);
}*/


.table-enter-active, .table-leave-active {
    transition: all 1s;
}
.table-enter, .table-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.card {
    transition: height 1s;
}
</style>