/*
 * @Author: Kabuda-czh
 * @Date: 2023-01-29 14:28:53
 * @LastEditors: Kabuda-czh 634469564@qq.com
 * @LastEditTime: 2023-08-30 20:46:06
 * @FilePath: \KBot-App\plugins\kbot\src\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
import fs from 'node:fs'
import type { Context } from 'koishi'
import { Logger, Schema } from 'koishi'
import { Status } from '@satorijs/protocol'

import * as botBasic from './basic'

import * as montagePlugin from './plugins/montage'
import * as twitterPlugin from './plugins/twitter'

import {} from 'koishi-plugin-downloads'

import GeneratePath from './config'
import { downloadAndMoveFiles } from './plugins/utils'

export const name = 'edison'

export const usage = `
<style>
html, body {
  width: 100%;
  height: 100%;
  display: flex;
  background: #000;
}
svg {
  width: 100%;
  height: 100px;
  margin: auto;
}
svg text {
  text-transform: uppercase;
  animation: stroke 5s infinite alternate;
  letter-spacing: 10px;
  font-size: 90px;
}
@keyframes stroke {
  0% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(54, 95, 160, 1);
    stroke-dashoffset: 25%;
    stroke-dasharray: 0 50%;
    stroke-width: 0.8;
  }
  50% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(54, 95, 160, 1);
    stroke-width: 1.2;
  }
  70% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(54, 95, 160, 1);
    stroke-width: 1.5;
  }
  90%,
  100% {
    fill: rgba(72, 138, 204, 1);
    stroke: rgba(54, 95, 160, 0);
    stroke-dashoffset: -25%;
    stroke-dasharray: 50% 0;
    stroke-width: 0;
  }
}

</style>
<svg viewBox="400 0 400 200">
  <text x="0" y="70%"> Koishi-Plugin-edison </text>
</svg>

# Edison v0.1.2 更新日志

## Feature

- 通过bearer token 获取 \`twitter\` 动态

## 这个插件在kbot基础上修改而来，特此感谢原作者
`

interface IPluginEnableConfig {
  enabled: boolean
}

interface IConfig {
  superAdminQQ?: string[]
  KBotBasic?: botBasic.IConfig
  KBotTwitter?: twitterPlugin.IConfig & IPluginEnableConfig
  EdisonMontage?: montagePlugin.IConfig & IPluginEnableConfig
}

function pluginLoad<T>(schema: Schema<T>): Schema<T & IPluginEnableConfig> {
  return Schema.intersect([
    Schema.object({
      enabled: Schema.boolean().default(false).description('是否启用插件'),
    }),
    Schema.union([
      Schema.object({
        enabled: Schema.const(true).required(),
        ...schema.dict,
      }),
      Schema.object({
        enabled: Schema.const(false),
      }),
    ]) as Schema<T>,
  ])
}

export const Config: Schema<IConfig> = Schema.object({
  superAdminQQ: Schema.array(String).description('超级管理员QQ号 (必填)'),
  KBotBasic: botBasic.Config,
  KBotTwitter: pluginLoad(twitterPlugin.Config).description('Twitter 动态推送 (必须要 puppeteer)'),
  EdisonMontage: pluginLoad(montagePlugin.Config).description('Montage 图片拼接 (必须要 Canvas)'),
})

export const logger = new Logger('Edison')

export const using = ['console', 'database', 'downloads'] as const

export async function apply(ctx: Context, config: IConfig) {
  if (!config.superAdminQQ || config.superAdminQQ.length === 0) {
    logger.error('未设置超级管理员QQ号')
  }
  else {
    const generatePath = GeneratePath.getInstance(ctx.baseDir)
    const { edisonDir: kbotDir } = generatePath.getGeneratePathData()

    let createFlag = false
    try {
      await fs.promises.readdir(kbotDir)
    }
    catch (e) {
      logger.error('未找到 edison-data 文件夹, 正在创建')
      await fs.promises.mkdir(kbotDir)
      createFlag = true
    }

    if (!createFlag && !fs.existsSync(kbotDir))
      await fs.promises.mkdir(kbotDir)

    const fontPath = await downloadAndMoveFiles('task1', 'kbot-fonts', [
      'npm://koishi-plugin-kbot-assets',
      'npm://koishi-plugin-kbot-assets?registry=https://registry.npmmirror.com',
    ], ctx)

    generatePath.setFontsDir(fontPath)

    const imagePath = await downloadAndMoveFiles('task2', 'kbot-images', [
      'npm://koishi-plugin-kbot-assets',
      'npm://koishi-plugin-kbot-assets?registry=https://registry.npmmirror.com',
    ], ctx)

    generatePath.setImagesDir(imagePath)

    ctx.bots.forEach(async (bot) => {
      if (
        ![Status.CONNECT, Status.ONLINE].includes(bot.status)
        || bot.platform === 'qqguild'
      )
        return
      config.superAdminQQ.forEach(async (qq) => {
        await ctx.database.getUser(bot.platform, qq).then((user) => {
          try {
            if (user && user?.authority < 5) {
              ctx.database.setUser(bot.platform, qq, {
                authority: 5,
              })
              logger.success(`已将QQ号为 ${qq} 的用户权限设置为 5 级`)
            }
            else if (!user) {
              ctx.database.createUser(bot.platform, qq, {
                authority: 5,
              })
              logger.success(`已成功创建QQ号为 ${qq} 的用户, 并赋予权限 5 级`)
            }
          }
          catch (err) {
            logger.error(`设置QQ号为 ${qq} 的用户权限时出错: ${err}`)
          }
        })
      })
    })

    ctx.command('edison', 'edison 相关功能')

    ctx.on('friend-request', async (session) => {
      await ctx.database.getUser(session.platform, session.userId).then(async (user) => {
        if (user.authority >= 3)
          await session.bot.handleFriendRequest(session.messageId, true)
      })
    })

    ctx.on('guild-request', async (session) => {
      await ctx.database.getUser(session.platform, session.userId).then(async (user) => {
        if (user.authority >= 3)
          await session.bot.handleGuildRequest(session.messageId, true)
      })
    })

    ctx.plugin(botBasic, config.KBotBasic)

    if (config.KBotTwitter.enabled) {
      ctx.plugin(twitterPlugin, config.KBotTwitter)
    }

    if (config.EdisonMontage.enabled) {
      ctx.plugin(montagePlugin, config.EdisonMontage)
    }

    logger.success('Edison 内置插件加载完毕')
  }
}
