var myChart = echarts.init(document.getElementById('allmap'));

var geoCoorddata = {
        '武汉': [114.30539299999998, 30.593099],
        '深圳': [114.05786499999999, 22.543096],
        '北京': [116.3883, 39.9289],
        '阿克苏': [80.26338699999997, 41.167548]
    },

    mapStyle = {
        styleJson: [{
            'featureType': 'land', //调整土地颜色
            'elementType': 'geometry',
            'stylers': {
                'color': '#081734'
            }
        }, {
            'featureType': 'building', //调整建筑物颜色
            'elementType': 'geometry',
            'stylers': {
                'color': '#04406F'
            }
        }, {
            'featureType': 'building', //调整建筑物标签是否可视
            'elementType': 'labels',
            'stylers': {
                'visibility': 'off'
            }
        }, {
            'featureType': 'highway', //调整高速道路颜色
            'elementType': 'geometry',
            'stylers': {
                'color': '#015B99'
            }
        }, {
            'featureType': 'highway', //调整高速名字是否可视
            'elementType': 'labels',
            'stylers': {
                'visibility': 'off'
            }
        }, {
            'featureType': 'arterial', //调整一些干道颜色
            'elementType': 'geometry',
            'stylers': {
                'color': '#003051'
            }
        }, {
            'featureType': 'arterial',
            'elementType': 'labels',
            'stylers': {
                'visibility': 'off'
            }
        }, {
            'featureType': 'green',
            'elementType': 'geometry',
            'stylers': {
                'visibility': 'off'
            }
        }, {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': {
                'color': '#044161'
            }
        }, {
            'featureType': 'subway', //调整地铁颜色
            'elementType': 'geometry.stroke',
            'stylers': {
                'color': '#003051'
            }
        }, {
            'featureType': 'subway',
            'elementType': 'labels',
            'stylers': {
                'visibility': 'off'
            }
        }, {
            'featureType': 'railway',
            'elementType': 'geometry',
            'stylers': {
                'visibility': 'off'
            }
        }, {
            'featureType': 'railway',
            'elementType': 'labels',
            'stylers': {
                'visibility': 'off'
            }
        }, {
            'featureType': 'all', //调整所有的标签的边缘颜色
            'elementType': 'labels.text.stroke',
            'stylers': {
                'color': '#313131'
            }
        }, {
            'featureType': 'all', //调整所有标签的填充颜色
            'elementType': 'labels.text.fill',
            'stylers': {
                'color': '#FFFFFF'
            }
        }, {
            'featureType': 'manmade',
            'elementType': 'geometry',
            'stylers': {
                'visibility': 'off'
            }
        }, {
            'featureType': 'manmade',
            'elementType': 'labels',
            'stylers': {
                'visibility': 'off'
            }
        }, {
            'featureType': 'local',
            'elementType': 'geometry',
            'stylers': {
                'visibility': 'off'
            }
        }, {
            'featureType': 'local',
            'elementType': 'labels',
            'stylers': {
                'visibility': 'off'
            }
        }, {
            'featureType': 'subway',
            'elementType': 'geometry',
            'stylers': {
                'lightness': -65
            }
        }, {
            'featureType': 'railway',
            'elementType': 'all',
            'stylers': {
                'lightness': -40
            }
        }, {
            'featureType': 'boundary',
            'elementType': 'geometry',
            'stylers': {
                'color': '#8b8787',
                'weight': '1',
                'lightness': -29
            }
        }]
    },

    series = [],

    option = {
        bmap: {
            center: [110, 34.76],
            zoom: 5,
            roam: true,
            mapStyle: mapStyle
        },

        series: series
    };
myChart.setOption(option);

$(function() {
    setInterval(function() {
        getMapData();
        getTableData();
    }, 5000)

});

function getMapData() {
    $.ajax({
        url: '',
        type: "POST",
        dataType: 'json',
        data: '',
        beforeSend: function(xhr) {
            //可做校验
        },
        success: function(data) {
            series = eval('(' + data.value + ')')
            myChart.setOption({ series: series });
        },
        error: function(e) {}
    });
}
var flag = true;

function getTableData() {
    $.ajax({
        url: '',
        type: "POST",
        dataType: 'json',
        data: '',
        beforeSend: function(xhr) {
            //可做校验
        },
        success: function(data) {
            var finders = data.finders;

            clearData('finders');
            $(finders).each(function(index, item) {
                insertNum('finders', item.name, item.value);
            });


            var targets = data.targets;
            clearData('targets');
            $(targets).each(function(index, item) {
                insertNum('targets', item.name, item.value);
            });


            var vulTypes = data.vulTypes;
            clearData('vulTypes');
            $(vulTypes).each(function(index, item) {
                insertNum('vulTypes', item.name, item.value);
            });

            var vulDetails = data.vulDetails;
            clearData('vulDetails');
            $(vulDetails).each(function(index, item) {
                insertDetail('vulDetails', item.name, item.value, item.url);
            });
            if (flag) {
                jQuery(".txtMarquee-top").slide({ mainCell: ".bd ul", autoPlay: true, effect: "topMarquee", vis: 6, interTime: 200, trigger: "click" });
            }
            flag = false;
        },
        error: function(e) {}
    });
}

function insertNum(ulName, name, value) {
    var li = document.createElement("li");
    li.innerHTML = "<span class='date' style='overflow:hidden;text-overflow: ellipsis;white-space: nowrap;'>" + name + "</span><a href = 'javascript:void(0);' terget ='_blank'  style='overflow:hidden;text-overflow: ellipsis;white-space: nowrap;'>" + value + "</a>";
    $('#' + ulName + '').append(li);
}

function insertDetail(ulName, name, value, url) {
    var li = document.createElement("li");
    li.innerHTML = "<span class='date' style='overflow:hidden;text-overflow: ellipsis;white-space: nowrap;'>" + name + "</span><span class='date date_right' style='color: red;' style='overflow:hidden;text-overflow: ellipsis;white-space: nowrap;'>" + value + "</span><a href = 'javascript:void(0);' terget ='_blank'  style='overflow:hidden;text-overflow: ellipsis;white-space: nowrap;'>" + url + "</a>";
    $('#' + ulName + '').append(li);
}

function clearData(ulName) {
    $('#' + ulName + '').html('');
}