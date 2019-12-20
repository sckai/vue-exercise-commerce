<template>
    <div>
        <nav aria-label="Page navigation example" v-if="pagination.total_pages !== 1">
            <ul class="pagination justify-content-center">
                <li class="page-item" 
                v-show="pagination.has_pre"
                @click.prevent="getProducts(pagination.current_page - 1)">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item" v-for="item in pagination.total_pages" 
                :key="item"
                :class="{active: pagination.current_page === item}"
                @click.prevent="getProducts(item)">
                    <a class="page-link" href="#">{{item}}</a>
                </li>
                <li class="page-item"
                @click.prevent="getProducts(pagination.current_page + 1)"
                v-show="pagination.has_next">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: ['pagination'],
    methods: {
        getProducts(page) {
            this.$emit('getPages', page);
        }
    },
}
</script>
