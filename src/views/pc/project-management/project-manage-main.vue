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
                @delete="deleteProjects(item)"
                v-for="(item) in projectList.data" :key="item.id">
            </project-manage-card>
        </div>
        <!--    新增、编辑项目弹窗   ref="createProjectDialog" -->
        <create-project
            :type="opType"
            :projectId = 'curItem.data.id'
            :getList="getList"
            @confirm = "()=>{return opType === 'add' ? confirmAdd() : confirmEdit()}"
             ref="createProjectDialog">
        </create-project>
        <!--    删除项目弹窗    -->
        <MsgDialog @confirm="confirmDelete"
                   @close="()=>showDelete = false"
                       :headerTitle="$t('lang.delete')"
                       :isShow="showDelete"
                       :title="deleteText">
        </MsgDialog>
        <!--    重新评估彈窗   -->
        <MsgDialog @confirm="confirmFresh"
                   @close="()=>showFresh = false"
                       :headerTitle="$t('lang.systemConfig.reassess')"
                       :isShow="showFresh"
                       :title="freshText">
        </MsgDialog>
    </div>
</template>

<script lang="ts">
import ProjectManageCard from "./components/project-manage-card.vue";
import CreateProject from "./components/create-project.vue";
import {
    createProject,
    deleteProject,
    getProjectList,
    reappraiseProject,
    saveEditProject
} from "../../../api/project-management";
import MsgDialog from '../../../components/common-components/msg-dialog/msg-dialog.vue'
import {defineComponent, ref, reactive, onMounted ,provide,getCurrentInstance} from 'vue'
import {ElMessage} from "element-plus/es";
import {useI18n} from "vue-i18n";

