<template>
    <div class="r">
        <div class="i">
            <div class="card gimme_space">
                <div class="c">
                    <form @submit.prevent="update">
                        <label for="title">Title</label>
                        <input
                            class="full"
                            type="text"
                            v-model="title"
                            id="title"
                            placeholder="Title"
                            required
                        /><br />
                        <label for="imageurl">Image URL</label>
                        <input
                            class="full"
                            type="url"
                            v-model="imageurl"
                            id="imageurl"
                            placeholder="Image URL"
                        /><br />
                        <label for="content">Content</label>
                        <textarea
                            rows="10"
                            class="full"
                            v-model="content"
                            id="content"
                            placeholder="Content (markdown)"
                            required
                        ></textarea>
                        <label for="summary">Summary</label>
                        <textarea
                            rows="5"
                            class="full"
                            v-model="summary"
                            id="summary"
                            placeholder="Summary shown on the front page (plaintext)"
                            required
                        ></textarea>
                        <button type="submit" class="b primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="i">
            <post class="gimme_space" :post="computedPost" />
        </div>
    </div>
</template>

<script>
import Post from "../components/Post.vue";
import router from "../router";

export default {
    data() {
        return {
            title: "",
            imageurl: "",
            content: "",
            summary: "",
            created: new Date()
        };
    },
    computed: {
        computedPost: function () {
            return {
                imageurl: this.imageurl,
                title: this.title,
                created: this.created,
                user: { username: this.$globals.username },
                content: this.content,
            };
        },
    },
    components: {
        Post,
    },
    props: ['id'],
    methods: {
        update: function () {
            this.$http
                .put(`/api/post/${this.id}`, this.$data, { withCredentials: true })
                .then((res) => {
                    this.$globals.addNotification(
                        "Post updated!",
                        "success",
                        5000
                    );
                    router.back();
                })
                .catch((err) => {
                    this.$globals.addNotification(
                        `There was an error updating this post! Error: ${err.response.data.message}`,
                        "error",
                        5000
                    );
                });
        },
    },
    created() {
        this.$http
        .get(`/api/post/${this.id}`)
        .then(res => {
            let postData = res.data.data;
            this.title = postData.title;
            this.summary = postData.summary;
            this.imageurl = postData.imageurl;
            this.created = new Date(postData.created);
            this.content = postData.content;
        })
        .catch((err) => {
            this.$globals.addNotification(
                `There was an error retrieving this post! Error: ${err.response.data.message}`,
                "error",
                5000
            );
        });
    }
};
</script>

<style>
</style>