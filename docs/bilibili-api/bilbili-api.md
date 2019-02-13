# bilibili api 

> 内容基于抓包推测，仅供参考, 并无唯一确定性。



## 索引

**目录:**

+ [X0 通用代码]()
+ [X1 获取排行榜]()
+ [X2 全站搜索]()
+ [X3 获取视频信息]()
+ [X4 获取作品评价]()
+ [X5 获取用户信息]()



version:  0.0.1;

update:  2019-01-06;





## X0 通用代码

### response.date.code

| code |            说明            |
| :--: | :------------------------: |
|  0   |          正确返回          |
|  -1  |  应用程序不存在或已被封禁  |
|  -2  |       Access key错误       |
|  -3  |      API校验密匙错误       |
| -101 |         帐号未登陆         |
| -102 |         帐号被封停         |
| -103 |          积分不足          |
| -104 |          硬币不足          |
| -105 |         验证码错误         |
| -106 |         帐号未激活         |
| -107 |  帐号非正式会员或在适应期  |
| -108 | 应用沒有存取相应功能的权限 |
| -400 |          请求有误          |
| -403 |          权限不足          |
| -404 |         文档不存在         |
| -500 |       服务器内部错误       |
| -503 |        调用速度过快        |

type（隶属分区）

| typeid | 描述     |
| ------ | -------- |
| 1      | -        |
| 2      | -        |
| 3      | -        |
| 4      | -        |
| 5      | -        |
| 6      | -        |
| 7      | -        |
| 8      | -        |
| 9      | -        |
| 10     | -        |
| 11     | -        |
| 12     | -        |
| 13     | -        |
| 14     | -        |
| 15     | -        |
| 16     | -        |
| 17     | 单机游戏 |
| 18     | -        |
| 19     | -        |
| 20     | -        |





## X1 获取排行榜

 ### Request

>先获取spm_id_from再访问排行榜api

```json
{
	URL: "https://api.bilibili.com/x/web-interface/ranking",
	Method: "GET",
    Headers:{
    	Referer: "https://www.bilibili.com/ranking?spm_id_from=$spm_id_from"
	}
}
```

| 参数     | 是否必须 | 值参考   | 描述                    |
| -------- | -------- | -------- | ----------------------- |
| jsonp    | false    | jsonp    | -                       |
| rid      | false    | 0        | -                       |
| day      | false    | 3 \|\| 7 | 几日排行(默认=3)        |
| type     | true     | 1        | 参考分区类型（1为全站） |
| arc_type | false    | 0        | -                       |
| callback | false    | __jp0    | -                       |



### Response

```json
{
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "note": "统计所有投稿在 2019年02月03日 - 2019年02月06日 的数据综合得分，每日更新一次",
        "list": [
            {
                "aid": "36570401",
                "author": "哔哩哔哩弹幕网",
                "coins": 1118069,
                "duration": "241:09",
                "mid": 8047632,
                "pic": "http://i0.hdslb.com/bfs/archive/xxxx.jpg",
                "play": 15484448,
                "pts": 21177150,
                "title": "【哔哩哔哩2019拜年祭】",
                "trend": null,
                "video_review": 808091,
                "rights": {
                    "bp": 0,
                    "elec": 0,
                    "download": 0,
                    "movie": 0,
                    "pay": 0,
                    "hd5": 1,
                    "no_reprint": 0,
                    "autoplay": 1,
                    "ugc_pay": 0,
                    "is_cooperation": 0
                }
            }]
```



## X2 全站搜索

### Request

```json
{
    URL: "https://api.bilibili.com/x/web-interface/search/all",
	Method: "GET",
	Headers:{
    	Referer: "https://www.bilibili.com/ranking?spm_id_from=$spm_id_from"
	}
}
```

| 参数        | 是否必须 | 值参考                             | 描述       |
| ----------- | -------- | ---------------------------------- | ---------- |
| jsonp       | false    | jsonp                              | -          |
| highlight   | false    | 1                                  | -          |
| keyword     | true     |                                    | 搜索关键词 |
| search_type | false    | video \|\| bili_user \|\| live ... | 搜索类型   |
| page        | false    | 1                                  | 第几页     |
| callback    | false    | __jp0                              | -          |



### Response

