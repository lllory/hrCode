<template>
    <el-table-column :label="columnHeader.label" :prop='columnHeader.prop' :width='columnHeader.width' align="center">
        <template v-for="(item,index) in columnHeader.children" >
            <tableColumn v-if="item.children && item.children.length" :key="index" :column-header='item'></tableColumn>
            <el-table-column v-else :label="item.label" :prop="item.prop" :width="item.width" align="center" :key="index"></el-table-column>
        </template>
    </el-table-column>
</template>

<script>
export default {
    name:'tableColumn',
    props:{
        columnHeader:{
            type:Object,
            required:true
        }
    }
}
</script>
