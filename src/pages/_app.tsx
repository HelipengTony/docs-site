/*
  页面主要入口
*/
import { AppProps } from "next/app";

// 引入全局组件
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import RightSide from "./components/rightside";
import Footer from "./components/footer";

// 引入全局样式
import "../style/main.scss";
import "github-markdown-css";

// Nprogress 进度条引入与配置
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
  easing: "ease-in-out",
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.2,
});
// React Router 引入以配置进度条
import Router from "next/router";
// React Router 配置加载进度条
Router.events.on("routeChangeStart", () => {
  NProgress.inc();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

// 引入 Zeit-UI React
import { ZeitProvider, CssBaseline } from "@zeit-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ZeitProvider>
      <CssBaseline />
      <Header />
      <div className="main markdown-body">
        <Sidebar />
        <div className="view">
          <div className="center">
            <div className="content">
              <Component {...pageProps} />
            </div>
            <div className="aside">
              <RightSide />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </ZeitProvider>
  );
}

export default MyApp;
