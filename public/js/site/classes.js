/**
 * Created by forsa on 2016-09-23.
 */
$(function () {
    var wrapper = $("#wrapper");

    $("table.classe").bootstrapTable({
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
                field: "classe_name",
                title: "班级名称",
                align: "right",
                sortable: true
            },
            {
                field: "studentCount",
                title: "学生数",
                align: "right",
                sortable: true
            },
            {
                field: "courseCount",
                title: "课程数",
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
        url: "/table/classes",
        toolbar: ".classes-table > .toolbar",
        //search: true,
        pagination: true,
        sidePagination: "server",
        detailView: true,
        detailFormatter: function (index, row, element) {
            var el = $($("#tpl-detail").html());
            setTimeout(function () {
                new Vue({
                    el: el.get(0),
                    data: {
                        students: row.students,
                        courses: row.courses
                    }
                });
            }, 0);
            return el;
        },
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