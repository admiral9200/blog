<template>
    <div class="r">
        <div class="i">
            <div class="card gimme_space">
                <div class="c">
                    <form>
                        <input
                            class="full"
                            type="text"
                            v-model="title"
                            placeholder="Title"
                            required
                        /><br />
                        <input
                            class="full"
                            type="url"
                            v-model="imageurl"
                            placeholder="Image URL"
                        /><br />
                        <textarea
                            rows="10"
                            class="full"
                            v-model="content"
                            placeholder="Content (markdown)"
                            required
                        ></textarea>
                        <textarea
                            rows="5"
                            class="full"
                            v-model="summary"
                            placeholder="Summary shown on the front page (plaintext)"
                            required
                        ></textarea>
                        <button type="submit" class="b primary">Post</button>
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
export default {
    data() {
        return {
            title: "",
            imageurl: "",
            content: "",
            summary: "",
        };
    },
    computed: {
        computedPost: function () {
            return {
                imageurl: this.imageurl,
                title: this.title,
                created: new Date(),
                user: { username: this.$globals.username },
                content: this.content,
            };
        },
    },
    components: {
        Post,
    },
};
</script>

<style>
</style>