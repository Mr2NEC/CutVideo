window.onload = function() {
    VivatTVdirect();

}

function VivatTVdirect() {
    var par;
    var regisr = {};
    var chanel = {};
    par = encodeURIComponent(JSON.stringify(authorization));

    $.ajax({
        method: 'GET',
        url: "http://193.30.240.2/portal/ajax/get_data.php?par=" + par,
        success: function(parscode) {
            response = JSON.parse(parscode);
            regisr = {
                datamode: "getDevParams",
                sn: authorization.sn,
                mac: authorization.mac,
                devtype: '',
                authMode: response.authMode,
                STBId: response.devID,
                Login: response.authLogin,
                Password: response.authPassword,
                loginSave: response.loginSave,
                unLogOldDev: 1
            }

            var par2 = encodeURIComponent(JSON.stringify(regisr));
            $.ajax({
                method: 'GET',
                url: "http://193.30.240.2/portal/ajax/get_data.php?par=" + par2,
                success: function(parscode) {
                    devSetting = JSON.parse(parscode);
                }

            });
            var par3 = encodeURIComponent(JSON.stringify(chanel));

            chanel = {
                groupId: '0',
                sn: authorization.sn,
                mac: authorization.mac,
                STBId: response.devID
            }
            $.ajax({
                method: 'GET',
                url: "http://193.30.240.2/portal/ajax/get_chanel_list_json.php?groupid=" + par3,
                success: function(parscode) {
                    var chanelList = JSON.parse(parscode);
                    addChaneltoSelect(chanelList.chanel_list);
                    object = chanelList.chanel_list;
                }

            });
        }

    })

}

function addChaneltoSelect(List) {
    for (var i = 0; List.length > i; i++) {
        // var chanelName = List[i].chanel_name;
        if (List[i].tvarc_id != null) {
            $('#chanelSelect').append($('<option>', {
                value: i,
                text: List[i].chanel_name
            }));
        }
    }
    $('#chanelSelect').change(onchangeSelect);
}

function onchangeSelect() {
    var e = $('#chanelSelect').val();
    var chanelIdE = object[e].chanel_id;

    var dateTime = new Date();
    var timestamp = Math.floor(dateTime / 1000);
    var chanelTimestamp = timestamp;

    var chanelEPG = {
        chID: chanelIdE,
        stb_time: chanelTimestamp,
        STBId: response.devID,
        cntPrg: '100',
        corr_epg_time: object[e].corr_epg_time
    }

    $.ajax({
        method: 'GET',
        url: "http://193.30.240.2/portal/ajax/get_EPG_For_Curr_Ch.php?" + "chID=" + chanelEPG.chID + "&stb_time=" + chanelEPG.stb_time + "&STBId=" + chanelEPG.STBId + "&cntPrg=" + chanelEPG.cntPrg + "&corr_epg_time=" + chanelEPG.corr_epg_time,
        success: function(parscode) {
            var Epgchanel = JSON.parse(parscode);
            qqq(Epgchanel);

            function qqq() {
                for (var i = 0; Epgchanel.length > i; i++) {
                    if (Epgchanel[i]) {
                        $('#chanelEPG').append($('<option>', {
                            value: i,
                            text: Epgchanel[i].chEPGName
                        }));

                    }
                }
            }
        }
    });

}