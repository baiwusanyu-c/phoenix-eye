/*
* @project-manage-main.vue
* @deprecated 项目管理页面框架
* @author czh
* @update (czh 2021/11/1)
*/
<template>
    <div class="project-manage-main">
        <div class="project-manage-list scrollDiy">
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
                @fresh="freshProject(item)"
                @delete="deleteProject(item)"
                v-for="(item) in projectList" :key="item.id">
            </project-manage-card>
        </div>
        <!--    新增、编辑项目弹窗    -->
        <create-project ref="createProjectDialog"></create-project>
        <!--    删除项目弹窗    -->
        <be-msg-dialog @confirm="confirmDelete"
                       headerTitle="删除"
                       :isShow.sync="showDelete"
                       :title="deleteText">
        </be-msg-dialog>
        <!--    重新评估彈窗   -->
        <be-msg-dialog @confirm="confirmFresh"
                       headerTitle="重新评估"
                       :isShow.sync="showFresh"
                       :title="freshText">
        </be-msg-dialog>
    </div>
</template>

<script>
import ProjectManageCard from "./components/project-manage-card";
import CreateProject from "./components/create-project";
export default {
    name: "ProjectManageMain",
    components: {CreateProject, ProjectManageCard},
    data() {
        return {
            // 重新评估弹窗显示
            showFresh:false,
            // 重新评估弹窗显示内容
            freshText:'',
            // 删除弹窗显示
            showDelete:false,
            // 删除弹窗显示内容
            deleteText:'',
            // 项目列表示例
            projectList:[
                {name:'uniswap',type:'private',createTime:'2020-03-10 12:30:30',tagList:['PancakeSwap','uniswap'],id:'wdwqsaafga'},
                {name:'uniswap',type:'public',createTime:'2020-03-10 12:30:30',tagList:['PancakeSwap','uniswap'],id:'wdwqaqwe21fga'},
                {name:'uniswap',type:'private',createTime:'2020-03-10 12:30:30',tagList:['PancakeSwap','uniswap'],id:'wdwqarfga'},
                {name:'uniswap',type:'public',createTime:'2020-03-10 12:30:30',tagList:['PancakeSwap','uniswap'],id:'wdwqaqrfga'},
                {name:'uniswap',type:'public',createTime:'2020-03-10 12:30:30',tagList:['PancakeSwap','uniswap'],id:'wdwqadwqfga'},
            ],
            // 项目列表的地址列表示例
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
            this.$refs.createProjectDialog.createProjectWindow = true
            console.log('addProject')
        },
        /**
         * 编辑类型方法
         */
        editProject(){
            this.$refs.createProjectDialog.createProjectWindow = true
            console.log('editProject')
        },
        /**
         * 删除类型方法
         * @param {Object} item - 项目数据对象
         */
        deleteProject(item){
            this.deleteText = `是否要删除${item.name}？`
            this.showDelete = true
        },
        /**
         * 刷新项目信息
         * @param {Object} item - 项目数据对象
         */
        freshProject(item){
            this.freshText = `是否对${item.name}的所有安全项进行重新评估？`
            this.showFresh = true
        },
        /**
         * 确认刷新项目信息
         */
        confirmFresh(){
            this.showFresh = false
        },
        /**
         * 确认删除项目信息
         */
        confirmDelete(){
            this.showDelete = false
        }
    },
}
</script>

<style scoped lang="scss">
.project-manage-main {
    height: 100%;
    width: 100%;
    .project-manage-list {
        overflow-y: auto;
        width: 100%;
        height: 100%;
        /* display: flex;
         justify-content: flex-start;
         flex-wrap: wrap;*/

    }
}
</style>