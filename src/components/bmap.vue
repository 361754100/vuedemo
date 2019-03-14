<template>
  <div id="allmap"></div>
</template>

<script>
    export default {
        name: "bmap",
        props:{
          // // 地图在该视图上的高度
          // mapHeight:{
          //   type:Number,
          //   default:500
          // },
          // 经度
          longitude:{
            type:Number,
            default:116.404
          },
          // 纬度
          latitude:{
            type:Number,
            default:39.915
          },
          description:{
            type:String,
            default:'天安门'
          }
        },
        mounted: function() {
          // 百度地图API功能
          var map = new BMap.Map("allmap");    // 创建Map实例

          var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
          var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件

          map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
          //添加地图类型控件
          map.addControl(new BMap.MapTypeControl({
            mapTypes: [
              BMAP_NORMAL_MAP,
              BMAP_HYBRID_MAP
            ]
          }));
          map.addControl(top_left_control);
          map.addControl(top_left_navigation);
          map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
          map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        }
    }
</script>

<style scoped>
  #allmap {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height:85vh;
    margin:0;
    font-family:"微软雅黑";
  }
</style>
