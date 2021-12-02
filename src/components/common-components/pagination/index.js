import paginationComponents from './be-pagination.vue';

const Pagination = {
    install:function(Vue) {
        Vue.component('pagination', paginationComponents)
    }
}

export default Pagination;