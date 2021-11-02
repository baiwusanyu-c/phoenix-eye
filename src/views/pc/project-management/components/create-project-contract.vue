<template>
    <div class="contractSiteBox">
        <el-select v-model="contractSite.class" class="contractSiteClass" :placeholder="$t('lang.createProject.selectContractClass')">
            <el-option label="select1" value="name1"></el-option>
            <el-option label="select2" value="name2"></el-option>
        </el-select>
        <el-input v-model="contractSite.site" class="contractSiteSite" :placeholder="$t('lang.createProject.contractSiteInput')"></el-input>
        <el-input v-model="contractSite.lable" class="contractSiteLabel" :placeholder="$t('lang.createProject.contractSiteLabel')"></el-input>
        <img src="../../../../assets/image/pc/subtract.png" class="subtract"/>
    </div>
</template>

<script>
    export default {
        name: "createProjectContract",
        data(){
            return {
                addContract: 1,
                contractSite: {
                    class: '',
                    site: '',
                    lable: '',
                },
            }
        },
    }
</script>

<style scoped lang="scss">
    .contractSiteBox{
        margin-top: 8px;
    }
    .contractSiteClass{
        width: 110px;
    }
    .contractSiteSite{
        width: 322px;
        margin-left: 8px;
    }
    .contractSiteLabel{
        width: 234px;
        margin-left: 8px;
    }
    .subtract{
        z-index: 378;
        width: 20px;
        height: 20px;
        margin-left: 10px;
        background-color: white;
    }
</style>