/* * @security-card.vue * @deprecated * @author czh * @update (czh 2022/5/23) */
<template>
  <div class="security-card">
    <div class="security-card--head">
      <div class="security-card--decr">
        <ellipsis-copy
          :target-str="title"
          :is-ellipsis="title.length > 60 ? true : false"
          :is-show-copy-btn="false"
          :is-tooltip="true"
          styles="color: #fff;font-weight: bold;font-size: 20px;line-height: 24px;"
          font-length="60"
          end-length="0">
        </ellipsis-copy>
      </div>
      <div class="security-card--tag">
        <be-tag v-for="item in tagListArr" :key="item" :round="2">
          {{ item }}
        </be-tag>
      </div>
    </div>
    <div class="security-card--body">
      <div>
        <ellipsis-copy
          :target-str="info"
          :is-ellipsis="info.length > 250 ? true : false"
          :is-show-copy-btn="false"
          :is-tooltip="false"
          styles="color: #333333;font-size: 14px;line-height: 17px;"
          font-length="250"
          end-length="0">
        </ellipsis-copy>
      </div>
      <div class="security-card--body--foo">
        <span>
          Source:
          <a :href="sourceUrl" target="_blank">
            {{ sourceName }}
          </a>
        </span>
        <span>2 hour ago</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  // @ts-ignore
  import { BeTag } from '../../../../../public/be-ui/be-ui.es'
  export default defineComponent({
    name: 'SecurityCard',
    components: { BeTag },
    props: {
      sourceUrl: {
        type: String,
        default: 'https://wwww.baidu.com',
      },
      title: {
        type: String,
        default:
          'https://lanhuapp.com/web/#/item/project/detailDetach?pid=6fb5db57-99f4-4b7d-aeb4-ae74648f12fc&project_id=6fb5db57-99f4-4b7d-aeb4-ae74648f12fc&image_id=e195d4ba-0c06-4b59-af79-7c7be7bffcc8&fromEditor=true',
      },
      info: {
        type: String,
        default:
          '#PeckShieldAlert #phishing Peck#PeckShieldAlert #phishing PeckShield has detected sudoswap.claimeth[.]xyz is a phishing site. Do *NOT* claim $ETH! @sudoswap community share to raise awareness. Add "PeckShieldAlert" free extension to detect phishing sites or Report to us. https://t.co/7LjYgCK3gd https://t.co/gURa0lVmsO#PeckShieldAlert #phishing PeckShield has detected sudoswap.claimeth[.]xyz is a phishing site. Do *NOT* claim $ETH! @sudoswap community share to raise awareness. Add "PeckShieldAlert" free extension to detect phishing sites or Report to us. https://t.co/7LjYgCK3gd https://t.co/gURa0lVmsOShield has detected sudoswap.claimeth[.]xyz is a phishing site. Do *NOT* claim $ETH! @sudoswap community share to raise awareness. Add "PeckShieldAlert" free extension to detect phishing sites or Report to us. https://t.co/7LjYgCK3gd https://t.co/gURa0lVmsO',
      },
      create_time: {
        type: String,
        default: '',
      },
      sourceName: {
        type: String,
        default: 'twitter',
      },
      tagList: {
        type: String,
        default: 'PHISHING,ETH',
      },
    },
    setup(props) {
      const tagListArr = ref<Array<string>>([])
      tagListArr.value = props.tagList?.split(',').map(val => val.toUpperCase())
      return { tagListArr }
    },
  })
</script>

<style lang="scss">
  .security-card {
    width: 300px;
    min-height: 373px;

    .security-card--head {
      height: 160px;
      padding: 20px;
      box-sizing: border-box;
      background-image: url('../src/assets/image/pc/security-card-bg.png');
      background-repeat: round;
      .ellipsis-copy {
        word-break: break-all;
        text-align: left;
      }
      .security-card--tag {
        margin-top: 10px;
        display: flex;
      }
      .be-tag {
        margin: 5px;
        background: $mainColor3;
        border-radius: 2px;
        border: 0;
        height: 24px;
        span {
          color: $textColor3;
          font-size: 14px;
          font-family: BarlowSemi-B, sans-serif;
          font-weight: 400;
          line-height: 17px;
        }
      }
    }

    .security-card--body {
      padding: 20px;
      box-sizing: border-box;
      text-align: left;
      background-color: $mainColor7;
      border-radius: 4px;
      .security-card--body--foo {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 14px;
          font-family: BarlowSemi-B, sans-serif;
          font-weight: 400;
          color: $textColor13;
          line-height: 17px;
        }
        a {
          color: $mainColor3;
        }
      }
    }
  }
</style>
