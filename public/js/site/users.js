/**
 * Created by forsa on 2016-09-21.
 */
$(function () {
    var wrapper = $("#wrapper");

    wrapper.find("a.new-admin-modal").click(function () {
        var modal = $("#new-admin-modal");
        modal.modal("show");
        modal.find("h4").html("添加管理员");
        modal.find("form").get(0).ajaxMethod = "post";
    });

    wrapper.find("a.new-teacher-modal").click(function () {
        var modal = $("#new-teacher-modal");
        modal.modal("show");
        modal.find("h4").html("添加教师");
        modal.find("form").get(0).ajaxMethod = "post";
    });

    wrapper.find("a.new-student-modal").click(function () {
        var modal = $("#new-student-modal");
        modal.modal("show");
        modal.find("h4").html("添加学生");
        modal.find("form").get(0).ajaxMethod = "post";
    });

    wrapper.find(".modal").on("hide.bs.modal", function () {
        $(this).find("form")[0].reset();
        $(this).find(".form-group").removeClass("has-error");
        $(this).find(".help-block").html("");
    });

    wrapper.find("form").on("submit", function (e) {
        e.preventDefault();
        var modal = $(this).parents(".modal");
        var form = this;
        $.ajax({
            type: this.ajaxMethod,
            url: "/api/v1/user",
            data: $(this).serialize(),
            dataType: "json",
            success: function (row) {
                var table;
                switch (row.type) {
                    case 1:
                        table = adminTable;
                        break;
                    case 2:
                        table = teacherTable;
                        break;
                    case 3:
                        table = studentTable;
                        break;
                }
                if (form.ajaxMethod == "post") {
                    table.bootstrapTable("insertRow", {index: 0, row: row});
                } else {
                    table.bootstrapTable("updateRow", {index: form.updateIndex, row: row});
                }
                modal.modal("hide");
            },
            error: function (e) {
                console.log(e);
                modal.find(".form-group").removeClass("has-error");
                modal.find(".help-block").html("");
                if (e.status == 400 && e.responseJSON) {
                    var i;
                    var json = e.responseJSON;
                    for (i in json.errors) {
                        var input = modal.find("[name='" + i + "']");
                        input.next(".help-block").html(json.errors[i][0]);
                        input.parent().addClass("has-error");
                    }
                }
            }
        });
    });

    var config = {
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
                field: "username",
                title: "用户名",
                align: "right",
                sortable: true
            },
            {
                align: "right",
                sortable: true
            },
            {
                field: 'operate',
                title: 'Item Operate',
                align: 'center',
                events: {}
            }
        ],
        search: true,
        pagination: true,
        sidePagination: "server",
        queryParamsType: "",
        queryParams: function (params) {
            //console.log(params);
            var order = (params.sortOrder == "desc" ? "-" : "");
            var out = {
                page: params.pageNumber,
                "per-page": params.pageSize
            };
            params.sortName ? out.sort = order + params.sortName : "";
            params.searchText ? out.search = params.searchText : "";
            //console.log(out);
            return out;
        }
    };

    config.columns[3].field = "admin_name";
    config.columns[3].title = "管理员姓名";

    config.columns[4].formatter = function () {
        return $("#tpl-admin-operate").html();
    };

    config.columns[4].events["click .edit"] = function (e, value, row, index) {
        var modal = $("#new-admin-modal");
        modal.modal("show");
        modal.find("h4").html("更新管理员");
        var form = modal.find("form").get(0);
        form.ajaxMethod = "put";
        form.updateIndex = index;
        modal.find("input[name=id]").val(row.id);
        modal.find("input").each(function () {
            $(this).val(row[$(this).attr("name")]);
        });
    };

    config.columns[4].events["click .disable"] = function (e, value, row, index) {
        $.ajax({
            type: "delete",
            url: "/api/default/user",
            data: {id: row.id},
            dataType: "json",
            success: function () {
                $(e.target).parents("table.table").bootstrapTable("refresh");
            }
        });
    };

    var adminTable = $("table.admin").bootstrapTable($.extend({
        url: "/table/users?type=1",
        toolbar: ".admin-table > .toolbar"
    }, config));

    config.columns[3].field = "teacher_name";
    config.columns[3].title = "教师姓名";

    config.columns[4].formatter = function () {
        return $("#tpl-teacher-operate").html();
    };
    config.columns[4].events["click .edit"] = function (e, value, row, index) {
        var modal = $("#new-teacher-modal");
        modal.modal("show");
        modal.find("h4").html("更新教师");
        var form = modal.find("form").get(0);
        form.ajaxMethod = "put";
        form.updateIndex = index;
        modal.find("input[name=id]").val(row.id);
        modal.find("input").each(function () {
            $(this).val(row[$(this).attr("name")]);
        });
    };

    var teacherTable = $("table.teacher").bootstrapTable($.extend({
        url: "/table/users?type=2",
        toolbar: ".teacher-table > .toolbar"
    }, config));

    config.columns[3].field = "student_name";
    config.columns[3].title = "学生姓名";

    config.columns[4].formatter = function () {
        return $("#tpl-student-operate").html();
    };
    config.columns[4].events["click .edit"] = function (e, value, row, index) {
        var modal = $("#new-student-modal");
        modal.modal("show");
        modal.find("h4").html("更新学生");
        var form = modal.find("form").get(0);
        form.ajaxMethod = "put";
        form.updateIndex = index;
        modal.find("input[name=id]").val(row.id);
        modal.find("input").each(function () {
            $(this).val(row[$(this).attr("name")]);
        });
    };

    var studentTable = $("table.student").bootstrapTable($.extend({
        url: "/table/users?type=3",
        toolbar: ".student-table > .toolbar"
    }, config));

    wrapper.find("a[data-toggle=tab]").click(function () {
        wrapper.find(".tab-pane").removeClass("active")
            .eq($(this).parent().index()).addClass("active");
    });

    mainContentHeightAdjust();
});