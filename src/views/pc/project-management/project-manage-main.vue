/*
* @project-manage-main.vue
* @deprecated 项目管理页面框架
* @author czh
* @update (czh 2021/11/1)
*/
<template>
    <div class="project-manage-main">
        <div class="project-manage-list">
            <project-manage-card
                type="add"
                @add="addProject">
            </project-manage-card>
            <project-manage-card
                type="edit"
                :title="item.name"
                :project-type="item.type"
                :tag-list="item.tagList"
                :createTime="item.createTime"
                :addrList="addrList"
                @edit="editProject"
                @fresh="freshProject"
                @delete="deleteProject"
                v-for="(item) in projectList" :key="item.id">
            </project-manage-card>
        </div>
    </div>
</template>

<script>
import ProjectManageCard from "./components/project-manage-card";
export default {
    name: "ProjectManageMain",
    components: {ProjectManageCard},
    data() {
        return {
            projectList:[
                {name:'uniswap',type:'private',createTime:'2020-03-10 12:30:30',tagList:['PancakeSwap','uniswap'],id:'wdwqsaafga'},
                {name:'uniswap',type:'public',createTime:'2020-03-10 12:30:30',tagList:['PancakeSwap','uniswap'],id:'wdwqaqwe21fga'},
                {name:'uniswap',type:'private',createTime:'2020-03-10 12:30:30',tagList:['PancakeSwap','uniswap'],id:'wdwqarfga'},
                {name:'uniswap',type:'public',createTime:'2020-03-10 12:30:30',tagList:['PancakeSwap','uniswap'],id:'wdwqaqrfga'},
                {name:'uniswap',type:'public',createTime:'2020-03-10 12:30:30',tagList:['PancakeSwap','uniswap'],id:'wdwqadwqfga'},
            ],
            addrList:[
                {currency:'Polygon',addr:'1KKo4c3eZAoJ7zqWi2TWYu9H2yFMTi7P2D',},
                {currency:'Polygon',addr:'1KKo4c3eZAoJ7zqWi2TdWYu9H2yFMTi7P2D',},
                {currency:'Polygon',addr:'1KKo4c3eZAoJ7zqWi2TcWYu9H2yFMTi7P2D',},
                {currency:'Polygon',addr:'1KKo4c3eZAoJ7zqWis2TWYu9H2yFMTi7P2D',},
                {currency:'Polygon',addr:'1KKo4c3eZAoJ7zqWi2aTWYu9H2yFMTi7P2D',},
                {currency:'Polygon',addr:'1KKo4c3eZAoJ7zqWi2aTWYu9H2yFMTi7aP2D',},
            ]
        }
    },
    mounted() {
    },
    methods: {
        /**
         * 新增类型方法
         */
        addProject(){
            console.log('addProject')
        },
        /**
         * 编辑类型方法
         */
        editProject(){
            console.log('editProject')
        },
        /**
         * 删除类型方法
         */
        deleteProject(){
            console.log('deleteProject')
        },
        /**
         * 刷新项目信息
         */
        freshProject(){
            console.log('freshProject')
        }
    },
}
</script>

<style scoped lang="scss">
.project-manage-main {
    height: 100%;
    width: 100%;
    .project-manage-list {
        width: 100%;
        height: 100%;
       /* display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;*/

    }
}
</style>