```json
{
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "seid": "10089348988940457376",
        "page": 1,
        "pagesize": 20,
        "numResults": 1000,
        "numPages": 50,
        "suggest_keyword": "",
        "rqt_type": "search",
        "cost_time": {
            "params_check": "0.000578",
            "get upuser live status": "0.001865",
            "illegal_handler": "0.000104",
            "as_response_format": "0.007170",
            "mysql_request": "0.000063",
            "as_request": "0.114134",
            "save_cache": "0.000683",
            "as_request_format": "0.001933",
            "deserialize_response": "0.000413",
            "total": "0.125438",
            "main_handler": "0.123969"
        },
        "exp_list": {
            "5508": true,
            "6615": true
        },
        "egg_hit": 0,
        "pageinfo": {
            "pgc": {
                "numResults": 0,
                "total": 0,
                "pages": 0
            },
            "live_room": {
                "numResults": 37,
                "total": 37,
                "pages": 2
            },
            "photo": {
                "numResults": 1000,
                "total": 1000,
                "pages": 50
            },
            "bili_user": {
                "numResults": 1000,
                "total": 1000,
                "pages": 50
            },
            "topic": {
                "numResults": 231,
                "total": 231,
                "pages": 12
            },
            "video": {
                "numResults": 1000,
                "total": 1000,
                "pages": 50
            },
            "user": {
                "numResults": 0,
                "total": 0,
                "pages": 0
            },
            "article": {
                "numResults": 1000,
                "total": 1000,
                "pages": 50
            },
            "media_ft": {
                "numResults": 5,
                "total": 5,
                "pages": 1
            },
            "media_bangumi": {
                "numResults": 6,
                "total": 6,
                "pages": 1
            },
            "special": {
                "numResults": 139,
                "total": 139,
                "pages": 7
            },
            "operation_card": {
                "numResults": 0,
                "total": 0,
                "pages": 0
            },
            "upuser": {
                "numResults": 0,
                "total": 0,
                "pages": 0
            },
            "movie": {
                "numResults": 0,
                "total": 0,
                "pages": 0
            },
            "live_all": {
                "numResults": 38,
                "total": 38,
                "pages": 2
            },
            "tv": {
                "numResults": 0,
                "total": 0,
                "pages": 0
            },
            "live": {
                "numResults": 1000,
                "total": 1000,
                "pages": 50
            },
            "card": {
                "numResults": 1,
                "total": 1,
                "pages": 1
            },
            "bangumi": {
                "numResults": 0,
                "total": 0,
                "pages": 0
            },
            "activity": {
                "numResults": 0,
                "total": 0,
                "pages": 0
            },
            "live_master": {
                "numResults": 1,
                "total": 1,
                "pages": 1
            },
            "live_user": {
                "numResults": 1000,
                "total": 1000,
                "pages": 50
            }
        },
        "result": {
            "star": [],
            "operation_card": [],
            "twitter": [],
            "tv": [],
            "live_room": [],
            "bili_user": [
                {
                    "rank_offset": 1,
                    "usign": "哔哩哔哩 干杯 - ( ゜- ゜)つロ",
                    "videos": 64,
                    "fans": 1178550,
                    "is_upuser": 1,
                    "upic": "//i2.hdslb.com/bfs/face/xxx.jpg",
                    "uname": "哔哩哔哩弹幕网",
                    "official_verify": {
                        "type": 1,
                        "desc": "哔哩哔哩弹幕网官方账号 "
                    },
                    "verify_info": "",
                    "rank_score": 1000000000,
                    "level": 6,
                    "gender": 1,
                    "hit_columns": [],
                    "mid": 8047632,
                    "is_live": 0,
                    "room_id": 544641,
                    "res": [
                        {
                            "play": "19166677",
                            "dm": 910873,
                            "pubdate": 1549285200,
                            "title": "【哔哩哔哩2019拜年祭】",
                            "pic": "//i2.hdslb.com/bfs/archive/xxx.jpg",
                            "fav": 861012,
                            "is_union_video": 0,
                            "is_pay": 0,
                            "duration": "241:9",
                            "aid": 36570401,
                            "coin": 1269327,
                            "arcurl": "http://www.bilibili.com/video/av36570401",
                            "desc": "(ノ≧∇≦)ノ祝大家新年大吉，万事如意，猪事大吉ヾ(≧▽≦*)o"
                        }
                    ]
                }
            ]
        }
    }
}
```



