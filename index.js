/*
 * @Author: chunxiao
 * @Github: https://github.com/chunxiao01
 * @Version: V-0.0.1
 * @License: MIT
 * @Date: 2021-10-13 17:40:00
 * @LastEditTime: 2021-10-13 20:38:07
 * @LastEditors: chunxiao
 * @Description:
 */
const express = require("express")
const cors = require("cors")

const app = express()
const request = require("request")

//跨域
app.use(cors())
//url键值对
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//bilibili 热门视频
app.get("/api/bilibili_hot", (req, res) => {
  const { ps, pn } = req.query
  const bilibili_api = request(
    {
      //url: "http://api.bilibili.com/x/web-interface/ranking/region?rid=21",
      url: "https://api.bilibili.com/x/web-interface/popular",
      method: "GET",
      qs: {
        ps, //每页数量
        pn //页数
      },
      headers: { "Content-Type": "text/json;charset=utf-8" }
    },
    (err, response, body) => {
      if (!err && response.statusCode === 200) {
        // console.log(body)
        res.json(JSON.parse(body))
      } else {
        console.log(err)
        console.log(response)
      }
    }
  )
})

//bilibili 视频信息和相关视频
app.get("/api/bilibili_detail_related", (req, res) => {
  const { aid, bvid, recommend_type, need_rcmd_reason } = req.query
  const bilibili_api = request(
    {
      url: "https://api.bilibili.com/x/web-interface/view/detail",
      method: "GET",
      qs: {
        aid, //aid
        bvid, //bvid
        recommend_type,
        need_rcmd_reason
      },
      headers: { "Content-Type": "text/json;charset=utf-8" }
    },
    (err, response, body) => {
      if (!err && response.statusCode === 200) {
        // console.log(body)
        res.json(JSON.parse(body))
      } else {
        console.log(err)
        console.log(response)
      }
    }
  )
})

//bilibili 视频评论
app.get("/api/bilibili_reply", (req, res) => {
  const { type, oid, sort, ps, pn } = req.query
  const bilibili_api = request(
    {
      url: "https://api.bilibili.com/x/v2/reply",
      method: "GET",
      qs: {
        type, //默认为1,视频类型
        oid, //aid
        sort, //排序，默认为0, 0：按时间 1：按点赞数 2：按回复数
        ps, //每页数量
        pn //页数
      },
      headers: { "Content-Type": "text/json;charset=utf-8" }
    },
    (err, response, body) => {
      if (!err && response.statusCode === 200) {
        // console.log(body)
        res.json(JSON.parse(body))
      } else {
        console.log(err)
        console.log(response)
      }
    }
  )
})

app.listen(8000, () => {
  console.log("-----服务器启动了-----")
  console.log("服务器数据接口api:http://127.0.0.1:8000/api")
})
