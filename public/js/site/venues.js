/**
 * Created by forsa on 2016-09-23.
 */
$(function () {
    var wrapper = $("#wrapper");

    $("table.venue").bootstrapTable({
        columns: [
            {
                field: "state",
                checkbox: true
            },
            {
                field: "id",
                title: "ID",
                align: "right",
                sortable: true
            },
            {
                field: "venue_name",
                title: "教室名称",
                align: "right",
                sortable: true
            },
            {
                field: "capacity",
                title: "分类",
                align: "right",
                sortable: true
            },
            {
                field: 'operate',
                title: 'Item Operate',
                align: 'center',
                events: {
                    'click .edit': function (e, value, row, index) {
                        alert('You click like action, row: ' + JSON.stringify(row));
                    },
                    'click .remove': function (e, value, row, index) {
                        console.log(e, value, row, index);
                        // $table.bootstrapTable('remove', {
                        //     field: 'id',
                        //     values: [row.id]
                        // });
                    }
                },
                formatter: function () {
                    return $("#tpl-operate").html();
                }
            }],
        url: "/table/venues",
        toolbar: ".toolbar",
        //search: true,
        pagination: true,
        sidePagination: "server",
        queryParamsType: "",
        queryParams: function (params) {
            //console.log(this);
            var order = (params.sortOrder == "desc" ? "-" : "");
            return {
                page: params.pageNumber,
                "per-page": params.pageSize,
                sort: order + (params.sortName ? params.sortName : "id")
            };
        }
    });


    mainContentHeightAdjust();
});