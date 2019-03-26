import React from 'react'
import { storiesOf } from '@storybook/react'
import MiniEditor from '../src/index.js'

storiesOf('Mini Editor', module)
  .add('default', () => {

    const content = ` <p>大象不会席地而坐。</p><p>不少人希望从<span>腾讯的财报</span>里看到这头大象扭转屁股时肥胖笨拙的样子，因为这是腾讯于去年9月30日宣布架构大调整、To B后发出的首份年报，意义重大。</p><p>当腾讯3月21日公布了其2018年度第四季度财报与全年业绩后，由于其第四季度净利润下滑巨大，同比下滑了32%，因此有不少媒体将其解读为“一份令人不安的财报”、&nbsp;“腾讯史上最差财报”……<a href="https://www.huxiu.com/article/290251.html" target="_blank">虎嗅给腾讯算了一下</a>，<strong>这是13年来腾讯季报首次出现净利润剧烈下滑的情况——上一次净利润下滑，还要追溯到2005年第三季度。</strong></p><p>营收“大模样”</p><p>2018年，腾讯总收入3126.9亿元、同比增长31.5%，这是腾讯营收首次突破3000亿。EBITDA（息税摊销前利润）达1104亿、同比增长23%，年度净利润799.8亿、同比增长10.4%。</p><p><br/></p><p>过往五年，腾讯营收<i>从2014年的789亿增至201</i>8年的3127亿，年均复合增长率为38.9%。</p><p class="img-center-box"><img src="http://img.hb.aicdn.com/714efc276a983632dbb973e59dfe46bf42551deb10a84d-fhQInK_fw658" data-w="1000" data-h="579" res-id='sdfdjowie' class='res-image'/></p>`

    return <MiniEditor value={content} onChange={(text) => console.log(text)} />
  })
