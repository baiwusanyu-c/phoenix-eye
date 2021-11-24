/*
* @project-manage-main.vue
* @deprecated 项目管理页面框架
* @author czh
* @update (czh 2021/11/1)
*/
<template>
    <div class="project-manage-main" >
        <div class="project-manage-list scrollDiy" v-loading="loading">
            <project-manage-card
                type="add"
                @add="addProject">
            </project-manage-card>
            <project-manage-card
                type="edit"
                :title="item.name"
                :is-public="item.is_public"
                :keyword-list="item.keywordList"
                :create-time="item.create_time"
                :contract-list="item.contract_infos"
                @edit="editProject(item)"
                @fresh="freshProject(item)"
                @delete="deleteProject(item)"
                v-for="(item) in projectList" :key="item.id">
            </project-manage-card>
        </div>
        <!--    新增、编辑项目弹窗    -->
        <create-project
            :type="opType"
            :projectId = 'curItem.id'
            @confirm = "()=>{return this.opType === 'add' ? this.confirmAdd() : this.confirmEdit()}"
            ref="createProjectDialog">
        </create-project>
        <!--    删除项目弹窗    -->
        <be-msg-dialog @confirm="confirmDelete"
                       :headerTitle="$t('el.delete')"
                       :isShow.sync="showDelete"
                       :title="deleteText">
        </be-msg-dialog>
        <!--    重新评估彈窗   -->
        <be-msg-dialog @confirm="confirmFresh"
                       :headerTitle="$t('el.systemConfig.reassess')"
                       :isShow.sync="showFresh"
                       :title="freshText">
        </be-msg-dialog>
    </div>
</template>

<script>
import ProjectManageCard from "./components/project-manage-card";
import CreateProject from "./components/create-project";
import {
    createProject,
    deleteProject,
    getProjectList,
    reappraiseProject,
    saveEditProject
} from "../../../api/project-management";



export default {
    name: "ProjectManageMain",
    components: {CreateProject, ProjectManageCard},
    data() {
        return {
            // 当前操作的项目对象
            curItem:{},
            // 当前操作类型
            opType:'add',
            // 重新评估弹窗显示
            showFresh:false,
            // 重新评估弹窗显示内容
            freshText:'',
            // 删除弹窗显示
            showDelete:false,
            // 删除弹窗显示内容
            deleteText:'',
            // 项目列表示例
            projectList:[],
            // 项目列表的地址列表示例
            addrList:[],
            // loading
            loading:false,
        }
    },
    created() {
        this.getList()
    },
    methods: {
        /**
         * 新增类型方法
         */
        addProject(){
            this.opType = 'add'
            this.$refs.createProjectDialog.createProjectWindow = true
        },
        /**
         * 確認新增方法
         * @param {Object} param - 表单参数
         */
        confirmAdd(param){
            const _this = this
            createProject(param).then(res=>{
                if(res){
                    const msg = _this.$t('el.add')+ _this.$t('el.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.getList()
                    _this.$refs.createProjectDialog.createProjectWindow = false
                }
            }).catch(err=>{
                const msg = _this.$t('el.add')+ _this.$t('el.failed')
                _this.$message.error(msg)
                console.error(err)
            })
        },
        /**
         * 编辑类型方法
         */
        editProject(item){
            this.opType = 'edit'
            this.curItem = item
            this.$refs.createProjectDialog.createProjectWindow = true

        },
        /**
         * 確認編輯方法
         * @param {Object} param - 表单参数
         */
        confirmEdit(param){
            const _this = this
            const pathParams = {
                id:this.curItem.id
            }
            saveEditProject(param,pathParams).then(res=>{
                if(res){
                    const msg = _this.$t('el.edit')+ _this.$t('el.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.getList()
                    _this.$refs.createProjectDialog.createProjectWindow = false
                }
            }).catch(err=>{
                const msg = _this.$t('el.edit')+ _this.$t('el.failed')
                _this.$message.error(msg)
                console.error(err)
            })
        },
        /**
         * 删除类型方法
         * @param {Object} item - 项目数据对象
         */
        deleteProject(item){
            this.curItem = item
            this.deleteText = `${this.$t('el.systemConfig.delete')}${item.name}？`
            this.showDelete = true
        },
        /**
         * 确认删除项目信息
         */
        confirmDelete(){
            const _this = this
            const pathParams = {
                id:this.curItem.id
            }
            deleteProject(null,pathParams).then(res=>{
                if(res){
                    const msg = _this.$t('el.delete')+ _this.$t('el.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.getList()
                    _this.showDelete = false
                }
            }).catch(err=>{
                const msg = _this.$t('el.delete')+ _this.$t('el.failed')
                _this.$message.error(msg)
                console.error(err)
            })
        },
        /**
         * 重新评估项目
         * @param {Object} item - 项目数据对象
         */
        freshProject(item){
            this.curItem = item
            this.freshText = `${this.$t('el.systemConfig.isConfirm')}${item.name}${this.$t('el.systemConfig.reassessInfo')}？`
            this.showFresh = true
        },
        /**
         * 确认重新评估项目
         */
        confirmFresh(){
            const _this = this
            const pathParams = {
                id:this.curItem.id
            }
            reappraiseProject(null,pathParams).then(res=>{
                if(res){
                    const msg = _this.$t('el.operation')+ _this.$t('el.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.getList()
                    _this.showFresh = false
                }
            }).catch(err=>{
                const msg = _this.$t('el.operation')+ _this.$t('el.failed')
                _this.$message.error(msg)
                console.error(err)
            })
        },

        /**
         * 获取项目列表
         */
        getList(){
            const _this = this
            _this.loading = true
            getProjectList().then(res => {
                // 项目列表
                _this.projectList =  res.data
                // 關鍵詞字符串轉化為數組
                _this.projectList.forEach(val=>{
                    val.keywordList =  val.keyword.split(';').filter(val=>val)
                })
                _this.loading = false
            }).catch(err=>{
                const msg = _this.$t('el.search')+ _this.$t('el.failed')
                _this.$message.error(msg)
                console.error(err)
            })
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