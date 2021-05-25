var app = app || {};

(function () {
    app.mUtils = app.mUtils || {};
    app.mUtils = {
        /**
         * Lấy dữ liệu bằng ajax
         *
         */
        fnGETAjax: function (url, fnSuccess, fnComplete, fnError) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: url,
                success: function (responseData) {
                    if (fnSuccess) fnSuccess(responseData);
                },
                complete: function () {
                    if (fnComplete) fnComplete();
                },
                error: function (exx) {
                    console.log(exx);
                    if (fnError) fnError(exx);
                },
            }).done(function (response) {
                return response
            });
        },

        /**
       * Lấy dữ liệu bằng ajax v2
       *
       */
        fnGETAjaxV2: function (url, fnSuccess, fnComplete, fnError) {
            return $.ajax({
                type: "GET",
                dataType: "json",
                url: url,
                success: function (responseData) {
                    if (fnSuccess) fnSuccess(responseData);
                },
                complete: function () {
                    if (fnComplete) fnComplete();
                },
                error: function (exx) {
                    console.log(exx);
                    if (fnError) fnError(exx);
                },
            }).done(function (response) {
                return response
            });
        },

        /**
         * Xoá dữ liệu bằng ajax
         *
         */
        fnDELETEAjax: function (url, fnSuccess, fnComplete, fnError) {
            $.ajax({
                type: "DELETE",
                dataType: "json",
                url: url,
                success: function (responseData) {
                    if (fnSuccess) fnSuccess(responseData);
                },
                complete: function () { },
                error: function (exx) {
                    console.log(exx);
                },
            });
        },
        /**
         * Sửa dữ liệu bằng ajax
         *
         */
        fnPUTAjax: function (url, data, fnSuccess, fnComplete, fnError) {
            $.ajax({
                type: "PUT",
                url: url,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (responseData) {
                    if (fnSuccess) fnSuccess(responseData);
                },
                complete: function () {
                    if (fnComplete) fnComplete();
                },
                error: function (exx) {
                    console.log(exx);
                    if (fnError) fnError(exx);
                },
            });
        },
        /**
         * Thêm dữ liệu bằng ajax
         *
         */
        fnPOSTAjax: function (url, data, fnSuccess, fnComplete, fnError) {
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (responseData) {
                    if (fnSuccess) fnSuccess(responseData);
                },
                complete: function () {
                    if (fnComplete) fnComplete();
                },
                error: function (exx) {
                    console.log(exx);
                    if (fnError) fnError(exx);
                },
            });
        },
        /**
         * 
         * @param {any} source
         */
        deepCloneStore: function (source) {
            source = Ext.isString(source) ? Ext.data.StoreManager.lookup(source) : source;

            var target = Ext.create(source.$className, {
                model: source.model,
            });

            target.add(Ext.Array.map(source.getRange(), function (record) {
                return record.clone();
            }));
            return target;
        },
        /**
         * Format tiền tệ
         *
         */
        fnFormatCurrency: function (nStr, subLength) {
            nStr += "";
            var x = nStr.split(".");
            var x1 = x[0];
            var x2 = "";
            if (subLength > 0)
                x2 = x.length > 1 ? "," + x[1].substring(0, subLength) : "";
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, "$1" + "." + "$2");
            }
            return x1 + x2;
        },
        /**
         * Format Ngày tháng
         *
         */
        fnFormatDob: function (dateInput) {
            var date = new Date(dateInput);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            dt = date.getDate();

            if (dt < 10) {
                dt = "0" + dt;
            }
            if (month < 10) {
                month = "0" + month;
            }
            return dt + "-" + month + "-" + year;
        },
        /**
         * Format Ngày tháng để bind data vao input
         *
         */
        fnFormatDate2: function (dateInput) {
            var date = new Date(dateInput);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            dt = date.getDate();

            if (dt < 10) {
                dt = "0" + dt;
            }
            if (month < 10) {
                month = "0" + month;
            }
            return year + "-" + month + "-" + dt;
        },
        /**
         * kiểm tra dữ liệu có phải là ngày hay không
         *
         */
        isDate: function (date) {
            var parsedDate = Date.parse(date);
            if (!isNaN(parsedDate)) {
                return true;
            }
            return false;
        },

        /**
         * bind data từ table vào form modal
         * createBy: ntquan
         * @param urlInp:url get detail.ex:'https://api/getDetail/code='
         * @param index: get detail theo cột nào trong table
         * @param id:id table
         * @param idModal:id Modal để hiển thi
         * note: thêm param data dể lấy data trả về
         */

        bindDataTable: function (urlInp, index, id, idModal, callback) {
            $(document).on("dblclick", `#${id} tr`, function () {
                var objKey = [];
                var lstDataTR = [];
                $(this)
                    .find("td")
                    .each(function () {
                        lstDataTR.push($(this).html());
                    });
                var url = `${urlInp}${lstDataTR[index]}`;
                app.mUtils.fnGETAjax(url, function (response) {
                    objKey = Object.keys(response.Data[0]);
                    let data = response.Data[0];
                    $(`#${idModal}`).removeClass("dialog-hide");
                    $.each(objKey, function (index, item) {
                        app.mUtils.checkExistAttr(item, data[item]);
                    });
                    if (typeof callback == "function") callback(response);
                });
            });
        },
        /**
         * Kiểm tra nếu có thuộc tính data-bind thì bind dữ liệu tương ứng vào
         * CreateBy: ntquan
         */
        checkExistAttr: function (name, value) {
            var data = $(".dialog-body").find(`[data-bind=${name}]`);
            if (data.length != 0) {
                //nếu dữ liệu là ngày tháng
                if (data.attr("type") == "date") {
                    data.val(app.mUtils.fnFormatDate2(value));
                } else {
                    //check is radio
                    if (data.attr("type") == 'radio') {
                        console.log(data.attr("type"));
                        //$(`input:radio[data-bind=${name}]`).val([0]);
                        var $radios = $(`input:radio[data-bind=${name}]`);
                        console.log(data.prop("tagName"));
                        $(`input:radio[data-bind=${name}]`).prop("checked", false);
                        if ($radios.is(":checked") === false) {
                            $radios.filter(`[value=${value}]`).prop("checked", true);
                        }
                    } else if (data.attr("type") == 'checkbox') {
                        console.log('checkbox');
                    } else if (data.prop("tagName") == 'IMG') {
                        data.attr('src', value)
                    }
                    else data.val(value);
                }
                return true;
            } else return false;
        },
        /**
         * Hiển thị popup báo lỗi validate
         * CreateBy: ntquan
         */
        displayPopupErr: function (tgs, msg) {
            $(".err").removeClass("msgValid");
            var top = $(`${tgs}`).position().top;
            var left = $(`${tgs}`).position().left;
            var leftErr = left + ($(`${tgs}`).width() / 2 - 65);
            $(".err").addClass("msgValid");
            setTimeout(function () {
                $(".msgValid").html("");
                $(".err").removeClass("msgValid");
            }, 1000);
            $(".msgValid").css({ top: top - 27, left: leftErr });
            $(".msgValid").html(`${msg}`);
            return;
        },

        /**
         * Validate email
         *
         */
        validateEmail: function (email) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        getUrlVars: function () {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },

        fnBuildQueryString: function (query) {
            const params = new URLSearchParams(query);
            return params.toString();
        },
        /* getUserName: function () {
             var userName = "";
             //app.mUtils.fnPOSTAjax("https://localhost:44390/api/User/authenticate", obj, function (response) {
             app.mUtils.fnGETAjax("https://localhost:44356/getCurrentUserLogged", function (response) {
                 app.session = response;
                     console.log(response)
                 })
 
         }*/
    };
})();


(function () {
    app.session = app.session || {}
    app.mUtils.fnGETAjax("https://localhost:44356/getCurrentUserLogged", function (response) {
        console.log(response)
        //sessionStorage.clear();
        if (sessionStorage.getItem("session") === null) {
            //...
            sessionStorage.setItem("session", JSON.stringify(response));
        }
        app.session = JSON.parse(sessionStorage.getItem("session"));
        app.session.isAdmin = app.session.role == 'Admin' ? true : false
        //app.session = response;
        return response;
    })
    console.log(1);
})();
