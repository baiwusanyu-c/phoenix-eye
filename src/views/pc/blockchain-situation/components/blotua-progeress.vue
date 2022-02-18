<template>
    <div>

    </div>
</template>

<script lang="ts">
    import {defineComponent, ref, inject} from 'vue'
    interface IScrollConfigData{
        name:string,
        value:string | number
    }
    export default defineComponent({
        name: "blotua-progeress",

        props:{
            config:{
                type:Object,
            }
        },
        setup(props){
            const scrollConfig = inject('config')
            console.log(scrollConfig)

            return {

            }
        }
    })
</script>

<style scoped>

</style>