## X3 获取普通视频信息

### 1.0 热度相关

#### Request

```json
{
    URL: "https://api.bilibili.com/x/web-interface/archive/stat",
	Method: "GET",
}
```



| 参数 | 是否必须 | 值参考   | 描述     |
| ---- | -------- | -------- | -------- |
| aid  | true     | （avid） | 视频av号 |


#### Response

```json
{
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "aid": 41949084,
        "view": 647784,
        "danmaku": 4731,
        "reply": 6294,
        "favorite": 59299,
        "coin": 83974,
        "share": 8946,
        "like": 73454,
        "now_rank": 0,
        "his_rank": 0,
        "no_reprint": 1,
        "copyright": 1
    }
}
```

### 2.0标签相关

#### Request

```json
{
    URL: "https://api.bilibili.com/x/tag/archive/tags",
	Method: "GET",
}
```



| 参数     | 是否必须 | 值参考                              | 描述     |
| -------- | -------- | ----------------------------------- | -------- |
| callback | false    | jqueryCallback_bili_575982102165244 | -        |
| aid      | true     | （av id）                           | 视频av号 |
| jsonp    | false    | jsonp                               | -        |
| _        | false    | 1549631553074                       | -        |

#### Response

```json
{
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": [
        {
            "tag_id": 386,
            "tag_name": "翻唱",
            "cover": "http://i0.hdslb.com/bfs/archive/xxx.jpg",
            "head_cover": "http://i0.hdslb.com/bfs/archive/xxx.jpg",
            "content": "“翻唱”是指将已经发表并由他人演唱的歌曲根据自己的风格重新演唱的演绎形式。",
            "short_content": "同一首好歌，不一样的精彩。",
            "type": 3,
            "state": 0,
            "ctime": 1436866637,
            "count": {
                "view": 0,
                "use": 533419,
                "atten": 134742
            },
            "is_atten": 0,
            "likes": 0,
            "hates": 0,
            "attribute": 0,
            "liked": 0,
            "hated": 0
        }
    ]
}
```



### 3.0评论相关

#### Request

```json
{
    URL: "https://api.bilibili.com/x/v2/reply",
	Method: "GET",
    Headers:{
    	Referer: "https://www.bilibili.com/ranking?spm_id_from=$spm_id_from"
	}
}
```



| 参数     | 是否必须 | 值参考                              | 描述               |
| -------- | -------- | ----------------------------------- | ------------------ |
| callback | false    | jqueryCallback_bili_575982102165244 | -                  |
| oid      | true     | （av id）                           | 视频av号           |
| pn       | false    | 1                                   | 第几页的评论       |
| type     | true     | 1                                   | 类型               |
| sort     | false    | 0                                   | 是否返回已经排序的 |
| jsonp    | false    | jsonp                               | -                  |
| _        | false    | 1549631553074                       | -                  |

#### Response

```json
{
    "rpid": 1370193116,
    "oid": 41949084,
    "type": 1,
    "mid": 210115007,
    "root": 0,
    "parent": 0,
    "dialog": 0,
    "count": 0,
    "rcount": 0,
    "floor": 4447,
    "state": 0,
    "fansgrade": 0,
    "attr": 0,
    "ctime": 1549633841,
    "rpid_str": "1370193116",
    "root_str": "0",
    "parent_str": "0",
    "dialog_str": "",
    "like": 2,
    "action": 0,
    "member": {
        "mid": "210115007",
        "uname": "浅暮丶流年",
        "sex": "男",
        "sign": "",
        "avatar": "http://i1.hdslb.com/bfs/face/xxx.jpg",
        "rank": "10000",
        "DisplayRank": "0",
        "level_info": {
            "current_level": 4,
            "current_min": 0,
            "current_exp": 0,
            "next_exp": 0
        },
        "pendant": {
            "pid": 266,
            "name": "2019拜年祭·纪念",
            "image": "http://i2.hdslb.com/bfs/face/xxx.png",
            "expire": 1551269584
        },
        "nameplate": {
            "nid": 0,
            "name": "",
            "image": "",
            "image_small": "",
            "level": "",
            "condition": ""
        },
        "official_verify": {
            "type": -1,
            "desc": ""
        },
        "vip": {
            "vipType": 0,
            "vipDueDate": 0,
            "dueRemark": "",
            "accessStatus": 0,
            "vipStatus": 0,
            "vipStatusWarn": ""
        },
        "fans_detail": null,
        "following": 0
    },
    "content": {
        "message": "原来空专辑不是我一个(｀・ω・´)",
        "plat": 2,
        "device": "",
        "members": []
    },
    "replies": null,
    "assist": 0,
    "folder": {
        "has_folded": false,
        "is_folded": false,
        "rule": "https://www.bilibili.com/blackboard/foldingreply.html"
    }
}
```



