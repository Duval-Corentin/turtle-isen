<template>
    <div class="var_table_div">
        <sui-header color="blue" size="big"> Variables </sui-header>
        <sui-divider horizontal></sui-divider>
        <div class="var_table">
            <sui-table celled size='small' compact='very' color='blue'>
                <sui-table-header>
                    <sui-table-row>
                        <sui-table-header-cell>Nom</sui-table-header-cell>
                        <sui-table-header-cell>Type</sui-table-header-cell>
                        <sui-table-header-cell>Valeur finale</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>
                <sui-table-body class="table_body">
                    <sui-table-row v-for="(value, key) in turtle_variables" :key="key" state='warning'>
                        <sui-table-cell>tortue_{{key}}</sui-table-cell>
                        <sui-table-cell>{{typeof value == "string" ? "couleur":"nombre"}}</sui-table-cell>
                        <sui-table-cell>{{value}}</sui-table-cell>
                    </sui-table-row>
                    <sui-table-row v-for="(value, key) in variables" :key="key">
                        <sui-table-cell>{{key}}</sui-table-cell>
                        <sui-table-cell>{{typeof value == "string" ? "couleur":"nombre"}}</sui-table-cell>
                        <sui-table-cell>{{value}}</sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
        </div>
    </div>
</template>


<script>
export default {
    name: "docs_table",
    props: ['variables', 'turtle_variables'],
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
