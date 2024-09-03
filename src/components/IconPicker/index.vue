<!--IconPickder-->
<template>
    <div class="IconPickder">
      <el-popover width="600" trigger="click">
        <div style="max-height:400px;overflow-y: scroll;overflow-x:hidden">
          <el-button
            plain
            v-for="(item,index) in iconList"
            :key="index"
            style="margin:2px;"
            @click="iconName=item"
          >
            <eIcon :iconName="item"></eIcon>
          </el-button>
        </div>
   
        <el-button slot="reference">
          <span v-if="iconName==''">请选择图标</span>
          <span v-else>
            <eIcon :iconName="iconName"></eIcon>
          </span>
        </el-button>
      </el-popover>
      <el-button type="text" v-show="iconName!==''" @click="iconName=''" style="margin-left:5px">清空</el-button>
    </div>
  </template>
   
  <script>
  import eIcon from "./eIcon";
  export default {
    name: "IconPicker",
   
    components: { eIcon },
    props: {
      icon: String
    },
   
    data() {
      return {
        iconName: this.icon,
        iconList: [
          "el-icon-platform-eleme",
          "el-icon-eleme",
          "el-icon-delete-solid",
          "el-icon-delete",
          "dashboard",
          "eye"
        ]
      };
    },
    mounted() {
        // console.log('这个是图标',this.$svgIcons)
        // console.log('这个是图标',this.$elementIcons)
      this.iconList = [...this.$svgIcons, ...this.$elementIcons];
    },
    watch: {
      icon: {
        handler: function(newValue) {
          this.iconName = newValue;
        }
      },
      iconName: {
        handler: function(value) {
          this.$emit("iconName", value);
        }
      }
    }
  };
  </script>