## X4 获取官方视频信息

...



## X5 获取用户资料

### 获取用户详细信息

#### Request

```json
{
    URL: "https://api.bilibili.com/x/space/acc/info",
	Method: "GET",
}
```

| 参数  | 是否必须 | 值参考 | 描述   |
| ----- | -------- | ------ | ------ |
| mid   | true     |        | 用户id |
| jsonp | false    | jsonp  |        |

#### Response

```json
{
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "mid": 8047632,
        "name": "哔哩哔哩弹幕网",
        "sex": "男",
        "face": "http://i0.hdslb.com/bfs/face/xxx.jpg",
        "sign": "哔哩哔哩 干杯 - ( ゜- ゜)つロ",
        "rank": 10000,
        "level": 6,
        "jointime": 1423215591,
        "moral": 0,
        "silence": 0,
        "birthday": "01-01",
        "coins": 453963,
        "fans_badge": false,
        "official": {
            "role": 3,
            "title": "哔哩哔哩弹幕网官方账号 ",
            "desc": ""
        },
        "vip": {
            "type": 2,
            "status": 1
        },
        "is_followed": false,
        "top_photo": "http://i2.hdslb.com/bfs/space/xxx.png",
        "theme": {}
    }
}
```





### 获取用户直播间信息

#### Request

```json
{
    URL: "https://api.live.bilibili.com/room/v1/Room/getRoomInfoOld",
	Method: "GET",
}
```

| 参数 | 是否必须 | 值参考    | 描述     |
| ---- | -------- | --------- | -------- |
| mid  | true     |           | 用户id   |

#### Response

```json
{
    "code": 0,
    "msg": "ok",
    "message": "ok",
    "data": {
        "roomStatus": 1,
        "roundStatus": 0,
        "liveStatus": 0,
        "url": "https://live.bilibili.com/21852",
        "title": "自言自语",
        "cover": "https://i0.hdslb.com/bfs/live/xxx.jpg",
        "online": 295618,
        "roomid": 21852,
        "broadcast_type": 0
    }
}
```



### 获取用户空间公告

#### Requests

```json
{
    URL: "https://api.bilibili.com/x/space/notice",
	Method: "GET",
}
```

| 参数  | 是否必须 | 值参考 | 描述   |
| ----- | -------- | ------ | ------ |
| mid   | true     | -      | 用户id |
| jsonp | false    | jsonp  | -      |



#### Response

```json
{
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": "嘿嘿\n微博：weibo.com/laofanqie\n公众号：一颗老番茄"
}
```



### 获取用户关注量

#### Requests

```json
{
    URL: "https://api.bilibili.com/x/relation/stat",
	Method: "GET",
}
```

| 参数     | 是否必须 | 值参考 | 描述   |
| -------- | -------- | ------ | ------ |
| vmid     | true     | -      | 用户id |
| jsonp    | false    | jsonp  | -      |
| callback | false    | __jp3  | -      |



#### Response

```json
{
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "mid": 546195,
        "following": 1, // 关注
        "whisper": 0,
        "black": 0,
        "follower": 3320587 // 被关注（粉丝数）
    }
}
```



### 获取用户总播放量

#### Requests

```json
{
    URL: "https://api.bilibili.com/x/space/upstat",
	Method: "GET",
}
```

| 参数     | 是否必须 | 值参考 | 描述   |
| -------- | -------- | ------ | ------ |
| mid      | true     | -      | 用户id |
| jsonp    | false    | jsonp  | -      |
| callback | false    | __jp3  | -      |



#### Response

```json
{
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "archive": {
            "view": 262726717 //总播放量
        },
        "article": {
            "view": 0
        }
    }
}
```

