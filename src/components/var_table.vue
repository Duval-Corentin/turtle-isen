<template>
    <div class="docs_table">
        <sui-header color="blue" size="big"> Variables </sui-header>
        <sui-divider horizontal></sui-divider>
        <div class="var_table">
            <sui-table celled>
                <sui-table-header>
                    <sui-table-row>
                        <sui-table-header-cell>Nom</sui-table-header-cell>
                        <sui-table-header-cell>Type</sui-table-header-cell>
                        <sui-table-header-cell>Valeur finale</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>
                <sui-table-body class="table_body">
                    <sui-table-row v-for="(variable, index) in variables" :key="index">
                        <sui-table-cell>{{Object.keys(variable)[0]}}</sui-table-cell>
                        <sui-table-cell>{{typeof Object.values(variable)[0]}}</sui-table-cell>
                        <sui-table-cell>{{Object.values(variable)[0]}}</sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
        </div>
    </div>
</template>


<script>
export default {
    name: "docs_table",
    props: ['variables'],
    data: function () {
        return {
        }
    }
}
</script>

<style>
.var_table {
    max-height: 450px;
    overflow: scroll;
}
</style>
