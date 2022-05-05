import React from "react";

function About() {
  return (
    <div className="mx-auto grid max-w-2xl place-content-center gap-y-4 py-6">
      <div className="border-b">
        <h2 className="text-xl font-bold text-white">專案簡介</h2>
        <p className="py-3.5">
          撰寫 Vue 已有幾年的開發經驗，因應不同框架的學習，此作品採用
          React、GraphQL 實作一個具有登入、註冊的功能，並搭配 Websocket
          建立一個即時聊天室。
        </p>
      </div>

      <div className="border-b">
        <h2 className="text-xl font-bold text-white">採用技術 | 套件</h2>
        <div className="py-3.5">
          -前端-
          <ol
            className="ml-5 flex flex-col gap-y-2"
            style={{ listStyle: "decimal" }}
          >
            <li>
              實作語言 | 框架
              <p>React、React-Dom、React-Router-Dom、Typescript</p>
            </li>
            <li>
              全域管理
              <p>Zustand</p>
            </li>
            <li>
              CSS
              <p>Tailwind、Daisyui</p>
            </li>
            <li>
              打包工具
              <p>Vite</p>
            </li>
            <li>
              API 相關
              <p>GraghQL、GraqlQL-Ws、Apollo/Client</p>
            </li>
          </ol>
        </div>

        <div className="py-3.5">
          -後端-
          <ol
            className="ml-5 flex flex-col gap-y-2"
            style={{ listStyle: "decimal" }}
          >
            <li>
              實作語言 | 框架
              <p>
                Javascript、Express、GraphQL / GraphQL-Ws /
                GraphQL-Subscriptions、Apollo-Server、Prisma
              </p>
            </li>
            <li>
              資料庫
              <p>MySQL、</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

About.propTypes = {};

export default About;
