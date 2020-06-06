import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        console.log('footer 组件 rendering');
        return (
            <div id="footer">
                <div className="inner home-inner">
                    <div className="footer-social">
                <img src="https://static.zhipin.com/v2/web/geek/images/footer-logo.png" alt=""/>
                <p>企业服务热线和举报投诉 <span>400 065 5799</span></p>
                <p>工作日 <span>8:00 - 22:00</span></p>
                <p>休息日 <span>9:30 - 18:30</span></p>
                <p className="footer-icon">
                    <a href="http://www.weibo.com/bosszhipin" target="_blank" className="icon-weibo"><span>官方微博</span></a>
                    <a href="#!" className="icon-weixin"><span>微信公众号</span><img src="https://static.zhipin.com/v2/web/geek/images/we_chat_qr.jpg" className="qrcode-weixin"/></a>
                    <a href="https://app.zhipin.com" className="icon-app" ka="link-downloadapp"><span>下载</span></a>
                </p>
            </div>
            <div className="footer-about clear-fix">
            <dl>
                <dt>企业服务</dt>
                <dd>
                    <a href="https://www.zhipin.com/job_detail/" ka="link-search">职位搜索</a>
                    <a href="https://news.zhipin.com/" ka="link-news">新闻资讯</a>
                    <a href="https://app.zhipin.com/" ka="link-app">BOSS直聘APP</a>
                </dd>
            </dl>
            <dl>
                <dt>使用与帮助</dt>
                <dd>
                    <a href="https://www.zhipin.com/activity/cc/registerprotocol.html" ka="link-privacy" target="_blank">用户协议与隐私政策</a>
                    <a href="https://www.zhipin.com/activity/cc/anticheatguide.html" ka="link-anticheatguide" target="_blank">防骗指南</a>
                    <a href="https://www.zhipin.com/activity/cc/postrules.html" ka="link-postrules" target="_blank">职位发布规则</a>
                    <a href="https://www.zhipin.com/activity/cc/usehelp.html" ka="link-usehelp" target="_blank">使用帮助</a>
                </dd>
            </dl>
            <dl>
                <dt>联系BOSS直聘</dt>
                <dd>
                    <p>北京华品博睿网络技术有限公司</p>
                    <p>公司地址 北京市朝阳区太阳宫中路8号冠捷大厦302</p>
                    <p>联系电话 010-84150633</p>
                    <p>违法和不良信息举报邮箱 <a className="report-mail" href="mailto:jubao@kanzhun.com">jubao@kanzhun.com</a></p>
                </dd>
            </dl>
        </div>
        <div className="copyright">
            <p>
                <span>Copyright © 2020 BOSS直聘</span><span>京ICP备14013441号-5</span><span>京ICP证150923号</span><span>京网文[2020]0399-066 号</span>
                <span>
                     <a href="https://www.zhipin.com/activity/cc/businesslicense.html" ka="link-businesslicense" target="_blank">
                         <img src="https://static.zhipin.com/v2/web/geek/images/icon-badge-1.png" alt=""/>
                         电子营业执照
                     </a>
                 </span>
                <span><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502032801" ka="link-beian" target="_blank"><img src="https://static.zhipin.com/v2/web/geek/images/icon-beian.png" alt=""/> 京公网安备11010502032801</a></span>
                <span><a href="http://sdwj.zhipin.com/web/index.html" ka="link-sdwj" target="_blank">首都网警</a></span>
                <span><a href="/web/common/protocol/hr-service.html" ka="link-hr-service" target="_blank">人力资源服务许可证</a></span>
            </p>
        </div>
                </div>
            </div>
        )
    }
}
