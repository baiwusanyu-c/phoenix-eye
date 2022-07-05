/* * @disclaimer-page.vue * @deprecated * @author czh * @update (czh 2022/6/27) */
<template>
  <div class="disclaimer-page eagle-page">
    <div class="disclaimer-page-main">
      <h2>Disclaimers</h2>
      <p>
        1.Any content displayed by Beosin-EagleEye only represents the objective factual data of the
        DAPPs and does not represent any investment advice and should not be used as investment
        advice of any kind. We aims to discover security risks and make the blockchain ecosystem
        safer.
      </p>
      <p>
        2.The Assessment Report issued by Beosin is related to the services agreed in the relevant
        service agreement, and the served party can only use it within the conditions and scope
        agreed in the service agreement. Without the prior written consent of Beosin, no one shall
        transmit, disclose, quote or rely on the Assessment Report for any purpose.
      </p>
      <p>
        3.The Assessment Report issued by Beosin is only made for the code, and any description,
        expression or wording in it shall not be interpreted as affirmation or confirmation of the
        project, nor provide any guarantee or guarantee for the absolute flawlessness of the
        analyzed code, nor provide any explanation for the code owner, business, business model or
        legal compliance.
      </p>
      <p>
        4.The Assessment Report issued by Beosin is only based on the code provided by the service
        party to Beosin and the technology currently mastered by Beosin. However, due to the
        technical limitations of any organization, and if the code provided by the service party is
        lack of information, tampered with, deleted, hidden or changed later, the Assessment Report
        made by Beosin still has the possibility of not listing all risks completely.
      </p>
      <p>
        5.The appraisal report issued by Beosin will never provide investment suggestions for any
        project, nor should it be used as investment suggestions of any type. This report represents
        an extensive evaluation process designed to help our customers improve code quality while
        reducing the high risks posed by blockchain technology.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'DisclaimerPage',
    setup() {
      return {}
    },
  })
</script>

<style lang="scss">
  .disclaimer-page {
    min-height: calc(100% - 100px);
    .disclaimer-page-main {
      padding: 32px 176px;
      @include common-container(0px);
      background-color: $mainColor7;
      box-sizing: border-box;
      height: 678px;
      margin-top: 40px;
      h2 {
        font-size: 32px;
        font-family: BarlowSemi-B, sans-serif;
        font-weight: bold;
        color: $textColor3;
        line-height: 40px;
        text-align: center;
      }
      p {
        font-size: 16px;
        font-family: BarlowSemi-R, sans-serif;
        font-weight: 400;
        color: $textColor3;
        line-height: 26px;
        margin: 20px 0;
      }
    }
  }
</style>