export default defineComponent({
    name: "ProjectManageMain",
    components: {CreateProject, ProjectManageCard,MsgDialog},
    setup(){
        const {t,locale} = useI18n()
        // 当前操作的项目对象
        const curItem=reactive({data:{}})
        // 当前操作类型
        const opType=ref<string>('add')
        // 重新评估弹窗显示
        const showFresh=ref<boolean>(false)
        // 重新评估弹窗显示内容
        const freshText=ref<string>('')
        // 删除弹窗显示
        const showDelete=ref<boolean>(false)
        // 删除弹窗显示内容
        const deleteText=ref<string>('')
        // 项目列表示例
        const projectList=reactive({data:[]})
        // 项目列表的地址列表示例
        const addrList=reactive({data:[]})
        // loading
        const loading=ref<boolean>(false)
        const createProjectDialog = ref<any>({})
        onMounted(()=>{
            getList()
        })

        //const instanceInner = getCurrentInstance()
        /**
         * 新增类型方法
         */
        const addProject = () => {
            opType.value = 'add'
            //instanceInner.refs.createProjectDialogXXX.createProjectWindow = true
            createProjectDialog.value.createProjectWindow = true
        }
        /**
         * 確認新增方法
         * @param {Object} param - 表单参数
         */
        const confirmAdd = (param) => {
            createProject(param).then(res=>{
                if(res){
                    const msg = t('lang.add')+ t('lang.success')
                    ElMessage.success(msg)
                    // 更新列表
                    getList()
                    createProjectDialog.value.createProjectWindow = false
                }
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })
        }
        /**
         * 编辑类型方法
         */
        const editProject = (item) => {
            opType.value = 'edit'
            curItem.data = item
            createProjectDialog.value.createProjectWindow = true

        }
        /**
         * 確認編輯方法
         * @param {Object} param - 表单参数
         */
        const confirmEdit = (param:object) => {
            const pathParams = {
                id:curItem.data.id
            }
            saveEditProject(param,pathParams).then(res=>{
                if(res){
                    const msg = t('lang.edit')+ t('lang.success')
                    ElMessage.success(msg)
                    // 更新列表
                    getList()
                    createProjectDialog.value.createProjectWindow = false
                }
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })
        }
        /**
         * 删除类型方法
         * @param {Object} item - 项目数据对象
         */
        const deleteProjects = (item:object) => {
            curItem.data = item
            deleteText.value = `${t('lang.systemConfig.delete')}${item.name}？`
            showDelete.value = true
        }
        /**
         * 确认删除项目信息
         */
        const confirmDelete = () => {
            const params = {
                id:curItem.data.id
            }
            deleteProject(params).then(res=>{
                if(res){
                    const msg = t('lang.delete')+ t('lang.success')
                    ElMessage.success(msg)
                    // 更新列表
                    getList()
                    showDelete.value = false
                }
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })
        }
        /**
         * 重新评估项目
         * @param {Object} item - 项目数据对象
         */
        const freshProject = (item:object) => {
            curItem.data = item
            freshText.value = `${t('lang.systemConfig.isConfirm')}${item.name}${t('lang.systemConfig.reassessInfo')}？`
            showFresh.value = true
        }
        /**
         * 确认重新评估项目
         */
        const confirmFresh = () => {
            const params = {
                id:curItem.data.id
            }
            reappraiseProject(params).then(res=>{
                if(res){
                    const msg = t('lang.operation')+ t('lang.success')
                    ElMessage.success(msg)
                    // 更新列表
                    getList()
                    showFresh.value = false
                }
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })
        }
        /**
         * 获取项目列表
         */
        const getList = () => {
            loading.value = true
            getProjectList().then(res => {
                // 项目列表
                projectList.data =  res.data
                // 關鍵詞字符串轉化為數組
                projectList.data.forEach(val=>{
                    let keyword = val.keyword.replace('；',';')
                    val.keywordList =  keyword.split(';').filter(filterVal=>filterVal)
                })
                loading.value = false
            }).catch(err=>{
                ElMessage.error(err.message)
                console.error(err)
            })
        }

        return {
            curItem,
            opType,
            showFresh,
            freshText,
            showDelete,
            deleteText,
            projectList,
            loading,
            addrList,
            createProjectDialog,
            confirmFresh,
            freshProject,
            confirmDelete,
            deleteProjects,
            confirmEdit,
            editProject,
            addProject,
            confirmAdd,
            getList
        }
    },
    /*data() {
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
        /!**
         * 新增类型方法
         *!/
        addProject(){
            this.opType = 'add'
            this.$refs.createProjectDialog.createProjectWindow = true
        },
        /!**
         * 確認新增方法
         * @param {Object} param - 表单参数
         *!/
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
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /!**
         * 编辑类型方法
         *!/
        editProject(item){
            this.opType = 'edit'
            this.curItem = item
            this.$refs.createProjectDialog.createProjectWindow = true

        },
        /!**
         * 確認編輯方法
         * @param {Object} param - 表单参数
         *!/
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
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /!**
         * 删除类型方法
         * @param {Object} item - 项目数据对象
         *!/
        deleteProject(item){
            this.curItem = item
            this.deleteText = `${this.$t('el.systemConfig.delete')}${item.name}？`
            this.showDelete = true
        },
        /!**
         * 确认删除项目信息
         *!/
        confirmDelete(){
            const _this = this
            const params = {
                id:this.curItem.id
            }
            deleteProject(params).then(res=>{
                if(res){
                    const msg = _this.$t('el.delete')+ _this.$t('el.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.getList()
                    _this.showDelete = false
                }
            }).catch(err=>{
                _this.$message.error(err.message)
                console.error(err)
            })
        },
        /!**
         * 重新评估项目
         * @param {Object} item - 项目数据对象
         *!/
        freshProject(item){
            this.curItem = item
            this.freshText = `${this.$t('el.systemConfig.isConfirm')}${item.name}${this.$t('el.systemConfig.reassessInfo')}？`
            this.showFresh = true
        },
        /!**
         * 确认重新评估项目
         *!/
        confirmFresh(){
            const _this = this
            const params = {
                id:this.curItem.id
            }
            reappraiseProject(params).then(res=>{
                if(res){
                    const msg = _this.$t('el.operation')+ _this.$t('el.success')
                    _this.$message.success(msg)
                    // 更新列表
                    _this.getList()
                    _this.showFresh = false
                }
            }).catch(err=>{
                _this.$message.error(err.message)
                console.error(err)
            })
        },

        /!**
         * 获取项目列表
         *!/
        getList(){
            const _this = this
            _this.loading = true
            getProjectList().then(res => {
                // 项目列表
                _this.projectList =  res.data
                // 關鍵詞字符串轉化為數組
                _this.projectList.forEach(val=>{
                    let keyword = val.keyword.replace('；',';')
                    val.keywordList =  keyword.split(';').filter(filterVal=>filterVal)
                })
                _this.loading = false
            }).catch(err=>{
                _this.$message.error(err.message)
                console.error(err)
            })
        }
    },*/
})
</script>

<style scoped lang="scss">
.project-manage-main {
  width: 100%;
  height: 100%;

  .project-manage-list {
    width: 100%;
    height: 100%;
    overflow-y: auto;

    /* display: flex;
         justify-content: flex-start;
         flex-wrap: wrap; */

  }
}
</style>